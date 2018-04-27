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

        vm = new Vue({
            template: `
                <nova-table ref="theNovaTable"
                    :item-source="source"
                    :columns="columns"
                    name="testName"
                    :endpoint-params="endpointParams"
                >
                </nova-table>
            `,
            components: {
                'nova-table': NovaTable,
            },
            data() {
                return {
                    source: source,
                    columns: {
                        name: 'Name',
                        objectiveQuality: 'Quality',
                        fieldA: 'Field A',
                    },
                    endpointParams: {},
                };
            },
        });

    let wrapper = 

    it('should have loaded', function () {
        assert(theNovaTable !== null, "theNovaTable is null")
    });

    it('should have queryParamSaver', function () {
        assert(theNovaTable.queryParamSaver);
    });

}