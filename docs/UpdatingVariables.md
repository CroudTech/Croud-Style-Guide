# [Croud Style Guide](Introduction.md)

## Updating Variables
* [Modifying Variables](#modifying-variables)
    * [Adding a new variable group](#adding-new-group)
    * [Making Changes](#making-changes)
    * [Pre-processor Dependent Values](#preproc-dep)
    * [Naming Conventions](#naming-conventions)
* [Rebuilding Variables](#rebuilding-variables)
    * [Regenerating Preprocessor Variables](#renerating)
    * [Build Configuration](#build)

<a name="modifying-variables"></a>

### Modifying Variables

All modifications to the style guide variables need to be done to the files in this directory:

    src/resources/config/

<a name="adding-new-group"></a>

#### Adding a New Variable Group

If you want to add a new category for variables then simply create a new JSON file in the [variables directory](#modifying-variables).

You can add subcategories that will be displayed as comments

<a name="making-changes"></a>

#### Making Changes

These config files are structured in JSON format. Before making modifications please make sure that variable names match [naming conventions](#naming-conventions). You will then need to [rebuild](#rebuilding-variables) to regenerate the preprocessor variables.


<a name="preproc-dep"></a>

#### Preprocessor Dependent Values

Sometimes you may want to add a different value to a variable depending on the preprocessor. A good use case of this would be if a preprocessor used a different function to achieve the same result.

**less**
```scss
fade(@croud-colour-success, 15%)
```

**sass**
```scss    
rgba($croud-colour-success, .15)
```

**Do not use this to set completely different results (eg. different colours) for sass or less.**

#### Adding

To specify these, simply assign the variable an object value. Inside this object use the name for your preprocessor as a key and provide it with its value.
```javascript
"croud-box-shadow": {
    "less": "0px 1px 2px 0 fade(@croud-colour-border, 15%)",
    "sass": "0px 1px 2px 0 rgba($croud-colour-border, .15)"
}
```

You can also add a default option so that any preprocessors, that are not provided with a value, use that as its fallback.

```javascript
"croud-box-shadow": {
    "default": "0px 1px 2px 0 $croud-colour-border",
    "less": "0px 1px 2px 0 @croud-colour-border"
    // other output: 0px 1px 2px 0 $croud-colour-border
    // less output: 0px 1px 2px 0 @croud-colour-border
}
```

If no default option is provided and the preprocessor is not assigned a value then that variable will be ignored.

<a name="making-changes"></a>

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
Changes will then be reflected in the directories for the preprocessor.

**sass:**

    src/resources/sass/variables/*.scss

**less:** 
    
    src/resources/less/variables/*.less
    
**Do not modify these files directly. Any changes made to these files will be undone when the variables are next generated.**

<a name="build"></a>
#### Build Configuration
You can use the configuration object to easily make changes to the way variables are being built.

* [input (string)](#input)
* [output (string)](#output)
* [prefix (string)](#prefix)
* [preprocessors (object)](#preprocessors)
* [importOrder (array) *(optional)*](#importOrder)
* [additions (object) *(optional)*](#additions)
* [sassMaps (object)](#sassMaps)

<a name="input"></a>
##### input (string)
The path to the directory which contains the variable json files **(relative to the build script)**

<a name="output"></a>
##### output (string)
states the path to the directory to generate the preprocessor files **(relative to the build script)**

<a name="prefix"></a>
##### prefix (string)
The variable prefix that is looked for by the build script. This is used to distinguish between variables and sub-catagories.
```javascript
prefix: 'croud-',
```

**IMPORTANT!** If you change this then you will need to go through the variable files and replace all prefix's otherwise they will not be treated as variables.

<a name="preprocessors"></a>
##### preprocessors (object)
Configuration object for the preprocessors. To add a preprocessor simply add its name as the key and 

```javascript
preprocessors: {
    less: {},
    sass: {},
}
```
###### FILE (object)
The configuration for outputed preprocessor files. 
###### prefix (string) *(optional)*
Prefix option for exported files
    
###### extension (string)
File extension for exported files

```javascript
preprocessors: {
    sass: {
        file: {
            prefix: '_',
            extension: 'scss'
            // output file name: _var.scss
            },
        },
    }
```

###### VARIABLE (object)
The configuration for outputted preprocessor variables.
###### prefix (string) 
Variable prefix for preprocessor

###### seperator (string) *(optional)*
Symbol to seperate variable value and key. Set to ```:``` by default.
```javascript
files: {
    sass: {
        file: {
            prefix: '_',
            extension: 'scss'
            // output file name: _var.scss
            },
        },
        variable: {
            prefix: '$',
            seperator: ' =',
            // $var-name = var-val
        },
    }
}
```
<a name="importOrder"></a>
##### importOrder (array) *(optional)*
The order in which the variables are added to the file containing all the preprocssor variables.

Simply pass through the name of the variable file that you want to be imported. You don't have to include all the variables. The first index is the file that is imported first. - The rest of the files are then imported alphabetically.

```javascript
importOrder: [
    'colours', 
    'fonts/fonts',
    
    // import order:
    // colours.json
    // fonts/fonts.json
    // Rest of the variable files (a-z)
]
```

<a name="additions"></a>
##### additions (object) *(optional)*
Add strings to top of preprocessor files.

Additions can be specified by including a default array into the object of the specific file.
```javascript
additions: {
    fonts: {
        default: [
            '@import "fontImports";',
            '@import "fontSizes";',
                
            /* output:
            @import "fontImports";
            @import "fontSizes";
            */
        ]
    }
}
```

You can also specify additions based on the preprocessor by adding an array to that key.
```javascript
additions: {
    fonts: {
        default: [
            '@import "fontImports";',
            '@import "fontSizes";',
            
            /* output:
            @import "fontImports";
            @import "fontSizes";
            */
        ],
        less: [
            '@import "fontImports.css";',
            '@import "fontSizes.css";',
            
            /* less output:
            @import "fontImports.css";
            @import "fontSizes.css";
            */
        ],
    }
}
```

<a name="sassMaps"></a>
##### sassMaps (object)

**inclusions (array)**
Collection of variable file names to be converted to sass maps. Sass maps are created in the specified output directory. 

```javascript
    sassMaps: {
        inclusions: [
            'colours',
            'fonts',
            'box-shadow',
            'layers',
        ],
    },
```