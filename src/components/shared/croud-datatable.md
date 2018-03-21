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
            'api-url': 'https://vuetable.ratiw.net/api/users',
            'query-params': { sort: 'sort' }
        }"
        :transform="data => data"
        :getSortParam="(sortOrder) => sortOrder.map(sort => (`${sort.sortField}|${sort.direction}`)).join(',')"
    />

### Local Data
You can use a local dataset if you already have the data in your component, you will need to set the **api-mode** flag to **false** and use the **data** key to point at this local data.

Also, if there is no pagination data emitted from the datatable component, this wrapper will automatically hide the pagination bar.

    <croud-datatable
        :vuetable-config="{
            fields: ['name', 'email', { name:'birthdate', title: 'DOB' }],
            'api-mode': false,
            data: [{ name: 'Foo', email: 'foo@test.com', birthdate: '1971-12-07 00:00:00' }, { name: 'Bar', email: 'bar@test.com', birthdate: '1970-01-01 00:00:00' }],
        }"
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
            <button @click="() => {$toasted.show('This is row id ' + props.rowData.id)}" class="ui info mini button">
                Get Row
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

    <croud-datatable
        :vuetable-config="{
            'pagination-path': '',
            fields: [{ name: 'name', sortField: 'name' }, 'email', { name:'birthdate', title: 'DOB' }],
            noDataTemplate: '<div class=`ui center aligned basic segment`><strong>No Data to show you!</strong></div>',
        }"
    />
