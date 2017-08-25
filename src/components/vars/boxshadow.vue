<template>
    <display>
        <path-line file-name="box-shadow" slot="path" />
        <p slot="intro"></p>
        <template slot="sections">
            <display-section title="Box Shadow">
                <p slot="description">
                    Box shadows can be used to portray elevation of elements. The more subtle the box shadow 
                    the less elevated an element appears.
                </p>
                <example v-for="boxShadow in Object.keys(this.boxShadows)" :key="boxShadow" :var-name="boxShadow" slot="examples">
                    <div :class="boxShadow" class="card">{{ boxShadow }}</div>
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
    name: 'boxshadow',
    computed: {
        ...mapGetters([
            'boxShadows',
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
    @import '../../resources/sass/variables/colours.scss';
    @import '../../resources/sass/variables/box-shadow.scss';
    @import '../../resources/box-shadowMap.scss';

    .card {
        background-color: $croud-colour-card;
        width: 100%;
        padding: 2em 1em;
        box-sizing: border-box;
        margin: 1em 0;
        border-radius: 2px;
    }

    @each $key, $val in $box-shadowMap {
        .card.#{$key}{
            box-shadow: #{$val}
        }
    }
    
</style>
