## Croud Morph Button

    <croud-morph-button :options="[{name: 'Expand All', method: ()=>{ alert('Expanding')}}, {name: 'Collapse All', method: ()=> { alert('Collapsing')}}]" />

You can also choose to make the second option active by passing through the active prop

    <croud-morph-button :active="1" :options="[{name: 'Expand All', method: ()=>{ alert('Expanding')}}, {name: 'Collapse All', method: ()=> { alert('Collapsing')}}]" />
    