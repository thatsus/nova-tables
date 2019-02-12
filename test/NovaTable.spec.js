import test1 from './NovaTable.1.js';
import test2 from './NovaTable.2.js';
import test3 from './NovaTable.3.js';
import test4 from './NovaTable.4.js';
import test5 from './NovaTable.5.js';
import test6 from './NovaTable.6.js';
import test7 from './NovaTable.7.js';
import test8 from './NovaTable.8.js';
import test9 from './NovaTable.9.js';
import test10 from './NovaTable.10.js';
import test11 from './NovaTable.11.js';
import test12 from './NovaTable.12.js';
import test13 from './NovaTable.13.js';
import test14 from './NovaTable.14.js';
import test15 from './NovaTable.15.js';
import test16 from './NovaTable.16.js';
import test17 from './NovaTable.17.js';
import test18 from './NovaTable.18.js';
import test19 from './NovaTable.19.js';
import test20 from './NovaTable.20.js';
import test21 from './NovaTable.21.js';
import test22 from './NovaTable.22.js';
import test23 from './NovaTable.23.js';
import test24 from './NovaTable.24.js';
import test25 from './NovaTable.25.js';
import test26 from './NovaTable.26.js';
import test27 from './NovaTable.27.js';
import test28 from './NovaTable.28.js';
import test29 from './NovaTable.29.js';

// Start with a `describe` for the module we're testing.
describe('NovaTable', () => {
    // You can nest `describe` within `describe` if you have a need to group
    // tests together.
    // And this makes it easier to break down this complicated test suite into
    // multiple files. NovaTable.1.js here exports a closure.

    describe('1. Barebones With items', test1);
    describe('2. Barebones With endpoint', test2);
    describe('3. Barebones With itemSource', test3);
    describe('4. Slots', test4);
    describe('5. Footer', test5);
    describe('6. Searchable With itemSource', test6);
    describe('7. AdjustableColumns With itemSource', test7);
    describe('8. Sortable=True With itemSource', test8);
    describe('9. Sortable=Array With itemSource', test9);
    describe('10. Sortable=True With defaultSortField And itemSource', test10);
    describe('11. DefaultActiveFields With itemSource', test11);
    describe('12. PageLength With itemSource', test12);
    describe('13. PageLength Higher Than Total With itemSource', test13);
    describe('14. PageLengthOptions With itemSource', test14);
    describe('15. DefaultSortOrders With itemSource', test15);
    describe('16. Name With itemSource', test16);
    describe('17. QueryParamSaver With itemSource', test17);
    describe('18. Cookie Persistance With itemSource', test18);
    describe('19. Endpoint-params', test19);
    describe('20. KeyField With items', test20);
    describe('21. CsvExportable With itemSource', test21);
    describe('22. Expose Some Things', test22);
    describe('23. Emit Data Loaded', test23);
    describe('24. Default Table Class', test24);
    describe('25. Override Table Class', test25);
    describe('26. Row Callback Applies Class to Row', test26);
    describe('27. Row String Applies Class to Row', test27);
    describe('28. Table Callback Applies Class to Table', test28);
    describe('29. alwaysActiveFields hides fields from list', test29);
});
