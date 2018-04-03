(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array_source_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array_source_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__array_source_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server_side_source_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server_side_source_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__server_side_source_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__query_param_saver_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__query_param_saver_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__query_param_saver_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_js_cookie__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_js_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_js_cookie__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_csv_downloader__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_csv_downloader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vue_csv_downloader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__NovaPageSelect__ = __webpack_require__(15);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ exports["a"] = {
    components: {
        CsvDownload: __WEBPACK_IMPORTED_MODULE_5_vue_csv_downloader___default.a,
        NovaPageSelect: __WEBPACK_IMPORTED_MODULE_6__NovaPageSelect__["a" /* default */],
    },
    props: [
        'items',
        'endpoint',
        'endpointParams',
        'columns',
        'searchable',
        'adjustableColumns',
        'sortable',
        'defaultSortField',
        'csvExportable',
        'defaultActiveFields',
        'itemSource',
        'pageLength',
        'pageLengthOptions',
        'footer',
        'defaultSortOrders',
        'name',
        'keyField',
    ],
    data: function data() {
        return {
            activeFields: [],
            sortField: '',
            sortOrder: 'A',
            search: '',
            source: new __WEBPACK_IMPORTED_MODULE_0__array_source_js___default.a([]),
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
            queryParamSaver: this.name ? new __WEBPACK_IMPORTED_MODULE_2__query_param_saver_js___default.a(this.name) : null,
        };
    },
    mounted: function mounted() {
        var this$1 = this;

        this.$nextTick(function () {
            if (this$1.itemSource) {
                this$1.source = this$1.itemSource;
            } else if (this$1.items) {
                this$1.source = new __WEBPACK_IMPORTED_MODULE_0__array_source_js___default.a(this$1.items);
            } else if (this$1.endpoint) {
                this$1.source = new __WEBPACK_IMPORTED_MODULE_1__server_side_source_js___default.a(this$1.endpoint);
                this$1.source.addParamMerger(function (params) {
                    if (this$1.endpointParams) {
                        __WEBPACK_IMPORTED_MODULE_4_lodash___default.a.merge(params, this$1.endpointParams);
                    }
                });
            } else {
                throw new Error('No item-source specified');
            }
            this$1.pageLengthSelection = this$1.pageLength;
            this$1.source.setPage(this$1.page, this$1.pageLengthSelection);
            this$1.source.onChange(function () { return this$1.refreshSource(); });

            if (this$1.getCookies('fields')) {
                this$1.activeFields = this$1.getActiveFieldsFromCookies();
            } else {
                this$1.activeFields = this$1.defaultActiveFields || Object.keys(this$1.columns);
            }

            if (this$1.defaultSortField) {
                this$1.sortField = this$1.defaultSortField;
            } else {
                this$1.sortField = this$1.activeFields[0];
            }
            if (this$1.defaultSortOrders && this$1.defaultSortOrders[this$1.sortField]) {
                this$1.sortOrder = this$1.defaultSortOrders[this$1.sortField];
            }

            this$1.initialQueryParams = this$1.queryParamsToSave;

            this$1.applyQueryParams();

            this$1.$nextTick(function () {
                this$1.blockRefresh = false;
                this$1.refreshSource();
            });
        });
    },
    watch: {
        search: function search() {
            this.source.setSearch(this.search, this.activeFields);
        },
        activeFields: function activeFields() {
            this.storeActiveFieldsToCookies();
            this.source.setSearch(this.search, this.activeFields);
        },
        sortField: function sortField() {
            this.source.setSort(this.sortField, this.sortOrder)
        },
        sortOrder: function sortOrder() {
            this.source.setSort(this.sortField, this.sortOrder)
        },
        page: function page() {
            if (this.pageLengthSelection == 'All') {
                this.source.setPage(null, null);
            } else {
                this.source.setPage(this.page, this.pageLengthSelection);
            }
        },
        pageLengthSelection: function pageLengthSelection() {
            if (this.pageLengthSelection == 'All') {
                this.source.setPage(null, null);
            } else {
                this.source.setPage(this.page, this.pageLengthSelection);
            }
        },
        endpointParams: function endpointParams() {
            this.source.fireChangeEvent();
        },
        queryParamsToSave: function queryParamsToSave() {
            if (this.queryParamSaver) {
                this.queryParamSaver.set(this.queryParamsToSave);
            }
        },
    },
    computed: {
        pageDescriptor: function pageDescriptor() {
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
        activeColumns: function activeColumns() {
            var this$1 = this;

            var columns = {};
            Object.keys(this.columns).map(function (field) {
                if (__WEBPACK_IMPORTED_MODULE_4_lodash___default.a.includes(this$1.activeFields, field)) {
                    columns[field] = this$1.columns[field];
                }
            });
            return columns;
        },
        csvColumns: function csvColumns() {
            return __WEBPACK_IMPORTED_MODULE_4_lodash___default.a.values(this.activeColumns);
        },
        pages: function pages() {
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
        queryParamsToSave: function queryParamsToSave$1() {
            var this$1 = this;

            var params = {
                sort_field: this.sortField,
                sort_order: this.sortOrder,
                search: this.search,
                page: this.page,
                page_length: this.pageLengthSelection,
            }
            if (this.endpointParams) {
                __WEBPACK_IMPORTED_MODULE_4_lodash___default.a.merge(params, this.endpointParams);
            }
            // Now that we have all the params, let's check if any of them
            // would be set to those values by default. If so, we can keep
            // the URL small by taking them out entirely.
            for (var field in params) {
                if (params[field] == this$1.initialQueryParams[field]) {
                    delete params[field];
                }
            }
            return params;
        },
        savingToCookies: function savingToCookies() {
            return Boolean(this.name);
        },
    },
    methods: {
        refreshSource: function refreshSource() {
            var this$1 = this;

            if (this.blockRefresh) {
                return;
            }

            //show loading indicator
            this.loading = true;
            this.showError = false;

            this.source
                .get()
                .then(function (response) {
                    this$1.response = response;
                    this$1.pagedItems = response.items;
                    this$1.pageCount = response.pageCount;
                    var page = response.page >= 1 ? response.page : 1;
                    if (this$1.page != page) {
                        this$1.page = page;
                    }
                    this$1.totalCount = response.totalCount;
                    this$1.generatedItemKeys = {};
                    //stop loading indicator
                    this$1.loading = false;
                })
                .catch(function (err) {
                    var msg = err && err.data && err.data.message ? err.data.message : '';

                    //stop loading indicator
                    this$1.loading = false;

                    if (err == 'Error: Request overridden by newer request.') {
                        this$1.showError = false;
                    } else {
                        //show error icon
                        this$1.showError = true;

                        console && console.log && console.log('Error when accessing paged data:', msg, err);
                    }
                })
                .then(function () {
                    if (this$1.csvExportable) {
                        this$1.$nextTick(function () { return this$1.generateCsvData(); });
                    }
                });
        },
        fieldName: function fieldName(columnName) {
            return this.columns[columnName];
        },
        isSortable: function isSortable(field)
        {
            if (this.sortable instanceof Array) {
                return __WEBPACK_IMPORTED_MODULE_4_lodash___default.a.includes(this.sortable, field);
            } else if (this.sortable) {
                return true;
            } else {
                return false;
            }
        },
        setSort: function setSort(field) {
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
        sortClass: function sortClass(field) {
            if (field === this.sortField) {
                return this.sortOrder === 'D' ? 'fa-sort-amount-desc active-sort pull-right' : 'fa-sort-amount-asc active-sort pull-right';
            }
            return 'fa-arrows-v text-muted pull-right';
        },
        /**
         * Return item.field or, if field is a dot-delimited field,
         * follow the chain of references to the last value.
         */
        valueFor: function valueFor(item, field) {
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
        getCookies: function getCookies(field) {
            if (!this.name || !field || __WEBPACK_IMPORTED_MODULE_3_js_cookie___default.a.get(this.name) === undefined) {
                return null;
            }

            return JSON.parse(__WEBPACK_IMPORTED_MODULE_3_js_cookie___default.a.get(this.name))[field];
        },
        setCookies: function setCookies(field, value) {
            if (!this.name || !field) {
                return false;
            }

            var cookie = __WEBPACK_IMPORTED_MODULE_3_js_cookie___default.a.get(this.name);

            if (cookie) {
                cookie = JSON.parse(cookie);
            } else {
                cookie = {};
            }

            cookie[field] = value;
            if (__WEBPACK_IMPORTED_MODULE_3_js_cookie___default.a.set(this.name, cookie)) {
                return true;
            }

            return false;
        },
        applyQueryParams: function applyQueryParams() {
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
        keyFor: function keyFor(item) {
            if (this.keyField) {
                return item[this.keyField];
            }
            if (item.id) {
                return item.id;
            }
            return this.generateKeyFor(item);
        },
        generateKeyFor: function generateKeyFor(item) {
            var found = null;
            __WEBPACK_IMPORTED_MODULE_4_lodash___default.a.each(this.generatedItemKeys, function (saved_item, key) {
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
        generateCsvData: function generateCsvData() {
            var this$1 = this;

            // This method depends on this.$refs, so it cannot be a computed property
            this.csvData = this.pagedItems.map(function (item) {
                var id = this$1.keyFor(item);
                var textItem = {};
                __WEBPACK_IMPORTED_MODULE_4_lodash___default.a.each(this$1.activeFields, function (field) {
                    textItem[this$1.columns[field]] = this$1.$refs['cell.' + id + '.' + field] && this$1.$refs['cell.' + id + '.' + field][0] ? this$1.$refs['cell.' + id + '.' + field][0].innerText.trim() : null;
                });
                return textItem;
            });
        },
        resetActiveFields: function resetActiveFields() {
            this.activeFields = this.defaultActiveFields || Object.keys(this.columns);
        },
        storeActiveFieldsToCookies: function storeActiveFieldsToCookies() {
            var this$1 = this;

            var fields = {
                on: [],
                off: [],
            };
            for (var field in this.columns) {
                if (__WEBPACK_IMPORTED_MODULE_4_lodash___default.a.includes(this$1.activeFields, field)) {
                    fields.on.push(field);
                } else {
                    fields.off.push(field);
                }
            }

            this.setCookies('fields', fields);
        },
        getActiveFieldsFromCookies: function getActiveFieldsFromCookies() {
            var fields = this.getCookies('fields');
            var defaultOn = this.defaultActiveFields || Object.keys(this.columns);
            return Object.keys(this.columns).filter(function (field) {
                var fieldIsSelected = __WEBPACK_IMPORTED_MODULE_4_lodash___default.a.includes(fields.on, field);
                var fieldIsDeselected = __WEBPACK_IMPORTED_MODULE_4_lodash___default.a.includes(fields.off, field);
                var fieldDefaultsToOn = __WEBPACK_IMPORTED_MODULE_4_lodash___default.a.includes(defaultOn, field);
                return fieldIsSelected || (fieldDefaultsToOn && !fieldIsDeselected);
            });
        },
    },
};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = normalizeComponent;
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  scriptExports = scriptExports || {}

  // ES6 modules interop
  var type = typeof scriptExports.default
  if (type === 'object' || type === 'function') {
    scriptExports = scriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ },
/* 2 */
/***/ function(module, exports) {

/*
|--------------------------------------------------------------------------
| AbstractSource
|--------------------------------------------------------------------------
|
| A base class for Source objects that work with NovaTable.
|
*/

var AbstractSource = function AbstractSource() {
    this.search = '';
    this.search_fields = [];
    this.sort_field = '';
    this.sort_direction = 'A';
    this.onChangeClosures = [];
    this.page = null;
    this.page_length = null;
};

AbstractSource.prototype.setPage = function setPage (page, page_length) {
    this.page = page;
    this.page_length = page_length;
    this.fireChangeEvent();
    return this;
};

AbstractSource.prototype.setSearch = function setSearch (search, fields) {
    this.search = search;
    this.search_fields = fields;
    this.fireChangeEvent();
    return this;
};

AbstractSource.prototype.setSort = function setSort (field, direction) {
    this.sort_field = field;
    this.sort_direction = direction;
    this.fireChangeEvent();
    return this;
};

AbstractSource.prototype.onChange = function onChange (closure) {
    this.onChangeClosures.push(closure);
};

AbstractSource.prototype.fireChangeEvent = function fireChangeEvent () {
    this.onChangeClosures.map(function (closure) { return closure(); });
};

AbstractSource.prototype.get = function get () {
    throw new Error('`get` has not been defined on this class');
};

module.exports = AbstractSource;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ exports["a"] = {
    props: ['value', 'pageCount', 'showJumps'],
    data: function data() {
        return {
            page: this.value,
        };
    },
    computed: {
        pages: function pages() {
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
        value: function value() {
            this.page = parseInt(this.value);
        },
    },
    methods: {
        classFor: function classFor(page) {
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
        isDisabled: function isDisabled(page) {
            if (page === 'previous' && this.page == 1) {
                return true;
            } else if (page === 'next' && this.page == this.pageCount) {
                return true;
            }

            return false;
        },
        setPage: function setPage(page) {
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
};


/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require(undefined);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "nova-table clearfix" }, [
    _c("div", { staticClass: "toggle-columns form-group pull-left" }, [
      _c("div", { staticClass: "form-inline" }, [
        _c("div", { staticClass: "form-group pull-left" }, [
          _vm.searchable
            ? _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.search,
                    expression: "search"
                  }
                ],
                staticClass: "form-control",
                attrs: { placeholder: "Search" },
                domProps: { value: _vm.search },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.search = $event.target.value
                  }
                }
              })
            : _vm._e()
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "form-group absolute pull-left margin-left" },
          [
            _vm.adjustableColumns
              ? _c(
                  "button",
                  {
                    staticClass: "btn btn-default btn-spacing",
                    attrs: {
                      type: "button",
                      "data-toggle": "dropdown",
                      "aria-expanded": "false"
                    }
                  },
                  [_c("i", { staticClass: "fa fa-columns" })]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.adjustableColumns
              ? _c(
                  "ul",
                  { staticClass: "dropdown-menu dropdown-menu--toggle-col" },
                  [
                    _vm._l(_vm.columns, function(name, field) {
                      return _c("li", [
                        _c(
                          "a",
                          {
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                              }
                            }
                          },
                          [
                            _c("label", [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.activeFields,
                                    expression: "activeFields"
                                  }
                                ],
                                attrs: { type: "checkbox" },
                                domProps: {
                                  value: field,
                                  checked: Array.isArray(_vm.activeFields)
                                    ? _vm._i(_vm.activeFields, field) > -1
                                    : _vm.activeFields
                                },
                                on: {
                                  change: function($event) {
                                    var $$a = _vm.activeFields,
                                      $$el = $event.target,
                                      $$c = $$el.checked ? true : false
                                    if (Array.isArray($$a)) {
                                      var $$v = field,
                                        $$i = _vm._i($$a, $$v)
                                      if ($$el.checked) {
                                        $$i < 0 &&
                                          (_vm.activeFields = $$a.concat([$$v]))
                                      } else {
                                        $$i > -1 &&
                                          (_vm.activeFields = $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1)))
                                      }
                                    } else {
                                      _vm.activeFields = $$c
                                    }
                                  }
                                }
                              }),
                              _vm._v(
                                " " +
                                  _vm._s(name) +
                                  "\n                            "
                              )
                            ])
                          ]
                        )
                      ])
                    }),
                    _vm._v(" "),
                    _vm.savingToCookies
                      ? _c("li", [
                          _c(
                            "a",
                            {
                              staticClass: "btn",
                              on: { click: _vm.resetActiveFields }
                            },
                            [
                              _vm._v(
                                "\n                            Reset to Default\n                        "
                              )
                            ]
                          )
                        ])
                      : _vm._e()
                  ],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.showError
              ? _c("i", {
                  staticClass: "fa fa-exclamation-circle",
                  attrs: {
                    title: "There was a problem with your last request."
                  }
                })
              : _vm._e()
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "form-group absolute pull-left margin-left" },
          [_vm._t("top-left-bar")],
          2
        )
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "pull-right" },
      [
        _vm._t("top-right-bar"),
        _vm._v(" "),
        _vm.csvExportable
          ? _c(
              "csv-download",
              { attrs: { fields: _vm.csvColumns, data: _vm.csvData } },
              [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-default btn-spacing",
                    attrs: { type: "button" }
                  },
                  [
                    _c("i", {
                      staticClass: "fa fa-file-excel-o",
                      attrs: { "aria-hidden": "true" }
                    }),
                    _vm._v(" CSV\n            ")
                  ]
                )
              ]
            )
          : _vm._e()
      ],
      2
    ),
    _vm._v(" "),
    _vm.loading ? _c("div", [_vm._m(0)]) : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "nova-table-container" }, [
      _c(
        "table",
        {
          staticClass:
            "display table table-bordered table-condensed fb-table table-striped responsive",
          attrs: { width: "100%" }
        },
        [
          _c("thead", [
            _c(
              "tr",
              { staticClass: "sorting-header-gray" },
              _vm._l(_vm.activeColumns, function(name, field) {
                return _c(
                  "th",
                  {
                    class: { sortable: _vm.isSortable(field) },
                    style: {
                      cursor: _vm.isSortable(field) ? "pointer" : "default"
                    },
                    on: {
                      click: function($event) {
                        _vm.isSortable(field) ? _vm.setSort(field) : null
                      }
                    }
                  },
                  [
                    _c("div", [
                      _vm.isSortable(field)
                        ? _c("i", {
                            staticClass: "fa",
                            class: _vm.sortClass(field),
                            attrs: { "aria-hidden": "true" }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(name))])
                    ])
                  ]
                )
              })
            )
          ]),
          _vm._v(" "),
          _c(
            "transition-group",
            {
              staticClass: "tableBody",
              attrs: { tag: "tbody", name: "nova-rows" }
            },
            [
              _vm._l(_vm.pagedItems, function(item) {
                return _c(
                  "tr",
                  { key: _vm.keyFor(item) },
                  _vm._l(_vm.activeColumns, function(name, field) {
                    return _c(
                      "td",
                      {
                        ref: "cell." + _vm.keyFor(item) + "." + field,
                        refInFor: true,
                        class: "td-" + field + "-styles"
                      },
                      [
                        _vm._t(
                          field,
                          [
                            _vm._v(
                              "\n                            " +
                                _vm._s(_vm.valueFor(item, field)) +
                                "\n                        "
                            )
                          ],
                          { item: item }
                        )
                      ],
                      2
                    )
                  })
                )
              }),
              _vm._v(" "),
              _vm.pagedItems.length === 0
                ? _c("tr", { key: "no-items" }, [
                    _c(
                      "td",
                      { attrs: { colspan: _vm.activeFields.length || 1 } },
                      [_vm._v(" No matching items.")]
                    )
                  ])
                : _vm._e()
            ],
            2
          ),
          _vm._v(" "),
          _vm.footer
            ? _c("tfoot", [
                _c(
                  "tr",
                  { staticClass: "sorting-header-gray" },
                  _vm._l(_vm.activeColumns, function(name, field) {
                    return _c(
                      "td",
                      [
                        _vm._t(field + "-footer", null, {
                          items: _vm.pagedItems,
                          response: _vm.response
                        })
                      ],
                      2
                    )
                  })
                )
              ])
            : _vm._e()
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "pull-left inline" }, [
      _vm.pageLengthSelection
        ? _c(
            "div",
            { staticClass: "dropup" },
            [
              _vm.pageLengthOptions
                ? [
                    _vm._v("\n                Show\n                "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-default dropdown-toggle",
                        attrs: {
                          type: "button",
                          id: "page-length-dropdown",
                          "data-toggle": "dropdown",
                          "aria-haspopup": "true",
                          "aria-expanded": "true"
                        }
                      },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.pageLengthSelection) +
                            "\n                    "
                        ),
                        _c("span", { staticClass: "caret" })
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "ul",
                      {
                        staticClass: "dropdown-menu",
                        attrs: { "aria-labelledby": "page-length-dropdown" }
                      },
                      _vm._l(_vm.pageLengthOptions, function(option) {
                        return _c("li", [
                          _c(
                            "a",
                            {
                              attrs: { href: "javascript:void(0);" },
                              on: {
                                click: function($event) {
                                  _vm.pageLengthSelection = option
                                }
                              }
                            },
                            [_vm._v(_vm._s(option))]
                          )
                        ])
                      })
                    ),
                    _vm._v("\n                entries |\n            ")
                  ]
                : _vm._e(),
              _vm._v(" "),
              _c("span", [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.pageDescriptor) +
                    "\n            "
                )
              ])
            ],
            2
          )
        : _vm._e()
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "pull-right" },
      [
        _vm._t("bottom-right-bar"),
        _vm._v(" "),
        _vm.pageLengthSelection && _vm.pageCount > 1
          ? _c("nova-page-select", {
              attrs: { "page-count": _vm.pageCount },
              model: {
                value: _vm.page,
                callback: function($$v) {
                  _vm.page = $$v
                },
                expression: "page"
              }
            })
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-xs-12 text-center" }, [
        _c("div", { staticClass: "well table-loader" }, [
          _c("i", { staticClass: "fa fa-circle-o-notch fa-4x fa-spin" }),
          _vm._v(" "),
          _c("br"),
          _vm._v("\n                    Loading...\n                ")
        ])
      ])
    ])
  }
]
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-79f12a59", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(17).default
var update = add("70b70474", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":true}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NovaTable.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js?sourceMap!../node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":true}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NovaTable.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fuzzy_matcher_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__fuzzy_matcher_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__fuzzy_matcher_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_source_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_source_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__abstract_source_js__);



