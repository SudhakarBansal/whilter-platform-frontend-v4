'use client';
import { Button, Stack } from "@mui/material";
import { AutocompleteElement, CheckboxButtonGroup, CheckboxElement, DateFnsProvider, DatePickerElement, FormContainer, MultiSelectElement, PasswordElement, PasswordRepeatElement, RadioButtonGroup, SelectElement, SwitchElement, TextFieldElement, useForm, useWatch } from '@whilter/forms';

export default function ToolPage() {
    const {
        control,
        handleSubmit
    } = useForm<{
        multi_select: string[];
        name: string;
        auto: string;
        auto_multi: string[];
        select: string;
        switch: boolean;
        checkbox: string[];
        check: boolean;
        date: string;
        radio: string;
        password: string;
        password_repeat: string;
    }>({
        defaultValues: {
            name: ''
        }
    });
    const options = [{
        id: 'one',
        label: 'One'
    }, {
        id: 'two',
        label: 'Two'
    }, {
        id: 'three',
        label: 'Three'
    }];

    const allValues = useWatch({control});
    console.log('allValues', allValues);

    return <DateFnsProvider>
        <form noValidate>
            <Stack spacing={2}>
                <TextFieldElement name={'name'} label={'Name'} control={control} required fullWidth />
                <AutocompleteElement name={'auto'} label={'Autocomplete'} control={control} options={options} />
                <AutocompleteElement name={'auto_multi'} label={'Autocomplete Multiple'} multiple control={control} options={options} />
                <SelectElement name={'select'} label={'Select'} control={control} options={options} fullWidth />
                <MultiSelectElement showCheckbox name={'multi_select'} label={'Multi Select'} control={control} options={options} fullWidth />
                <DatePickerElement name={'date'} control={control} /> <br />
                <RadioButtonGroup name={'radio'} label={'Radio'} control={control} options={options} />
                <CheckboxButtonGroup name={'checkbox'} label={'Radio'} control={control} options={options} />
                <PasswordElement name={'password'} label={'Password'} control={control} />
                <PasswordRepeatElement name={'password_repeat'} label={'Password Repeat'} passwordFieldName={'password'} control={control} />
                <SwitchElement name={'switch'} label={'Switch'} control={control} />
                <CheckboxElement name={'check'} label={'Check'} control={control} />
                <Button type={'submit'} color={'primary'}>
                    Submit
                </Button>
            </Stack>
        </form>
    </DateFnsProvider>;
}