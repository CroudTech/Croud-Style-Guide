### vue-cleave
We use [vue-cleave](https://github.com/vue-bulma/cleave) for our masked inputs. Below are a few examples of cleave.js but see their [docs](http://nosir.github.io/cleave.js/) for more advaced exaples.

### Basic usage

    <div class="ui input">
        <cleave v-model="cleave" :options="{ creditCard: true }"></cleave>
    </div>

### Telephone
You can use cleave to format and provide basic validation for phone numbers, you will need to import additional libraries based on the expected country format.

```js static
import 'cleave.js/src/addons/phone-type-formatter.gb'
```

    <div class="ui input">
        <cleave v-model="telephone"
            :options="{
                phone: true,
                phoneRegionCode: 'GB'
            }">
        </cleave>
    </div>
