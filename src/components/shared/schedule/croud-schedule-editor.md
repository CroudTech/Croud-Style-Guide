### Basic usage

    <croud-schedule-editor />

### Slots
You can replace the buttons by using the **actions** slot

    <croud-schedule-editor>
        <template slot="actions">
            <button class="ui button">Foo</button>
            <button class="ui yellow button">Bar</button>
        </template>
    </croud-schedule-editor>

### Events
This component emit's (.sync compatible) **update:schedule** and **cancelled** events

    <croud-schedule-editor @update:schedule="$toasted.show('Schedule Set')" @cancelled="$toasted.error('Cancelled')"/>
