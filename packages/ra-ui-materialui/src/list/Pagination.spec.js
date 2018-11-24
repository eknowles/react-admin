import React from 'react';
import { mount, shallow } from 'enzyme';

import { Pagination } from './Pagination';

const setWindowWidth = (width) => {
    global.innerWidth = width;
    global.dispatchEvent(new Event('resize'));
};

describe('<Pagination />', () => {
    it('should display a pagination limit when there is no result', () => {
        const wrapper = shallow(
            <Pagination
                translate={x => x}
                total={0}
                changeFormValue={() => true}
                changeListParams={() => true}
            />
        );
        expect(wrapper.find('pure(translate(PaginationLimit))')).toHaveLength(
            1
        );
    });

    it('should not display a pagination limit when there are results', () => {
        const wrapper = shallow(
            <Pagination
                translate={x => x}
                total={1}
                ids={[1]}
                changeFormValue={() => true}
                changeListParams={() => true}
            />
        );
        expect(wrapper.find('pure(translate(PaginationLimit))')).toHaveLength(
            0
        );
    });

    it('should not display a pagination limit on an out of bounds page', () => {
        const wrapper = shallow(
            <Pagination
                translate={x => x}
                total={10}
                ids={[]}
                page={2}
                perPage={10}
                changeFormValue={() => true}
                changeListParams={() => true}
            />
        );
        expect(wrapper.find('pure(translate(PaginationLimit))')).toHaveLength(
            0
        );
    });

    describe('mobile', () => {
        beforeAll(() => {
            setWindowWidth(600); // small < 960
        });

        it('should render a <TablePagination> without rowsPerPage choice', () => {
            const wrapper = mount(
                <Pagination
                    page={2}
                    perPage={5}
                    total={15}
                    translate={x => x}
                />
            );
            const pagination = wrapper.find('TablePagination');
            expect(pagination.prop('rowsPerPageOptions')).toEqual([]);
        });
    });
    describe('desktop', () => {
        beforeAll(() => {
            setWindowWidth(960); // medium >= 960
        });

        it('should render a <TablePagination> with rowsPerPage choice', () => {
            const wrapper = mount(
                <Pagination
                    page={2}
                    perPage={5}
                    total={15}
                    translate={x => x}
                />
            );
            const pagination = wrapper.find('TablePagination');
            expect(pagination.prop('rowsPerPageOptions')).toEqual([5, 10, 25]);
        });
    });
});
