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
                    :adjustable-columns="true"
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

    it('should have the adjust button and checkboxes all checked', function () {
        let el = $(theNovaTable.$el);

        let columnButton = el.find('.fa-columns');
        assert(1, columnButton.length);

        let columnSelectors = el.find('ul.dropdown-menu input[type="checkbox"]');
        assert(2, columnSelectors.length);
        assert(columnSelectors[0].checked, 'checkbox 0 not checked');
        assert(columnSelectors[1].checked, 'checkbox 1 not checked');
    });

    it('should change view when the checkboxes are unclicked/reclicked', function (done) {
        let el = $(theNovaTable.$el);

        let ths = el.find('th');
        assert.equal(2, ths.length, `Before: column count: ${ths.length}`);

        let columnSelectors = el.find('ul.dropdown-menu input[type="checkbox"]');
        columnSelectors[0].checked = false;
        columnSelectors[0].dispatchEvent(new Event('change'));

        Vue.waitTicks(3)
            .then(() => {
                let ths = el.find('th');
                assert.equal(1, ths.length, `After unclick: column count: ${ths.length}`);
                
                columnSelectors[0].checked = true;
                columnSelectors[0].dispatchEvent(new Event('change'));

                return Vue.waitTicks(3);
            })
            .then(() => {
                let ths = el.find('th');
                assert.equal(2, ths.length, `After reclick: column count: ${ths.length}`);
            })
            .then(done, done);
    });
}
