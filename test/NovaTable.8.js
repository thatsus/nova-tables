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
                    :sortable="true"
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

    it('should have sortable icons on all columns', function () {
        let el = $(theNovaTable.$el);

        let ths = el.find('th');
        assert.equal(2, ths.length, `Only found ${ths.length} headers`);

        let links = el.find('th div i');
        assert.equal(2, links.length, `Only found ${links.length} possible sort links`);
    });

    it('should have sorted by first column', function () {
        assert.equal('name', filter.sort_field, `sort_field is ${filter.sort_field}`);
    });

    it('should set new sort when the sorters are clicked', function (done) {
        let el = $(theNovaTable.$el);

        let th = el.find('th');
        
        th[1].dispatchEvent(new Event('click'));

        Vue.waitTicks(3)
            .then(() => {
                assert.equal('objectiveQuality', filter.sort_field, `sort_field is ${filter.sort_field}`);
            })
            .then(done, done);
    });

    it('should refresh when the sorters are clicked', function (done) {
        let el = $(theNovaTable.$el);
        let filterRan = 0;

        filter.oldFilter = filter.filter;
        filter.filter = function () {
            filterRan++;
            return this.oldFilter();
        };

        let th = el.find('th');
        th[1].dispatchEvent(new Event('click'));

        Vue.waitTicks(3)
            .then(() => {
                assert.equal(1, filterRan, `filter method ran ${filterRan} times`);
            })
            .then(done, done);
    });
}