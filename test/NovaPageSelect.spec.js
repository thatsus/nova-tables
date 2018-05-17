import { shallow } from '@vue/test-utils';
import NovaPageSelect from '../src/NovaPageSelect.vue';

describe('NovaPageSelect', () => {
    let wrapper = shallow(
        NovaPageSelect,
        {
            propsData: {
                pageCount: 100,
                showJumps: false,
                value: 1,
            }
        }
    );
    
    it('Loaded', () => {
        expect(wrapper.isVueInstance()).toBe(true);
        expect(wrapper).toBeDefined();
        expect(wrapper).not.toBeNull();
    });

    describe('Change Pages When Prev/Next Buttons Clicked', () => {
        describe('Next', () => {
            it('Event Emitted', () => {
                let next = wrapper.find('li[name="nextPage"]').find('a');
                expect(next).toBeDefined();
                next.trigger('click');
                expect(wrapper.emitted('input')[0]).toEqual([2]);
            });

            it('Handle Prop Change', () => {
                wrapper.setProps({
                    value: 2
                });
                expect(wrapper.vm.page).toEqual(2);
            })
        });

        describe('Previous', () => {
            it('Event Emitted', () => {
                let prev = wrapper.find('li[name="previousPage"]').find('a');
                expect(prev).toBeDefined();
                prev.trigger('click');
                expect(wrapper.emitted('input')[1]).toEqual([1]);
            });

            it('Handle Prop Change', () => {
                wrapper.setProps({
                    value: 1
                });
                expect(wrapper.vm.page).toEqual(1);
            })
        });
    });
});
