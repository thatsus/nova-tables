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

    it('should have the references to rows', function () {
        assert(theNovaTable.$refs['cell.Dan.name']);
        assert(theNovaTable.$refs['cell.Dave.name']);
    });
}