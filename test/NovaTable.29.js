import { shallow } from '@vue/test-utils';
import NovaTable from '../src/NovaTable.vue';
import AbstractSource from '../src/abstract-source.js';

export default function() {

    let source = new AbstractSource();
    source.get = function () {
        return Promise.resolve({
            items: [
                {name: 'Dave', objectiveQuality: 'Medium', eyes:'Blue'},
                {name: 'Dan', objectiveQuality: 'High', eyes:'Less Blue'},
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
                    eyes: 'Eye Color',
                },
                adjustableColumns: true,
                defaultActiveFields: ['name'],
                alwaysActiveFields: ['name'],
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Doesnt show excluded field in Selector', () => {
        let columnSelectors = wrapper.findAll('ul.dropdown-menu input[type="checkbox"]');

        expect(columnSelectors.length).toEqual(2);
        expect(columnSelectors.at(0).element.checked).toBeFalsy();
        expect(columnSelectors.at(1).element.checked).toBeFalsy();
    });

    it('Shows correct column names in Selector', () => {
        let columnSelectorText = wrapper.findAll('ul.dropdown-menu label');

        expect(columnSelectorText[0].text().trim()).toEqual('Quality');
    });

    it('Displays the field although it is excluded from selector', () => {
        let ths = wrapper.findAll('th').wrappers;
        expect(ths.length).toEqual(1);
        expect(ths[0].text().trim()).toEqual('Name');
    });
}