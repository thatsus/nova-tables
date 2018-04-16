import { shallow } from '@vue/test-utils';
import NovaTable from '../src/NovaTable.vue';

export default function() {
    let wrapper = shallow(
        NovaTable,
        {
            propsData: {
                items: [
                    {name: 'Dan', objectiveQuality: 'High'},
                    {name: 'Dave', objectiveQuality: 'Medium'},
                ],
                columns: {
                    name: 'Name',
                    objectiveQuality: 'Quality',
                },
            },
            scopedSlots: {
                name: '<span slot-scope="{item}">{{ item.name.toUpperCase() }} </span>',
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('should use slot for name', () => {
        expect(wrapper.text()).toMatch(/DAN/);
        expect(wrapper.text()).toMatch(/High/);
        expect(wrapper.text()).toMatch(/DAVE/);
        expect(wrapper.text()).toMatch(/Medium/);
        expect(wrapper.text()).toMatch(/DAN[\s]*High[\s]*DAVE[\s]*Medium/);
    });
}