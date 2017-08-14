<template>
    <croud-paginator :current-page="pagination.current_page" @input="loadPage($event)" :pagination="pagination" />
</template>

<script>
import PaginationMixin from 'vuetable-2/src/components/VuetablePaginationMixin'
import CroudPaginator from '../../misc/Paginator'

export default {
    mixins: [PaginationMixin],
    components: {
        CroudPaginator,
    },
    computed: {
        pagination() {
            return {
                current_page: 1,
                total_pages: this.tablePagination ? this.tablePagination.last_page : 1,
                ...this.tablePagination,
            }
        },
    },
    methods: {
        registerEvents() {
            const self = this

            this.$on('vuetable:pagination-data', (tablePagination) => {
                self.setPaginationData(tablePagination)
            })
        },
    },
    created() {
        this.registerEvents()
    },
}
</script>
