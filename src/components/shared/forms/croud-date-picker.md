### Basic Usage

    <croud-date-picker v-model="today"></croud-date-picker>

### Date Ranges
Pass the min-date and/or max-date props to set an allowed date range

    <croud-date-picker v-model="today" :min-date="today.toDate()" :max-date="today.add(1, 'weeks').toDate()"></croud-date-picker>