var ArraySource = (function (AbstractSource) {
    function ArraySource(items, matcher) {
        AbstractSource.call(this);
        this.items = items;
        this.filterClosures = [];
        this.matcher = matcher || new __WEBPACK_IMPORTED_MODULE_0__fuzzy_matcher_js___default.a();
    }

    if ( AbstractSource ) ArraySource.__proto__ = AbstractSource;
    ArraySource.prototype = Object.create( AbstractSource && AbstractSource.prototype );
    ArraySource.prototype.constructor = ArraySource;

    ArraySource.prototype.addFilter = function addFilter (filter) {
        this.filterClosures.push(filter);
    };

    ArraySource.prototype.get = function get () {
        var this$1 = this;

        var promise = Promise.resolve(this.items);
        this.filterClosures.map(function (filter) {
            promise = promise.then(filter);
        });
        return promise
            .then(function (items) {
                return items.filter(function (item) {
                        if (this$1.search) {
                            // find out if any fields match
                            return _.find(this$1.search_fields, function (field) {
                                    return this$1.matcher.matches(this$1.search, item[field]);
                                });
                        }
                        return true;
                    });
            })
            .then(function (items) {
                var sort_field = this$1.sort_field;
                return items.sort(function (a, b) {
                    if (a[sort_field] < b[sort_field]) {
                        return this$1.sort_direction === 'A' ? -1 : 1;
                    } else if (a[sort_field] > b[sort_field]) {
                        return this$1.sort_direction === 'A' ? 1 : -1;
                    }
                    return 0;
                });
            })
            .then(function (items) {
                var page_length = this$1.page_length || items.length;
                if (!this$1.page) {
                    this$1.page = 1;
                }
                var pageCount = page_length ? Math.ceil(items.length / page_length) : 1;
                if (this$1.page > pageCount) {
                    this$1.page = pageCount;
                }
                var totalCount = items.length;
                items = items.slice((this$1.page - 1) * page_length, this$1.page * page_length);
                return {
                    items: items, 
                    pageCount: pageCount,
                    page: this$1.page,
                    totalCount: totalCount,
                };
            });
    };

    return ArraySource;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_source_js___default.a));

