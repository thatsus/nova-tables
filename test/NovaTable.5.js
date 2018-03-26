import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import NovaTable from '../src/NovaTable.vue';
import Vue from 'vue';

module.exports = function () {

    let vm, theNovaTable;

    beforeEach('setup the Vue instance', function (done) {

        vm = new Vue({
            template: `
                <nova-table ref="theNovaTable"
                    :items="items"
                    :columns="columns"
                    :footer="true"
                >
                    <template slot="name-footer" slot-scope="props">
                        Names: {{ props.items.length }}
                    </template>
                </nova-table>
            `,
            components: {
                'nova-table': NovaTable,
            },
            data() {
                return {
                    items: [
                        {name: 'Dan', objectiveQuality: 'High'},
                        {name: 'Dave', objectiveQuality: 'Medium'},
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

        Vue.waitTicks(3)
            .then(done);
    });

    it('should have loaded', function () {
        assert(theNovaTable !== null, "theNovaTable is null")
    });

    it('should show the footer', function () {
        assert.equal(1, $(theNovaTable.$el).find('tfoot').length, 'No footer?');
    });

    it('should have the footer slot', function () {
        assert($(theNovaTable.$el).text().match(/Names: 2/), 'Footer text is wrong: ' + $(theNovaTable.$el).text());
    });
}