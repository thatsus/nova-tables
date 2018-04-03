
// Start with a `describe` for the module we're testing.
describe('NovaTable', function () {

    // You can nest `describe` within `describe` if you have a need to group 
    // tests together.
    // And this makes it easier to break down this complicated test suite into
    // multiple files. NovaTable.1.js here exports a closure.
    describe('1. barebones with items attribute', require('./NovaTable.1.js'));

    describe('2. barebones with endpoint attribute', require('./NovaTable.2.js'));

    describe('3. barebones with itemSource attribute', require('./NovaTable.3.js'));
    
    describe('4. slots', require('./NovaTable.4.js'));

    describe('5. footer', require('./NovaTable.5.js'));

    describe('6. searchable with itemSource attribute', require('./NovaTable.6.js'));
    
    describe('7. adjustableColumns with itemSource attribute', require('./NovaTable.7.js'));

    describe('8. sortable=true with itemSource', require('./NovaTable.8.js'));

    describe('9. sortable=Array with itemSource', require('./NovaTable.9.js'));

    describe('10. defaultSortField with itemSource', require('./NovaTable.10.js'));

    describe('11. defaultActiveFields with itemSource', require('./NovaTable.11.js'));

    describe('12. pageLength with itemSource', require('./NovaTable.12.js'));

    describe('13. pageLength higher than total with itemSource', require('./NovaTable.13.js'));

    describe('14. pageLengthOptions with itemSource', require('./NovaTable.14.js'));

    describe('15. defaultSortOrders with itemSource', require('./NovaTable.15.js'));

    describe('16. name with itemSource', require('./NovaTable.16.js'));

    describe('17. queryParamSaver with itemSource', require('./NovaTable.17.js'));

    describe('18. Cookie persistance with itemSource', require('./NovaTable.18.js'));

    describe('19. endpoint-params', require('./NovaTable.19.js'));

    describe('20. keyField with items', require('./NovaTable.20.js'));

    describe('21. csvExportable with itemSource', require('./NovaTable.21.js'));
});
