import { shallow } from '@vue/test-utils';
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

    let wrapper = shallow(
        NovaTable,
        {
            propsData: {
                itemSource: source,
                columns: {
                    name: 'Name',
                    objectiveQuality: 'Quality',
                },
                adjustableColumns: true
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Shows The Column Selector With All Boxes Checked', () => {
        expect(wrapper.find('.fa-columns')).toBeDefined();
        
        let columnSelectors = wrapper.findAll('ul.dropdown-menu input[type="checkbox"]');
        expect(columnSelectors.length).toEqual(2);
        expect(columnSelectors.at(0).element.checked).toBeTruthy();
        expect(columnSelectors.at(1).element.checked).toBeTruthy();
    });

    describe('Handle Column Selection', () => {
        it('Removes A Column', () => {
            let columnSelectors = wrapper.findAll('ul.dropdown-menu input[type="checkbox"]');
        
            columnSelectors.at(0).element.checked = false;
            columnSelectors.at(0).trigger('change');

            expect(wrapper.findAll('th').length).toEqual(1);
        });
        
        it('Puts It Back', () => {
            let columnSelectors = wrapper.findAll('ul.dropdown-menu input[type="checkbox"]');
        
            columnSelectors.at(0).element.checked = true;
            columnSelectors.at(0).trigger('change');

            expect(wrapper.findAll('th').length).toEqual(2);
        });
    });
}
