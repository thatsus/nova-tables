import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import NovaPageSelect from '../src/NovaPageSelect.vue';
import Vue from 'vue';
import AbstractSource from '../src/abstract-source.js';

describe('NovaPageSelect', function () {

    let vm, theNPS;

    beforeEach('setup the Vue instance', function (done) {

        vm = new Vue({
            template: `
                <nova-page-select ref="theNPS"
                    v-model="page"
                    :page-count="pageCount"
                    :show-jumps="showJumps"
                >
                </nova-page-select>
            `,
            components: {
                NovaPageSelect,
            },
            data() {
                return {
                    page: 1,
                    pageCount: 100,
                    showJumps: false,
                };
            },
        });

        vm.$mount();

        theNPS = vm.$refs.theNPS;

        Vue.waitTicks(3).then(done);
    });

    it('should have loaded', function () {
        assert(theNPS !== null, "theNPS is null")
    });

    it('should change pages when next/prev page buttons clicked', function (done) {
        let el = $(theNPS.$el);

        let next = el.find('li:contains("Next") a');
        assert(next[0], 'Next selector not found');

        next[0].dispatchEvent(new Event('click'));

        Vue.nextTick()
            .then(() => {
                assert.equal(theNPS.page, 2, 'Should go to next page, 2');

                let prev = el.find('li:contains("Previous") a');
                assert(prev[0], 'Previous selector not found');

                prev[0].dispatchEvent(new Event('click'));
                return Vue.nextTick();
            })
            .then(() => {
                assert.equal(theNPS.page, 1, 'Should to to prev page, 1');
            })
            .then(done, done);
    });
});
