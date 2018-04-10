import Vue from 'vue';
import AbstractSource from './abstract-source.js';
import TimeoutThrottle from './timeout-throttle.js';
import $ from 'jquery';

class ServerSideSource extends AbstractSource
{
    constructor(endpoint) {
        super();
        this.endpoint = endpoint;
        this.paramMergers = [];
        this.throttle = new TimeoutThrottle();
        this.slug = null;
    }

    addParamMerger(closure) {
        this.paramMergers.push(closure);
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
        this.paramMergers.map(closure => closure(data));
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

    get() 
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

export default ServerSideSource;
