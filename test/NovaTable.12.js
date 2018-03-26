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
                    {name: 'Marshal', objectiveQuality: '?'},
                    {name: 'Clint', objectiveQuality: '?'},
                    {name: 'Jesse', objectiveQuality: '?'},
                ],
                totalCount: 10,
                pageCount: 2,
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

    it('should show the indexes of entries', function () {
        assert(theNovaTable.pageLengthSelection, 'pageLengthSelection is falsy');
        assert(theNovaTable.pageCount > 1, 'pageCount is not greater than 1');
        assert($(theNovaTable.$el).text().match(/Showing 1 to 5 of 10 entries/), `Couldn't find "Showing 1 to 5 of 10 entries" in ${$(theNovaTable.$el).text()}`);
    });

    it('should have page buttons', function () {
        let el = $(theNovaTable.$el);
        let pagination = el.find('ul.pagination');

        assert.equal(1, pagination.length, 'Pagination not found?');
        assert(pagination.text().match(/Previous.*1.*2.*Next/));
    });

    it('should change pages when number page button clicked', function (done) {
        let el = $(theNovaTable.$el);
        let page2 = el.find('ul.pagination li:contains(2) a');

        assert(page2[0], 'Page 2 selector not found');

        page2[0].dispatchEvent(new Event('click'));

        Vue.nextTick()
            .then(() => {
                assert.equal(2, filter.page, 'page not set to 2');
            })
            .then(done, done);
    });

}