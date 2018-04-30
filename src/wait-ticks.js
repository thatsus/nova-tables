function plugin(Vue) {
    if (typeof Vue.nextTick != 'function') {
        throw "Cannot find nextTick() on Vue";
    }

    Vue.waitTicks = function(n) {
        let promise = this.nextTick();
        for (let i = 1; i < n; i++) {
            promise = promise.then(() => this.nextTick());
        }
        return promise;
    };
}

export default plugin;