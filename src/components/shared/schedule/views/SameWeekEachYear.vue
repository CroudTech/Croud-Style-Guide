<template>
    <div class="ui two column grid">
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

        <div class="ui column">
            <strong>Month</strong>
        </div>
        <div class="ui column">
            <div class="ui right labeled input">
                <semantic-form-dropdown v-model="months" :options="monthOptions" placeholder="Month"></semantic-form-dropdown>
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
                    period: 'years',
                    interval: 1,
                    week_of_month: 'first',
                    days: {
                        mon: true,
                    },
                    months: {
                        jan: true,
                    },
                },
            }
        },
    }
</script>
