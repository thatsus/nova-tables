
<template>
    <div class="nova-table clearfix">
        <div class="nova-table-header">
            <div class="toggle-columns form-group pull-left">
                <div class="form-inline">
                    <div class="form-group pull-left">
                        <input v-if="searchable" v-model="search" placeholder="Search" class="form-control">
                    </div>

                    <div class="form-group absolute pull-left margin-left">
                        <button v-if="adjustableColumns" class="btn btn-default btn-spacing" type="button" data-toggle="dropdown" aria-expanded="false">
                            <slot name="columns-icon">
                                <i class="fa fa-columns" />
                            </slot>
                        </button>

                        <ul v-if="adjustableColumns" class="dropdown-menu dropdown-menu--toggle-col">
                            <li v-for="(name, field) in nonExcludedColumns()">
                                <a @click.stop>
                                    <label>
                                        <input v-model="activeFields" type="checkbox" :value="field"> {{ name }}
                                    </label>
                                </a>
                            </li>
                            <li v-if="savingToCookies">
                                <a class="btn" @click="resetActiveFields">
                                    Reset to Default
                                </a>
                            </li>
                        </ul>
                        <i v-if="showError" class="fa fa-exclamation-circle" title="There was a problem with your last request." />
                    </div>

                    <div class="form-group absolute pull-left margin-left">
                        <slot name="top-left-bar" />
                    </div>
                </div>
            </div>

            <div class="pull-right">
                <slot name="top-right-bar" />
                <a v-if="csvExportable" class="btn btn-default btn-spacing" :class="{['btn-sm']: csvBtnSmall}" @click="csvDownload">
                    <slot name="csv-icon">
                        <svg class="icon-center" width="18" height="18" viewBox="4 4 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.5508 9.59005H18.144V7.62745C18.1437 7.61498 18.1425 7.60255 18.1404 7.59025C18.141 7.51141 18.1128 7.43505 18.0612 7.37545L14.796 3.64525L14.7936 3.64285C14.774 3.62173 14.7519 3.60318 14.7276 3.58765L14.706 3.57445C14.6853 3.56292 14.6633 3.55366 14.6406 3.54685L14.6226 3.54085C14.5977 3.53463 14.5721 3.53141 14.5464 3.53125H6.5202C6.1536 3.53125 5.856 3.82945 5.856 4.19545V9.58945H5.4492C4.9248 9.58945 4.5 10.0142 4.5 10.5386V15.4754C4.5 15.9992 4.9254 16.4246 5.4492 16.4246H5.856V19.8038C5.856 20.1698 6.1536 20.468 6.5202 20.468H17.4798C17.8458 20.468 18.144 20.1698 18.144 19.8038V16.4246H18.5508C19.0746 16.4246 19.5 15.9998 19.5 15.4754V10.5386C19.5 10.0148 19.0752 9.59005 18.5508 9.59005ZM6.5202 4.19545H14.214V7.59385C14.214 7.77745 14.3628 7.92565 14.5464 7.92565H17.4804V9.58945H6.5202V4.19545V4.19545ZM11.4894 13.2962C10.683 13.0082 10.1508 12.5618 10.1508 11.8568C10.1508 11.0294 10.8492 10.4036 11.9862 10.4036C12.5406 10.4036 12.936 10.5116 13.224 10.6478L12.9792 11.5256C12.6655 11.3728 12.3208 11.2942 11.9718 11.2958C11.4966 11.2958 11.2662 11.5184 11.2662 11.7632C11.2662 12.0728 11.532 12.209 12.1656 12.4466C13.0224 12.7634 13.4178 13.2092 13.4178 13.8932C13.4178 14.7068 12.7992 15.3974 11.4678 15.3974C10.9134 15.3974 10.3668 15.2462 10.0932 15.095L10.3164 14.1956C10.6932 14.388 11.109 14.4915 11.532 14.498C12.036 14.498 12.3024 14.2886 12.3024 13.9724C12.3024 13.67 12.0726 13.4978 11.4894 13.2962V13.2962ZM5.7738 12.965C5.7738 11.3168 6.954 10.403 8.4216 10.403C8.9904 10.403 9.4218 10.5176 9.6162 10.6118L9.3858 11.4824C9.09435 11.3601 8.78088 11.2988 8.4648 11.3024C7.6014 11.3024 6.9252 11.8274 6.9252 12.9068C6.9252 13.871 7.5006 14.483 8.472 14.483C8.8104 14.483 9.1704 14.4188 9.393 14.3246L9.552 15.188C9.3576 15.281 8.8968 15.3968 8.3142 15.3968C6.6372 15.3974 5.7738 14.3468 5.7738 12.965V12.965ZM17.4798 19.625H6.5202V16.4252H17.4798V19.625V19.625ZM16.593 15.3254H15.312L13.758 10.475H14.9598L15.5496 12.5264C15.7146 13.109 15.8658 13.6562 15.981 14.2604H16.0026C16.1253 13.6839 16.2716 13.1126 16.4412 12.548L17.0604 10.4756H18.2256L16.593 15.3254V15.3254Z" fill="#262933"/>
                        </svg>
                    </slot>
                    CSV
                </a>
            </div>
        </div>
        <!-- loading indicator -->
        <div v-if="loading">
            <div class="row">
                <div class="col-xs-12 text-center">
                    <div class="well table-loader">
                      <slot name="loading-indicator">
                        <i class="fa fa-circle-o-notch fa-4x fa-spin" />
                         <br>
                        Loading...
                      </slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="nova-table-container">
            <table :class="getTableClass(items)"
                   width="100%"
            >
                <thead>
                    <tr class="sorting-header-gray">
                        <th
                            v-for="(name, field) in activeColumns"
                            :style="{ cursor: isSortable(field) ? 'pointer' : 'default' }"
                            :class="{['th-' + field + '-styles']: true, sortable: isSortable(field) }"
                            @click="isSortable(field) ? setSort(field) : null"
                        >
                            <div>
                                <i v-if="isSortable(field)" class="fa" :class="sortClass(field)" aria-hidden="true" />
                                <slot :name="'th-' + field">
                                    <span>{{ name }}</span>
                                </slot>
                            </div>
                        </th>
                    </tr>
                </thead>
                <transition-group tag="tbody" class="tableBody" name="nova-rows">
                    <tr v-for="item in pagedItems" :key="keyFor(item)" :class="getRowClass(item)">
                        <td v-for="(name, field) in activeColumns" :ref="'cell.' + keyFor(item) + '.' + field" :class="'td-' + field + '-styles'">
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
                        <td v-for="(name, field) in activeColumns" :key="field">
                            <slot :name="field + '-footer'" :items="pagedItems" :response="response" />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="nova-table-footer">
            <div class="pull-left inline">
                <div v-if="pageLengthSelection" class="dropup">
                    <template v-if="pageLengthOptions">
                        {{ pageLengthPrefix }}
                        <button id="page-length-dropdown" class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            {{ pageLengthSelection }}
                            <span class="caret" />
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="page-length-dropdown">
                            <li v-for="option in pageLengthOptions"><a href="javascript:void(0);" @click="pageLengthSelection = option">{{ option }}</a></li>
                        </ul>
                        {{ pageLengthSuffix }}
                    </template>
                    <span>
                        {{ pageDescriptor }}
                    </span>
                </div>
                <slot name="bottom-left-bar" />
            </div>
            <div class="pull-right">
                <slot name="bottom-right-bar" />

                <nova-page-select
                    v-if="pageLengthSelection && pageCount > 1"
                    v-model="page"
                    :page-count="pageCount"
                    :show-pages="showPages"
                    :show-jumps="showJumps"
                >
                    <template #pagination-first>
                        <slot name="pagination-first" />
                    </template>
                    <template #pagination-prev>
                        <slot name="pagination-prev" />
                    </template>
                    <template #pagination-next>
                        <slot name="pagination-next" />
                    </template>
                    <template #pagination-last>
                        <slot name="pagination-last" />
                    </template>
                </nova-page-select>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import AbstractSource from './abstract-source.js';
