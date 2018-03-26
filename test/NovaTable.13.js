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
                    :page-length="5"
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

    it('should request only 5 items', function () {
        assert.equal(5, filter.page_length, `page_length is ${filter.page_length}`);
    });

    it('should show "all entries"', function () {
        assert(theNovaTable.pageLengthSelection, 'pageLengthSelection is falsy');
        assert.equal(1, theNovaTable.pageCount, 'pageCount is not 1');
        assert(!$(theNovaTable.$el).text().match(/Showing all/), `Couldn't find "Showing all" in ${$(theNovaTable.$el).text()}`);
    });

    it('should not have page buttons', function () {
        let el = $(theNovaTable.$el);
        let pagination = el.find('ul.pagination');

        assert.equal(0, pagination.length, 'Pagination found!');
    });
}