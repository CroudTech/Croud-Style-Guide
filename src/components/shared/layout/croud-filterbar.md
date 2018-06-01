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
Add addition filters using the "advanced-filters" slot

    <croud-filterbar class="filter-bar" :search.sync="searchText" placeholder="Clients, Summary, Description">
        <div class="item">
            <div class="ui center aligned compact basic segment">
                <div class="ui text menu">
                    <div class="item form">
                        <div class="ui button">Test</div>
                    </div>
                </div>
            </div>
        </div>

        <div slot="advanced-filters">
            <div class="ui secondary basic segment right aligned fluid">
                <div class="item">
                    <div class="ui center aligned compact basic segment">
                        <strong>Channel</strong>
                        <div class="ui text menu">
                            <div class="ui selection dropdown" tabindex="0"><input type="hidden" name=""> <div class="default text"></div> <i class="dropdown icon"></i> <div class="menu dropdown_menu" tabindex="-1"> <div data-value="1" data-text="Foo" class="item">Foo</div><div data-value="2" data-text="Bar" class="item">Bar</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </croud-filterbar>
