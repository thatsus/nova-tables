import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import NovaTable from '../src/NovaTable.vue';
import Vue from 'vue';
import AbstractFilter from '../src/abstract-filter.js';

module.exports = function () {

    let vm, theNovaTable;

    beforeEach('setup the Vue instance', function (done) {

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
        let el = $(theNovaTable.$el);
        let a = el.find('a[download="export.csv"]');
        assert(a[0], 'No CSV anchor tag found');
        let href = a[0].href;
        assert(/Dan/.test(href), 'Dan is not in CSV link');
        assert(/Dave/.test(href), 'Dave is not in CSV link');
        assert(/High/.test(href), 'High is not in CSV link');
        assert(/Medium/.test(href), 'Medium is not in CSV link');
    });
}