This is a custom iteration of our dropdown component, which shows a selected items summary popup on hover, and shows a single value if one option is selected and a count summary if more than one item is selected, it is ideal for use in a multi selection scenario.

We use the semantic-form-dropdown component from the [croud-vue-semantic](https://github.com/CroudSupport/vue-semantic) library. Click [here](http://croudsupport.github.io/vue-semantic/#semantic-form-dropdown) for full component docs.

*Note: Bold items show the value is selected, dark grey shows the currect highlighted item using the arrow keys, and there is a lighter grey background on items the mouse is currently hoverd over*

### Basic Usage
Simply provide a v-modal and options array to the selector for a basic setup

    <croud-summarised-multi-selector v-model="summarisedDropdownOne" :options="listExamples.basic" placeholder="Select an item"/>

### Read Only
If readOnly is set to true, you will see a summary of the selected values

    <croud-summarised-multi-selector v-model="summarisedDropdownTwo" :options="listExamples.basic" :readOnly="true" />

### Custom Fields and Default Summary
In this example we have provided a fields map so the value used on selction is name rather than the id which is provided in the options array (default behaviour), as we have a list of channels here a custom summary placeholder is set to show 'Select a channel'

    <croud-summarised-multi-selector  v-model="summarisedDropdownThree" :options="summarisedChannels" :fields="{ title: 'name', value: 'name' }" defaultSummary="Select a channel" placeholder="Select a channel" />

### Reset Method
You can manipulate this component by setting a ref to call the reset method, which will clear the dropdown and reset it to its original state if you require

    <span>
        <croud-summarised-multi-selector ref="channels" v-model="summarisedDropdownFour" :options="summarisedChannels" :fields="{ title: 'name', value: 'name' }" defaultSummary="Select a channel" placeholder="Select a channel" />

        <semantic-divider/>

        <button class="ui button" @click="$refs.channels.reset()">Reset Dropdown</button>
    </span>
