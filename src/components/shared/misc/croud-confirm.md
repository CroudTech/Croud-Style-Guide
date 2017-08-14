### Installation
This component should be set up in your App.vue...

```html static
// App.vue
<template>
    ...
    <croud-confirm ref="confirmation"/>
    ...
</template>

<script>
    import CroudConfirm from 'croud-style-guide/src/components/shared/misc/Confirm'
    export default {
        components {
            CroudConfirm,
        },
        mounted() {
            Vue.confirm = this.$refs.confirmation.confirm
            Vue.prototype.$confirm = this.$refs.confirmation.confirm
        },
    }
</script>
```

### Promise
Then you will be able to use this promise method from any component in your project.

```js static
this.$confirm('Are you sure?').then(() => {
    // they are sure
}).catch(() => {
    // they were not sure
})
```

### Basic usage

    <div>
        <!-- The following line isn't needed if you have followed the instructions above -->
        <croud-confirm ref="confirmation" />

        <button class="ui button" @click="$confirm('Are you sure you want to delete this entire styleguide?').then(() => {$toasted.show('Deleted')}).catch(() => {$toasted.show('Nevermind then')})">Delete</button>
    </div>

### Configuration

You can also pass in a configuration object to overide button text.

```javascript static
// example configuration object
{
    confirmText: 'Yes',
    cancelText: 'No'
}
```

    <div>
        <!-- The following line isn't needed if you have followed the instructions above -->
        <croud-confirm ref="confirmation" />

         <button class="ui button" @click="$confirm('Are you sure you want to delete this entire styleguide?', {confirmText: 'Yes', cancelText: 'No'}).then(() => {$toasted.show('Deleted')}).catch(() => {$toasted.show('Nevermind then')})">Delete</button>
    </div>

