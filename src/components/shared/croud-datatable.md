Please ignore the **pagination-path** setting and the **transform** prop in the following examples. This component sets the default to work with data from **Core**
### Simple Datatable

    <croud-datatable
        :vuetable-config="{
            'pagination-path': '',
            fields: ['name', 'email', 'birthdate'],
            'api-url': 'https://vuetable.ratiw.net/api/users',
        }"
        :transform="data => data" />


### Simple Search
You can hook up a simple search function by building the search query params in data in append-params, the component watched for these changes and makes a new ajax call.

    <div>
        <div class="ui icon input">
            <i class="search icon"></i>
            <input v-model="search"/>
        </div>
        <croud-datatable
            :vuetable-config="{
                'pagination-path': '',
                fields: ['name', 'email', 'birthdate'],
                'api-url': 'https://vuetable.ratiw.net/api/users',
                'append-params': {
                    filter: search,
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
            <button @click="alert('this is row id ' + props.rowData.id)" class="ui blue icon circular mini button">
                <i class="right chevron icon"></i>
            </button>
        </template>
    </croud-datatable>
