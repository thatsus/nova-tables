import NovaTable from "./NovaTable.vue";

export default {
    install(Vue, options) {
        Vue.component("nova-table", NovaTable);
    }
};