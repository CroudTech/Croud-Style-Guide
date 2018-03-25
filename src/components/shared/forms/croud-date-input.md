### Basic usage
Pass through a moment object or an iso string to set the initial value

    <croud-date-input v-model="today"/>

### Invalid date
This component will emit the **invalid-date** event if the date input is cleared down or if moment can't parse the date from the input

    <croud-date-input v-model="today" @invalid-date="$toasted.error('Invalid date')"/>

### Validation
You can use the **min** and **max** props to set the limits of the date input. This is usually handled by the html5 input, but this component will emit a **validation-error** event if the date selected falls outside of the min and max values

    <croud-date-input v-model="today" :min="tomorrow" :max="tomorrow" @validation-error="$toasted.error('Failed validation')"/>
