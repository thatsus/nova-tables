import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import NovaTable from '../src/NovaTable.vue';
import Vue from 'vue';
import ServerSideSource from '../src/server-side-source.js';

module.exports = function () {

    let vm, theNovaTable, lastRequest, responseData;

    beforeEach('setup the Vue instance', function (done) {

        responseData = {
                        items: [
                            {name: 'Dan', objectiveQuality: 'High'},
                            {name: 'Dave', objectiveQuality: 'Medium'},
                        ],
                        totalCount: 2,
                        pageCount: 1,
                        page: 1,
                    };

        Vue.httpMocker.setRoutes({
            GET: {
                '/my-endpoint': (request) => {
                    lastRequest = request;
                    return responseData;
                },
            },
        });

        vm = new Vue({
            template: `
                <nova-table ref="theNovaTable"
                    endpoint="/my-endpoint"
                    :columns="columns"
                    @data-loaded="dataLoaded"
                >
                </nova-table>
            `,
            components: {
                'nova-table': NovaTable,
            },
            data() {
                return {
                    data: null,
                    columns: {
                        name: 'Name',
                        objectiveQuality: 'Quality',
                    },
                };
            },
            methods: {
                dataLoaded(eventData) {
                    this.data = eventData;
                }
            }
        });

        vm.$mount();

        theNovaTable = vm.$refs.theNovaTable;

        Vue.waitTicks(4)
            .then(done);
    });

    it('should have emitted event data-loaded', function () {
        assert.equal(responseData,vm.data);
    });
};
