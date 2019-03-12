<template>
    <div class="ui two column grid">
        <div class="ui column">
            <strong>Every</strong>
        </div>
        <div class="ui column">
            <div class="ui right labeled input">
                <input type="number" v-model="interval" min="1">
                <div class="ui label">months</div>
            </div>
        </div>
        <div class="ui column">
            <strong>Day</strong>
        </div>
        <div class="ui column">
            <div class="ui right labeled input">
                <input type="number" v-model="dayOfMonth" min="1" max="31">
                <div class="ui label">{{ ordinal }}</div>
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
                    period: 'months',
                    interval: 1,
                    day_of_month: 1,
                },
            }
        },
    }
</script>
