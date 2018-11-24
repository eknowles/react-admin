import { shallow } from 'enzyme';
import React from 'react';

import { DateInput } from './DateInput';

describe('<DateInput />', () => {
    it('should render a localized <DatePicker />', () => {
        const input = { value: null };
        const wrapper = shallow(
            <DateInput source="foo" meta={{}} input={input} />
        );
        const datePicker = wrapper.find('TextField');
        expect(datePicker).toHaveLength(1);
        expect(datePicker.first().prop('type')).toBe('date');
    });

    it('should call props `input.onChange` method when changed', () => {
        const input = { value: null, onChange: jest.fn(), onBlur: () => {} };
        const wrapper = shallow(
            <DateInput source="foo" input={input} meta={{}} />
        );
        wrapper.simulate('change', {
            target: { value: '2010-01-04' },
        });
        expect(input.onChange).toHaveBeenCalledWith('2010-01-04');
    });

    describe('error message', () => {
        it('should not be displayed if field is pristine', () => {
            const wrapper = shallow(
                <DateInput
                    source="foo"
                    input={{ value: null }}
                    meta={{ touched: false }}
                />
            );
            const DatePicker = wrapper.find('TextField');
            expect(DatePicker).not.toHaveProperty('helperText');
        });

        it('should not be displayed if field has been touched but is valid', () => {
            const wrapper = shallow(
                <DateInput
                    source="foo"
                    input={{ value: null }}
                    meta={{ touched: true, error: false }}
                />
            );
            const DatePicker = wrapper.find('TextField');
            expect(DatePicker).not.toHaveProperty('helperText');
        });

        it('should be displayed if field has been touched and is invalid', () => {
            const metaProps = { touched: true, error: 'Required field.' };
            const wrapper = shallow(
                <DateInput
                    source="foo"
                    input={{ value: null }}
                    meta={metaProps}
                />
            );
            const DatePicker = wrapper.find('TextField');
            expect(DatePicker.prop('helperText')).toBe(metaProps.error);
        });
    });
});
