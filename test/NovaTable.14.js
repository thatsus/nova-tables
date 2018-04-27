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
                {name: 'Marshal', objectiveQuality: '?'},
                {name: 'Clint', objectiveQuality: '?'},
                {name: 'Jesse', objectiveQuality: '?'},
            ],
            totalCount: 10,
            pageCount: 2,
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
                    objectiveQuality: 'Quality'
                },
                adjustableColumns: true,
                pageLength: 5,
                pageLengthOptions: [5,6,7,8]
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Displays A Dropdown For Page Lengths', () => {
        let dropups = wrapper.find('.dropup');
        
        expect(dropups.exists()).toBeTruthy();
        expect(dropups.text()).toMatch(/Show/);
        
        expect(dropups.find('button').exists()).toBeTruthy();

        let selectors = dropups.findAll('ul li a');

        expect(selectors.length).toEqual(4);
        expect(selectors.at(0).text()).toEqual('5');
        expect(selectors.at(1).text()).toEqual('6');
        expect(selectors.at(2).text()).toEqual('7');
        expect(selectors.at(3).text()).toEqual('8');
    });

    it('Sets The itemSource Page Length', () => {
        let dropups = wrapper.find('.dropup');
        
        dropups.findAll('ul li a').at(1).trigger('click');
        
        expect(wrapper.vm.source.page_length).toEqual(6);
    });

    it('Refreshes On Change', () => {
        let sourceRan = 0;

        wrapper.vm.source.oldGet = wrapper.vm.source.get;
        wrapper.vm.source.get = function () {
            sourceRan++;
            return this.oldGet();
        };

        let dropups = wrapper.find('.dropup');
        
        dropups.findAll('ul li a').at(0).trigger('click');

        expect(sourceRan).toBeTruthy();
    });
}