### Default Checkbox
    
    <croud-checkbox name="showThat" />

### Checked by Default
Pass through the checked prop to check the checkbox by default

    <croud-checkbox name="showThat" checked />

### Compatable v-model 
This checkbox is also compatable with v-model to achieve two-way data binding
    <div>
        <croud-checkbox name="showThat" v-model="checkbox" />
        {{ checkbox }}
    </div>
    
### Style Variations
You can also change the style of the checkbox by assigning the following classes:

**primary:**

    <croud-checkbox name="primary" v-model="checkbox" class="primary" />

**success:**

    <croud-checkbox name="success" v-model="checkbox" class="success" />