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

### Advanced Filters
Add additional advanced filters on a second row using the "advanced-filters" slot, if this slot is used an advanced toggle button will show
on the right hand side like below

    <croud-filterbar class="filter-bar" :search.sync="searchText" placeholder="Clients, Summary, Description">
        <div class="item">
            <div class="ui center aligned compact basic segment">
                <div class="ui text menu">
                    <div class="item form">
                        <div class="ui button">Example</div>
                    </div>
                </div>
            </div>
        </div>

        <div slot="advanced-filters">
            <div class="ui secondary basic segment right aligned fluid">
                 <div class="item">
                    <div class="ui center aligned compact basic segment">
                        <div class="ui text menu">
                            <div class="item form">
                                <div class="ui button">Example</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </croud-filterbar>
