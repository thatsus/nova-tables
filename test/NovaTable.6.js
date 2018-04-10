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
                    :searchable="true"
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

    it('should have the search field', function () {
        let el = $(theNovaTable.$el);

        let searchbox = el.find('input[placeholder="Search"]');
        assert(1, searchbox.length);
    });

    it('should search', function (done) {
        let el = $(theNovaTable.$el);
        let searchbox = el.find('input[placeholder="Search"]');

        searchbox.val('Dave');
        searchbox[0].dispatchEvent(new Event('input'));

        Vue.waitTicks(3)
            .then(() => {
                assert.equal('Dave', source.search, 'search did not make it to the source');
            })
            .then(done, done);
    });

    it('should unsearch', function (done) {
        let el = $(theNovaTable.$el);
        let searchbox = el.find('input[placeholder="Search"]');

        searchbox.val('');
        searchbox[0].dispatchEvent(new Event('input'));

        Vue.waitTicks(3)
            .then(() => {
                assert.equal('', source.search, 'search did not make it to the source');
            })
            .then(done, done);
    });
}
