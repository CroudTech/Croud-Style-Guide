We use [croud-forms](https://github.com/CroudSupport/croud-forms) for building our web forms.

Note, this component can also handle [validation](https://github.com/CroudSupport/croud-forms#vuelidate-integration), but it crashes in styleguidist 😢

See the [docs](https://github.com/CroudSupport/croud-forms#bringing-it-all-together) for more details.

    <div>
        <croud-form-builder :schema="formSchema" v-model="user" />

        <div class="ui small horizontal divider" @click="showSchema = !showSchema">Show Schema</div>

        <div class="ui two column grid" v-if="showSchema">

            <div class="ui column">
                <strong>Schema</strong>
                <pre class="ui secondary segment column">
                    {{ formSchema }}
                </pre>
            </div>
            <div class="ui column">
                <strong>User Model</strong>
                <pre class="ui secondary segment column">
                    {{ user }}
                </pre>
            </div>
        </div>
    </div>
