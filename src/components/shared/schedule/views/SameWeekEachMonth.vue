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
            <strong>On</strong>
        </div>
        <div class="ui column">
            <div class="ui right labeled input">
                <semantic-form-dropdown v-model="weekOfMonth" :options="periodOptions" placeholder="Period"></semantic-form-dropdown>
            </div>
            <div class="ui right labeled input">
                <semantic-form-dropdown v-model="days" :options="dayOptions" placeholder="Day"></semantic-form-dropdown>
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
                    week_of_month: 'first',
                    days: {
                        mon: true,
                    },
                },
            }
        },
    }
</script>
