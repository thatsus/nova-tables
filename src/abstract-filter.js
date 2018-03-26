/*
|--------------------------------------------------------------------------
| AbstractFilter
|--------------------------------------------------------------------------
|
| A base class for filter objects that work with NovaTable.
|
*/

class AbstractFilter
{
    constructor() {
        this.search = '';
        this.search_fields = [];
        this.sort_field = '';
        this.sort_direction = 'A';
        this.onChangeClosures = [];
        this.page = null;
        this.page_length = null;
    }

    setPage(page, page_length) {
        this.page = page;
        this.page_length = page_length;
        this.fireChangeEvent();
        return this;
    }

    setSearch(search, fields) {
        this.search = search;
        this.search_fields = fields;
        this.fireChangeEvent();
        return this;
    }

    setSort(field, direction) {
        this.sort_field = field;
        this.sort_direction = direction;
        this.fireChangeEvent();
        return this;
    }

    onChange(closure) {
        this.onChangeClosures.push(closure);
    }

    fireChangeEvent() {
        this.onChangeClosures.map((closure) => closure());
    }

    filter() {
        throw new Error('`filter` has not been defined on this class');
    }
}

module.exports = AbstractFilter;
