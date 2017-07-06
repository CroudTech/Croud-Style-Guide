<template>
    <div class="ui small pagination menu" v-if="pagination.total_pages > 1 && pagination.total_pages <= 5">
        <span v-for="page in pages">
              <a class="item" :class="{active: current === page}" @click="current = page">{{ page }}</a>
        </span>
    </div>

    <div class="ui small pagination borderless menu" v-else-if="pagination.total_pages > 1">
        <a :class="startClass" @click="current = 1">First Page</a>
        <a :class="startClass" @click="current -= 1">Prev</a>
        <a class="item">Page {{current}} of {{pagination.total_pages}}</a>
        <a :class="endClass" class="item" @click="current += 1">Next</a>
        <a :class="endClass" @click="current = pagination.total_pages">Last Page</a>
    </div>
</template>

<script>
    /**
    * @example ./croud-paginator.md
    */
    export default {
        name: 'croud-paginator',
        model: {
            prop: 'currentPage',
        },
        props: {
            /**
            *
            */
            pagination: {
                required: true,
                type: Object,
            },
            /**
            * Page Currently being displayed
            */
            currentPage: {
                type: Number,
                required: true,
            },
        },

        computed: {
            current: {
                get() {
                    return this.currentPage
                },
                set(page) {
                    this.$emit('set-current', page)
                    this.$emit('input', page)
                },
            },

            pages() {
                /* eslint-disable prefer-spread */
                return Array.apply(null, { length: this.pagination.total_pages }).map((v, k) => k + 1)
            },

            startClass() {
                return this.current > 1 ? 'item' : 'item disabled'
            },

            endClass() {
                return this.current < this.pagination.total_pages ? 'item' : 'item disabled'
            },
        },
    }
</script>
