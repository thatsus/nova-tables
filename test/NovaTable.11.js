import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import NovaTable from '../src/NovaTable.vue';
import Vue from 'vue';
import AbstractFilter from '../src/abstract-filter.js';

module.exports = function () {

    let vm, theNovaTable, filter;

    beforeEach('setup the Vue instance', function (done) {

        filter = new AbstractFilter();
        filter.filter = function () {
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

        vm = new Vue({
            template: `
                <nova-table ref="theNovaTable"
                    :item-filter="filter"
                    :columns="columns"
                    :adjustable-columns="true"
                    :default-active-fields="defaultActiveFields"
                >
                </nova-table>
            `,
            components: {
                'nova-table': NovaTable,
            },
            data() {
                return {
                    filter: filter,
                    columns: {
                        name: 'Name',
                        objectiveQuality: 'Quality',
                    },
                    defaultActiveFields: ['name'],
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

    it('should have the given fields selected', function () {
        let el = $(theNovaTable.$el);

        let columnSelectors = el.find('ul.dropdown-menu input[type="checkbox"]');
        assert(2, columnSelectors.length);
        assert(columnSelectors[0].checked, 'checkbox 0 not checked');
        assert(!columnSelectors[1].checked, 'checkbox 1 checked');
    });
}