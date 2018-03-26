/*----------------------------------------------------------------------------
 | 
 | TimeoutThrottle
 |
 |----------------------------------------------------------------------------
 | Run a closure, but wait a little while if we think another request might 
 | come soon. Good way to avoid hitting a server too rapidly.
 |
 | Mainly this is used for requests that are fired on key-press. If the user 
 | types quickly, we try to see how fast those are coming in and guess if
 | more are going to come in. If we think they will, then a timeout is
 | setup before we allow the request to run.
 |
 | If we are already waiting to run a closure and another one comes in, the 
 | pending one will be discarded. This code should only be used in cases
 | where discarded requests are acceptable.
 |
 */

const _ = require('lodash');

class TimeoutThrottle
{

    constructor() 
    {
        this.last_action = new Date().valueOf();
        this.request_intervals = [];
        this.last_reasonable_interval = 0;
    }

    throttle(closure)
    {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        // Find a reasonable speed.
        var reasonable_interval = 2 * this.averageSpeed();

        // Find the current speed.
        var now = new Date().valueOf();
        var new_interval = now - this.last_action;
        this.last_action = now;

        // A 1 second+ pause means they finished typing 
        // and started again.
        if (new_interval > 1000) {
            this.request_intervals = [];
        } else {
            this.request_intervals.push(new_interval);
        }

        // If there has been a long pause, there is 0 speed data
        // to work with, use some we saved from last time.
        if (reasonable_interval === 0) {
            reasonable_interval = this.last_reasonable_interval;
        } else {
            this.last_reasonable_interval = reasonable_interval;
        }

        // If a very short period has passed, then they are probably
        // still typing. Set a timeout for a reasonable interval. 
        // Else, just run it.
        if (new_interval < reasonable_interval) {
            this.timer = setTimeout(closure, reasonable_interval);
        } else {
            closure();
        }
    }

    averageSpeed()
    {
        if (this.request_intervals.length === 0) {
            return 0;
        }
        return _.sum(this.request_intervals) / this.request_intervals.length;
    }

}

module.exports = TimeoutThrottle;
