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
                    fieldB: 'Field B',
                    fieldC: 'Field C',
                },
                sortable: [
                    'name',
                    'fieldB',
                    'fieldC',
                    'notExists',
                ],
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Show Sortable Icons On Selected Columns (That Exist)', () => {
        expect(wrapper.findAll('th').length).toEqual(5);
        expect(wrapper.findAll('th div i').length).toEqual(3);
        
        //WrapperArray isn't really an array, and so can't do some stuff
        let arr = [];
        for (let i = 0; i < wrapper.findAll('th').length; i++) {
            arr.push(wrapper.findAll('th').at(i));
        }

        let sortCount = wrapper.vm.sortable.length;
        arr.forEach((th_wrapper) => {
            wrapper.vm.sortable.forEach((sort_key) => {
                if (wrapper.vm.columns[sort_key] == th_wrapper.text()) {
                    expect(th_wrapper.find('div i')).toBeDefined();
                    sortCount--;
                }
            })
        });

        //NotExists is still there
        expect(sortCount).toEqual(1);
    });

    it('Set New Sort When Sorters Are Clicked', () => {
        wrapper.findAll('th').at(3).trigger('click');
        expect(wrapper.vm.source.sort_field).toEqual('fieldB');
    });

    it('Refresh When Sorters Are Clicked', () => {
        let sourceRan = 0;

        wrapper.vm.source.oldGet = wrapper.vm.source.get;
        wrapper.vm.source.get = function () {
            sourceRan++;
            return this.oldGet();
        };

        wrapper.findAll('th').at(0).trigger('click');
        expect(sourceRan).toEqual(1);
    });
}