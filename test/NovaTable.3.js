import { shallow } from '@vue/test-utils';
import NovaTable from '../src/NovaTable.vue';

export default function() {
    // Our own special source just for tracking what methods get 
    // called by NovaTable
    let source = {
        calls: {
            setPage: [],
            setSort: [],
            onChange: [],
            setSearch: [],
            get: [],
        },
        setSearch() {
            this.calls.setSearch.push(arguments);
        },
        setPage() {
            this.calls.setPage.push(arguments);
        },
        setSort() {
            this.calls.setSort.push(arguments);
        },
        onChange() {
            this.calls.onChange.push(arguments);
        },
        get() {
            this.calls.get.push(arguments);
            return Promise.resolve({
                items: [
                    {name: 'Dan', objectiveQuality: 'High'},
                    {name: 'Dave', objectiveQuality: 'Medium'},
                ],
                totalCount: 2,
                pageCount: 1,
                page: 1,
            });
        },
    };

    let wrapper = shallow(
        NovaTable,
        {
            propsData: {
                itemSource: source,
                columns: {
                    name: 'Name',
                    objectiveQuality: 'quality',
                },
            },
        }
    );
    
    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Has Custom Source', () => {
        expect(wrapper.vm.source).toEqual(source);
    });

    describe('Calls The Correct Methods', () => {
        // setPage is called twice, once explicitly and once when we set 
        // the value of pageLengthSelection
        it('setPage', () => {
            expect(wrapper.vm.source.calls.setPage.length).toEqual(2);
            expect(wrapper.vm.source.calls.setPage[0][0]).toEqual(1);
            expect(wrapper.vm.source.calls.setPage[0][1]).toBeUndefined();
        });

        // setSearch is called once when activeColumns is set
        it('setSearch', () => {
            expect(wrapper.vm.source.calls.setSearch.length).toEqual(1);
            expect(wrapper.vm.source.calls.setSearch[0][0]).toEqual('');
            expect(wrapper.vm.source.calls.setSearch[0][1].slice().sort().join('-')).toEqual('name-objectiveQuality');
        });

        // setSort is called once, when softField is set
        // sortOrder doesn't get set in this test, and so it doesn't imply
        // a call to setSort
        it('setSort', () => {
            expect(wrapper.vm.source.calls.setSort.length).toEqual(1);
            expect(wrapper.vm.source.calls.setSort[0][0]).toEqual('name');
            expect(wrapper.vm.source.calls.setSort[0][1]).toEqual('A');
        });

        it('onChange', () => {
            expect(wrapper.vm.source.calls.onChange.length).toEqual(1);
            expect(wrapper.vm.source.calls.onChange[0][0]).toBeInstanceOf(Function);
        });
    });

    it('Change Page When itemSource GETs', () => {
        expect(wrapper.text()).toMatch(/Dan/);
        expect(wrapper.text()).toMatch(/High/);
        expect(wrapper.text()).toMatch(/Dave/);
        expect(wrapper.text()).toMatch(/Medium/);
        expect(wrapper.text()).toMatch(/Dan\s*High\s*Dave\s*Medium/);
        
        wrapper.vm.source.get = function () {
            return Promise.resolve({
                items: [
                    {name: 'Dave', objectiveQuality: 'Medium'},
                ],
                totalCount: 1,
                pageCount: 1,
                page: 1,
            });
        };

        wrapper.vm.refreshSource();
        wrapper.vm.$nextTick().then(() => {
            expect(wrapper.text()).not.toMatch(/Dan/);
            expect(wrapper.text()).not.toMatch(/High/);
            expect(wrapper.text()).toMatch(/Dave/);
            expect(wrapper.text()).toMatch(/Medium/);
            expect(wrapper.text()).toMatch(/Dave\s*Medium/);
        });
    });
}