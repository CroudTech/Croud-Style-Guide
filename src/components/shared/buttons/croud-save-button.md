### Basic usage

    <croud-save-button @click="$toasted.success('saved')"/>

### Loading State
Use the loading prop to pass through the components loading state.

When this component is in a loading state, it is disabled and so the click listener will not fire

    <croud-save-button :loading="true" @click="$toasted.success('saved')"/>

