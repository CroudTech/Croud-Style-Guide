### Secondary Morph Button 

    <croud-morph-button :options="[{name: 'Expand All', method: ()=>{ this.$toasted.show('Expanding All') }}, {name: 'Collapse All', method: ()=> { this.$toasted.show('Collapsing All') }}]" />

You can choose to make the second option active on render by using the *active* prop.

    <croud-morph-button :active="1" :options="[{name: 'Expand All', method: ()=>{ this.$toasted.show('Expanding All')}}, {name: 'Collapse All', method: ()=> { this.$toasted.show('Collapsing All') }}]" />
    
### Call to Action Morph Button

You can style the button like a Call to Action button using the *cta* prop.

    <croud-morph-button  :cta="true" :options="[{name: 'Expand All', method: ()=>{ this.$toasted.show('Expanding All')}}, {name: 'Collapse All', method: ()=> {  this.$toasted.show('Collapsing All') }}]" />