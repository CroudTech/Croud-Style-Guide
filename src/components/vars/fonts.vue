<template>
  <display>
    <path-line file-name="fonts" slot="path" />
    <template slot="sections">
      <display-section v-for="fontGroup in Object.keys(fonts)" :title="fontGroup">
		<p slot="description">{{ descriptions[fontGroup.toLowerCase()] }}</p>
        <example v-for="font in Object.keys(fonts[fontGroup])" :key="font" slot="examples" :var-name="font">
            <div class="font-display" :class="[fontGroup, font]">{{font}}</div>
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
    name: 'fonts',
    computed: {
        ...mapGetters([
            'fonts',
        ]),
    },
    data() {
        return {
            descriptions: {
                headline: 'Crouds main headline font is Pathway Gothic One, which is used for all headings.',
                body: 'Crouds main body font is Lato, which is to be used in all elements that are not headings.',
                sizes: 'Sizes for both the headline and body fonts.',
            },
        }
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
    @import '../../resources/sass/variables/colours';
	@import '../../resources/sass/variables/fonts';
	@import '../../resources/fontsMap.scss';

	.font-display {
		margin: 1em;
	}
	@each $fontGroup, $arr in $fontsMap {
		@each $key, $val in $arr {
			
			.#{$fontGroup}{
                color: $croud-colour-grey-dark;
				@if($fontGroup == 'sizes') {
					&.#{$key}{
						font-size: #{$val};
					}
				} @else {
					&.#{$key}{
						font-family: #{$val};
						font-size: $croud-font-size-huge;
					}
				}
			}
		}
	}
</style>
