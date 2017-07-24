### Basic usage

    <croud-date :date="today" />

### Custom formatting
You can pass through your own custom moment.js format string through the props. I would use this sparingly though to promote consistency with this component

    <croud-date :date="today" format="MMMM Do YYYY, h:mm:ss a" />
