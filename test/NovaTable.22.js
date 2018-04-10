import $ from 'jquery';
import _ from 'lodash';
import assert from 'assert';
import NovaTable from '../src/NovaTable.vue';
import NovaPageSelect from '../src/NovaPageSelect.vue';
import Vue from 'vue';
import AbstractSource from '../src/abstract-source.js';
import ArraySource from '../src/array-source.js';
import ServerSideSource from '../src/server-side-source.js';

export default function() {

    it('should have NovaPageSelect', function () {
        assert.equal(NovaTable.NovaPageSelect, NovaPageSelect);
    });

    it('should have ArraySource', function () {
        assert.equal(NovaTable.ArraySource, ArraySource);
    });

    it('should have ServerSideSource', function () {
        assert.equal(NovaTable.ServerSideSource, ServerSideSource);
    });

    it('should have AbstractSource', function () {
        assert.equal(NovaTable.AbstractSource, AbstractSource);
    });
}
