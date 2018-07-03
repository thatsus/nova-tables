import { shallow } from '@vue/test-utils'
import NovaTable from '../src/NovaTable.vue';

export default function() {


    let callback = function(item) {
        if (item.objectiveQuality == 'Low') {
            return 'table-warning';
        } else if (item.objectiveQuality == 'Very Low') {
            return 'table-danger';
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
                rowClass: 'custom-row-class',
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });

    it('Applies the Correct Class to a Row When a String is Passed In', () => {
        const table = wrapper.find('table');
        let rows = table.element.getElementsByClassName('custom-row-class');
        expect(rows.length).toEqual(8);
        for (let i = 0; i < rows.length; i++) {
            expect(rows[i].className).toEqual('custom-row-class');
        }
    });
}