# [Croud Style Guide](Introduction.md)

## Updating Variables

* [Modifying Variables](#modifying-variables)
    * [Adding a new variable group](#adding-new-group)
    * [Making Changes](#making-changes)
    * [Naming Conventions](#naming-conventions)
* [Rebuilding Variables](#rebuilding-variables)
    * [Regenerating Preprocessor Variables](#renerating)

<a name="modifying-variables"></a>

### Modifying Variables

All modifications to the style guide variables need to be done to the files in this directory:

    src/resources/config/

<a name="adding-new-group"></a>

#### Adding a New Variable Group

If you want to add a new category for variables then simply create a new JSON file in the [variables directory](#modifying-variables).

<a name="making-changes"></a>

#### Making Changes

These config files are structured in JSON format. Before making modifications please make sure that variable names match [naming conventions](#naming-conventions). You will then need to [rebuild](#rebuilding-variables) to regenerate the preprocessor variables.

<a name="naming-conventions"></a>

#### Naming Conventions

    croud-[filename]-[subcatagoryName(if applicable)]-[valuedescription]
    
All variables should be prefixed with 'croud' followed by the name of the variable file and then the subcategory name - *if applicable*. Then describe the value being held.

```javascript
"croud-font-size-big": [value]
```    
**IMPORTANT!** make sure your descriptions of the value being held is not tied to that value. So avoid names like the following:

```javascript
    "croud-font-size-2": "2em";
```

Instead, favour a more generic description like:

```javascript
    "croud-font-size-big": "2em"; 
```

<a name="rebuilding-variables"></a>

### Rebuilding Variables

<a name="renerating"></a>

#### Regenerating Preprocessor Variables

Any changes to the variable configs will require you to regenerate the variable files. This can be done by running the following command:
```bash
yarn run styleguide:build
```
Changes will then be reflected in the directories for sass and less.

**sass:**

    src/resources/sass/variables/*.scss

**less:** 
    
    src/resources/less/variables/*.less
    
**Do not modify these files directly. Any changes made to these files will be undone when the variables are next generated.**