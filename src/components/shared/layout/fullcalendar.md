## vue-full-calendar
We use [vue-full-calendar](https://github.com/croudtech/vue-fullcalendar) for our calendar component. View this [repo](https://github.com/BrockReece/vue-fullcalendar-example) for a full webpack project using the vue-full-calendar.

**Installation**

```js static
import Vue from 'vue'
import VueFullCalendar from 'vue-full-calendar'

Vue.use(VueFullCalendar)
```

**Events**

See the [docs](https://github.com/croudtech/vue-fullcalendar#using-a-json-feed) for formatting an event array or loading from an API

### Basic usage

    <full-calendar :events="events"/>

### Changing the appearance
You can use the **default-view** and **header** props to change the appearance of the calendar

    <full-calendar  :events="events"
                    default-view="listWeek"
                    :header="{
                        left:'title',
                        center: '',
                        right: 'today prev,next',
                    }"
    />

### Read Only
You can use the **selecatable** and **editable** props to present a readOnly calendar

    <full-calendar  :events="events"
                    :selecatable="false"
                    :editable="false"
    />

### Additional Config
You can use the **config** prop to pass in additional config to fullcalendar, see their [docs](https://fullcalendar.io/docs/) for more usage examples

    <full-calendar  :events="events"
                    :config="{
                        minTime: '07:00:00',
                        maxTime: '19:00:00',
                        hiddenDays: [0,6],
                        businessHours: {
                            dow: [ 1, 2, 3, 4 ],
                            start: '09:00',
                            end: '17:30',
                        },
                        eventColor: '#378006',
                    }"
    />

### Events emitted
This component will emit events when you interact with calendar items. **event-selected**, **event-drop**, **event-resize** and **event-created** events are demo'd in the below example

    <full-calendar  :events="events"
                    @event-selected="$toasted.show('Event Selected')"
                    @event-drop="$toasted.show('Event Dropped')"
                    @event-resize="$toasted.show('Event Resized')"
                    @event-created="$toasted.show('Event Created')"

    />
