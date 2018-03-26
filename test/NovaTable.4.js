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
                >
                    <template slot="name" slot-scope="props">
                        {{ props.item.name.toUpperCase() }}
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

    it('should use slot for name', function () {
        let el = $(theNovaTable.$el);

        assert(el.text().match(/DAN/));
        assert(el.text().match(/High/));
        assert(el.text().match(/DAVE/));
        assert(el.text().match(/Medium/));
        assert(el.text().match(/DAN[\s]*High[\s]*DAVE[\s]*Medium/));
    });
}