module.exports = ArraySource;


/***/ },
/* 8 */
/***/ function(module, exports) {


var FuzzyMatcher = function FuzzyMatcher () {};

FuzzyMatcher.prototype.matches = function matches (fuzz, string) {
    if (typeof string === 'number') {
        string += "";
    }
    if (typeof string !== 'string') {
        return false;
    }
    string = string.toLowerCase();
    var match = fuzz.toLowerCase();
    for (var i = 0; i < match.length; i++) {
        var indexOf = string.indexOf(match[i]);
        if (indexOf < 0) {
            return false;
        }
        string = string.substr(indexOf + 1);
    }
    return true;
};

module.exports = FuzzyMatcher;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qs__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_qs__);


var QueryParamSaver = function QueryParamSaver(name) {
    if (!name) {
        throw new Error('No name supplied');
    }
    this.name = name;
};

QueryParamSaver.prototype.get = function get () {
    var query = __WEBPACK_IMPORTED_MODULE_0_qs___default.a.parse(location.search.substr(1));
    return query[this.name];
};

QueryParamSaver.prototype.set = function set (params) {
    var query = __WEBPACK_IMPORTED_MODULE_0_qs___default.a.parse(location.search.substr(1));
    if (params && Object.keys(params).length > 0) {
        query[this.name] = params;
    } else {
        delete query[this.name];
    }
    if (query && __WEBPACK_IMPORTED_MODULE_0_qs___default.a.stringify(query).length > 0) {
        history.replaceState({}, '', '?' + __WEBPACK_IMPORTED_MODULE_0_qs___default.a.stringify(query));
    } else {
        // If there are no query arguments, we don't want to put an 
        // ugly question mark on the URL.
        history.replaceState({}, '', location.pathname);
    }
};;

