### Basic usage
Use **menu** prop to populate the dropdown options

    <croud-dropdown-button :menu="[{title: 'Foo', action: () => $toasted.show('Foo')}, {title: 'Bar', action: () => $toasted.show('Bar')}]"/>

### Loading
Use **loading** prop to set loading state, when loading the dropdown is disabled

    <croud-dropdown-button :loading="true"/>


### Disabled
Use **disabled** prop to disable dropdown

    <croud-dropdown-button :disabled="true"/>
