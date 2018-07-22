This is a custom iteration of our dropdown component, which shows a selected items summary popup on hover, and shows a single value (based on the summary field on the fields prop) if one option is selected and a count summary if more than one item is selected, it is ideal for use in a multi selection scenario.

We use the semantic-form-dropdown component from the [croud-vue-semantic](https://github.com/croudtech/vue-semantic) library. Click [here](http://croudtech.github.io/vue-semantic/#semantic-form-dropdown) for full component docs.

### Basic Usage
Simply provide the value prop, v-model and an options array to the selector for a basic setup

    <croud-summarised-multi-selector v-model="summarisedDropdownOne" :options="listExamples.basic" placeholder="Select an item"/>

### Custom Dropdown Fields and Summary Field
By default dropdown's set the selected value as 'id' and the title as 'name' from your options array, you can edit these by passing the fields prop, also you can define the summary field on this prop which will be used in generating the summary (default is name)

In the below example we want the selected value to be 'name', however we want the summary to show which ID's are selected so have set the summary field to 'id'

    <croud-summarised-multi-selector  v-model="summarisedDropdownThree" :options="summarisedChannels" :fields="{ title: 'name', value: 'name', summary:'id' }" defaultSummary="Select a channel" placeholder="Select a channel" />

### Read Only
If readOnly is set to true, you will see a summary of the selected values

    <croud-summarised-multi-selector v-model="summarisedDropdownTwo" :options="listExamples.basic" :readOnly="true" />
### Reset Method
You can manipulate this component by setting a ref to call the reset method, which will clear the dropdown and reset it to its original state if you require

    <span>
        <croud-summarised-multi-selector ref="channels" v-model="summarisedDropdownFour" :options="summarisedChannels" :fields="{ title: 'name', value: 'name' }" defaultSummary="Select a channel" placeholder="Select a channel" />

        <semantic-divider/>

        <button class="ui button" @click="$refs.channels.reset()">Reset Dropdown</button>
    </span>

Check the props and methods section above for more options
