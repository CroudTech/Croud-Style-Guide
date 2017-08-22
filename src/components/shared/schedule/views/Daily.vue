<template>
    <div class="ui two column grid">
        <div class="ui column">
            <strong>Every</strong>
        </div>
        <div class="ui column">
            <div class="ui right labeled input">
                <input type="number" v-model="interval" min="1">
                <div class="ui label">days</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Mixin from './EditorViews'

    export default {
        mixins: [Mixin],

        data() {
            return {
                resets: {
                    period: 'days',
                    interval: 1,
                },
            }
        },
    }
</script>
