### Basic usage
This Higher Order Component can be used to wrap content that should only be loaded when in the viewport. The example below will only load this large image when in view. (Check your network tab)

    <lazy-load>
        <img src="https://lorempicsum.com/simpsons/1000/1000/9" />
    </lazy-load>

### Lazy Load Components
As well as lazy loading content, this also works with Vue components, so you can offset expensive `mounted` functions until the component is actually needed in the viewport.

    <lazy-load>
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
    </lazy-load>
