### Basic usage
Use **menu** prop to populate the dropdown options

    <croud-save-button-with-dropdown :menu="[{title: 'Foo', action: () => $toasted.show('Foo')}, {title: 'Bar', action: () => $toasted.show('Bar')}]" @click="$toasted.success('saved')"/>

### Loading
Use **loading** prop to set loading state, when loading the save button and the dropdown atoms are disabled

    <croud-save-button-with-dropdown :loading="true" :menu="[{title: 'Foo', action: () => $toasted.show('Foo')}, {title: 'Bar', action: () => $toasted.show('Bar')}]" @click="$toasted.success('saved')"/>
