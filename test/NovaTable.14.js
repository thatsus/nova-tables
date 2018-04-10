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
                    {name: 'Marshal', objectiveQuality: '?'},
                    {name: 'Clint', objectiveQuality: '?'},
                    {name: 'Jesse', objectiveQuality: '?'},
                ],
                totalCount: 10,
                pageCount: 2,
                page: 1,
            });
        };

        vm = new Vue({
            template: `
                <nova-table ref="theNovaTable"
                    :item-source="source"
                    :columns="columns"
                    :adjustable-columns="true"
                    :page-length="5"
                    :page-length-options="[5, 6, 7, 8]"
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

    it('should have a drop down for the various page lengths', function () {
        let el = $(theNovaTable.$el);

        let dropups = el.find('.dropup');

        assert.equal(1, dropups.length, 'dropup not found');

        assert(dropups.text().match(/Show/), 'Does not say Show: ' + dropups.text());

        let buttons = dropups.find('button');

        assert.equal(1, buttons.length, 'Has no button');

        let selectors = dropups.find('ul li a');

        assert.equal(4, selectors.length, `wrong number of selectors: ${selectors.length}`);

        assert.equal(5, $(selectors[0]).text(), '5 not found');
        assert.equal(6, $(selectors[1]).text(), '6 not found');
        assert.equal(7, $(selectors[2]).text(), '7 not found');
        assert.equal(8, $(selectors[3]).text(), '8 not found');
    });

    it('should set the page length on itemSource', function (done) {
        let el = $(theNovaTable.$el);
        let dropups = el.find('.dropup');
        let selectors = dropups.find('ul li a');
        let selector6 = selectors[1];

        assert.equal(6, $(selector6).text(), '6 not found');

        selector6.dispatchEvent(new Event('click'));

        Vue.nextTick()
            .then(() => {
                assert.equal(6, source.page_length, `page_length is wrong: ${source.page_length}`);
            })
            .then(done, done);
    });

    it('should refresh on change', function (done) {
        let sourceRan = 0;

        source.oldGet = source.get;
        source.get = function () {
            sourceRan++;
            return this.oldGet();
        };

        let el = $(theNovaTable.$el);
        let dropups = el.find('.dropup');
        let selectors = dropups.find('ul li a');
        let selector6 = selectors[1];


        assert.equal(6, $(selector6).text(), '6 not found');

        selector6.dispatchEvent(new Event('click'));

        Vue.nextTick()
            .then(() => {
                assert(sourceRan, 'no refresh happened');
            })
            .then(done, done);
    });
}