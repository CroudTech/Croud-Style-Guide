Please ignore the **pagination-path** setting, **transform** prop and the **getSortParam** prop in the following examples. This component sets the default to work with data from **Core**
### Simple Datatable
The datatable is built from an array of **fields**. The array can contain Strings and Objects. You can add a sorting option to the table using the **sortField** key and you can overide the column heading using the **title** key. See [the docs](https://ratiw.github.io/vuetable-2/#/Fields-Definition) for more field definition examples.

```js static
vuetableConfig: {
    'api-url': 'https://vuetable.ratiw.net/api/users',
    fields: [
        {
            name: 'name',
            sortField: 'name',
        },
        'email',
        {
            name:'birthdate',
            title: 'DOB',
        }
    ],
},
```

    <croud-datatable
        :vuetable-config="{
            'pagination-path': '',
            fields: [{ name: 'name', sortField: 'name' }, 'email', { name:'birthdate', title: 'DOB' }],
            'api-url': 'http://vuetable.ratiw.net/api/users',
            'query-params': { sort: 'sort' }
        }"
        :transform="data => data"
        :getSortParam="(sortOrder) => sortOrder.map(sort => (`${sort.sortField}|${sort.direction}`)).join(',')"
    />

### Change paginator
By default, this component will show the [croud-paginator](#croud-paginator) at the bottom of the datatable, you can use the **paginator-component** prop to change this. See the [vuetable docs](https://ratiw.github.io/vuetable-2/#/Pagination?id=vuetablepagination) for more info on their built in paginators.

    <croud-datatable
        :vuetable-config="{
            'pagination-path': '',
            fields: [{ name: 'name', sortField: 'name' }, 'email', { name:'birthdate', title: 'DOB' }],
            'api-url': 'https://vuetable.ratiw.net/api/users',
            'query-params': { sort: 'sort' }
        }"
        :transform="data => data"
        paginator-component="vuetable-pagination"
        :getSortParam="(sortOrder) => sortOrder.map(sort => (`${sort.sortField}|${sort.direction}`)).join(',')" />

### Simple Search
You can hook up a simple search function by building the search query params in data in append-params, the component watched for these changes and makes a new ajax call.

    <div>
        <div class="ui secondary segment">
            <div class="ui icon input">
                <i class="search icon"></i>
                <input v-model="searchText" placeholder="Search users..."/>
            </div>
        </div>
        <croud-datatable
            :vuetable-config="{
                'pagination-path': '',
                fields: ['name', 'email', 'birthdate'],
                'api-url': 'https://vuetable.ratiw.net/api/users',
                'append-params': {
                    filter: searchText,
                },
            }"
            :transform="data => data"
            :getSortParam="(sortOrder) => sortOrder.map(sort => (`${sort.sortField}|${sort.direction}`)).join(',')" />
    </div>

### Scoped Slots

You can pass through scoped slots to generate more complex columns

    <croud-datatable
        :vuetable-config="{
            'pagination-path': '',
            fields: [
                'name',
                'email',
                {
                    name: '__slot:actions',
                    title: 'Actions',
                    titleClass: 'center aligned',
                    dataClass: 'center aligned',
                },
            ],
            'api-url': 'https://vuetable.ratiw.net/api/users',
        }"
        :transform="data => data"
        >

        <template slot="actions" scope="props">
            <button @click="() => {Vue.toasted.show('this is row id ' + props.rowData.id)}" class="ui info mini button">
                View
            </button>
        </template>
    </croud-datatable>

### No Results - Customising the default no data message
If there is no data or results to display, the no results message will display as below

    <croud-datatable
        :vuetable-config="{
            'pagination-path': '',
            fields: [{ name: 'name', sortField: 'name' }, 'email', { name:'birthdate', title: 'DOB' }],
        }"
    />


If you wish to customize this message, you can set a **noDataTemplate** in the vuetable-config containing a string or html to parse, as below

```js static

    noDataTemplate: '<div class="ui center aligned basic segment"><strong>No Data to show you!</strong>',

```

    <croud-datatable
        :vuetable-config="{
            'pagination-path': '',
            fields: [{ name: 'name', sortField: 'name' }, 'email', { name:'birthdate', title: 'DOB' }],
            noDataTemplate: this.customDatagridMarkup,
        }"
    />
