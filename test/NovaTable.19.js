import { createLocalVue, shallow } from '@vue/test-utils';
import NovaTable from '../src/NovaTable.vue';
import AbstractSource from '../src/abstract-source.js';
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
                    endpointParams: {
                        ohai: 1334
                    },
                }
            }
        );

        localVue.waitTicks(3).then(done);
    });

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Passes Endpoint Params', () => {
        expect(lastRequest).not.toBeNull();
        expect(lastRequest.query).not.toBeNull();
        expect(lastRequest.query.ohai).toEqual('1334');
        
        lastRequest = null;
        wrapper.vm.endpointParams = {as: 'heck'};
        
        expect(lastRequest).not.toBeNull();
        expect(lastRequest.query).not.toBeNull();
        expect(lastRequest.query.ohai).toBeUndefined();
        expect(lastRequest.query.as).toEqual('heck');
    });

    it('Handles Undefined/Null', () => {
        wrapper.vm.endpointParams = null;
        expect(lastRequest).not.toBeNull();
        
        wrapper.vm.endpointParams = undefined;
        expect(lastRequest).not.toBeNull();
    });
}