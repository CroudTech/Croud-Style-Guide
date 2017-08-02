### semantic-checkbox
For our checkboxes, we use the semantic-checkbox component from the [croud-vue-semantic](https://github.com/CroudSupport/vue-semantic) library. Below are a few examples of semantic-checkbox in action. Click [here](http://croudsupport.github.io/vue-semantic/#semantic-checkbox) for full component docs.

### Basic usage

    <semantic-checkbox v-model="checkbox" label="🍕 Pizza" />

### Styling
Pass through the **type** prop to change the style of checkbo

    <div class="ui form">
        <div class="ui field">
            <semantic-checkbox v-model="checkbox" label="Checkbox" />
        </div>
        <div class="ui field">
            <semantic-checkbox v-model="checkbox" label="Slider" type="slider"/>
        </div>
        <div class="ui field">
            <semantic-checkbox v-model="checkbox" label="Toggle" type="toggle" />
        </div>
    </div>

### Disabled

    <semantic-checkbox label="🍕 Pizza" type="toggle" :disabled="true"/>
