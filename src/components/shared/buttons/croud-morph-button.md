### Basic Morph Button 

    <croud-morph-button :options="[{name: 'Expand All', method: ()=>{ this.$toasted.show('Expanding All') }}, {name: 'Collapse All', method: ()=> { this.$toasted.show('Collapsing All') }}]" />

You can choose to make the second option active on render by using the *active* prop.

    <croud-morph-button :active="1" :options="[{name: 'Expand All', method: ()=>{ this.$toasted.show('Expanding All')}}, {name: 'Collapse All', method: ()=> { this.$toasted.show('Collapsing All') }}]" />

### Styled Morph Button

You can style the button just like you would any other semantic button. Just apply the classes to the component instance.
    
    <croud-morph-button class="primary" :options="[{name: 'Expand All', method: ()=>{ this.$toasted.show('Expanding All')}}, {name: 'Collapse All', method: ()=> { this.$toasted.show('Collapsing All') }}]" />

You can also turn the button into a secondary button just by passing the *basic* class.

    <croud-morph-button class="basic blue" :options="[{name: 'Expand All', method: ()=>{ this.$toasted.show('Expanding All')}}, {name: 'Collapse All', method: ()=> { this.$toasted.show('Collapsing All') }}]" />

