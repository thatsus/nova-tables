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
                rowClass: callback,
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });



    it('Applies the Correct Class to a Row When a Callback is Passed In', () => {
        const table = wrapper.find('table');
        let warningRows = table.element.getElementsByClassName('table-warning');
        expect(warningRows.length).toEqual(2);
        for (let i = 0; i < warningRows.length; i++) {
            expect(warningRows[i].getElementsByTagName('td')[0].innerHTML.trim()).toEqual(expect.stringMatching(/^Alfred$|^Ronnie$/));
        }
        let dangerRows = table.element.getElementsByClassName('table-danger');
        expect(dangerRows.length).toEqual(1);
        for (let i = 0; i < dangerRows.length; i++) {
            expect(dangerRows[i].getElementsByTagName('td')[0].innerHTML.trim()).toEqual(expect.stringMatching('Donovan'));
        }        

    });
}