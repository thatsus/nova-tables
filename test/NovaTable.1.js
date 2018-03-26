import $ from 'jquery';
import _ from 'lodash';
import ArrayFilter from '../src/array-filter.js';
import assert from 'assert';
import NovaTable from '../src/NovaTable.vue';
import Vue from 'vue';

module.exports = function () {

    let vm, theNovaTable;

    // Do your setup in a beforeEach.
    // We need to setup the Vue instance and get the component instance
    // we want from it.
    // Since NovaTable uses Vue.nextTick in its setup, we need accept a 
    // `done` parameter in our closure. Mocha notices this and gives us
    // a callback we'll have to call at the end.
    beforeEach('setup the Vue instance', function (done) {

        // Lets create a Vue instance that uses the component we want to 
        // test with some props we want to start each test with.
        vm = new Vue({
            // Use backticks to make a multi-line string.
            // Use ref so we can access the instance a couple lines down.
            template: `
                <nova-table ref="theNovaTable"
                    :items="items"
                    :columns="columns"
                >
                </nova-table>
            `,
            // We aren't using app.js, so we have to define our 
            // components here.
            components: {
                'nova-table': NovaTable,
            },
            // Define the data we want to pass in and later manipulate 
            // during our tests.
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

        // The Vue instance must be mounted before anything can happen.
        vm.$mount();

        // Get theNovaTable instance that was created.
        theNovaTable = vm.$refs.theNovaTable;

        // We can see in the component's code that it calls 
        // Vue.nextTick() twice on mounted. We want to wait for that
        // or else the component won't be ready for our test.
        // Vue-resource needs a tick for some reason too.
        Vue.waitTicks(3)
            // Gotta call `done` so mocha knows it can run the tests now.
            .then(done);
    });

    // Each test is in an `it` call.
    // The first param is a sentence fragment.
    it('should have loaded', function () {

        // Make an `assert` call for anything you think should be true.
        // The assert library is pretty feature-light. So you just make 
        // some truthy expression, and give an optional message for if 
        // the assertion fails.
        assert(theNovaTable !== null, "theNovaTable is null")

        // If the assertion fails, we'll see a report with the two 
        // messages from the `describe`s and the message from the `it` 
        // together as a single sentence. The message from the 
        // `assert` will show on the next line:
        /*
        PhantomJS 2.1.1 (Linux 0.0.0) NovaTable barebones with items 
        attribute should have loaded FAILED
            theNovaTable is null
            fail@tests/mocha.js:18334:5
            ok@tests/mocha.js:18348:19
            tests/mocha.js:29887:59
         */
    });

    // We accept a `done` method in our closure so mocha knows to wait 
    // until we call it.
    // We need `done` because the test cannot complete immediately. It 
    // needs to wait for 1 Vue tick to pass while NovaTable sets up.
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
            // We call `done` here whether successful or not.
            // The second parameter will get errors passed to it. 
            // `done` knows that any parameters passed to it are errors.
            .then(done, done);
    });

    // Tests don't have to be so involved. Here's a simple one that 
    // doesn't need a `done` because it can execute all the assertions 
    // right away.
    it('should have columns in the right order', function () {
        let el = $(theNovaTable.$el);
        assert.equal(el.length, 1);

        let headThs = el.find('th');
        assert.equal(headThs.length, 2);
        assert.equal(headThs[0].innerText.trim(), 'Name');
        assert.equal(headThs[1].innerText.trim(), 'Quality');
    });

    it('should have an ArrayFilter', function () {
        assert(theNovaTable.filter instanceof ArrayFilter);
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
