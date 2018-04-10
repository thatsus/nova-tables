import $ from 'jquery';
import _ from 'lodash';
import ArraySource from '../src/array-source.js';
import assert from 'assert';
import NovaTable from '../src/NovaTable.vue';
import Vue from 'vue';

export default function() {

    let vm, theNovaTable;

    beforeEach('setup the Vue instance', function (done) {

        vm = new Vue({
            template: `
                <nova-table ref="theNovaTable"
                    :items="items"
                    :columns="columns"
                >
                </nova-table>
            `,
            components: {
                'nova-table': NovaTable,
            },
            data() {
                return {
                    items: [
                        {name: 'Dave', objectiveQuality: 'Medium'},
                        {name: 'Dan', objectiveQuality: 'High'},
                    ],
                    columns: {
                        name: 'Name',
                        objectiveQuality: 'Quality',
                    },
                };
            },
        });

        vm.$mount();

        theNovaTable = vm.$refs.theNovaTable;

        Vue.waitTicks(3).then(done);
    });

    it('should have loaded', function () {
        assert(theNovaTable !== null, "theNovaTable is null")
    });

    it('should have tags and data in alphabetical order by name', function (done) {
        Vue.nextTick()
            .then(() => {
                let el = $(theNovaTable.$el);
                assert.equal(el.length, 1);

                let table = el.find('table');
                assert.equal(table.length, 1);

                let bodyTrs = table.find('tbody').find('tr');
                assert.equal(bodyTrs.length, 2, 'bodyTrs.length === ' + bodyTrs.length);
                
                let bodyTds = table.find('tbody').find('td');
                assert.equal(bodyTds[0].innerText.trim(), 'Dan');
                assert.equal(bodyTds[1].innerText.trim(), 'High');
                assert.equal(bodyTds[2].innerText.trim(), 'Dave');
                assert.equal(bodyTds[3].innerText.trim(), 'Medium');
            })
            .then(done, done);
    });

    it('should have columns in the right order', function () {
        let el = $(theNovaTable.$el);
        assert.equal(el.length, 1);

        let headThs = el.find('th');
        assert.equal(headThs.length, 2);
        assert.equal(headThs[0].innerText.trim(), 'Name');
        assert.equal(headThs[1].innerText.trim(), 'Quality');
    });

    it('should have an ArraySource', function () {
        assert(theNovaTable.source instanceof ArraySource);
    });

    it('should not have other features', function () {
        let el = $(theNovaTable.$el);
        assert.equal(el.length, 1);

        // no buttons please
        assert.equal(el.find('button').length, 0, 'has buttons: ' + el.find('button'));

        // no dropdown lists please
        assert.equal(el.find('ul').length, 0, 'has uls: ' + el.find('ul'));

        // no search or other inputs please
        assert.equal(el.find('input').length, 0, 'has inputs: ' + el.find('input'));
    });
};
