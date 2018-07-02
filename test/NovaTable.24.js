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
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });

    it('Has a Default Table Class When No Prop Is Passed In', () => {
        const table = wrapper.find('table');
        expect(table.element.className).toEqual('display table table-bordered table-condensed fb-table table-striped responsive');
    });
}