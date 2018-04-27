import { shallow } from '@vue/test-utils';
import NovaTable from '../src/NovaTable.vue';
import AbstractSource from '../src/abstract-source.js';

export default function() {

    let source = new AbstractSource();
    source.get = function () {
        return Promise.resolve({
            items: [
                {name: 'Dave', objectiveQuality: 'Medium', fieldA: 2, fieldB: "hat", fieldC: "0.0"},
                {name: 'Dan', objectiveQuality: 'High', fieldA: 2, fieldB: "hat", fieldC: "0.0"},
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
                    fieldA: 'Field A',
                },
                defaultSortOrders: {
                    name: 'D',
                    fieldA: 'D',
                },
                sortable: true,
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Starts In The Default Sort Order', () => {
        expect(wrapper.vm.source.sort_direction).toEqual('D');
        expect(wrapper.vm.source.sort_field).toEqual('name');
    });

    it('Sorts By The Correct Order When Clicked', () => {
        wrapper.findAll('th').at(2).trigger('click');

        expect(wrapper.vm.source.sort_field).toEqual('fieldA');
        expect(wrapper.vm.source.sort_direction).toEqual('D');
    });

    it('Behaves The Same For Unlisted Columns', () => {
        wrapper.findAll('th').at(1).trigger('click');
        
        expect(wrapper.vm.source.sort_field).toEqual('objectiveQuality');
        expect(wrapper.vm.source.sort_direction).toEqual('A');
    });
}