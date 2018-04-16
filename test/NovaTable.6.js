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
                searchable: true,
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Shows The Search Field', () => {
        expect(wrapper.find('input[placeholder="Search"]')).toBeDefined();
    });

    it('Searches', () => {
        let searchbox = wrapper.find('input[placeholder="Search"]');

        searchbox.element.value = 'Dave';
        searchbox.trigger('input');

        expect(wrapper.vm.source.search).toEqual('Dave');
    });

    it('Unsearches', () => {
        let searchbox = wrapper.find('input[placeholder="Search"]');

        searchbox.element.value = '';
        searchbox.trigger('input');

        expect(wrapper.vm.source.search).toEqual('');
    });
}
