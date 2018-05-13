### semantic-form-dropdown
For our form dropdowns, we use the semantic-form-dropdown component from the [croud-vue-semantic](https://github.com/croudtech/vue-semantic) library. Below are a few examples of semantic-form-dropdown in action. Click [here](http://croudtech.github.io/vue-semantic/#semantic-form-dropdown) for full component docs.

### Basic usage

    <semantic-form-dropdown v-model="dropdownVal" :options="[{id: 1, name: 'Foo'},{id: 2, name: 'Bar'}]"></semantic-form-dropdown>

### Styling
You can use the props to change the styling of the dropdown

    <div class="ui form">
        <div class="field">
            <label>Fluid</label>
            <semantic-form-dropdown fluid v-model="dropdownVal" :options="[{id: 1, name: 'Foo'},{id: 2, name: 'Bar'}]" />
        </div>

        <div class="three fields">
            <div class="field">
                <label>Search</label>
                <semantic-form-dropdown search v-model="dropdownVal" :options="[{id: 1, name: 'Foo'},{id: 2, name: 'Bar'}]" />
            </div>
            <div class="field">
                <label>Multiple</label>
                <semantic-form-dropdown multiple v-model="dropdownVal" :options="[{id: 1, name: 'Foo'},{id: 2, name: 'Bar'}]" />
            </div>
            <div class="field">
                <label>Disabled</label>
                <semantic-form-dropdown :disabled="true" v-model="dropdownVal" :options="[{id: 1, name: 'Foo'},{id: 2, name: 'Bar'}]" />
            </div>
        </div>

        <div class="inline field">
            <label>Inline</label>
            <semantic-form-dropdown :inline="true" v-model="dropdownVal" :options="[{id: 1, name: 'Foo'},{id: 2, name: 'Bar'}]" />
        </div>
    </div>

### Using slots
The **default** slot allows you to add custom options to the top of the dropdown

    <semantic-form-dropdown v-model="dropdownVal" :options="[{id: 1, name: 'Foo'},{id: 2, name: 'Bar'}]">
        <div class="item" v-data="3">
            <b>Baz</b>
        </div>
    </semantic-form-dropdown>

### Handle Events
This component emits the **dropdown-selected** event when an item is selected.

    <semantic-form-dropdown :value="dropdownVal" :options="[{id: 1, name: 'Foo'},{id: 2, name: 'Bar'}]" @dropdown-selected="$toasted.success('TaDa!!!')"></semantic-form-dropdown>
