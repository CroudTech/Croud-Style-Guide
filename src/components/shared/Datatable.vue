<script>
    import debounce from 'lodash/debounce'
    import defaultsDeep from 'lodash/defaultsDeep'

    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import VuetablePagination from 'vuetable-2/src/components/VuetablePaginationDropdown'
    import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

    /**
     * A flexible datatable that handles API calls and pagination
     * @example ./croud-datatable.md
     */
    export default {
        name: 'croud-datatable',

        components: {
            Vuetable,
            VuetablePagination,
            VuetablePaginationInfo,
        },

          /* eslint-disable object-shorthand */
        render: function (createElement) {
            return createElement('div', { class: 'ui basic segment' }, [
                createElement('vuetable', {
                    props: {
                        ...this.$props,
                        ...this.config,
                    },
                    scopedSlots: this.$scopedSlots,
                    ref: 'vuetable',
                    on: {
                        'vuetable:pagination-data': this.onPaginationData,
                        'vuetable:cell-clicked': this.onCellClicked,
                        'vuetable:loading': () => { this.loading = true },
                        'vuetable:loaded': () => { this.loading = false },
                    },
                }),
                createElement('div', { class: ['ui', 'segment', 'grid', 'basic'] }, [
                    createElement('vuetable-pagination-info', {
                        ref: 'paginationInfo',
                    }),
                    createElement('vuetable-pagination', {
                        ref: 'pagination',
                        on: {
                            'vuetable-pagination:change-page': this.onChangePage,
                        },
                    }),
                ]),
                createElement('div', {
                    class: {
                        ui: true,
                        inverted: true,
                        dimmer: true,
                        active: this.loading,
                    },
                }, [
                    createElement('div', { class: 'ui text large loader' }),
                ]),
            ])
        },

        props: {
            /**
             * vueTable-2 config that gets passed through to vue-table
             * @see https://github.com/ratiw/vuetable-2
             */
            vuetableConfig: {
                type: Object,
                required: true,
            },

            /**
             * Name of the globally registered component that will be used as the detail row
             * @see https://github.com/ratiw/vuetable-2-tutorial/wiki/lesson-12
             */
            detailRowComponent: {
                type: String,
            },

            /**
             * Transform function for preping the pagination data
             *
             * The default for this prop works with core
             */
            transform: {
                type: Function,
                default(data) {
                    data.meta.pagination = {
                        last_page: data.meta.pagination.total_pages,
                        next_page_url: data.meta.pagination.links.next,
                        prev_page_url: data.meta.pagination.links.previous,
                        from: (data.meta.pagination.per_page * data.meta.pagination.current_page) - (data.meta.pagination.per_page - 1),
                        to: data.meta.pagination.per_page * data.meta.pagination.current_page,
                        ...data.meta.pagination,
                    }
                    return data
                },
            },
        },

        methods: {
            onPaginationData(paginationData) {
                this.$emit('vuetable:pagination-data', paginationData)
                this.$refs.pagination.setPaginationData(paginationData)
                this.$refs.paginationInfo.setPaginationData(paginationData)
            },

            onChangePage(page) {
                this.$refs.vuetable.changePage(page)
            },

            onCellClicked(data) {
                this.$refs.vuetable.toggleDetailRow(data.id)
            },
        },

        data() {
            return {
                loading: false,
            }
        },

        computed: {
            config() {
                return defaultsDeep(this.vuetableConfig, {
                    'pagination-path': 'meta.pagination',
                    css: {
                        tableClass: 'ui table',
                        dropdownClass: 'ui dropdown',
                    },
                })
            },
        },

        watch: {
            vuetableConfig: {
                deep: true,
                handler: debounce(function () {
                    this.$refs.vuetable.refresh()
                }, 500),
            },
        },
    }
</script>
