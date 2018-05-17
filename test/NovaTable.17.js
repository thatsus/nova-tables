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
                endpointParams: {},
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Saves To URL', () => {
        let caughtData;
        wrapper.vm.queryParamSaver = {
            get() {
                return {};
            },
            set(data) {
                caughtData = data;
            }
        };

        wrapper.vm.endpointParams = {x: 34};

        expect(caughtData.x).toEqual(34);
    });

    it('Loads From URL', () => {
        wrapper.vm.queryParamSaver = {
            get() {
                return {
                    sort_field: 'lmnop'
                };
            },
            set(data) {
                // Do nothing
            }
        };

        wrapper.vm.applyQueryParams();
        expect(wrapper.vm.sortField).toEqual('lmnop');
    });

    it('Does Not Save Defaults To URL', () => {
        let caughtData;

        wrapper.vm.initialQueryParams = {
            a: 15,
        };
        wrapper.vm.queryParamSaver = {
            get() {
                return {};
            },
            set(data) {
                caughtData = data;
            }
        };

        wrapper.vm.endpointParams = {
            x: 34,
            a: 15,
        };

        expect(caughtData.x).toEqual(34);
        expect(caughtData.a).not.toBeDefined();
    });
}