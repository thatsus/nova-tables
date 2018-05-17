import { shallow } from '@vue/test-utils';
import NovaTable from '../src/NovaTable.vue';
import AbstractSource from '../src/abstract-source.js';
import Cookies from 'js-cookie';

export default function() {

    let source = new AbstractSource();
    source.get = function () {
        return Promise.resolve({
            items: [
                {name: 'Dave', objectiveQuality: 'Medium', fieldA: 2, fieldB: "hat", fieldC: "0.0"},
                {name: 'Dan', objectiveQuality: 'High', fieldA: 2, fieldB: "hat", fieldC: "0.0"},
            ],
            totalCount: 2,
            pageCount: 1,
            page: 1,
        });
    };

    let wrapper = shallow(
        NovaTable,
        {
            propsData: {
                itemSource: source,
                columns: {
                    name: 'Name',
                    objectiveQuality: 'Quality',
                    fieldA: 'Field A',
                },
                endpointParams: {},
                name: 'happy-cow',
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    describe('Saves To Cookie', () => {
        wrapper.vm.activeFields = ['name', 'objectiveQuality'];

        let cookie = Cookies.get('happy-cow');
        let happyCow = JSON.parse(cookie);
        let fields = happyCow.fields;
        
        it('Sets Cookie', () => {
            expect(typeof cookie).toEqual('string');
            expect(typeof happyCow).toEqual('object');
            expect(typeof fields).toEqual('object');
        });

        it('Sets ON Fields', () => {
            expect(fields.on).toBeInstanceOf(Array);
            expect(fields.on.length).toEqual(2);
            expect(fields.on[0]).toEqual('name');
            expect(fields.on[1]).toEqual('objectiveQuality');
        });

        it('Sets OFF Fields', () => {
            expect(fields.off).toBeInstanceOf(Array);
            expect(fields.off.length).toEqual(1);
            expect(fields.off[0]).toEqual('fieldA');
        });
    });

    it('Loads From Cookie', () => {
        Cookies.set('happy-cow', {
            fields: {
                on: ['name'],
                off: ['fieldA'],
            }
        });

        expect(wrapper.vm.activeFields.length).toEqual(2);
        expect(wrapper.vm.activeFields[0]).toEqual('name'); //Explicitly set
        expect(wrapper.vm.activeFields[1]).toEqual('objectiveQuality'); //Implicitly set
    });

}