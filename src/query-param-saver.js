import qs from 'qs';

class QueryParamSaver
{
    constructor(name) {
        if (!name) {
            throw new Error('No name supplied');
        }
        this.name = name;
    }

    get() {
        var query = qs.parse(location.search.substr(1));
        return query[this.name];
    }

    set(params) {
        var query = qs.parse(location.search.substr(1));
        if (params && Object.keys(params).length > 0) {
            query[this.name] = params;
        } else {
            delete query[this.name];
        }
        if (query && qs.stringify(query).length > 0) {
            history.replaceState({}, '', '?' + qs.stringify(query));
        } else {
            // If there are no query arguments, we don't want to put an 
            // ugly question mark on the URL.
            history.replaceState({}, '', location.pathname);
        }
    }
};

export default QueryParamSaver;