import ArraySource from './array-source.js';
import Cookies from 'js-cookie';
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
        NovaPageSelect,
    },
    props: {
        items:               null,
        endpoint:            null,
        endpointParams:      null,
        columns:             null,
        searchable:          null,
        adjustableColumns:   null,
        sortable:            null,
        defaultSortField:    null,
        csvExportable:       null,
        defaultActiveFields: null,
        alwaysActiveFields:  null,
        itemSource:          null,
        pageLength:          null,
        pageLengthOptions:   null,
        footer:              null,
        defaultSortOrders:   null,
        name:                null,
        keyField:            null,
        tableClass:          null,
        rowClass:            null,
        skipCsvCache:        null,
        showPages:           {
            required: false,
            default:  true,
        },
        showJumps:           {
            required: false,
            defaut:   false,
        },
        paginationSyntax:    null,
        csvBtnSmall:         {
            required: false,
            defaut:   false,
        },
        searchableFields: {
            required: false,
            default:  null,
        },
    },
    data() {
        return {
            activeFields:        [],
            sortField:           '',
            sortOrder:           'A',
            search:              '',
            source:              new ArraySource([]),
            pagedItems:          [],
            response:            null,
            totalCount:          0,
            pageCount:           1,
            page:                1,
            pageLengthSelection: null,
            loading:             false,
            showError:           false,
            blockRefresh:        true,
            initialQueryParams:  {},
            generatedItemKeys:   {},
            csvData:             [],
            queryParamSaver:     this.name ? new QueryParamSaver(this.name) : null,
            paginationSyntaxDefaults: {
                prefix:           'Showing ',
                suffix:           ' entries',
                itemsSeparator:   ' to ',
                totalSeparator:   ' of ',
                pageLengthPrefix: 'Show ',
                pageLengthSuffix: ' entries | ',
            }
        };
    },
    mounted() {
        this.$nextTick(() => {
            if (this.itemSource) {
                this.source = this.itemSource;
            } else if (this.items) {
                this.source = new ArraySource(this.items);
            } else if (this.endpoint) {
                this.source = new ServerSideSource(this.endpoint);
                this.source.addParamMerger((params) => {
                    if (this.endpointParams) {
                        _.merge(params, this.endpointParams);
                    }
                });
            } else {
                throw new Error('No item-source specified');
            }
            this.pageLengthSelection = this.pageLength;
            this.source.setPage(this.page, this.pageLengthSelection, this.pageCount);
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
        search: _.debounce(function() {
            this.source.setSearch(this.search, this.computedSearchableFields);
        }, 350),
        activeFields() {
            this.storeActiveFieldsToCookies();
            this.source.setSearch(this.search, this.computedSearchableFields);
        },
        sortField() {
            this.source.setSort(this.sortField, this.sortOrder)
        },
        sortOrder() {
            this.source.setSort(this.sortField, this.sortOrder)
        },
        page() {
            this.source.setPage(this.computedPage, this.computedPageLength, this.pageCount);
        },
        pageLengthSelection() {
            this.source.setPage(this.computedPage, this.computedPageLength, this.pageCount);
        },
        endpointParams() {
            this.source.fireChangeEvent();
        },
        queryParamsToSave() {
            if (this.queryParamSaver) {
                this.queryParamSaver.set(this.queryParamsToSave);
            }
        },
        items() {
            if (this.source instanceof ArraySource) {
                this.source = new ArraySource(this.items);
                this.source.setPage(this.computedPage, this.computedPageLength, this.pageCount);
                this.source.setSort(this.sortField, this.sortOrder);
                this.source.onChange(() => this.refreshSource());
                this.refreshSource();
            }
        },
    },
    computed: {
        computedSearchableFields() {
            return this.searchableFields ? this.searchableFields : this.activeFields;
        },
        computedPage() {
            if (this.pageLengthSelection === 'All') {
                return null;
            } else {
                return this.page;
            }
        },
        computedPageLength() {
            if (this.pageLengthSelection === 'All') {
                return null;
            } else {
                return this.pageLengthSelection;
            }
        },
        pageLengthPrefix() {
            return this.paginationSyntax && this.paginationSyntax.pageLengthPrefix
                ? this.paginationSyntax.pageLengthPrefix
                : this.paginationSyntaxDefaults.pageLengthPrefix;
        },
        pageLengthSuffix() {
            return this.paginationSyntax && this.paginationSyntax.pageLengthSuffix
                ? this.paginationSyntax.pageLengthSuffix
                : this.paginationSyntaxDefaults.pageLengthSuffix;
        },
        pageDescriptor() {
            let prefix = this.paginationSyntax && this.paginationSyntax ? this.paginationSyntax.prefix : this.paginationSyntaxDefaults.prefix;
            let suffix = this.paginationSyntax && this.paginationSyntax.suffix ? this.paginationSyntax.suffix : this.paginationSyntaxDefaults.suffix;
            let itemsSeparator = this.paginationSyntax && this.paginationSyntax.itemsSeparator ? this.paginationSyntax.itemsSeparator : this.paginationSyntaxDefaults.itemsSeparator;
            let totalSeparator = this.paginationSyntax && this.paginationSyntax.totalSeparator ? this.paginationSyntax.totalSeparator : this.paginationSyntaxDefaults.totalSeparator;

            if (this.pageLengthSelection == 'All') {
                return prefix + this.totalCount + suffix;
            }
            var start = ((this.page - 1) * this.pageLengthSelection) + 1;
            var end   = start + this.pageLengthSelection - 1;
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
                return '0' + suffix;
            } else {
                return prefix + start + (start === end ? '' : itemsSeparator + end) + totalSeparator + this.totalCount + suffix;
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
                sort_field:  this.sortField,
                sort_order:  this.sortOrder,
                search:      this.search,
                page:        this.page,
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
        formatCSVRow(row) {
            return row.map(column => {
                column = column.replaceAll("\n", " ")
                    .replaceAll("\n ", " ")
                    .replaceAll(/\s+/g," ")
                    .replaceAll("\"", " ");
                return `"${column}"`
            }).join(',');
        },

        csvDownload() {
            if (!this.csvExportable) {
                return;
            }
            if (this.skipCsvCache) {
                this.generateCsvData();
            }

            let headers = this.formatCSVRow(this.csvColumns);
            let body    = this.csvData.map(this.formatCSVRow);
            let output  = [ headers, ...body ].join('\n');

            // Gotta use blob URI because IE/Edge don't support data URI
            let blob = new Blob([output], {type: 'text/csv'});
            let anchor               = document.createElement('a');
                anchor.href          = window.URL.createObjectURL(blob);
                anchor.download      = 'export.csv';
                anchor.style.display = 'none';

            // Firefox will not download unless it's attached
            document.body.appendChild(anchor);
            anchor.addEventListener('click', function() {
                document.body.removeChild(anchor);
                anchor = null;
            }, { once: true });

            anchor.click();
        },
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
            // Sort fields according to column order
            let fields = _.keys(this.activeColumns);

            // This method depends on this.$refs, so it cannot be a computed property
            this.csvData = this.pagedItems.map((item) => {
                let id       = this.keyFor(item);

                return fields.map(field => {
                    let key = 'cell.' + id + '.' + field;
                    let elem = this.$refs[key];

                    if (elem && elem[0]) {
                        return Array.from(elem[0].childNodes)
                                .filter(child => !(child instanceof Element) || !child.classList.contains("not-exportable"))
                                .map(child => child.textContent)
                                .join('')
                                .trim();
                    } else {
                        return null;
                    }
                });
            });
        },
        resetActiveFields() {
            this.activeFields = this.defaultActiveFields || Object.keys(this.columns);
        },
        storeActiveFieldsToCookies() {
            var fields = {
                on:  [],
                off: [],
            };
            for (var field in this.columns) {
                if (_.includes(this.activeFields, field) || (this.alwaysActiveFields && _.includes(this.alwaysActiveFields, field))) {
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
        nonExcludedColumns() {
            if (this.adjustableColumns && this.alwaysActiveFields) {

                var fields = {};
                var columns = {};

                fields = Object.keys(this.columns).filter( function(field) {
                    return !(_.includes(this.alwaysActiveFields, field));
                }, this);

                Object.values(fields).map(field => {
                    columns[field] = this.columns[field];
                });

                return columns;

            } else {
                return this.columns
            }
        },
    },
}
</script>

<style>
    .nova-table div.form-group.pull-left.margin-left {
        margin-left: .5em;
    }

    .nova-table-header,
    .nova-table-footer {
        width: 100%;
    }

    .table-loader {
        opacity: .6;
        position: absolute;
        width: 100%;
        height: 920px;
        padding-top: 100px;
        z-index: 1;
    }

    .pagination {
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

    .icon-center{
        vertical-align: middle;
    }
</style>
