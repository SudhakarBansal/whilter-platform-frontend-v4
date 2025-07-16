'use client';
import { Typography } from "@mui/material";
import { SelectElement, useForm } from "@whilter/forms";

export const VoiceCloneHeader = () => {
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

    return (
        <div className="w-full md:w-1/4 rounded-md">
            <SelectElement name={'select'} label={'Modal Selection'} control={control} options={options} fullWidth />
        </div>
    );
}
