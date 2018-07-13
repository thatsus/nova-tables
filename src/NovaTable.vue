
<template>
    <div class="nova-table clearfix">

        <div class="text-center">
            <slot name="top-center-bar"></slot>
        </div>

        <div class="toggle-columns form-group pull-left">
            <div class="form-inline">

                <div class="form-group pull-left">
                    <input v-if="searchable" v-model="search" placeholder="Search" class="form-control">
                </div>

                <div class="form-group absolute pull-left margin-left">
                    <button class="btn btn-default btn-spacing" type="button" data-toggle="dropdown" aria-expanded="false" v-if="adjustableColumns">
                        <i class="fa fa-columns"></i>
                    </button>

                    <ul v-if="adjustableColumns" class="dropdown-menu dropdown-menu--toggle-col">
                        <li v-for="(name, field) in columns">
                            <a @click.stop>
                                <label>
                                    <input type="checkbox" :value="field" v-model="activeFields"> {{ name }}
                                </label>
                            </a>
                        </li>
                        <li v-if="savingToCookies">
                            <a @click="resetActiveFields" class="btn">
                                Reset to Default
                            </a>
                        </li>
                    </ul>
                    <i class="fa fa-exclamation-circle" title="There was a problem with your last request." v-if="showError"></i>
                </div>

                <div class="form-group absolute pull-left margin-left">
                    <slot name="top-left-bar"></slot>
                </div>

            </div>
        </div>

        <div class="pull-right">
            <slot name="top-right-bar"></slot>
            <csv-download
                    v-if="csvExportable"
                    :fields="csvColumns"
                    :data="csvData"
            >
                <button class="btn btn-default btn-spacing" type="button" >
                    <i class="fa fa-file-excel-o" aria-hidden="true"></i> CSV
                </button>
            </csv-download>
        </div>
        <!-- loading indicator -->
        <div v-if="loading">
            <div class="row">
                <div class="col-xs-12 text-center">
                    <div class="well table-loader">
                        <i class="fa fa-circle-o-notch fa-4x fa-spin"></i>
                        <br>
                        Loading...
                    </div>
                </div>
            </div>
        </div>
        <div class="nova-table-container">
            <table :class="getTableClass(items)"
                   width="100%">
                <thead>
                    <tr class='sorting-header-gray'>
                        <th v-for="(name, field) in activeColumns" :style="{ cursor: isSortable(field) ? 'pointer' : 'default' }" :class="{ sortable: isSortable(field) }" @click="isSortable(field) ? setSort(field) : null">
                            <div>
                                <i v-if="isSortable(field)" class="fa" :class="sortClass(field)" aria-hidden="true"></i>
                                <span>{{ name }}</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <transition-group tag="tbody" class="tableBody" name="nova-rows">
                    <tr v-for="item in pagedItems" :key="keyFor(item)" :class="getRowClass(item)">
                        <td v-for="(name, field) in activeColumns" :class="'td-' + field + '-styles'" :ref="'cell.' + keyFor(item) + '.' + field">
                            <slot :name="field" :item="item">
                                {{ valueFor(item, field) }}
                            </slot>
                        </td>
                    </tr>
                    <tr v-if="pagedItems.length === 0" key="no-items">
                        <td :colspan="activeFields.length || 1"> No matching items.</td>
                    </tr>
                </transition-group>
                <tfoot v-if="footer">
                    <tr class="sorting-header-gray">
                        <td v-for="(name, field) in activeColumns">
                            <slot :name="field + '-footer'" :items="pagedItems" :response="response">
                            </slot>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="pull-left inline">
            <div class="dropup" v-if="pageLengthSelection">
                <template v-if="pageLengthOptions">
                    Show
                    <button class="btn btn-default dropdown-toggle" type="button" id="page-length-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        {{ pageLengthSelection }}
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="page-length-dropdown">
                        <li v-for="option in pageLengthOptions"><a href="javascript:void(0);" @click="pageLengthSelection = option">{{ option }}</a></li>
                    </ul>
                    entries |
                </template>
                <span>
                    {{ pageDescriptor }}
                </span>
            </div>
            <slot name="bottom-left-bar"></slot>
        </div>
        <div class="pull-right">
            <slot name="bottom-right-bar"></slot>

            <nova-page-select 
                v-if="pageLengthSelection && pageCount > 1" 
                v-model="page" 
                :page-count="pageCount"
            >
            </nova-page-select>

        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import AbstractSource from './abstract-source.js';
