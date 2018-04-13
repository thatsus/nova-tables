import { createLocalVue, shallow } from '@vue/test-utils';
import NovaTable from '../src/NovaTable.vue';
import ServerSideSource from '../src/server-side-source.js';
import VueResource from 'vue-resource';
import VueResourceMocker from 'vue-resource-mocker';

export default function() {
    const localVue = createLocalVue();
    localVue.use(VueResource);
    localVue.httpMocker = new VueResourceMocker();
    localVue.use(localVue.httpMocker);

    let lastRequest;

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

    let wrapper = shallow(
        NovaTable,
        {
            localVue: localVue,
            propsData: {
                endpoint: '/my-endpoint',
                columns: {
                    name: 'Name',
                    objectiveQuality: 'Quality'
                }
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Have A ServerSideSource', () => {
        expect(wrapper.vm.source).toBeInstanceOf(ServerSideSource);
    });

    it('Display Columns In The Correct Order', () => {
        let ths = wrapper.findAll('th').wrappers;
        expect(ths.length).toEqual(2);
        expect(ths[0].text().trim()).toEqual('Name');
        expect(ths[1].text().trim()).toEqual('Quality');
    });

    it('Request The Correct Order-By', () => {
        expect(lastRequest.query.sort_field).toEqual('name');
        expect(lastRequest.query.sort_direction).toEqual('A');
    });

    it('Get The Correct Data', () => {
        let tds = wrapper.findAll('td').wrappers;
        expect(tds.length).toEqual(4);
        expect(tds[0].text().trim()).toEqual('Dan');
        expect(tds[1].text().trim()).toEqual('High');
        expect(tds[2].text().trim()).toEqual('Dave');
        expect(tds[3].text().trim()).toEqual('Medium');
    });
};
