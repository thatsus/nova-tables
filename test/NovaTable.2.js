import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import NovaTable from '../src/NovaTable.vue';
import Vue from 'vue';
import ServerSideSource from '../src/server-side-source.js';

module.exports = function () {

    let vm, theNovaTable, lastRequest;

    beforeEach('setup the Vue instance', function (done) {

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
                };
            },
        });

        vm.$mount();

        theNovaTable = vm.$refs.theNovaTable;

        Vue.waitTicks(4)
            .then(done);
    });

    it('should have loaded', function () {
        assert(theNovaTable !== null, "theNovaTable is null")
    });

    it('should have a ServerSideSource', function () {
        assert(theNovaTable.source instanceof ServerSideSource);
    });

    it('should have tags and data in alphabetical order by name', function () {
        let el = $(theNovaTable.$el);
        assert.equal(el.length, 1);

        let table = el.find('table');
        assert.equal(table.length, 1);

        let bodyTrs = table.find('tbody').find('tr');
        assert.equal(bodyTrs.length, 2, 'bodyTrs.length === ' + bodyTrs.length + ' ' + bodyTrs.html());
        
        let bodyTds = table.find('tbody').find('td');
        assert.equal(bodyTds[0].innerText.trim(), 'Dan');
        assert.equal(bodyTds[1].innerText.trim(), 'High');
        assert.equal(bodyTds[2].innerText.trim(), 'Dave');
        assert.equal(bodyTds[3].innerText.trim(), 'Medium');
    });

    it('should have asked for order-by name alphabetized', function () {
        assert.equal('name', lastRequest.query.sort_field);
        assert.equal('A', lastRequest.query.sort_direction);
    });
};
