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

// Start with a `describe` for the module we're testing.
describe('NovaTable', () => {
    // You can nest `describe` within `describe` if you have a need to group 
    // tests together.
    // And this makes it easier to break down this complicated test suite into
    // multiple files. NovaTable.1.js here exports a closure.
    
    describe('1. Barebones With items Attribute', test1);
    describe('2. Barebones With endpoint Attribute', test2);
    describe('3. Barebones With itemSource Attribute', test3);
// Need to wait for burgh to publist to npmjs
//    describe('4. Slots', test4);
    describe('5. Footer', test5);
    describe('6. Searchable With itemSource Attribute', test6);
    describe('7. AdjustableColumns With itemSource Attribute', test7);
    describe('8. Sortable=True With itemSource Attribute', test8);
    describe('9. Sortable=Array With itemSource Attribute', test9);
    describe('10. Sortable=True With defaultSortField And itemSource Attributes', test10);
    describe('11. DefaultActiveFields With itemSource Attributes', test11);
    describe('12. PageLength With itemSource Attribute', test12);
    describe('13. PageLength Higher Than Total With itemSource Attribute', test13);
    describe('14. PageLengthOptions With itemSource Attribute', test14);
    describe('15. DefaultSortOrders With itemSource Attribute', test15);
/*
    describe('16. name with itemSource', require('./NovaTable.16.js'));

    describe('17. queryParamSaver with itemSource', require('./NovaTable.17.js'));

    describe('18. Cookie persistance with itemSource', require('./NovaTable.18.js'));

    describe('19. endpoint-params', require('./NovaTable.19.js'));

    describe('20. keyField with items', require('./NovaTable.20.js'));

    describe('21. csvExportable with itemSource', require('./NovaTable.21.js'));

    describe('22. expose some things', require('./NovaTable.22.js'));
*/
});
