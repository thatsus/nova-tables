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
                footer: true
            },
            slots: {
                'name-footer': '<span>Names: 2</span>'
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Shows Footer', () => {
        expect(wrapper.find('tfoot')).toBeDefined();
    });

    it('Has The Footer Slot', () => {
        expect(wrapper.text()).toMatch(/Names: 2/);
    });
}