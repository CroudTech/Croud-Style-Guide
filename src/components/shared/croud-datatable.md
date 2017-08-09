Please ignore the **pagination-path** setting and the **transform** prop in the following examples. This component sets the default to work with data from **Core**
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
        }"
        :transform="data => data" />


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
            :transform="data => data" />
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
        :transform="data => data" >
        <template slot="actions" scope="props">
            <button @click="() => {Vue.toasted.show('this is row id ' + props.rowData.id)}" class="ui blue icon circular mini button">
                <i class="right chevron icon"></i>
            </button>
        </template>
    </croud-datatable>
