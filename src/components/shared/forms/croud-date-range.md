### Basic Usage
Out of the box this component works as a singe date/date range combo selecter, with single date being the default

    <croud-date-range :start.sync="today" :end.sync="tomorrow"></croud-date-range>

### Date Range Only
If you only require date ranges you can set the 'dateRangeOnly' prop to true

    <croud-date-range :start.sync="today" :end.sync="tomorrow" :dateRangeOnly="true"></croud-date-range>

### Events
Dates fed into the datepicker through the events array prop will be underlined in yellow, you can provide information on what these highlighted dates represent by using the events-info slot

e.g. const yesterday = [moment().add(-1, 'day').toDate().toDateString()],

    <croud-date-range :events="yesterday">
        <div slot="events-info">
            <semantic-divider class="hidden"/>
            <p>Yesturday will always be highlighted</p>
        </div>
    </croud-date-range>
