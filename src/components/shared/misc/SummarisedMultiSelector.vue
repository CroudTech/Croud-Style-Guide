<template>
    <div class="dropdown-wrapper">
        <semantic-form-dropdown
            ref="summarisedSelector"
            v-show="!readOnly"
            v-model="model"
            :options="options"
            :data-tooltip="dropdownSummary"
            :placeholder="placeholder"
            :data-inverted="true"
            :auto-update="false"
            :autoUpdateOptions="false"
            :full_text_search="true"
            :title_field="computedFields.title"
            :value_field="computedFields.value"
            :inline="inline"
            :fluid="fluid"
            search multiple
            :settings="dropdownSettings"
            @dropdown-selected="dropdownSelected"
        />

        <div v-if="readOnly && selectedLength < 1">
            {{ placeholder }}
        </div>

        <div v-else-if="readOnly && selectedLength" :data-tooltip="selectedItems" :data-inverted="true">
            {{ displayText }}
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

        data() {
            return {
                showSummary: true,
            }
        },

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
            * Maps the dropdown to the title/value/summary fields on your options array. By default, value will use the 'id' field and title and summary will use the 'name' field
            */
            fields: {
                type: Object,
                default() {
                    return {
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
                        onShow: () => {
                            this.showSummary = false
                        },
                        onHide: () => {
                            this.showSummary = true
                            this.$emit('dropdown-hidden')
                        },
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
                    return false
                },
            },

            /**
            * If the component should be fluid
            */
            fluid: {
                type: Boolean,
                default() {
                    return false
                },
            },
        },

        computed: {
            model: {
                get() {
                    return this.value
                },

                set(val) {
                    this.$emit('input', this.getArray(val))
                },
            },

            computedFields() {
                return {
                    value: 'id',
                    title: 'name',
                    summary: 'name',
                    ...this.fields,
                }
            },

            computedModel() {
                return Array.isArray(this.model) ? this.model : this.model.split(',')
            },

            selectedLength() {
                return this.computedModel.length
            },

            selectedItems() {
                const normalised = this.computedModel.map(v => v.toString())

                return this.options.filter((option) => {
                    if (normalised.indexOf(option[this.computedFields.value].toString()) > -1) {
                        return option[this.computedFields.value]
                    } return null
                }).map(selected => selected[this.computedFields.summary]).join(', ')
            },

            summary() {
                if (this.model.length < 1) return this.defaultSummary
                return this.selectedItems
            },

            dropdownSummary() {
                return this.showSummary ? this.summary : this.showSummary
            },

            displayText() {
                if (this.selectedLength < 2) {
                    return this.selectedItems
                }
                return `${this.selectedLength} Selected`
            },
        },

        methods: {
            dropdownSelected(val) {
                this.$emit('dropdown-selected', this.getArray(val))
            },

            setLabel() {
                if (this.model.length < 1) return
                $(this.$refs.summarisedSelector.$el).dropdown('set text', this.displayText)
            },

            reset() {
                $(this.$refs.summarisedSelector.$el).dropdown('clear')
                this.$nextTick(() => {
                    $(this.$refs.summarisedSelector.$el).dropdown('refresh')
                    this.$nextTick(this.$forceUpdate())
                })
            },

            getArray(val) {
                if (!val) return []
                return val.split(',')
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

    .dropdown-wrapper {
        width: 100%;

        /deep/ .ui.dropdown {

            .text {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            span.sizer {
                display: none;
            }

            &.inline {
                padding: 0;
            }
        }
    }

    [data-tooltip]:after {
        z-index: $croud-layer-2;
    }
</style>
