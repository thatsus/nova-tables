import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import NovaTable from '../src/NovaTable.vue';
import Vue from 'vue';
import AbstractSource from '../src/abstract-source.js';

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
                    :sortable="sortable"
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
                        fieldB: 'Field B',
                        fieldC: 'Field C',
                    },
                    sortable: ['name', 'fieldB', 'fieldC', 'notExists'],
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

    it('should have sortable icons on only given columns (that exist)', function () {
        let el = $(theNovaTable.$el);

        let ths = el.find('th');
        assert.equal(5, ths.length, `Only found ${ths.length} headers`);

        let links = el.find('th div i');
        assert.equal(3, links.length, `Only found ${links.length} possible sort links`);

        let find = {
            'Name': true,
            'Field B': true,
            'Field C': true,
        };

        links.each((i, link) => {
            let name = $(link).parent().text().trim()
            assert(find[name], `Found unexpected sortable field: ${name}`);
            delete find[name];
        });

        assert.equal(0, Object.keys(find).length, `Some things not found while looking at sortable fields: ${Object.keys(find)}`);
    });

    it('should set new sort when the sorters are clicked', function (done) {
        let el = $(theNovaTable.$el);

        let ths = el.find('th');
        let fieldB = ths[3];

        fieldB.dispatchEvent(new Event('click'));

        Vue.nextTick()
            .then(() => {
                assert.equal('fieldB', source.sort_field, `sort_field is ${source.sort_field}`);
            })
            .then(done, done);
    });

    it('should refresh when the sorters are clicked', function (done) {
        let el = $(theNovaTable.$el);
        let sourceRan = 0;

        source.oldGet = source.get;
        source.get = function () {
            sourceRan++;
            return this.oldGet();
        };

        let ths = el.find('th');
        let fieldB = ths[3];

        fieldB.dispatchEvent(new Event('click'));

        Vue.nextTick()
            .then(() => {
                assert.equal(1, sourceRan, `source method ran ${sourceRan} times`);
            })
            .then(done, done);
    });
}