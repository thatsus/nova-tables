import NovaTable from '../src/NovaTable.vue';
import NovaPageSelect from '../src/NovaPageSelect.vue';
import AbstractSource from '../src/abstract-source.js';
import ArraySource from '../src/array-source.js';
import ServerSideSource from '../src/server-side-source.js';

export default function() {

    it('Has NovaPageSelect', () => {
        expect(NovaTable.NovaPageSelect).toEqual(NovaPageSelect);
    });

    it('Has ArraySource', () => {
        expect(NovaTable.ArraySource).toEqual(ArraySource);
    });

    it('Has ServerSideSource', () => {
        expect(NovaTable.ServerSideSource).toEqual(ServerSideSource);
    });

    it('Has AbstractSource', () => {
        expect(NovaTable.AbstractSource).toEqual(AbstractSource);
    });
}
