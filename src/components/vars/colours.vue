<template>
  <display>
    <path-line file-name="colours" slot="path" />
    <p slot="intro">
      All UI components are styled with our brand colours. These brand colour names are to be kept generic and detached
      from the colours they hold to enable future changes.
    </p>
    <template slot="sections">
      <display-section v-for="colourGroup in Object.keys(colours).reverse()" :title="colourGroup">
        <p slot="description">{{ description[colourGroup] }}</p>
        <example v-for="colour in Object.keys(colours[colourGroup]).reverse()" :key="colour" slot="examples" :var-name="colour">
          <div :class="colour" class="colour-swatch">{{colour}}</div>
        </example>
      </display-section>
    </template>
  </display>
</template>

<script>
import { mapGetters } from 'vuex'
import Display from './Display'
import DisplaySection from './DisplaySection'
import PathLine from './PathLine'
import Example from './Example'

export default {
    name: 'colours',
    data() {
        return {
            description: {
                brand: 'Our brand colours are a mix of Crouds primary colour palette and our secondary colour palette.',
                secondary: 'The secondary colour palette is made of colours used to contrast the primary colours and also draw attention to interactive elements. (eg. buttons)',
                primary: 'The primary colour palette is made up of colours identified with the Croud Branding. These colours are used in order to make our products one with the company.',
            },
        }
    },
    computed: {
        ...mapGetters([
            'colours',
        ]),
    },
    components: {
        Display,
        DisplaySection,
        PathLine,
        Example,
    },
}
</script>

<style lang="scss" scoped>
    @import "../../resources/sass/functions/colour/colourContrast.scss";
    @import "../../resources/sass/variables/fonts.scss";
    @import '../../resources/sass/variables/colours.scss';
    @import "../../resources/sass/variables/box-shadow.scss";
    @import '../../resources/coloursMap.scss';
  
    .colour-swatch {
      padding: 2em 1em;
      margin: 1em 0;
      border-radius: 2px;
      box-shadow: $croud-box-shadow-float;
    }

    @each $catagory, $arr in $coloursMap {
      @each $key, $val in $arr {
        .colour-swatch.#{$key}{
          background-color: #{$val};
          color: croud-colour-contrast($val);
        }
      }
    }
</style>
