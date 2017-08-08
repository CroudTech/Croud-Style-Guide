<template>
    <div class="ui circular image" :class="{[size]: true}">
        <img v-if="user.avatar && !errors" :src="user.avatar" @error="error"/>
        <!--<span class="ui large circular yellow label" v-else>{{ userInitials }}</span>-->
        <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
viewBox="0 0 500 500">
            <g>
                <circle :style="{fill: randomBackgroundColour}" cx="250" cy="250" r="245"></circle>
                <text x="50%" y="50%" text-anchor="middle" dy="0em" font-size="250px" alignment-baseline="central" fill="white">{{ userInitials }}</text>
            </g>
        </svg>
    </div>
</template>

<script>
    import colours from '../../../resources/config/variables/colours.json'

    /**
     * Avatar image with user's initials fallback
     *
     * @example ./croud-avatar.md
     */
    export default {
        name: 'croud-avatar',

        props: {
            /**
             * Core user object
             */
            user: {
                type: Object,
                required: true,
            },

            /**
             * Size of avatar
             * @see https://semantic-ui.com/elements/image.html#size
             */
            size: {
                type: String,
                default: 'small',
            },

            /**
             * Fallback if user has no intials
             *
             */
            defaultInitials: {
                type: String,
                default: 'U',
            },
        },

        data() {
            return {
                errors: false,
            }
        },

        methods: {
            error() {
                this.errors = true
            },
        },

        computed: {
            userInitials() {
                if (this.user.name) {
                    const parts = this.user.name.split(/[ -]/)
                    let initials = ''

                    for (let i = 0; i < parts.length; i += 1) {
                        initials += parts[i].charAt(0)
                    }

                    if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
                        initials = initials.replace(/[a-z]+/g, '')
                    }

                    return initials.substr(0, 3).toUpperCase()
                } return this.defaultInitials
            },

            palette() {
                return Object.values(colours.secondary)
            },

            randomBackgroundColour() {
                if (this.user.name) {
                    return this.palette[(this.user.name.length + 10) % (this.palette.length)]
                } return colours.secondary['croud-colour-black']
            },
        },

        watch: {
            'user.avatar': {
                handler() {
                    this.$nextTick(() => {
                        this.errors = false
                    })
                },
            },
        },
    }
</script>

<style scoped lang="scss">
    .ui.image > span.ui.circular.label {
        height: 35px;
        width: 100%;
    }
</style>