module.exports = QueryParamSaver;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_source_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__abstract_source_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__abstract_source_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timeout_throttle_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timeout_throttle_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__timeout_throttle_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);





var ServerSideSource = (function (AbstractSource) {
    function ServerSideSource(endpoint) {
        AbstractSource.call(this);
        this.endpoint = endpoint;
        this.paramMergers = [];
        this.throttle = new __WEBPACK_IMPORTED_MODULE_2__timeout_throttle_js___default.a();
        this.slug = null;
    }

    if ( AbstractSource ) ServerSideSource.__proto__ = AbstractSource;
    ServerSideSource.prototype = Object.create( AbstractSource && AbstractSource.prototype );
    ServerSideSource.prototype.constructor = ServerSideSource;

    ServerSideSource.prototype.addParamMerger = function addParamMerger (closure) {
        this.paramMergers.push(closure);
    };

    ServerSideSource.prototype.buildRequestData = function buildRequestData ()
    {
        var data = {
            search: this.search,
            search_fields: this.search_fields,
            sort_field: this.sort_field,
            sort_direction: this.sort_direction,
            page: this.page,
            page_length: this.page_length,
        };
        this.paramMergers.map(function (closure) { return closure(data); });
        return data;
    };

    ServerSideSource.prototype.buildRequestUrl = function buildRequestUrl ()
    {
        var request_data = this.buildRequestData();
        if (/\?/.test(this.endpoint)) {
            return this.endpoint + '&' + __WEBPACK_IMPORTED_MODULE_3_jquery___default.a.param(request_data);
        } else {
            return this.endpoint + '?' + __WEBPACK_IMPORTED_MODULE_3_jquery___default.a.param(request_data);
        }
    };

    ServerSideSource.prototype.get = function get () 
    {
        var this$1 = this;

        var slug = this.slug = Math.random();
        return new Promise(function (resolve) {
            this$1.throttle.throttle(function () {
                resolve(
                    __WEBPACK_IMPORTED_MODULE_0_vue___default.a.http
                    .get(this$1.buildRequestUrl())
                    .then(function (response) {
                        if (slug !== this$1.slug) {
                            // another request has been made, do not overwrite.
                            throw new Error('Request overridden by newer request.');
                        }
                        var data = response.data;
                        if (data.warnings) {
                            alert(data.warnings.join("\n\n"));
                            delete data.warnings;
                        }
                        return data;
                    })
                );
            });
        });
    };

    return ServerSideSource;
}(__WEBPACK_IMPORTED_MODULE_1__abstract_source_js___default.a));

