import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import NovaTable from '../src/NovaTable.vue';
import Vue from 'vue';
import AbstractSource from '../src/abstract-source.js';
import Cookies from 'js-cookie';

export default function() {

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
                    name="happy-cow"
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

    it('should save some stuff to cookies', function (done) {
        Vue.waitTicks(3)
            .then(() => {
                theNovaTable.activeFields = ['name', 'objectiveQuality'];
                return Vue.waitTicks(3);
            })
            .then(() => {
                let cookie = Cookies.get('happy-cow');
                assert(typeof cookie == 'string', 'no happy-cow cookie');
                let happyCow = JSON.parse(cookie);
                assert(typeof happyCow == 'object', 'no happy-cow');
                let fields = happyCow.fields;
                assert(typeof fields == 'object', 'no happy-cow.fields');
                assert(fields.on instanceof Array, 'no happy-cow.fields.on array');
                assert.equal(2, fields.on.length);
                assert.equal('name', fields.on[0]);
                assert.equal('objectiveQuality', fields.on[1]);
                assert(fields.off instanceof Array);
                assert.equal(1, fields.off.length);
                assert.equal('fieldA', fields.off[0]);
            })
            .then(done, done);
    });

    it('should load some stuff from cookies', function (done) {
        Cookies.set('happy-cow', {
            fields: {
                on: ['name'],
                off: ['fieldA'],
            }
        });
        Vue.waitTicks(3)
            .then(() => {
                assert.equal(2, theNovaTable.activeFields.length);
                // name is explicit
                assert.equal('name', theNovaTable.activeFields[0]);
                // objectiveQuality is implicit because it's not deactivated
                assert.equal('objectiveQuality', theNovaTable.activeFields[1]);
            })
            .then(done, done);
    });

}