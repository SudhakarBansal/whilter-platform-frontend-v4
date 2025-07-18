import React from 'react';
import { AutocompleteElement } from '@whilter/forms'; // Adjust import path as needed
import { useWatch } from 'react-hook-form';

interface TagInputProps {
    name: string;
    label: string;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
    maxTags?: number;
}

export const TagsInput: React.FC<TagInputProps> = ({
    name,
    label,
    helperText,
    required = false,
    disabled = false,
    maxTags = 10,
}) => {
    // Watch the current value to get tag count
    const currentValue = useWatch({ name }) || [];
    const currentCount = Array.isArray(currentValue) ? currentValue.length : 0;
    const isMaxReached = currentCount >= maxTags;

    // Empty options array since we're using freeSolo
    const options: string[] = [];

    // Custom validation rules
    const validationRules = {
        ...(maxTags && {
            validate: (value: string[]) => {
                if (value && value.length > maxTags) {
                    return `Maximum ${maxTags} tags allowed`;
                }
                return true;
            },
        }),
    };

    // Enhanced helper text with count
    const enhancedHelperText = isMaxReached
        ? `Maximum limit reached (${currentCount}/${maxTags})`
        : helperText || `${currentCount}/${maxTags} tags`;

    return (
        <AutocompleteElement
            name={name}
            options={options}
            multiple={true}
            label={label}
            required={required}
            rules={validationRules}
            autocompleteProps={{
                freeSolo: true,
                disabled: disabled, // Don't disable when max reached, just prevent new input
                filterSelectedOptions: true,
                ChipProps: {
                    variant: 'outlined',
                    size: 'small',
                },
                // Prevent typing new input when max is reached, but allow deletion
                onInputChange: (event, newInputValue, reason) => {
                    if (reason === 'input' && isMaxReached && newInputValue.length > 0) {
                        // Prevent typing new characters when max is reached
                        event.preventDefault();
                        return;
                    }
                },
                // Prevent new tags from being added when max is reached
                onChange: (event, newValue, reason) => {
                    if (reason === 'selectOption' && isMaxReached) {
                        event.preventDefault();
                        return;
                    }
                },
            }}
            textFieldProps={{
                helperText: enhancedHelperText,
                variant: 'outlined',
                fullWidth: true,
                error: isMaxReached,
                // Prevent typing when max is reached
                onKeyDown: (event) => {
                    if (isMaxReached && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
                        event.preventDefault();
                    }
                },
            }}
            transform={{
                input: (value: string[] | null) => {
                    return value || [];
                },
                output: (event, newValue) => {
                    // Handle the case where newValue might contain strings or objects
                    const tags = Array.isArray(newValue) ? newValue : [];
                    const cleanTags = tags.map(tag => typeof tag === 'string' ? tag.trim() : tag).filter(tag => tag !== '');

                    // Prevent adding more tags than the limit
                    if (cleanTags.length > maxTags) {
                        return cleanTags.slice(0, maxTags);
                    }

                    return cleanTags;
                },
            }}
        />

    );
};