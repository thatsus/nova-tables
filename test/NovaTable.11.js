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
                adjustableColumns: true,
                defaultActiveFields: ['name'],
            }
        }
    );    

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Has The Correct Default Fields', () => {
        let columnSelectors = wrapper.findAll('ul.dropdown-menu input[type="checkbox"]');
        
        expect(columnSelectors.length).toEqual(2);
        expect(columnSelectors.at(0).element.checked).toBeTruthy();
        expect(columnSelectors.at(1).element.checked).toBeFalsy();
    });
}