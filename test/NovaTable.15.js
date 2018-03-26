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
                    {name: 'Dave', objectiveQuality: 'Medium', fieldA: 2, fieldB: "hat", fieldC: "0.0"},
                    {name: 'Dan', objectiveQuality: 'High', fieldA: 2, fieldB: "hat", fieldC: "0.0"},
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
                    :default-sort-orders="defaultSortOrders"
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
                        fieldA: 'Field A',
                    },
                    defaultSortOrders: {
                        'name': 'D',
                        'fieldA': 'D',
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

    it('should start in the given order on the default column', function () {
        assert.equal('D', filter.sort_direction);
        assert.equal('name', filter.sort_field);
    });

    it('should use the given order when sort is clicked', function (done) {
        let el = $(theNovaTable.$el);

        let ths = el.find('th');
        let fieldA = ths[2];

        fieldA.dispatchEvent(new Event('click'));

        Vue.nextTick()
            .then(() => {
                assert.equal('fieldA', filter.sort_field, `sort_field is ${filter.sort_field}`);
                assert.equal('D', filter.sort_direction, `sort_direction is ${filter.sort_direction}`);
            })
            .then(done, done);
    });

    it('should not behave differently for unlisted columns', function (done) {
        let el = $(theNovaTable.$el);

        let ths = el.find('th');
        let objectiveQuality = ths[1];

        objectiveQuality.dispatchEvent(new Event('click'));

        Vue.nextTick()
            .then(() => {
                assert.equal('objectiveQuality', filter.sort_field, `sort_field is ${filter.sort_field}`);
                assert.equal('A', filter.sort_direction, `sort_direction is ${filter.sort_direction}`);
            })
            .then(done, done);
    });
}