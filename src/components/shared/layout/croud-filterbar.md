### Basic usage

    <croud-filterbar :search.sync="searchText">Search for: {{ searchText }}</croud-filterbar>

### Slot
Pass additional inputs and options through the filterbar's slot

    <croud-filterbar :search.sync="searchText">
        <label> Date:
            <croud-date-range :start="today" :end="tomorrow" />
        </label>
        <croud-overflow-menu :options="[{name: 'Delete', method: () => {} }, {name: 'Postpone', method: () => {}}, {name: 'Copy', method: () => {}, disabled: true}]"></croud-overflow-menu>
    </croud-filterbar>

### Customise the left side of the filter bar
To use a custom search bar or add another element other than search on the left you can use the slot "left-item"

    <croud-filterbar>
    <div slot="left-item" class="item">
        <button class="ui blue button" @click="() => {$toasted.show('Something Different')}">Click Me</button>
    </div>
    </croud-filterbar>

### Hide searchbar
No every Filter bar requires a searchbox, toggle it on and off with the showSearch pref

    <croud-filterbar :showSearch="false">
        <semantic-checkbox v-model="checkbox" label="🍕 Pizza" />
    </croud-filterbar>
