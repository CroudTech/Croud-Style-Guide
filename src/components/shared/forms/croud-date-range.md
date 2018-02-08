### Basic Usage
Out of the box this component works as a singe date/date range combo selecter, with single date being the default

    <croud-date-range :start.sync="today" :end.sync="tomorrow"></croud-date-range>

### Date Range Only
If you only require date ranges you can set the 'dateRangeOnly' prop to true

    <croud-date-range :start.sync="today" :end.sync="tomorrow" :dateRangeOnly="true"></croud-date-range>
