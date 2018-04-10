import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import NovaTable from '../src/NovaTable.vue';
import Vue from 'vue';
import AbstractSource from '../src/abstract-source.js';

export default function() {

    let vm, theNovaTable, lastRequest;

    beforeEach('setup the Vue instance', function (done) {

        lastRequest = null;

        Vue.httpMocker.setRoutes({
            GET: {
                '/my-endpoint': function (request) {
                    lastRequest = request;
                    return {
                        items: [
                            {name: 'Dan', objectiveQuality: 'High'},
                            {name: 'Dave', objectiveQuality: 'Medium'},
                        ],
                        totalCount: 2,
                        pageCount: 1,
                        page: 1,
                    };
                },
            },
        });

        vm = new Vue({
            template: `
                <nova-table ref="theNovaTable"
                    endpoint="/my-endpoint"
                    :endpoint-params="endpointParams"
                    :columns="columns"
                >
                </nova-table>
            `,
            components: {
                'nova-table': NovaTable,
            },
            data() {
                return {
                    columns: {
                        name: 'Name',
                        objectiveQuality: 'Quality',
                    },
                    endpointParams: {ohai: 1334},
                };
            },
        });

        vm.$mount();

        theNovaTable = vm.$refs.theNovaTable;

        Vue.waitTicks(4)
            .then(done);
    });

    it('should have loaded', function () {
        assert(theNovaTable !== null, "theNovaTable is null");
    });

    it('should pass endpoint params along', function (done) {
        assert(lastRequest);
        assert(lastRequest.query);
        assert.equal(1334, lastRequest.query.ohai);

        lastRequest = null;

        vm.endpointParams = {as: 'heck'};
        Vue.waitTicks(3)
            .then(() => {
                assert(lastRequest);
                assert(lastRequest.query);
                assert.equal('undefined', typeof lastRequest.query.ohai);
                assert.equal('heck', lastRequest.query.as);
            })
            .then(done, done);
    });

    it('should not panic on undefined or null', function (done) {
        vm.endpointParams = null;
        Vue.nextTick()
            .then(() => {
                assert(lastRequest);
                vm.endpointParams = undefined;
                return Vue.nextTick();
            })
            .then(() => {
                assert(lastRequest);
            })
            .then(done, done);
    });
}