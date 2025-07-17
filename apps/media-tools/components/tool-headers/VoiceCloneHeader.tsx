'use client';
import { SelectElement } from "@whilter/forms";

export const VoiceCloneHeader = () => {
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
            <SelectElement name={'select'} label={'Modal Selection'} options={options} fullWidth />
        </div>
    );
}
