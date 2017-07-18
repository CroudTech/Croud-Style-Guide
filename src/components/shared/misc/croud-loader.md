### Basic Usage
    <div class="ui very padded segment">
        <div class="ui form">
            <div class="field">
                <label>Name</label>
                <input />
            </div>
            <div class="field">
                <label>Email</label>
                <input />
            </div>
            <button class="ui button">Submit</button>
        </div>
        <croud-loader :loading="true"></croud-loader>
    </div>

### Custom Loader text
You can use the slot to change the loading text

    <div class="ui very padded segment">
        <croud-loader :loading="true">Please Wait...</croud-loader>
    </div>

### Smaller loader
You can adjust the size with a prop

    <div class="ui very padded segment">
        <croud-loader size="small" :loading="true" />
    </div>
