import React from 'react';
import { shallow } from 'enzyme';
import { BooleanField } from './BooleanField';
import FalseIcon from '@material-ui/icons/Clear';
import TrueIcon from '@material-ui/icons/Done';

describe('<BooleanField />', () => {
    it('should display tick if value is true', () => {
        const wrapper = shallow(
            <BooleanField record={{ published: true }} source="published" />
        );
        expect(wrapper.first().is('WithStyles(Typography)')).toBe(true);
        expect(wrapper.find(TrueIcon)).toHaveLength(1);
    });

    it('should display cross if value is false', () => {
        const wrapper = shallow(
            <BooleanField record={{ published: false }} source="published" />
        );

        expect(wrapper.first().is('WithStyles(Typography)')).toBe(true);
        expect(wrapper.find(FalseIcon)).toHaveLength(1);
    });

    it('should not display anything if value is null', () => {
        const wrapper = shallow(
            <BooleanField record={{ published: null }} source="published" />
        );

        expect(wrapper.first().children()).toHaveLength(0);
    });

    it('should use custom className', () => {
        const wrapper = shallow(
            <BooleanField
                record={{ foo: true }}
                source="foo"
                className="foo"
            />
        );
        expect(wrapper.hasClass('foo')).toBe(true);
    });

    it('should handle deep fields', () => {
        const wrapper = shallow(
            <BooleanField record={{ foo: { bar: true } }} source="foo.bar" />
        );
        expect(wrapper.first().is('WithStyles(Typography)')).toBe(true);
        expect(wrapper.find(TrueIcon)).toHaveLength(1);
    });
});
