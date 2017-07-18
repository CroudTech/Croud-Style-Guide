### Secondary Morph Button 

    <croud-morph-button :options="[{name: 'Expand All', method: ()=>{ alert('Expanding')}}, {name: 'Collapse All', method: ()=> { alert('Collapsing')}}]" />

You can choose to make the second option active on render by using the *active* prop.

    <croud-morph-button :active="1" :options="[{name: 'Expand All', method: ()=>{ alert('Expanding')}}, {name: 'Collapse All', method: ()=> { alert('Collapsing')}}]" />
    
### Call to Action Morph Button

You can style the button like a Call to Action button using the *cta* prop.

    <croud-morph-button  :cta="true" :options="[{name: 'Expand All', method: ()=>{ alert('Expanding')}}, {name: 'Collapse All', method: ()=> { alert('Collapsing')}}]" />