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
                    :endpoint-params="endpointParams"
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
                    endpointParams: {},
                };
            },
        });

        vm.$mount();

        theNovaTable = vm.$refs.theNovaTable;

        done();
    });

    it('should have loaded', function () {
        Vue.waitTicks(3)
            .then(() => {
                assert(theNovaTable !== null, "theNovaTable is null")
            });
    });

    it('should save some stuff to the url', function (done) {
        Vue.waitTicks(3)
            .then(() => {
                assert.equal(vm.endpointParams, theNovaTable.endpointParams);

                let caughtData;
                theNovaTable.queryParamSaver = {
                    get() {
                        return {};
                    },
                    set(data) {
                        caughtData = data;
                    }
                };
                vm.endpointParams = {x: 34};

                Vue.waitTicks(6)
                    .then(() => {
                        assert(caughtData, 'no data was caught');
                        assert.equal(34, caughtData.x);
                    })
                    .then(done, done);
            });
    });

    it('should load some stuff from the url', function (done) {

        // mounted uses nextTick, so we can setup this mock before that happens
        theNovaTable.queryParamSaver = {
            get() {
                return {
                    sort_field: 'lmnop',
                };
            },
            set(data) {
            }
        };

        // ... and now we can expect our mock to be used
        Vue.waitTicks(3)
            .then(() => {
                assert.equal('lmnop', theNovaTable.sortField);
            })
            .then(done, done);
    });

    it('should not save default stuff to url', function (done) {
        Vue.nextTick()
            .then(() => {
                theNovaTable.initialQueryParams = {
                    a: 15,
                };

                let caughtData;
                theNovaTable.queryParamSaver = {
                    get() {
                        return {};
                    },
                    set(data) {
                        caughtData = data;
                    }
                };
                vm.endpointParams = {
                    x: 34,
                    a: 15,
                };

                Vue.waitTicks(6)
                    .then(() => {
                        assert(caughtData, 'no data was caught');
                        assert.equal(34, caughtData.x);
                        assert(typeof caughtData.a === 'undefined');
                    })
                    .then(done, done);
            });
    });
}