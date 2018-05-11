### Basic usage

    <croud-arrow-icon/>

### Direction
Pass through the direction of the arrow in a prop.

    <div>
        <croud-arrow-icon direction="right"/>
        <croud-arrow-icon direction="down"/>
        <croud-arrow-icon direction="left"/>
        <croud-arrow-icon direction="up"/>
    </div>

### Variations
Use the class prop to set any other combination of variations.
Refer to the [docs](https://semantic-ui.com/elements/icon.html#/definition) for available options

Due to limitations of functional components, you will need to pass through an object of classes.

    <croud-arrow-icon :class="{ large: true, loading: true, disabled: true }"/>

