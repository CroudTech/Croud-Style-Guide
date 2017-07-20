### Basic usage

    <div>
        <croud-search-dropdown
            url="api/users?filter={query}"
            placeholder="Search Users..."
            v-model="search"
            />
        selected id: {{search}}
    </div>

### Transform data
You can transform the results coming out of the API by passing a transform function into the component

    <croud-search-dropdown
        url="api/users?filter={query}"
        placeholder="Search Users..."
        @selected="alert"
        :transform="(result) => { result.name = result.name + ' <b>(' + result.id + ')</b>'; return result }"
        />

### Custom dropdown config
You can pass a settings prop to add/override additional settings. See the [Semantic docs](https://semantic-ui.com/modules/dropdown.html#/settings) for more information

    <croud-search-dropdown
        url="api/users?filter={query}"
        placeholder="Search Users..."
        @selected="alert"
        :settings="{action: 'select', minCharacters: 2}"
        />
