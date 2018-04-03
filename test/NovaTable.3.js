import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import NovaTable from '../src/NovaTable.vue';
import Vue from 'vue';

module.exports = function () {

    let vm, theNovaTable, source;

    beforeEach('setup the Vue instance', function (done) {

        // Our own special source just for tracking what methods get 
        // called by NovaTable
        source = {
            calls: {
                setPage: [],
                setSort: [],
                onChange: [],
                setSearch: [],
                get: [],
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
            get() {
                this.calls.get.push(arguments);
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
                    :item-source="source"
                    :columns="columns"
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

    it('should have source set to the object we gave', function () {
        assert.equal(source, theNovaTable.source, 'Has different source');
    });

    it('should have called the methods we expected', function () {
        // setPage is called twice, once explicitly and once when we set 
        // the value of pageLengthSelection
        assert.equal(2, source.calls.setPage.length, `setPage called ${source.calls.setPage.length} times`);
        assert.equal(1, source.calls.setPage[0][0], `setPage page was set to ${source.calls.setPage[0][0]}`);
        assert.equal(null, source.calls.setPage[0][1], `setPage pageLength was set to ${source.calls.setPage[0][1]}`);

        // setSearch is called once when activeColumns is set
        assert.equal(1, source.calls.setSearch.length, `setSearch called ${source.calls.setSearch.length} times`);
        assert.equal('', source.calls.setSearch[0][0], `setSearch search was set to ${source.calls.setSearch[0][0]}`);
        assert.equal('name-objectiveQuality', source.calls.setSearch[0][1].slice().sort().join('-'), `setSearch search was set to ${source.calls.setSearch[0][1]}`);

        // setSort is called once, when softField is set
        // sortOrder doesn't get set in this test, and so it doesn't imply
        // a call to setSort
        assert.equal(1, source.calls.setSort.length, `setSort called ${source.calls.setSort.length} times`);
        assert.equal('name', source.calls.setSort[0][0], `setSort sort was set to ${source.calls.setSort[0][0]}`);
        assert.equal('A', source.calls.setSort[0][1], `setSort sortOrder was set to ${source.calls.setSort[0][1]}`);

        assert.equal(1, source.calls.onChange.length, `onChange called ${source.calls.onChange.length} times`);
        assert(source.calls.onChange[0][0] instanceof Function, `onChange closure was not a Function`);
    });

    it('should change the page when the itemSource gets', function (done) {
        let el = $(theNovaTable.$el);
        assert(el.text().match(/Dan/), 'Before change: No Dan found');
        assert(el.text().match(/High/), 'Before change: No High found');
        assert(el.text().match(/Dave/), 'Before change: No Dave found');
        assert(el.text().match(/Medium/), 'Before change: No Medium found');
        assert(el.text().match(/Dan[\s]*High[\s]*Dave[\s]*Medium/), 'Before change: Values not found in expected order: ' + el.text());

        source.get = function () {
            return Promise.resolve({
                items: [
                    {name: 'Dave', objectiveQuality: 'Medium'},
                ],
                totalCount: 1,
                pageCount: 1,
                page: 1,
            });
        };
        theNovaTable.refreshSource();
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