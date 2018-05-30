### Basic usage

    <croud-export-button url="//api.example.com/export" />

### Props
You can change the filename and mimetype using the props

    <croud-export-button url="//api.example.com/export" filename="Foo.xlsx" filetype="application/csv" />

### additionalParams prop
You can provide a parameter object to be appended to the provided url via the additionalParams prop

    <croud-export-button url="//api.example.com/export" :additionalParams="{search: 'netflix', client_ids: [123, 456, 789]}" />

### Slot
You can pass extra classes and use the default slot to change the button text

    <croud-export-button class="tiny blue" url="//api.example.com/export">Download CSV</croud-export-button>
