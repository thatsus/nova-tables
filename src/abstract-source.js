/*
|--------------------------------------------------------------------------
| AbstractSource
|--------------------------------------------------------------------------
|
| A base class for Source objects that work with NovaTable.
|
*/

class AbstractSource
{
    constructor() {
        this.search = '';
        this.search_fields = [];
        this.sort_field = '';
        this.sort_direction = 'A';
        this.onChangeClosures = [];
        this.page = null;
        this.page_length = null;
        this.page_count = null;
    }

    setPage(page, page_length, page_count) {
        this.page = page;
        this.page_length = page_length;
        this.page_count = page_count;
        if (this.page > this.page_count){
            this.page = 1;
        }
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

    get() {
        throw new Error('`get` has not been defined on this class');
    }
}

module.exports = AbstractSource;
