<template>
    <div class="ui two column grid">
        <div class="ui column">
            <strong>On</strong>
        </div>
        <div class="ui column">
            <div class="ui right labeled input">
                <input type="number" v-model="dayOfMonth" min="1" max="31">
                <div class="ui label">{{ ordinal }}</div>
            </div>

            <semantic-form-dropdown v-model="months" :options="monthOptions" placeholder="Month"></semantic-form-dropdown>
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
                    day_of_month: 1,
                    months: {
                        jan: true,
                    },
                },
            }
        },
    }
</script>
