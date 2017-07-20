# Croud Style Guide Docs

## Updating Tech Docs

This is a brief overview on how to update the style guides tech docs. For a more advanced look, you can read the [vue styleguidist's docs](https://github.com/vue-styleguidist/vue-styleguidist/blob/master/docs/Documenting.md).

* [Locating Components](#locating-components)
* [Add new components](#add-components)
* [Documenting components](#document-components)
	* [Adding component description](#component-description)
	* [Adding prop descriptions](#prop-descriptions)
	* [Adding component examples](#component-examples)

<a name="locating-components"></a>
### Locating Components
You can find any components in style guides tech docs in the following directory:

>src/components/shared/

You will also find there related markdown files in this directory.

<a name="add-components"></a>
### Add New Components
Adding a new component to the technical docs is simple. Simply add your component in the [shared component directory](#locating-components).

**You can also use the sub-directories to keep the components categorised.**

Then give your vue component a  name that is prefixed with '**croud**':
```javascript
<script>
export default {
	name: 'croud-overflow-menu',
}
</script>
```
You should now be able to see the new components name and a list of props in the technical docs. You can now add some [documentation](#document-components).
<a name="document-components"></a>
### Documenting Components
It's important that you also document any new components by at the very least adding a [description](#component-description), [prop descriptions](#prop-descriptions) and an [example](#component-examples).

<a name="component-description"></a>
#### Adding Component Descriptions
To add a description for your component, just add a Javascript DocBlock comment inside your components script tag.
```javascript
<script>
/**
* A simple overflow menu component
*/
export default {
```
<a name="prop-descriptions"></a>
#### Adding Prop Descriptions
You should also add descriptions for each of your props. This can be done by adding a Javacript DocBlock comment above each of your prop objects.
```javascript
export default {
    name: 'croud-overflow-menu',
    props: {
        /**
        * Menu item information
        */
        options: {
            type: Array,
            default: [],
        },
        /**
        * Align menu to left
        */
        left: {
            type: Boolean,
            default: false,
        },
        /**
        * Hide pointer in Dropdown
        */
        noPointer: {
            type: Boolean,
            default: false,
        },
    },
```
<a name="component-examples"></a>
#### Adding Component Examples
You should also add component examples to the tech docs. You can do this by first creating a markdown file:

	croud-overflow-menu.md

Then you will need to link to this file from your component by adding the following javascript doc @example comment underneath your components description:

```javascript
<script>
/**
* A simple overflow menu component
* @example ./croud-overflow-menu.md
*/
export default {
```
Finally, inside your markdown file, you simply create a new instance of your component and pass through the relevent props:
```markdown
<croud-overflow-menu :options="[{name: 'copy', method: () => {}}, name: 'export', method: () => {}]"></croud-overflow-menu>
```
You can also add **multiple component examples** to the tech docs:	
```markdown
<croud-overflow-menu :options="[{name: 'copy', method: () => {}}, name: 'export', method: () => {}]"></croud-overflow-menu>

<croud-overflow-menu :noPointer="true" :options="[{name: 'copy', method: () => {}]"></croud-overflow-menu>
```
Since its a markdown file you can also include markdown into this file to better describe or seperate content:

```markdown

### Icon Listed Items

You can add icons to your menu items by giving your options an icon property.

<croud-overflow-menu :noPointer="true" :options="[{name: 'copy', method: () => {}, icon: 'copy'}]"></croud-overflow-menu>
```

*If you want to add more ***advanced*** documentation please read [vue styleguidist's docs](https://github.com/vue-styleguidist/vue-styleguidist/blob/master/docs/Documenting.md).*