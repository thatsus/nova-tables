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
                {name: 'Marshal', objectiveQuality: '?'},
                {name: 'Clint', objectiveQuality: '?'},
                {name: 'Jesse', objectiveQuality: '?'},
            ],
            totalCount: 10,
            pageCount: 2,
            page: 1,
        });
    };

    //Need to use mount instead of shallow to handle the page selector
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

    it('Displays Only 5 Rows', () => {
        expect(wrapper.vm.source.page_length).toEqual(5);
    });

    it('Displays The Correct Indexes', () => {
        expect(wrapper.vm.pageLengthSelection).toBeTruthy();
        expect(wrapper.vm.pageCount).toBeGreaterThan(1);
        expect(wrapper.text()).toMatch(/Showing 1 to 5 of 10 entries/);
    });

    it('Displays The Page Selector', () => {
        expect(wrapper.find('ul.pagination').exists()).toBeTruthy();
        expect(wrapper.find('ul.pagination').text()).toMatch(/Previous.*1.*2.*Next/);
    });

    it('Changes Pages When Page Buttons Are Clicked', () => {
        let page2 = wrapper.findAll('ul.pagination li').at(2).find('a');
        expect(page2).toBeDefined();
        
        page2.trigger('click');
        expect(wrapper.vm.source.page).toEqual(2);
    });
}