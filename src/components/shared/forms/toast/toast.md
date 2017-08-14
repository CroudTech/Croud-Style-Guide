### Setup
We use [vue-toasted](https://github.com/shakee93/vue-toasted) to handle our toast messaging. You will need to add the vue-toasted plugin to your project.

```js static
/* Import vue-toasted plugin */
import Toasted from 'vue-toasted'
/* Import Croud Theme */
import 'croud-style-guide/src/components/shared/forms/toast/themes/croudToastTheme.scss'

/* Sensible toast defaults */
Vue.use(Toasted, {
    fullWidth: true,
    theme: 'croud',
    duration: 2500,
    position: 'top-center',
})
```

### Basic Usage
You can send toast messages from within components using this syntax
```js static
sendToast() {
    this.$toasted.show('message')
    this.$toasted.success('message')
    this.$toasted.error('message')
},

```
Or you can call it inline in your Vue template...

    <div>
        <div class="ui input">
            <input v-model="searchText" placeholder="Toast message" />
        </div>
        <button class="ui button" @click="$toasted.show(searchText)">Show</button>
        <button class="ui green button" @click="$toasted.success(searchText)">Success</button>
        <button class="ui red button" @click="$toasted.error(searchText)">Error</button>
    </div>
