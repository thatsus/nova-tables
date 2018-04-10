import FuzzyMatcher from './fuzzy-matcher.js';
import AbstractSource from './abstract-source.js';

class ArraySource extends AbstractSource
{
    constructor(items, matcher) {
        super();
        this.items = items;
        this.filterClosures = [];
        this.matcher = matcher || new FuzzyMatcher();
    }

    addFilter(filter) {
        this.filterClosures.push(filter);
    }

    get() {
        var promise = Promise.resolve(this.items);
        this.filterClosures.map((filter) => {
            promise = promise.then(filter);
        });
        return promise
            .then((items) => {
                return items.filter((item) => {
                        if (this.search) {
                            // find out if any fields match
                            return _.find(this.search_fields, (field) => {
                                    return this.matcher.matches(this.search, item[field]);
                                });
                        }
                        return true;
                    });
            })
            .then((items) => {
                var sort_field = this.sort_field;
                return items.sort((a, b) => {
                    if (a[sort_field] < b[sort_field]) {
                        return this.sort_direction === 'A' ? -1 : 1;
                    } else if (a[sort_field] > b[sort_field]) {
                        return this.sort_direction === 'A' ? 1 : -1;
                    }
                    return 0;
                });
            })
            .then((items) => {
                var page_length = this.page_length || items.length;
                if (!this.page) {
                    this.page = 1;
                }
                var pageCount = page_length ? Math.ceil(items.length / page_length) : 1;
                if (this.page > pageCount) {
                    this.page = pageCount;
                }
                var totalCount = items.length;
                items = items.slice((this.page - 1) * page_length, this.page * page_length);
                return {
                    items: items, 
                    pageCount: pageCount,
                    page: this.page,
                    totalCount: totalCount,
                };
            });
    }
}

export default ArraySource;
