import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import NovaTableLoader from '!!vue-loader?inject!../src/NovaTable.vue';
import Vue from 'vue';
import AbstractFilter from '../src/abstract-filter.js';

module.exports = function () {

    let vm, theNovaTable, csvDownload;

    const NovaTable = NovaTableLoader({
        'vue-csv-downloader': {
            template: '<span>CSV: {{ data }}</span>',
            props: ['data'],
            mounted() {
                csvDownload = this;
            },
        }
    });

    beforeEach('setup the Vue instance', function (done) {

        csvDownload = null;

        vm = new Vue({
            template: `
                <nova-table ref="theNovaTable"
                    :items="items"
                    :columns="columns"
                    keyField="name"
                    :csv-exportable="true"
                >
                </nova-table>
            `,
            components: {
                'nova-table': NovaTable,
            },
            data() {
                return {
                    items: [
                        {name: 'Dave', objectiveQuality: 'Medium'},
                        {name: 'Dan', objectiveQuality: 'High'},
                    ],
                    columns: {
                        name: 'Name',
                        objectiveQuality: 'Quality',
                    },
                };
            },
        });

        vm.$mount();

        theNovaTable = vm.$refs.theNovaTable;

        Vue.waitTicks(3)
            .then(done);
    });

    it('should have loaded', function () {
        assert(theNovaTable !== null, "theNovaTable is null")
    });

    it('should have data for csv', function () {
        assert.equal("Dan", theNovaTable.csvData[0].Name);
        assert.equal("High", theNovaTable.csvData[0].Quality);
        assert.equal("Dave", theNovaTable.csvData[1].Name);
        assert.equal("Medium", theNovaTable.csvData[1].Quality);
    });

    it('should have csv-download child', function () {
        Vue.waitTicks(9)
            .then(() => {
                assert(csvDownload);
                assert.equal(theNovaTable.csvData, csvDownload.data);
            });
    });
}