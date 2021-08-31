<template>
    <ul class="pagination pull-right">
        <li v-if="showJumps" :class="classFor('previous')">
            <span v-if="isDisabled('previous')">
                <slot name="pagination-first">
                    <i class="fa fa-angle-double-left"></i>
                </slot>
            </span>
            <a v-else href="javascript:void(0)" @click="setPage('first')">
                <slot name="pagination-first">
                    <i class="fa fa-angle-double-left"></i>
                </slot>
            </a>
        </li>
        <li :class="classFor('previous')" name="previousPage">
            <span v-if="isDisabled('previous')">
                <slot name="pagination-prev">
                    Previous
                </slot>
            </span>
            <a v-else href="javascript:void(0)" @click="setPage('previous')">
                <slot name="pagination-prev">
                    Previous
                </slot>
            </a>
        </li>
        <li v-if="showPages" v-for="p in pages" :class="classFor(p)">
            <a href="javascript:void(0)" @click="setPage(p)">
                {{ p }}
            </a>
        </li>
        <li :class="classFor('next')" name="nextPage">
            <span v-if="isDisabled('next')">
                <slot name="pagination-next">
                    Next
                </slot>
            </span>
            <a v-else href="javascript:void(0)" @click="setPage('next')">
                <slot name="pagination-next">
                    Next
                </slot>
            </a>
        </li>
        <li v-if="showJumps" :class="classFor('next')">
            <span v-if="isDisabled('next')">
                <slot name="pagination-last">
                    <i class="fa fa-angle-double-right"></i>
                </slot>
            </span>
            <a v-else href="javascript:void(0)" @click="setPage('last')">
                <slot name="pagination-last">
                    <i class="fa fa-angle-double-right"></i>
                </slot>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    props: [
        'value',
        'pageCount',
        'showJumps',
        'showPages'
    ],
    data() {
        return {
            page: this.value,
        };
    },
    computed: {
        pages() {
            var start = parseInt(this.page) - 3;
            var end = parseInt(this.page) + 3;
            // if start is too low, shift all of [start,end] up
            if (start < 1) {
                var diff = 1 - start;
                start += diff;
                end += diff;
            }
            // if end is too high, shift all of [start,end] down
            if (end > this.pageCount) {
                var diff = end - this.pageCount;
                start -= diff;
                end -= diff;
            }
            // if start is too low again, just set it to 1
            if (start < 1) {
                start = 1;
            }
            var pages = [];
            for (var i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        },
    },
    watch: {
        value() {
            this.page = parseInt(this.value);
        },
    },
    methods: {
        classFor(page) {
            if (page === 'previous' && this.page == 1) {
                return 'disabled';
            } else if (page === 'next' && this.page == this.pageCount) {
                return 'disabled';
            } else if (page == this.page) {
                return 'active';
            } else {
                return '';
            }
        },
        isDisabled(page) {
            if (page === 'previous' && this.page == 1) {
                return true;
            } else if (page === 'next' && this.page == this.pageCount) {
                return true;
            }

            return false;
        },
        setPage(page) {
            if (page === 'next') {
                page = this.page + 1;
            } else if (page === 'previous') {
                page = this.page - 1;
            } else if (page === 'first') {
                page = 1;
            } else if (page === 'last') {
                page = this.pageCount;
            }
            this.$emit('input', page);
        },
    },
}
</script>
