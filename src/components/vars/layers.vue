<template>
	<display>
        <path-line file-name="layers" slot="path" />
		<template slot="sections">
			<display-section title="layers">
                <p slot="description">
                    Layers are used to structure content on the z index. The higher the layer number 
                    the further forward the component is placed. A component on layer 1 will appear 
                    below a component on layer 2.
                </p>
                <example v-for="layer in Object.keys(this.layers).reverse()" :key="layer" slot="examples" :var-name="layer">
				    <div :class="layer">
                        <p class="layer-text">{{ layer }}</p>  
                    </div>
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
    name: 'layers',
    computed: {
        ...mapGetters([
            'layers',
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

<style lang="scss">
    @import '../../resources/sass/variables/layers.scss';
    @import '../../resources/sass/variables/colours.scss';
    @import '../../resources/sass/variables/box-shadow.scss';
    @import '../../resources/layersMap.scss';
    
    .layer-text {
        position: absolute;
        bottom: .01em;
        right: .5em;
    }

    $topOffset: 0;

    @each $key, $val in $layersMap {
        $topOffset: $topOffset + 3;
        .#{$key}{
            position: relative;
            height: 6.5em;
            background-color: #fff;
            box-shadow: $croud-box-shadow-float;
            z-index: $val;
            width: 100%;
            padding: .2em;
        }
    }
</style>
