<template lang="html">
  <div class="colour-palette">
      <h1 class="ui croud header">Colours</h1>
      <p> All UI components are styled with our brand colours. These brand colour names are to be kept generic and detached
           from the colours they hold to enable future changes.
      </p>
      <div class="ui three column stackable grid">
          <file-path class="column">resources/sass/variables/colours.scss</file-path>
          <file-path class="column">resources/less/variables/colours.less</file-path>
      </div>
      <div class="ui divider"></div>
      <div class="ui three column stackable grid">
          <div class="ten wide column">
             <h2 class="ui croud header">Brand Colours</h2>
             <p>
                 Our brand colours are a mix of Crouds <a href="#primary">primary</a> colour palette and our <a href="#secondary">secondary</a> colour palette.
                 It is important that you use these colours only.
             </p>
          </div>
          <div class="column">
                  <colour-swatch v-for="(value, colour) in this.filteredColours.brand"
                                     class="brand"
                                     :colour="colour"
                                     :class="{[colour]: true}">
                  </colour-swatch>
          </div>
      </div>
      <div class="ui divider"></div>
      <div class="ui three column stackable grid" id="primary">
          <div class="ten wide column">
             <h2 class="ui croud header">Primary Colours</h2>
             <p>
                 The primary colour palette is made up of colours identified with the Croud Branding.
                 These colours are used in order to make our products one with the company.
             </p>
          </div>
          <div class="column">
                  <colour-swatch v-for="(value, colour) in this.filteredColours.primary"
                                     class="primary"
                                    :class="{[colour]: true}"
                                    :colour="colour">
                  </colour-swatch>
          </div>
      </div>
      <div class="ui divider"></div>
      <div class="ui three column stackable grid" id="secondary">
          <div class="ten wide column">
             <h2 class="ui croud header" >Secondary Colours</h2>
             <p>
                 The secondary colour palette is made of colours used to contrast the primary colours
                 and also draw attention to interactive elements. (eg. buttons)
             </p>
          </div>
          <div class="column">
                  <colour-swatch v-for="(value, colour) in this.filteredColours.secondary"
                                     class="secondary"
                                    :class="{[colour]: true}"
                                    :colour="colour"
                                    :id="colour">
                  </colour-swatch>
          </div>
      </div>
      <div class="ui divider"></div>
      <div>
          <h2 class="ui header croud">Contrast Colours</h2>
          <p>If you are unsure about whether you need to use black or white text on a specific background-color, use the following function:</p>
          <code-block>croud-colour-contrast($croud-colour-header)</code-block>
          <p>The function returns black or white by default but you can add your own light and dark arguments:</p>
          <code-block>croud-colour-contrast($croud-colour-header, $croud-colour-success, $croud-colour-success-accent)</code-block>
          <file-path>resources/sass/functions/colour/colourContrast.scss</file-path>
      </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import ColourSwatch from './ColourSwatch'
import FilePath from './FilePath'
import CodeBlock from './CodeBlock'

export default {
    name: 'colour-palette',
    components: {
        'colour-swatch': ColourSwatch,
        'file-path': FilePath,
        'code-block': CodeBlock,
    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters([
            'colours',
        ]),

        filteredColours() {
            const colours = {
                primary: {},
                secondary: {},
                brand: {},
            }
            const sections = [
                'primary',
                'secondary',
                'brand',
            ]
            let current = -1
            Object.keys(this.colours).forEach((key) => {
                if (key.startsWith('//')) {
                    current += 1
                    return
                }
                colours[sections[current]][key] = this.colours[key]
            })
            return colours
        },
    },
}
</script>

<style lang="scss">
    @import "../resources/sass/variables/colours.scss";
    @import "../resources/coloursMap.scss";

    .colour-swatch {
        display: flex;
        justify-content: right;
    }

    .logo {
        width: 50%;
        height: 100px;
    }
</style>
