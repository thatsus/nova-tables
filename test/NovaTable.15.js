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
                    :item-source="source"
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
                    source: source,
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
        assert.equal('D', source.sort_direction);
        assert.equal('name', source.sort_field);
    });

    it('should use the given order when sort is clicked', function (done) {
        let el = $(theNovaTable.$el);

        let ths = el.find('th');
        let fieldA = ths[2];

        fieldA.dispatchEvent(new Event('click'));

        Vue.nextTick()
            .then(() => {
                assert.equal('fieldA', source.sort_field, `sort_field is ${source.sort_field}`);
                assert.equal('D', source.sort_direction, `sort_direction is ${source.sort_direction}`);
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
                assert.equal('objectiveQuality', source.sort_field, `sort_field is ${source.sort_field}`);
                assert.equal('A', source.sort_direction, `sort_direction is ${source.sort_direction}`);
            })
            .then(done, done);
    });
}