module.exports = ServerSideSource;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

/*----------------------------------------------------------------------------
 | 
 | TimeoutThrottle
 |
 |----------------------------------------------------------------------------
 | Run a closure, but wait a little while if we think another request might 
 | come soon. Good way to avoid hitting a server too rapidly.
 |
 | Mainly this is used for requests that are fired on key-press. If the user 
 | types quickly, we try to see how fast those are coming in and guess if
 | more are going to come in. If we think they will, then a timeout is
 | setup before we allow the request to run.
 |
 | If we are already waiting to run a closure and another one comes in, the 
 | pending one will be discarded. This code should only be used in cases
 | where discarded requests are acceptable.
 |
 */

var _ = __webpack_require__(4);

var TimeoutThrottle = function TimeoutThrottle() 
{
    this.last_action = new Date().valueOf();
    this.request_intervals = [];
    this.last_reasonable_interval = 0;
};

TimeoutThrottle.prototype.throttle = function throttle (closure)
{
    if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
    }

    // Find a reasonable speed.
    var reasonable_interval = 2 * this.averageSpeed();

    // Find the current speed.
    var now = new Date().valueOf();
    var new_interval = now - this.last_action;
    this.last_action = now;

    // A 1 second+ pause means they finished typing 
    // and started again.
    if (new_interval > 1000) {
        this.request_intervals = [];
    } else {
        this.request_intervals.push(new_interval);
    }

    // If there has been a long pause, there is 0 speed data
    // to work with, use some we saved from last time.
    if (reasonable_interval === 0) {
        reasonable_interval = this.last_reasonable_interval;
    } else {
        this.last_reasonable_interval = reasonable_interval;
    }

    // If a very short period has passed, then they are probably
    // still typing. Set a timeout for a reasonable interval. 
    // Else, just run it.
    if (new_interval < reasonable_interval) {
        this.timer = setTimeout(closure, reasonable_interval);
    } else {
        closure();
    }
};

TimeoutThrottle.prototype.averageSpeed = function averageSpeed ()
{
    if (this.request_intervals.length === 0) {
        return 0;
    }
    return _.sum(this.request_intervals) / this.request_intervals.length;
};

module.exports = TimeoutThrottle;


