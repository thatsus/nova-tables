import Vue from 'vue';
import AbstractFilter from './abstract-filter.js';
import TimeoutThrottle from './timeout-throttle.js';
import $ from 'jquery';

class ServerSideFilter extends AbstractFilter
{
    constructor(endpoint) {
        super();
        this.endpoint = endpoint;
        this.filterClosures = [];
        this.throttle = new TimeoutThrottle();
        this.slug = null;
    }

    addFilter(closure) {
        this.filterClosures.push(closure);
    }

    buildRequestData()
    {
        var data = {
            search: this.search,
            search_fields: this.search_fields,
            sort_field: this.sort_field,
            sort_direction: this.sort_direction,
            page: this.page,
            page_length: this.page_length,
        };
        this.filterClosures.map(closure => closure(data));
        return data;
    }

    buildRequestUrl()
    {
        var request_data = this.buildRequestData();
        if (/\?/.test(this.endpoint)) {
            return this.endpoint + '&' + $.param(request_data);
        } else {
            return this.endpoint + '?' + $.param(request_data);
        }
    }

    filter() 
    {
        var slug = this.slug = Math.random();
        return new Promise((resolve) => {
            this.throttle.throttle(() => {
                resolve(
                    Vue.http
                    .get(this.buildRequestUrl())
                    .then(response => {
                        if (slug !== this.slug) {
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
    }
}

module.exports = ServerSideFilter;
