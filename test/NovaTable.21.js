import { mount } from '@vue/test-utils';
import NovaTable from '../src/NovaTable.vue';

export default function() {

    let wrapper = mount(
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
                csvExportable: true,
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Has Data For CSV', () => {
        wrapper.vm.generateCsvData();
        expect(wrapper.vm.csvData).toBeInstanceOf(Array);

        expect(wrapper.vm.csvData[0].Name).toEqual('Dan');
        expect(wrapper.vm.csvData[0].Quality).toEqual('High');
        expect(wrapper.vm.csvData[1].Name).toEqual('Dave');
        expect(wrapper.vm.csvData[1].Quality).toEqual('Medium');
    });

    it('Displays CSV Download Link', () => {
        let a = wrapper.find('a[download="export.csv"]');
        expect(a.exists()).toBeTruthy();

        let href = a.element.href;

        expect(href).toMatch(/Dan/);
        expect(href).toMatch(/Dave/);
        expect(href).toMatch(/High/);
        expect(href).toMatch(/Medium/);
    });
}