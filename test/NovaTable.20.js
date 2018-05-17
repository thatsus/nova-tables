import { shallow } from '@vue/test-utils';
import NovaTable from '../src/NovaTable.vue';
import AbstractSource from '../src/abstract-source.js';

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
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Has References To Rows', () => {
        expect(wrapper.vm.$refs['cell.Dan.name']).toBeDefined();
        expect(wrapper.vm.$refs['cell.Dave.name']).toBeDefined();
    });
}