/***/ },
/* 12 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var this$1 = this;

		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this$1[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		var this$1 = this;

		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this$1[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)();
// imports


// module
exports.push([module.i, "\n.nova-table div.form-group.pull-left.margin-left {\n    margin-left: .5em;\n}\n.table-loader{\n    opacity: .6;\n    position: absolute;\n    width: 100%;\n    height: 920px;\n    padding-top: 100px;\n    z-index: 1;\n}\n.pagination{\n    margin: 0 0 20px 0;\n}\ntd.td-scheduled_or_posted_at-styles {\n    width: 115px;\n}\n.sortable {\n    white-space: nowrap;\n}\n.sortable i {\n    margin-top: 3px;\n}\n", "", {"version":3,"sources":["/home/dkuck/work/nova-tables/src/src/NovaTable.vue"],"names":[],"mappings":";AAijBA;IACA,kBAAA;CACA;AAEA;IACA,YAAA;IACA,mBAAA;IACA,YAAA;IACA,cAAA;IACA,mBAAA;IACA,WAAA;CACA;AAEA;IACA,mBAAA;CACA;AAEA;IACA,aAAA;CACA;AAEA;IACA,oBAAA;CACA;AAEA;IACA,gBAAA;CACA","file":"NovaTable.vue","sourcesContent":["\n<template>\n    <div class=\"nova-table clearfix\">\n        <div class=\"toggle-columns form-group pull-left\">\n            <div class=\"form-inline\">\n\n                <div class=\"form-group pull-left\">\n                    <input v-if=\"searchable\" v-model=\"search\" placeholder=\"Search\" class=\"form-control\">\n                </div>\n\n                <div class=\"form-group absolute pull-left margin-left\">\n                    <button class=\"btn btn-default btn-spacing\" type=\"button\" data-toggle=\"dropdown\" aria-expanded=\"false\" v-if=\"adjustableColumns\">\n                        <i class=\"fa fa-columns\"></i>\n                    </button>\n\n                    <ul v-if=\"adjustableColumns\" class=\"dropdown-menu dropdown-menu--toggle-col\">\n                        <li v-for=\"(name, field) in columns\">\n                            <a @click.stop>\n                                <label>\n                                    <input type=\"checkbox\" :value=\"field\" v-model=\"activeFields\"> {{ name }}\n                                </label>\n                            </a>\n                        </li>\n                        <li v-if=\"savingToCookies\">\n                            <a @click=\"resetActiveFields\" class=\"btn\">\n                                Reset to Default\n                            </a>\n                        </li>\n                    </ul>\n                    <i class=\"fa fa-exclamation-circle\" title=\"There was a problem with your last request.\" v-if=\"showError\"></i>\n                </div>\n\n                <div class=\"form-group absolute pull-left margin-left\">\n                    <slot name=\"top-left-bar\"></slot>\n                </div>\n\n            </div>\n        </div>\n\n        <div class=\"pull-right\">\n            <slot name=\"top-right-bar\"></slot>\n            <csv-download\n                    v-if=\"csvExportable\"\n                    :fields=\"csvColumns\"\n                    :data=\"csvData\"\n            >\n                <button class=\"btn btn-default btn-spacing\" type=\"button\" >\n                    <i class=\"fa fa-file-excel-o\" aria-hidden=\"true\"></i> CSV\n                </button>\n            </csv-download>\n        </div>\n        <!-- loading indicator -->\n        <div v-if=\"loading\">\n            <div class=\"row\">\n                <div class=\"col-xs-12 text-center\">\n                    <div class=\"well table-loader\">\n                        <i class=\"fa fa-circle-o-notch fa-4x fa-spin\"></i>\n                        <br>\n                        Loading...\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"nova-table-container\">\n            <table class=\"display table table-bordered table-condensed fb-table table-striped responsive\"\n                   width=\"100%\">\n                <thead>\n                    <tr class='sorting-header-gray'>\n                        <th v-for=\"(name, field) in activeColumns\" :style=\"{ cursor: isSortable(field) ? 'pointer' : 'default' }\" :class=\"{ sortable: isSortable(field) }\" @click=\"isSortable(field) ? setSort(field) : null\">\n                            <div>\n                                <i v-if=\"isSortable(field)\" class=\"fa\" :class=\"sortClass(field)\" aria-hidden=\"true\"></i>\n                                <span>{{ name }}</span>\n                            </div>\n                        </th>\n                    </tr>\n                </thead>\n                <transition-group tag=\"tbody\" class=\"tableBody\" name=\"nova-rows\">\n                    <tr v-for=\"item in pagedItems\" :key=\"keyFor(item)\">\n                        <td v-for=\"(name, field) in activeColumns\" :class=\"'td-' + field + '-styles'\" :ref=\"'cell.' + keyFor(item) + '.' + field\">\n                            <slot :name=\"field\" :item=\"item\">\n                                {{ valueFor(item, field) }}\n                            </slot>\n                        </td>\n                    </tr>\n                    <tr v-if=\"pagedItems.length === 0\" key=\"no-items\">\n                        <td :colspan=\"activeFields.length || 1\"> No matching items.</td>\n                    </tr>\n                </transition-group>\n                <tfoot v-if=\"footer\">\n                    <tr class=\"sorting-header-gray\">\n                        <td v-for=\"(name, field) in activeColumns\">\n                            <slot :name=\"field + '-footer'\" :items=\"pagedItems\" :response=\"response\">\n                            </slot>\n                        </td>\n                    </tr>\n                </tfoot>\n            </table>\n        </div>\n        <div class=\"pull-left inline\">\n            <div class=\"dropup\" v-if=\"pageLengthSelection\">\n                <template v-if=\"pageLengthOptions\">\n                    Show\n                    <button class=\"btn btn-default dropdown-toggle\" type=\"button\" id=\"page-length-dropdown\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n                        {{ pageLengthSelection }}\n                        <span class=\"caret\"></span>\n                    </button>\n                    <ul class=\"dropdown-menu\" aria-labelledby=\"page-length-dropdown\">\n                        <li v-for=\"option in pageLengthOptions\"><a href=\"javascript:void(0);\" @click=\"pageLengthSelection = option\">{{ option }}</a></li>\n                    </ul>\n                    entries |\n                </template>\n                <span>\n                    {{ pageDescriptor }}\n                </span>\n            </div>\n        </div>\n        <div class=\"pull-right\">\n            <slot name=\"bottom-right-bar\"></slot>\n\n            <nova-page-select \n                v-if=\"pageLengthSelection && pageCount > 1\" \n                v-model=\"page\" \n                :page-count=\"pageCount\"\n            >\n            </nova-page-select>\n\n        </div>\n    </div>\n</template>\n\n<script>\nimport ArraySource from './array-source.js';\nimport ServerSideSource from './server-side-source.js';\nimport QueryParamSaver from './query-param-saver.js';\nimport Cookies from 'js-cookie';\nimport _ from 'lodash';\nimport CsvDownload from 'vue-csv-downloader';\nimport NovaPageSelect from './NovaPageSelect';\n\nexport default {\n    components: {\n        CsvDownload,\n        NovaPageSelect,\n    },\n    props: [\n        'items',\n        'endpoint',\n        'endpointParams',\n        'columns',\n        'searchable',\n        'adjustableColumns',\n        'sortable',\n        'defaultSortField',\n        'csvExportable',\n        'defaultActiveFields',\n        'itemSource',\n        'pageLength',\n        'pageLengthOptions',\n        'footer',\n        'defaultSortOrders',\n        'name',\n        'keyField',\n    ],\n    data() {\n        return {\n            activeFields: [],\n            sortField: '',\n            sortOrder: 'A',\n            search: '',\n            source: new ArraySource([]),\n            pagedItems: [],\n            response: null,\n            totalCount: 0,\n            pageCount: 1,\n            page: 1,\n            pageLengthSelection: null,\n            loading: false,\n            showError: false,\n            blockRefresh: true,\n            initialQueryParams: {},\n            generatedItemKeys: {},\n            csvData: [],\n            queryParamSaver: this.name ? new QueryParamSaver(this.name) : null,\n        };\n    },\n    mounted() {\n        this.$nextTick(() => {\n            if (this.itemSource) {\n                this.source = this.itemSource;\n            } else if (this.items) {\n                this.source = new ArraySource(this.items);\n            } else if (this.endpoint) {\n                this.source = new ServerSideSource(this.endpoint);\n                this.source.addParamMerger((params) => {\n                    if (this.endpointParams) {\n                        _.merge(params, this.endpointParams);\n                    }\n                });\n            } else {\n                throw new Error('No item-source specified');\n            }\n            this.pageLengthSelection = this.pageLength;\n            this.source.setPage(this.page, this.pageLengthSelection);\n            this.source.onChange(() => this.refreshSource());\n\n            if (this.getCookies('fields')) {\n                this.activeFields = this.getActiveFieldsFromCookies();\n            } else {\n                this.activeFields = this.defaultActiveFields || Object.keys(this.columns);\n            }\n\n            if (this.defaultSortField) {\n                this.sortField = this.defaultSortField;\n            } else {\n                this.sortField = this.activeFields[0];\n            }\n            if (this.defaultSortOrders && this.defaultSortOrders[this.sortField]) {\n                this.sortOrder = this.defaultSortOrders[this.sortField];\n            }\n\n            this.initialQueryParams = this.queryParamsToSave;\n\n            this.applyQueryParams();\n\n            this.$nextTick(() => {\n                this.blockRefresh = false;\n                this.refreshSource();\n            });\n        });\n    },\n    watch: {\n        search() {\n            this.source.setSearch(this.search, this.activeFields);\n        },\n        activeFields() {\n            this.storeActiveFieldsToCookies();\n            this.source.setSearch(this.search, this.activeFields);\n        },\n        sortField() {\n            this.source.setSort(this.sortField, this.sortOrder)\n        },\n        sortOrder() {\n            this.source.setSort(this.sortField, this.sortOrder)\n        },\n        page() {\n            if (this.pageLengthSelection == 'All') {\n                this.source.setPage(null, null);\n            } else {\n                this.source.setPage(this.page, this.pageLengthSelection);\n            }\n        },\n        pageLengthSelection() {\n            if (this.pageLengthSelection == 'All') {\n                this.source.setPage(null, null);\n            } else {\n                this.source.setPage(this.page, this.pageLengthSelection);\n            }\n        },\n        endpointParams() {\n            this.source.fireChangeEvent();\n        },\n        queryParamsToSave() {\n            if (this.queryParamSaver) {\n                this.queryParamSaver.set(this.queryParamsToSave);\n            }\n        },\n    },\n    computed: {\n        pageDescriptor() {\n            if (this.pageLengthSelection == 'All') {\n                return 'Showing ' + this.totalCount + ' entries';\n            }\n            var start = ((this.page - 1) * this.pageLengthSelection) + 1;\n            var end = start + this.pageLengthSelection - 1;\n            if (start < 0) {\n                start = 1;\n            }\n            if (end < start) {\n                end = start;\n            }\n            if (end > this.totalCount) {\n                end = this.totalCount;\n            }\n            if (this.totalCount === 0) {\n                return '0 entries';\n            } else {\n                return 'Showing ' + start + (start === end ? '' : ' to ' + end) + ' of ' + this.totalCount + ' entries';\n            }\n        },\n        activeColumns() {\n            var columns = {};\n            Object.keys(this.columns).map(field => {\n                if (_.includes(this.activeFields, field)) {\n                    columns[field] = this.columns[field];\n                }\n            });\n            return columns;\n        },\n        csvColumns() {\n            return _.values(this.activeColumns);\n        },\n        pages() {\n            var start = parseInt(this.page) - 3;\n            var end = parseInt(this.page) + 3;\n            // if start is too low, shift all of [start,end] up\n            if (start < 1) {\n                var diff = 1 - start;\n                start += diff;\n                end += diff;\n            }\n            // if end is too high, shift all of [start,end] down\n            if (end > this.pageCount) {\n                var diff = end - this.pageCount;\n                start -= diff;\n                end -= diff;\n            }\n            // if start is too low again, just set it to 1\n            if (start < 1) {\n                start = 1;\n            }\n            var pages = [];\n            for (var i = start; i <= end; i++) {\n                pages.push(i);\n            }\n            return pages;\n        },\n        queryParamsToSave() {\n            var params = {\n                sort_field: this.sortField,\n                sort_order: this.sortOrder,\n                search: this.search,\n                page: this.page,\n                page_length: this.pageLengthSelection,\n            }\n            if (this.endpointParams) {\n                _.merge(params, this.endpointParams);\n            }\n            // Now that we have all the params, let's check if any of them\n            // would be set to those values by default. If so, we can keep\n            // the URL small by taking them out entirely.\n            for (var field in params) {\n                if (params[field] == this.initialQueryParams[field]) {\n                    delete params[field];\n                }\n            }\n            return params;\n        },\n        savingToCookies() {\n            return Boolean(this.name);\n        },\n    },\n    methods: {\n        refreshSource() {\n            if (this.blockRefresh) {\n                return;\n            }\n\n            //show loading indicator\n            this.loading = true;\n            this.showError = false;\n\n            this.source\n                .get()\n                .then((response) => {\n                    this.response = response;\n                    this.pagedItems = response.items;\n                    this.pageCount = response.pageCount;\n                    let page = response.page >= 1 ? response.page : 1;\n                    if (this.page != page) {\n                        this.page = page;\n                    }\n                    this.totalCount = response.totalCount;\n                    this.generatedItemKeys = {};\n                    //stop loading indicator\n                    this.loading = false;\n                })\n                .catch(err => {\n                    var msg = err && err.data && err.data.message ? err.data.message : '';\n\n                    //stop loading indicator\n                    this.loading = false;\n\n                    if (err == 'Error: Request overridden by newer request.') {\n                        this.showError = false;\n                    } else {\n                        //show error icon\n                        this.showError = true;\n\n                        console && console.log && console.log('Error when accessing paged data:', msg, err);\n                    }\n                })\n                .then(() => {\n                    if (this.csvExportable) {\n                        this.$nextTick(() => this.generateCsvData());\n                    }\n                });\n        },\n        fieldName(columnName) {\n            return this.columns[columnName];\n        },\n        isSortable(field)\n        {\n            if (this.sortable instanceof Array) {\n                return _.includes(this.sortable, field);\n            } else if (this.sortable) {\n                return true;\n            } else {\n                return false;\n            }\n        },\n        setSort(field) {\n            if (this.sortField === field) {\n                this.sortOrder = this.sortOrder === 'D' ? 'A' : 'D';\n                return;\n            } else if (this.defaultSortOrders && this.defaultSortOrders[field]) {\n                this.sortOrder = this.defaultSortOrders[field];\n            } else {\n                this.sortOrder = 'A';\n            }\n\n            this.sortField = field;\n        },\n        sortClass(field) {\n            if (field === this.sortField) {\n                return this.sortOrder === 'D' ? 'fa-sort-amount-desc active-sort pull-right' : 'fa-sort-amount-asc active-sort pull-right';\n            }\n            return 'fa-arrows-v text-muted pull-right';\n        },\n        /**\n         * Return item.field or, if field is a dot-delimited field,\n         * follow the chain of references to the last value.\n         */\n        valueFor(item, field) {\n            var obj = item;\n            var chain = field.split(/\\./);\n            while (obj && chain.length > 0) {\n                obj = obj[chain.shift()];\n            }\n            if (chain.length > 0) {\n                return undefined;\n            } else {\n                return obj;\n            }\n        },\n        getCookies(field) {\n            if (!this.name || !field || Cookies.get(this.name) === undefined) {\n                return null;\n            }\n\n            return JSON.parse(Cookies.get(this.name))[field];\n        },\n        setCookies(field, value) {\n            if (!this.name || !field) {\n                return false;\n            }\n\n            var cookie = Cookies.get(this.name);\n\n            if (cookie) {\n                cookie = JSON.parse(cookie);\n            } else {\n                cookie = {};\n            }\n\n            cookie[field] = value;\n            if (Cookies.set(this.name, cookie)) {\n                return true;\n            }\n\n            return false;\n        },\n        applyQueryParams() {\n            if (this.queryParamSaver) {\n                var params = this.queryParamSaver.get();\n                if (params) {\n                    if (typeof params.sort_field != 'undefined') {\n                        this.sortField = params.sort_field;\n                    }\n                    if (typeof params.sort_order != 'undefined') {\n                        this.sortOrder = params.sort_order;\n                    }\n                    if (typeof params.search != 'undefined') {\n                        this.search = params.search\n                    }\n                    if (typeof params.page != 'undefined') {\n                        this.page = params.page;\n                    }\n                    if (typeof params.page_length != 'undefined') {\n                        this.pageLengthSelection = params.page_length;\n                    }\n                    this.$emit('load-endpoint-params', params);\n                }\n            }\n        },\n        keyFor(item) {\n            if (this.keyField) {\n                return item[this.keyField];\n            }\n            if (item.id) {\n                return item.id;\n            }\n            return this.generateKeyFor(item);\n        },\n        generateKeyFor(item) {\n            var found = null;\n            _.each(this.generatedItemKeys, (saved_item, key) => {\n                if (item === saved_item) {\n                    found = key;\n                }\n            });\n            if (!found) {\n                // make a random key\n                found = new Date().valueOf() + '_' + new String(Math.random()).substr(2);\n                this.generatedItemKeys[found] = item;\n            }\n            return found;\n        },\n        generateCsvData() {\n            // This method depends on this.$refs, so it cannot be a computed property\n            this.csvData = this.pagedItems.map((item) => {\n                var id = this.keyFor(item);\n                var textItem = {};\n                _.each(this.activeFields, (field) => {\n                    textItem[this.columns[field]] = this.$refs['cell.' + id + '.' + field] && this.$refs['cell.' + id + '.' + field][0] ? this.$refs['cell.' + id + '.' + field][0].innerText.trim() : null;\n                });\n                return textItem;\n            });\n        },\n        resetActiveFields() {\n            this.activeFields = this.defaultActiveFields || Object.keys(this.columns);\n        },\n        storeActiveFieldsToCookies() {\n            var fields = {\n                on: [],\n                off: [],\n            };\n            for (var field in this.columns) {\n                if (_.includes(this.activeFields, field)) {\n                    fields.on.push(field);\n                } else {\n                    fields.off.push(field);\n                }\n            }\n\n            this.setCookies('fields', fields);\n        },\n        getActiveFieldsFromCookies() {\n            var fields = this.getCookies('fields');\n            var defaultOn = this.defaultActiveFields || Object.keys(this.columns);\n            return Object.keys(this.columns).filter(field => {\n                var fieldIsSelected = _.includes(fields.on, field);\n                var fieldIsDeselected = _.includes(fields.off, field);\n                var fieldDefaultsToOn = _.includes(defaultOn, field);\n                return fieldIsSelected || (fieldDefaultsToOn && !fieldIsDeselected);\n            });\n        },\n    },\n}\n</script>\n\n<style>\n    .nova-table div.form-group.pull-left.margin-left {\n        margin-left: .5em;\n    }\n\n    .table-loader{\n        opacity: .6;\n        position: absolute;\n        width: 100%;\n        height: 920px;\n        padding-top: 100px;\n        z-index: 1;\n    }\n\n    .pagination{\n        margin: 0 0 20px 0;\n    }\n\n    td.td-scheduled_or_posted_at-styles {\n        width: 115px;\n    }\n\n    .sortable {\n        white-space: nowrap;\n    }\n\n    .sortable i {\n        margin-top: 3px;\n    }\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buble_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NovaPageSelect_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3842ae70_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NovaPageSelect_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* unused harmony namespace reexport */
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__buble_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NovaPageSelect_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3842ae70_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NovaPageSelect_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3842ae70_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NovaPageSelect_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/NovaPageSelect.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3842ae70", Component.options)
  } else {
    hotAPI.reload("data-v-3842ae70", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ exports["a"] = Component.exports;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ul",
    { staticClass: "pagination pull-right" },
    [
      _vm.showJumps
        ? _c("li", { class: _vm.classFor("previous") }, [
            _vm.isDisabled("previous")
              ? _c("span", [
                  _c("i", { staticClass: "fa fa-angle-double-left" })
                ])
              : _c(
                  "a",
                  {
                    attrs: { href: "javascript:void(0)" },
                    on: {
                      click: function($event) {
                        _vm.setPage("first")
                      }
                    }
                  },
                  [_c("i", { staticClass: "fa fa-angle-double-left" })]
                )
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("li", { class: _vm.classFor("previous") }, [
        _vm.isDisabled("previous")
          ? _c("span", [_vm._v("Previous")])
          : _c(
              "a",
              {
                attrs: { href: "javascript:void(0)" },
                on: {
                  click: function($event) {
                    _vm.setPage("previous")
                  }
                }
              },
              [_vm._v("Previous")]
            )
      ]),
      _vm._v(" "),
      _vm._l(_vm.pages, function(p) {
        return _c("li", { class: _vm.classFor(p) }, [
          _c(
            "a",
            {
              attrs: { href: "javascript:void(0)" },
              on: {
                click: function($event) {
                  _vm.setPage(p)
                }
              }
            },
            [_vm._v(_vm._s(p))]
          )
        ])
      }),
      _vm._v(" "),
      _c("li", { class: _vm.classFor("next") }, [
        _vm.isDisabled("next")
          ? _c("span", [_vm._v("Next")])
          : _c(
              "a",
              {
                attrs: { href: "javascript:void(0)" },
                on: {
                  click: function($event) {
                    _vm.setPage("next")
                  }
                }
              },
              [_vm._v("Next")]
            )
      ]),
      _vm._v(" "),
      _vm.showJumps
        ? _c("li", { class: _vm.classFor("next") }, [
            _vm.isDisabled("next")
              ? _c("span", [
                  _c("i", { staticClass: "fa fa-angle-double-right" })
                ])
              : _c(
                  "a",
                  {
                    attrs: { href: "javascript:void(0)" },
                    on: {
                      click: function($event) {
                        _vm.setPage("last")
                      }
                    }
                  },
                  [_c("i", { staticClass: "fa fa-angle-double-right" })]
                )
          ])
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3842ae70", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(13);
/* harmony export (immutable) */ exports["default"] = addStylesClient;
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ },
/* 18 */
/***/ function(module, exports) {

module.exports = require(undefined);

/***/ },
/* 19 */
/***/ function(module, exports) {

module.exports = require(undefined);

/***/ },
/* 20 */
/***/ function(module, exports) {

module.exports = require(undefined);

/***/ },
/* 21 */
/***/ function(module, exports) {

module.exports = require(undefined);

/***/ },
/* 22 */
/***/ function(module, exports) {

module.exports = require(undefined);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buble_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NovaTable_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_79f12a59_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NovaTable_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* empty harmony namespace reexport */
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(6)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__buble_loader_node_modules_vue_loader_lib_selector_type_script_index_0_NovaTable_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_79f12a59_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NovaTable_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_79f12a59_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_NovaTable_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/NovaTable.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-79f12a59", Component.options)
  } else {
    hotAPI.reload("data-v-79f12a59", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ exports["default"] = Component.exports;


/***/ }
/******/ ])));
//# sourceMappingURL=NovaTable.js.map