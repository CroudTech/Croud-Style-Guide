### Basic usage

    <croud-full-calendar />

### Views
You can change the default calendar views by using the **views** prop

    <croud-full-calendar :views="[{view: 'agendaWeek', title: 'Week'}]"/>


### Config
This wrapper sets some sensible fullcalendar config defaults, but you can override these with the **config** prop

    <croud-full-calendar :config="{hiddenDays: [0,6]}"/>

### Props and listeners
Any other vue-full-calendar props and listeners are passed through transparently

    <croud-full-calendar :events="events" :editable="true" @event-selected="$toasted.show('event clicked')"/>

