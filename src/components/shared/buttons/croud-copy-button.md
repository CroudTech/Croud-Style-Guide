### Basic usage

    <croud-copy-button text="test" @success="$toasted.success('Copied to clipboard')"/>

### Working with Vue data
This component can also work with dynamic Vue data

    <div class="ui action input">
        <input v-model="searchText" placeholder="Copy my contents"/>
        <croud-copy-button buttonClasses="ui icon button" :text="searchText" @success="$toasted.success('Copied to clipboard')"/>
    </div>

### Events
This component emits events on both a successfull copy and on error

    <croud-copy-button text="test" @success="$toasted.success('Copied to clipboard')" @error="$toasted.error('Failed to copy')"/>