import ArraySource from './array-source.js';
import Cookies from 'js-cookie';
import CsvDownload from 'vue-csv-downloader';
import NovaPageSelect from './NovaPageSelect.vue';
import QueryParamSaver from './query-param-saver.js';
import ServerSideSource from './server-side-source.js';

export default {
    /* Expose Libraries */
    AbstractSource,
    ArraySource,
    NovaPageSelect,
    ServerSideSource,

    /* Regular Stuff */
    components: {
        CsvDownload,
        NovaPageSelect,
    },
    props: {
        items:                null,
        endpoint:             null,
        endpointParams:       null,
        columns:              null,
        searchable:           null,
        adjustableColumns:    null,
        sortable:             null,
        defaultSortField:     null,
        csvExportable:        null,
        defaultActiveFields:  null,
        itemSource:           null,
        pageLength:           null,
        pageLengthOptions:    null,
        footer:               null,
        defaultSortOrders:    null,
        name:                 null,
        keyField:             null,
        tableClass:           null,
        rowClass:             null,
    },
    data() {
        return {
            activeFields: [],
            sortField: '',
            sortOrder: 'A',
            search: '',
            source: new ArraySource([]),
            pagedItems: [],
            response: null,
            totalCount: 0,
            pageCount: 1,
            page: 1,
            pageLengthSelection: null,
            loading: false,
            showError: false,
            blockRefresh: true,
            initialQueryParams: {},
            generatedItemKeys: {},
            csvData: [],
            queryParamSaver: this.name ? new QueryParamSaver(this.name) : null,
        };
    },
    mounted() {
        this.$nextTick(() => {
            if (this.itemSource) {
                this.source = this.itemSource;
            } else if (this.items) {
                this.source = new ArraySource(this.items);
            } else if (this.endpoint) {
                this.source = new ServerSideSource(this.endpoint, this.$http);
                this.source.addParamMerger((params) => {
                    if (this.endpointParams) {
                        _.merge(params, this.endpointParams);
                    }
                });
            } else {
                throw new Error('No item-source specified');
            }
            this.pageLengthSelection = this.pageLength;
            this.source.setPage(this.page, this.pageLengthSelection);
            this.source.onChange(() => this.refreshSource());

            if (this.getCookies('fields')) {
                this.activeFields = this.getActiveFieldsFromCookies();
            } else {
                this.activeFields = this.defaultActiveFields || Object.keys(this.columns);
            }

            if (this.defaultSortField) {
                this.sortField = this.defaultSortField;
            } else {
                this.sortField = this.activeFields[0];
            }
            if (this.defaultSortOrders && this.defaultSortOrders[this.sortField]) {
                this.sortOrder = this.defaultSortOrders[this.sortField];
            }

            this.initialQueryParams = this.queryParamsToSave;

            this.applyQueryParams();

            this.$nextTick(() => {
                this.blockRefresh = false;
                this.refreshSource();
            });
        });
    },
    watch: {
        search() {
            this.source.setSearch(this.search, this.activeFields);
        },
        activeFields() {
            this.storeActiveFieldsToCookies();
            this.source.setSearch(this.search, this.activeFields);
        },
        sortField() {
            this.source.setSort(this.sortField, this.sortOrder)
        },
        sortOrder() {
            this.source.setSort(this.sortField, this.sortOrder)
        },
        page() {
            if (this.pageLengthSelection == 'All') {
                this.source.setPage(null, null);
            } else {
                this.source.setPage(this.page, this.pageLengthSelection);
            }
        },
        pageLengthSelection() {
            if (this.pageLengthSelection == 'All') {
                this.source.setPage(null, null);
            } else {
                this.source.setPage(this.page, this.pageLengthSelection);
            }
        },
        endpointParams() {
            this.source.fireChangeEvent();
        },
        queryParamsToSave() {
            if (this.queryParamSaver) {
                this.queryParamSaver.set(this.queryParamsToSave);
            }
        },
    },
    computed: {
        pageDescriptor() {
            if (this.pageLengthSelection == 'All') {
                return 'Showing ' + this.totalCount + ' entries';
            }
            var start = ((this.page - 1) * this.pageLengthSelection) + 1;
            var end = start + this.pageLengthSelection - 1;
            if (start < 0) {
                start = 1;
            }
            if (end < start) {
                end = start;
            }
            if (end > this.totalCount) {
                end = this.totalCount;
            }
            if (this.totalCount === 0) {
                return '0 entries';
            } else {
                return 'Showing ' + start + (start === end ? '' : ' to ' + end) + ' of ' + this.totalCount + ' entries';
            }
        },
        activeColumns() {
            var columns = {};
            Object.keys(this.columns).map(field => {
                if (_.includes(this.activeFields, field)) {
                    columns[field] = this.columns[field];
                }
            });
            return columns;
        },
        csvColumns() {
            return _.values(this.activeColumns);
        },
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
        queryParamsToSave() {
            var params = {
                sort_field: this.sortField,
                sort_order: this.sortOrder,
                search: this.search,
                page: this.page,
                page_length: this.pageLengthSelection,
            }
            if (this.endpointParams) {
                _.merge(params, this.endpointParams);
            }
            // Now that we have all the params, let's check if any of them
            // would be set to those values by default. If so, we can keep
            // the URL small by taking them out entirely.
            for (var field in params) {
                if (params[field] == this.initialQueryParams[field]) {
                    delete params[field];
                }
            }
            return params;
        },
        savingToCookies() {
            return Boolean(this.name);
        },
    },
    methods: {
        getRowClass(item) {
            if (!this.rowClass) {
                return '';
            }
            if (typeof this.rowClass === 'string') {
                return this.rowClass;
            } else if (typeof this.rowClass === 'function') {
                return this.rowClass(item);
            } else {
                return '';   
            }                     
        },
        getTableClass(items) {
            if (!this.tableClass) {
                return 'display table table-bordered table-condensed fb-table table-striped responsive';
            }
            if (typeof this.tableClass === 'string') {
                return this.tableClass;
            } else if (typeof this.tableClass === 'function') {
                return this.tableClass(items);
            } else {
                return '';   
            }                     
        },
        refreshSource() {
            if (this.blockRefresh) {
                return;
            }

            //show loading indicator
            this.loading = true;
            this.showError = false;

            this.source
                .get()
                .then((response) => {
                    this.response = response;
                    this.pagedItems = response.items;
                    this.pageCount = response.pageCount;
                
                    let page = response.page >= 1 ? response.page : 1;
                
                    if (this.page != page) {
                        this.page = page;
                    }
                
                    this.totalCount = response.totalCount;
                    this.generatedItemKeys = {};    
                    this.$emit('data-loaded', this.response);
                    //stop loading indicator
                    this.loading = false;
                })
                .catch(err => {
                    var msg = err && err.data && err.data.message ? err.data.message : '';

                    //stop loading indicator
                    this.loading = false;

                    if (err == 'Error: Request overridden by newer request.') {
                        this.showError = false;
                    } else {
                        //show error icon
                        this.showError = true;

                        console && console.log && console.log('Error when accessing paged data:', msg, err);
                    }
                })
                .then(() => {
                    if (this.csvExportable) {
                        this.$nextTick(() => this.generateCsvData());
                    }
                });
        },
        fieldName(columnName) {
            return this.columns[columnName];
        },
        isSortable(field)
        {
            if (this.sortable instanceof Array) {
                return _.includes(this.sortable, field);
            } else if (this.sortable) {
                return true;
            } else {
                return false;
            }
        },
        setSort(field) {
            if (this.sortField === field) {
                this.sortOrder = this.sortOrder === 'D' ? 'A' : 'D';
                return;
            } else if (this.defaultSortOrders && this.defaultSortOrders[field]) {
                this.sortOrder = this.defaultSortOrders[field];
            } else {
                this.sortOrder = 'A';
            }

            this.sortField = field;
        },
        sortClass(field) {
            if (field === this.sortField) {
                return this.sortOrder === 'D' ? 'fa-sort-amount-desc active-sort pull-right' : 'fa-sort-amount-asc active-sort pull-right';
            }
            return 'fa-arrows-v text-muted pull-right';
        },
        /**
         * Return item.field or, if field is a dot-delimited field,
         * follow the chain of references to the last value.
         */
        valueFor(item, field) {
            var obj = item;
            var chain = field.split(/\./);
            while (obj && chain.length > 0) {
                obj = obj[chain.shift()];
            }
            if (chain.length > 0) {
                return undefined;
            } else {
                return obj;
            }
        },
        getCookies(field) {
            if (!this.name || !field || Cookies.get(this.name) === undefined) {
                return null;
            }

            return JSON.parse(Cookies.get(this.name))[field];
        },
        setCookies(field, value) {
            if (!this.name || !field) {
                return false;
            }

            var cookie = Cookies.get(this.name);

            if (cookie) {
                cookie = JSON.parse(cookie);
            } else {
                cookie = {};
            }

            cookie[field] = value;
            if (Cookies.set(this.name, cookie)) {
                return true;
            }

            return false;
        },
        applyQueryParams() {
            if (this.queryParamSaver) {
                var params = this.queryParamSaver.get();
                if (params) {
                    if (typeof params.sort_field != 'undefined') {
                        this.sortField = params.sort_field;
                    }
                    if (typeof params.sort_order != 'undefined') {
                        this.sortOrder = params.sort_order;
                    }
                    if (typeof params.search != 'undefined') {
                        this.search = params.search
                    }
                    if (typeof params.page != 'undefined') {
                        this.page = params.page;
                    }
                    if (typeof params.page_length != 'undefined') {
                        this.pageLengthSelection = params.page_length;
                    }
                    this.$emit('load-endpoint-params', params);
                }
            }
        },
        keyFor(item) {
            if (this.keyField) {
                return item[this.keyField];
            }
            if (item.id) {
                return item.id;
            }
            return this.generateKeyFor(item);
        },
        generateKeyFor(item) {
            var found = null;
            _.each(this.generatedItemKeys, (saved_item, key) => {
                if (item === saved_item) {
                    found = key;
                }
            });
            if (!found) {
                // make a random key
                found = new Date().valueOf() + '_' + new String(Math.random()).substr(2);
                this.generatedItemKeys[found] = item;
            }
            return found;
        },
        generateCsvData() {
            // This method depends on this.$refs, so it cannot be a computed property
            this.csvData = this.pagedItems.map((item) => {
                var id = this.keyFor(item);
                var textItem = {};
                _.each(this.activeFields, (field) => {
                    if (this.$refs['cell.' + id + '.' + field] && this.$refs['cell.' + id + '.' + field][0]) {
                        textItem[this.columns[field]] = this.$refs['cell.' + id + '.' + field][0].textContent.trim();
                    } else {
                        textItem[this.columns[field]] = null;    
                    }
                });
                return textItem;
            });
        },
        resetActiveFields() {
            this.activeFields = this.defaultActiveFields || Object.keys(this.columns);
        },
        storeActiveFieldsToCookies() {
            var fields = {
                on: [],
                off: [],
            };
            for (var field in this.columns) {
                if (_.includes(this.activeFields, field)) {
                    fields.on.push(field);
                } else {
                    fields.off.push(field);
                }
            }

            this.setCookies('fields', fields);
        },
        getActiveFieldsFromCookies() {
            var fields = this.getCookies('fields');
            var defaultOn = this.defaultActiveFields || Object.keys(this.columns);
            return Object.keys(this.columns).filter(field => {
                var fieldIsSelected = _.includes(fields.on, field);
                var fieldIsDeselected = _.includes(fields.off, field);
                var fieldDefaultsToOn = _.includes(defaultOn, field);
                return fieldIsSelected || (fieldDefaultsToOn && !fieldIsDeselected);
            });
        },
    },
}
</script>

<style>
    .nova-table div.form-group.pull-left.margin-left {
        margin-left: .5em;
    }

    .table-loader{
        opacity: .6;
        position: absolute;
        width: 100%;
        height: 920px;
        padding-top: 100px;
        z-index: 1;
    }

    .pagination{
        margin: 0 0 20px 0;
    }

    td.td-scheduled_or_posted_at-styles {
        width: 115px;
    }

    .sortable {
        white-space: nowrap;
    }

    .sortable i {
        margin-top: 3px;
    }
</style>
