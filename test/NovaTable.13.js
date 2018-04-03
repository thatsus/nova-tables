import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import NovaTable from '../src/NovaTable.vue';
import Vue from 'vue';
import AbstractSource from '../src/abstract-source.js';

module.exports = function () {

    let vm, theNovaTable, source;

    beforeEach('setup the Vue instance', function (done) {

        source = new AbstractSource();
        source.get = function () {
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
                    :item-source="source"
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

    it('should request only 5 items', function () {
        assert.equal(5, source.page_length, `page_length is ${source.page_length}`);
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