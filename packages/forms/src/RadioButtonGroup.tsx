import { forwardRef } from 'react'
import type { ReactNode, Ref, RefAttributes } from 'react'
import type {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  PathValue,
} from 'react-hook-form'
import {
  useController,
  type UseControllerProps,
} from 'react-hook-form'
import type { FormControlLabelProps, FormLabelProps, RadioGroupProps, RadioProps } from '@mui/material'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from '@mui/material'
import { useFormError } from './FormErrorProvider'
import { useTransform } from './useTransform'

// Define a more specific type for options
type OptionType = Record<string, any>

export type RadioButtonGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue = unknown,
> = {
  rules?: UseControllerProps<TFieldValues, TName>['rules']
  options: TValue[]
  helperText?: ReactNode
  name: TName
  required?: boolean
  parseError?: (error: FieldError) => ReactNode
  label?: string
  labelKey?: string
  valueKey?: string
  disabledKey?: string
  type?: 'number' | 'string'
  emptyOptionLabel?: string
  onChange?: (value: TValue | string | undefined) => void
  returnObject?: boolean
  row?: boolean
  control?: Control<TFieldValues>
  labelProps?: Omit<FormControlLabelProps, 'label' | 'control' | 'value'>
  formLabelProps?: Omit<FormLabelProps, 'required' | 'error'>
  radioProps?: RadioProps
  disabled?: boolean
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TValue
    output?: (
      value: TValue | string | undefined
    ) => PathValue<TFieldValues, TName>
  }
}

type RadioButtonGroupComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue = unknown,
>(
  props: RadioButtonGroupProps<TFieldValues, TName, TValue> &
    RefAttributes<HTMLDivElement>
) => JSX.Element

const RadioButtonGroup = forwardRef(function RadioButtonGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue = unknown,
>(
  props: RadioButtonGroupProps<TFieldValues, TName, TValue>,
  ref: Ref<HTMLDivElement>
) {
  const {
    helperText,
    options,
    label,
    name,
    parseError,
    labelKey = 'label',
    valueKey = 'id',
    disabledKey = 'disabled',
    required,
    emptyOptionLabel,
    returnObject,
    row,
    control,
    type,
    labelProps,
    disabled,
    formLabelProps,
    radioProps,
    transform,
    rules = {},
    ...rest
  } = props
  const theme = useTheme()

  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn

  const rulesTmp = {
    ...rules,
    ...(required && !rules.required && { required: 'This field is required' }),
  }

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    rules: rulesTmp,
    disabled,
    control,
  })

  const { value, onChange } = useTransform<TFieldValues, TName, TValue | string>({
    value: field.value,
    onChange: field.onChange,
    transform: {
      input:
        typeof transform?.input === 'function'
          ? transform.input
          : (value) => {
            return value || ('' as TValue)
          },
      output:
        typeof transform?.output === 'function'
          ? transform?.output
          : (_event, value) => {
            if (value && type === 'number') {
              return Number(value)
            }
            return value
          },
    },
  })

  const renderHelperText = error
    ? typeof customErrorFn === 'function'
      ? customErrorFn(error)
      : error.message
    : helperText

  const onRadioChange: RadioGroupProps['onChange'] = (event, radioValue) => {
    const returnValue = returnObject
      ? options.find((items) => {
        // Type guard to ensure items is an object
        if (typeof items === 'object' && items !== null && valueKey in items) {
          return (items as OptionType)[valueKey] === radioValue
        }
        return false
      })
      : radioValue
    onChange(event, returnValue)
    if (typeof rest.onChange === 'function') {
      rest.onChange(returnValue)
    }
  }

  // Helper function to safely get property from option
  const getOptionProperty = (option: TValue, key: string): any => {
    if (typeof option === 'object' && option !== null && key in option) {
      return (option as OptionType)[key]
    }
    return undefined
  }

  // Helper function to safely get value for comparison
  const getValueForComparison = (value: TValue | string | undefined): any => {
    if (returnObject && typeof value === 'object' && value !== null && valueKey in value) {
      return (value as OptionType)[valueKey]
    }
    return value
  }

  return (
    <FormControl error={!!error} ref={ref}>
      {label && (
        <FormLabel {...formLabelProps} required={required} error={!!error}>
          {label}
        </FormLabel>
      )}
      <RadioGroup onChange={onRadioChange} name={name} row={row} value={value}>
        {emptyOptionLabel && (
          <FormControlLabel
            {...labelProps}
            control={
              <Radio
                {...radioProps}
                sx={{
                  color: error ? theme.palette.error.main : undefined,
                }}
                checked={!value}
              />
            }
            label={emptyOptionLabel}
            value=""
          />
        )}
        {options.map((option: TValue, index: number) => {
          const optionKey = getOptionProperty(option, valueKey)
          const optionDisabled = getOptionProperty(option, disabledKey) || false
          const optionLabel = getOptionProperty(option, labelKey)

          if (optionKey === undefined) {
            console.error(
              `RadioButtonGroup: valueKey ${valueKey} does not exist on option`,
              option
            )
          }

          let val = getValueForComparison(value)
          if (type === 'number') {
            val = Number(val)
          }

          const isChecked = val === optionKey

          return (
            <FormControlLabel
              {...labelProps}
              control={
                <Radio
                  {...radioProps}
                  sx={{
                    color: error ? theme.palette.error.main : undefined,
                  }}
                  disabled={disabled || optionDisabled}
                  checked={isChecked}
                />
              }
              value={optionKey}
              label={optionLabel}
              key={optionKey !== undefined ? optionKey : index}
            />
          )
        })}
      </RadioGroup>
      {renderHelperText && <FormHelperText>{renderHelperText}</FormHelperText>}
    </FormControl>
  )
})
RadioButtonGroup.displayName = 'RadioButtonGroup'
export default RadioButtonGroup as RadioButtonGroupComponent