<template>
    <div class="dropdown-wrapper">
        <semantic-form-dropdown
            ref="summarisedSelector"
            v-if="!readOnly"
            v-model="model"
            :options="options"
            :data-tooltip="summary"
            :placeholder="placeholder"
            :data-inverted="true"
            :auto-update="false"
            :autoUpdateOptions="false"
            :full_text_search="true"
            :title_field="fields.title"
            :value_field="fields.value"
            :inline="inline"
            :fluid="fluid"
            search multiple
            :settings="dropdownSettings"
            @dropdown-selected="dropdownSelected"
        />

        <div v-else-if="selectedLength < 2" :data-tooltip="summary" :data-inverted="true">
            {{ model }}
        </div>

        <div v-else :data-tooltip="summary" :data-inverted="true">
             {{ selectedLength }} Selected
        </div>
    </div>
</template>

<script>
    /**
     * A custom multi-select dropdown useful for multi selection scenarios
     *
     * @example ./croud-summarised-mutli-selector.md
     */

    export default {

        name: 'croud-summarised-multi-selector',

        props: {
            /**
            * Pass an array of options to display in the dropdown
            */
            options: {
                type: Array,
                default() {
                    return []
                },
            },

            /**
            * Maps the dropdown to the title/value fields on your options array.
            */
            fields: {
                type: Object,
                default() {
                    return {
                        title: 'name',
                        value: 'id',
                    }
                },
            },

            /**
            * The current value of the dropdown, v-model alias
            */
            value: {
                required: true,
                type: [String, Array],
                default() {
                    return ''
                },
            },

            /**
            * An optional placeholder for the dropdown
            */
            placeholder: {
                type: String,
                default() {
                    return ''
                },
            },

            /**
            * Default text for the dropdown summary popup
            */
            defaultSummary: {
                type: String,
                default() {
                    return 'Select an item'
                },
            },

            /**
            * Semantic ui dropdown configuration
            */
            dropdownSettings: {
                type: Object,
                default() {
                    return {
                        useLabels: false,
                        showOnFocus: true,
                        onHide: () => this.$emit('dropdown-hidden'),
                    }
                },
            },

            /**
            * If the component should be in read only mode
            */
            readOnly: {
                type: Boolean,
                default() {
                    return false
                },
            },

            /**
            * If the component should be inline
            */
            inline: {
                type: Boolean,
                default() {
                    return true
                },
            },

            /**
            * If the component should be fluid
            */
            fluid: {
                type: Boolean,
                default() {
                    return true
                },
            },
        },

        computed: {
            model: {
                get() {
                    return this.value
                },

                set(val) {
                    this.$emit('input', val)
                },
            },

            summary() {
                const summary = this.model && Array.isArray(this.model) ? this.model.join(', ') : this.model.split(',').join(', ')
                if (summary.length) {
                    return summary
                }
                return this.defaultSummary
            },

            selectedLength() {
                return Array.isArray(this.model) ? this.model.length : this.model.split(',').length
            },
        },

        methods: {
            dropdownSelected(value) {
                this.$emit('dropdown-selected', value)
            },

            setLabel() {
                if (!(this.selectedLength && this.$refs.summarisedSelector)) return

                if (this.selectedLength === 1) {
                    $(this.$refs.summarisedSelector.$el).dropdown('set text', this.model)
                } else {
                    $(this.$refs.summarisedSelector.$el).dropdown('set text', `${this.selectedLength} Selected`)
                }
            },

            reset() {
                $(this.$refs.summarisedSelector.$el).dropdown('clear')
                this.$nextTick(() => {
                    $(this.$refs.summarisedSelector.$el).dropdown('refresh')
                    this.$nextTick(this.$forceUpdate())
                })
            },
        },

        watch: {
            model() {
                this.setLabel()
            },
        },

        mounted() {
            this.$nextTick(this.setLabel())
        },

    }
</script>

<style scoped lang="scss">
    @import '../../../resources/sass/variables/_all.scss';

    .dropdown-wrapper /deep/ .ui.dropdown.search.fluid.multiple.inline {
        padding: 0;

        .menu {
            overflow-x: visible;
            overflow-y: visible;
            max-height: initial;
        }

        span.sizer {
            display: none;
        }
    }

    [data-tooltip]:after {
        z-index: $croud-layer-2;
    }
</style>