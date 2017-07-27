### vue-quill
We use the [vue-quill](https://github.com/CroudSupport/vue-quill) package for wrapping quill for usage in Vue. Vue quill can output the contents in Quill deltas or straight html. For more config options and examples, view the [docs](https://github.com/CroudSupport/vue-quill)

### Croud Theme
We have created our own quill theme that can be imported with this bit of bootstrap.

```js
import Vue from 'vue'
import Quill from 'quill'
import VueQuill from 'vue-quill'
import CroudTheme from 'croud-style-guide/src/components/shared/forms/quill/themes/CroudTheme'

import 'croud-style-guide/src/components/shared/forms/quill/shortcodes.css'

Vue.use(VueQuill)

Quill.register({
    'themes/croud': CroudTheme,
})
```

**Shortcodes**

Part of the theme adds **shortcode templates** for dynamically adding contextual data

You can pass through shortcode templates in the config object in the following format.

```js
{
    theme: 'croud',
    templates: [
        {
            name: 'test',
            code: 'test',
        },
    ],
}
```

    <div>
        <quill v-model="quillOutput" output="html" :config="{theme: 'croud', templates: [{ name: 'test', code: 'test'}]}"></quill>

        <pre><code>{{ quillOutput }}</code></pre>
    </div>
