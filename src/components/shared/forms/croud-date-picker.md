### Basic Usage

    <croud-date-picker v-model="date"></croud-date-picker>

### Date Ranges
Pass the min-date and/or max-date props to set an allowed date range

    <croud-date-picker v-model="date" :min-date="date.toDate()" :max-date="date.add(1, 'weeks').toDate()"></croud-date-picker>

