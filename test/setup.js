//Override the default "about:blank" url to avoid SecurityExceptions on querystring stuff
var options = {
    url: "https://example.test/",
};
require('jsdom-global')(``, options);

global.expect = require('expect');
