import { shallow } from '@vue/test-utils';
import NovaTable from '../src/NovaTable.vue';
import AbstractSource from '../src/abstract-source.js';

export default function() {
    let source = new AbstractSource();
    source.get = function () {
        return Promise.resolve({
            items: [
                {name: 'Dave', objectiveQuality: 'Medium'},
                {name: 'Dan', objectiveQuality: 'High'},
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
                },
                sortable: true,
            },
        }
    );
    
    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Show Sortable Icons On All Columns', () => {
        expect(wrapper.findAll('th').length).toEqual(2);
        expect(wrapper.findAll('th div i').length).toEqual(2);
    });

    it('Sort By First Column By Default', () => {
        expect(wrapper.vm.source.sort_field).toEqual('name');
    });

    it('Set New Sort When Sorters Are Clicked', () => {
        wrapper.findAll('th').at(1).trigger('click');
        expect(wrapper.vm.source.sort_field).toEqual('objectiveQuality');
    });

    it('Refresh When Sorters Are Clicked', () => {
        let sourceRan = 0;

        wrapper.vm.source.oldGet = wrapper.vm.source.get;
        wrapper.vm.source.get = function () {
            sourceRan++;
            return this.oldGet();
        };

        wrapper.findAll('th').at(1).trigger('click');
        expect(sourceRan).toEqual(1);
    });
}