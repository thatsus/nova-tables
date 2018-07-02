import { shallow } from '@vue/test-utils'
import NovaTable from '../src/NovaTable.vue';

export default function() {


    let callback = function(items) {
        let item = items.find((x) => {
            return x.name == 'Ronnie';
        });

        if (item !== undefined) {
            return 'table-ronnie-present';
        } else {
            return 'table-ronnie-absent';
        }
    };

    let wrapper = shallow(
        NovaTable,
        {
            propsData: {
                items: [
                    {name: 'Dave', objectiveQuality: 'Medium'},
                    {name: 'Dan', objectiveQuality: 'High'},
                    {name: 'Marvin', objectiveQuality: 'Medium'},
                    {name: 'Alfred', objectiveQuality: 'Low'},         
                    {name: 'Donovan', objectiveQuality: 'Very Low'},
                    {name: 'Charles', objectiveQuality: 'High'},
                    {name: 'Fred', objectiveQuality: 'Medium'},
                    {name: 'Ronnie', objectiveQuality: 'Low'},                                                   
                ],
                columns: {
                    name: 'Name',
                    objectiveQuality: 'Quality',
                },
                keyField: 'name',
                tableClass: callback,
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });

    it('Applies the Correct Class to a Table When a Callback is Passed In', () => {
        const table = wrapper.find('table');
        expect(table.element.className).toEqual('table-ronnie-present');
    });
}