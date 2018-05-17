import { shallow } from '@vue/test-utils';
import NovaTable from '../src/NovaTable.vue';
import ArraySource from '../src/array-source.js';

export default function() {
    let wrapper = shallow(
        NovaTable,
        {
            propsData: {
                 items: [
                    {name: 'Dave', objectiveQuality: 'Medium'},
                    {name: 'Dan', objectiveQuality: 'High'},
                ],
                columns: {
                    name: 'Name',
                    objectiveQuality: 'Quality',
                }
            }
        }
    );

    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    it('Sort By First Column If No Sort Is Defined', () => {
        let tds = wrapper.findAll('td').wrappers;
        expect(tds.length).toEqual(4);
        expect(tds[0].text().trim()).toEqual('Dan');
        expect(tds[1].text().trim()).toEqual('High');
        expect(tds[2].text().trim()).toEqual('Dave');
        expect(tds[3].text().trim()).toEqual('Medium');
    });

    it('Display Columns In The Correct Order', () => {
        let ths = wrapper.findAll('th').wrappers;
        expect(ths.length).toEqual(2);
        expect(ths[0].text().trim()).toEqual('Name');
        expect(ths[1].text().trim()).toEqual('Quality');
    });

    it('Have An ArraySource', () => {
        expect(wrapper.vm.source).toBeInstanceOf(ArraySource);
    });

    describe('Does Not Have Other Functions', () => {
        it('Does Not Contain Buttons', () => {
            expect(wrapper.findAll('button').length).toEqual(0);
        });
        it('Does Not Contain Inputs', () => {
            expect(wrapper.findAll('input').length).toEqual(0);
        });
        it('Does Not Contain ULs', () => {
            expect(wrapper.findAll('ul').length).toEqual(0);
        });
    });
}
