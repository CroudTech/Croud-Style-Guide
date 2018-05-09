### Basic usage

    <croud-dropdown-indicator-button :collapsed="false" />

### Handling state
The dropdown button doesn't keep track of its own state, this should be handled by the parent component. Below is an example of listening for the click event and toggling the `headerCollapsed` value in the parent component.

    <div>
        <div>
            <croud-dropdown-indicator-button :collapsed="headerCollapsed" @click="headerCollapsed = !headerCollapsed"/>
            <strong>Toggle Content</strong>
        </div>
        <p v-if="!headerCollapsed" class="ui basic segment">Here is said content</p>
    </div>


