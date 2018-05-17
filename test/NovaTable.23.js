import { createLocalVue, shallow } from '@vue/test-utils';
import NovaTable from '../src/NovaTable.vue';
import ServerSideSource from '../src/server-side-source.js';
import VueResource from 'vue-resource';
import VueResourceMocker from 'vue-resource-mocker';
import WaitTicks from '../src/wait-ticks.js';

export default function() {
    let localVue, lastRequest, wrapper;

    beforeEach('Setup The Local Vue Instance', (done) => {
        localVue = createLocalVue();
        localVue.use(VueResource);
        localVue.httpMocker = new VueResourceMocker();
        localVue.use(localVue.httpMocker);
        localVue.use(WaitTicks);

        localVue.httpMocker.setRoutes({
            GET: {
                '/my-endpoint': function (request) {
                    lastRequest = request;
                    return {
                        items: [
                            {name: 'Dan', objectiveQuality: 'High'},
                            {name: 'Dave', objectiveQuality: 'Medium'},
                        ],
                        totalCount: 2,
                        pageCount: 1,
                        page: 1,
                    };
                },
            },
        });

        wrapper = shallow(
            NovaTable,
            {
                localVue: localVue,
                propsData: {
                    endpoint: '/my-endpoint',
                    columns: {
                        name: 'Name',
                        objectiveQuality: 'Quality',
                    },
                },
            }
        );

        localVue.waitTicks(4).then(done);
    });

    it('Emits DataLoaded Event', () => {
        expect(wrapper.emitted('data-loaded')).toBeTruthy();
    });
};
