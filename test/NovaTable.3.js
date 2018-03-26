import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import NovaTable from '../src/NovaTable.vue';
import Vue from 'vue';

module.exports = function () {

    let vm, theNovaTable, filter;

    beforeEach('setup the Vue instance', function (done) {

        // Our own special filter just for tracking what methods get 
        // called by NovaTable
        filter = {
            calls: {
                setPage: [],
                setSort: [],
                onChange: [],
                setSearch: [],
                filter: [],
            },
            setSearch() {
                this.calls.setSearch.push(arguments);
            },
            setPage() {
                this.calls.setPage.push(arguments);
            },
            setSort() {
                this.calls.setSort.push(arguments);
            },
            onChange() {
                this.calls.onChange.push(arguments);
            },
            filter() {
                this.calls.filter.push(arguments);
                return Promise.resolve({
                    items: [
                        {name: 'Dan', objectiveQuality: 'High'},
                        {name: 'Dave', objectiveQuality: 'Medium'},
                    ],
                    totalCount: 2,
                    pageCount: 1,
                    page: 1,
                });
            },
        };

        vm = new Vue({
            template: `
                <nova-table ref="theNovaTable"
                    :item-filter="filter"
                    :columns="columns"
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

    it('should have filter set to the object we gave', function () {
        assert.equal(filter, theNovaTable.filter, 'Has different filter');
    });

    it('should have called the methods we expected', function () {
        // setPage is called twice, once explicitly and once when we set 
        // the value of pageLengthSelection
        assert.equal(2, filter.calls.setPage.length, `setPage called ${filter.calls.setPage.length} times`);
        assert.equal(1, filter.calls.setPage[0][0], `setPage page was set to ${filter.calls.setPage[0][0]}`);
        assert.equal(null, filter.calls.setPage[0][1], `setPage pageLength was set to ${filter.calls.setPage[0][1]}`);

        // setSearch is called once when activeColumns is set
        assert.equal(1, filter.calls.setSearch.length, `setSearch called ${filter.calls.setSearch.length} times`);
        assert.equal('', filter.calls.setSearch[0][0], `setSearch search was set to ${filter.calls.setSearch[0][0]}`);
        assert.equal('name-objectiveQuality', filter.calls.setSearch[0][1].slice().sort().join('-'), `setSearch search was set to ${filter.calls.setSearch[0][1]}`);

        // setSort is called once, when softField is set
        // sortOrder doesn't get set in this test, and so it doesn't imply
        // a call to setSort
        assert.equal(1, filter.calls.setSort.length, `setSort called ${filter.calls.setSort.length} times`);
        assert.equal('name', filter.calls.setSort[0][0], `setSort sort was set to ${filter.calls.setSort[0][0]}`);
        assert.equal('A', filter.calls.setSort[0][1], `setSort sortOrder was set to ${filter.calls.setSort[0][1]}`);

        assert.equal(1, filter.calls.onChange.length, `onChange called ${filter.calls.onChange.length} times`);
        assert(filter.calls.onChange[0][0] instanceof Function, `onChange closure was not a Function`);
    });

    it('should change the page when the itemFilter filters', function (done) {
        let el = $(theNovaTable.$el);
        assert(el.text().match(/Dan/), 'Before change: No Dan found');
        assert(el.text().match(/High/), 'Before change: No High found');
        assert(el.text().match(/Dave/), 'Before change: No Dave found');
        assert(el.text().match(/Medium/), 'Before change: No Medium found');
        assert(el.text().match(/Dan[\s]*High[\s]*Dave[\s]*Medium/), 'Before change: Values not found in expected order: ' + el.text());

        filter.filter = function () {
            return Promise.resolve({
                items: [
                    {name: 'Dave', objectiveQuality: 'Medium'},
                ],
                totalCount: 1,
                pageCount: 1,
                page: 1,
            });
        };
        theNovaTable.refreshFilter();
        Vue.waitTicks(3)
            .then(() => {
                assert(!el.text().match(/Dan/), 'After change: Dan found');
                assert(!el.text().match(/High/), 'After change: High found');
                assert(el.text().match(/Dave/), 'After change: No Dan found');
                assert(el.text().match(/Medium/), 'After change: No Medium found');
                assert(el.text().match(/Dave[\s]*Medium/), 'After change: Values not found in expected order');
            })
            .then(done, done);
    });
}