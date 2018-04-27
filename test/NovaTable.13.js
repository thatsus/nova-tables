import { mount } from '@vue/test-utils';
import NovaTable from '../src/NovaTable.vue';
import AbstractSource from '../src/abstract-source.js';

export default function() {

    let source = new AbstractSource();
    source.get = function () {
        return Promise.resolve({
            items: [
                {name: 'Dave', objectiveQuality: 'Medium'},
                {name: 'Dan', objectiveQuality: 'High'},
            ],
            totalCount: 2,
            pageCount: 1,
            page: 1,
        });
    };

    let wrapper = mount(
        NovaTable,
        {
            propsData: {
                itemSource: source,
                columns: {
                    name: 'Name',
                    objectiveQuality: 'Quality',
                },
                adjustableColumns: true,
                pageLength: 5
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Requests Only 5 Items', () => {
        expect(wrapper.vm.source.page_length).toEqual(5);
    });

    it('Does Not Display Page Selector', () => {
        expect(wrapper.find('ul.pagination').exists()).toBeFalsy();
    });
}