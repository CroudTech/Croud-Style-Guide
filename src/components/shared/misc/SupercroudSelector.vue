<template>
    <div class="dropdown-wrapper">
        <semantic-form-dropdown
            ref="supercroudSelector"
            v-model="model"
            :settings="dropdownSettings"
            :options="filteredOptions"
            :data-tooltip="summary"
            :placeholder="dropdownPlaceholder"
            :data-inverted="true"
            :auto-update="false"
            multiple
            class="team-aware">

            <div v-for="(users, team) in teams" class="header item" :data-value="team">
                <i class="dropdown icon"></i>
                <strong>{{ team }} Team</strong>
                <div class="menu">
                    <div class="item" v-for="user in users" :data-value="user.id">{{ user.name }}</div>
                </div>
            </div>

            <div class="item" :data-value="currentUserId">Me</div>

        </semantic-form-dropdown>
    </div>
</template>

<script>
    import _ from 'lodash'

    /**
    * A user selector dropdown that outputs a list of teams and each team member within.
    * @example ./croud-supercroud-selector.md
    */

    export default {
        name: 'croud-supercroud-selector',

        props: {
            /**
            * Pass the current users ID
            */
            currentUserId: {
                type: [Number, String],
                default() {
                    return ''
                },
            },

            /**
            * Pass an array of teams
            */
            teamsArray: {
                type: Array,
                default() {
                    return []
                },
            },

            /**
            * Pass any additional users to show in the dropdown. ie SC's with overdue tasks
            */
            options: {
                type: Array,
                default() {
                    return []
                },
            },

            /**
            * The current value of the dropdown
            */
            value: {
                type: [String, Array],
                default() {
                    return []
                },
            },

            /**
            * Defines the placeholder for the dropdown
            */
            dropdownPlaceholder: {
                type: String,
                default() {
                    return 'Select User'
                },
            },

            /**
            * Semantic dropdown settings
            */
            dropdownSettings: {
                type: Object,
                default() {
                    return {
                        useLabels: false,
                        allowCategorySelection: true,
                        onAdd: (val) => {
                            if (isNaN(val)) {
                                const existing = this.value.split(',').map(e => Number(e))
                                this.$nextTick(() => {
                                    this.teams[val].filter(u => existing.indexOf(u.id) === -1).forEach((u) => {
                                        $(this.$refs.supercroudSelector.$el).dropdown('set selected', u.id)
                                    })
                                    $(this.$refs.supercroudSelector.$el).dropdown('remove selected', val)
                                })
                            }
                        },

                        onRemove: (val) => {
                            if (isNaN(val)) {
                                const existing = this.value.split(',').map(e => Number(e))
                                this.$nextTick(() => {
                                    existing.filter(e => this.teams[val].map(u => u.id).indexOf(e) !== -1).forEach((e) => {
                                        $(this.$refs.supercroudSelector.$el).dropdown('remove selected', e)
                                    })
                                })
                            }
                        },
                    }
                },
            },
        },

        data() {
            return {
                users: [],
            }
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
                const split = typeof this.model === 'object' ? this.model : this.model.split(',')
                return split.map((user) => {
                    if (this.currentUserId === user) {
                        return 'Me'
                    }

                    const opt = this.users.find(option => option.id === Number(user))
                    return opt ? opt.name : user
                }).join(', ')
            },

            filteredOptions() {
                let teamOptions = []
                Object.keys(this.teams).forEach((key) => {
                    teamOptions = _.unionWith(teamOptions, this.teams[key].map(u => u.id), _.isEqual)
                })
                return this.options.filter(option => option.id !== Number(this.currentUserId)).filter(option => teamOptions.indexOf(option.id) === -1)
            },

            teams() {
                const teams = {}
                this.teamsArray.forEach((team) => {
                    teams[team.name] = team.users.filter(user => user.id !== Number(this.currentUserId))

                    this.users = _.unionWith(this.users, team.users, _.isEqual)
                })
                return teams
            },
        },

        watch: {
            options() {
                this.users = _.unionWith(this.users, this.options, _.isEqual)
            },
        },

        mounted() {
            this.users = _.unionWith(this.users, this.options, _.isEqual)
        },
    }
</script>

<style scoped lang="scss">
    @import '../../../resources/sass/variables/_all.scss';

    .dropdown-wrapper /deep/ .team-aware.ui.selection.dropdown.multiple {
        z-index: $croud-layer-8;

        .menu {
            overflow-x: visible;
            overflow-y: visible;
            max-height: initial;
        }
    }

</style>
