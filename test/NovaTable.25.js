import { shallow } from '@vue/test-utils'
import NovaTable from '../src/NovaTable.vue';

export default function() {

    let wrapper = shallow(
        NovaTable,
        {
            propsData: {
                items: [
                    {name: 'Dave', objectiveQuality: 'Medium'},
                    {name: 'Dan', objectiveQuality: 'High'},
                ],
                columns: {
                    name: 'Name',
                    objectiveQuality: 'Quality',
                },
                keyField: 'name',
                tableClass: 'custom-class',
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });

    it('Has the Correct Table Class When Passed In As String', () => {
        expect(typeof wrapper.vm.tableClass).toEqual('string');
        expect(wrapper.vm.tableClass).toEqual('custom-class');
        const table = wrapper.find('table');
        expect(table.element.className).toEqual('custom-class');
    });
}