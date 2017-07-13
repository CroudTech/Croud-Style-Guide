<template lang="html">
    <div>
        <div class="ui divider"></div>
        <h1 class="ui croud header">Typography</h1>
        <div class="ui three column stackable grid">
            <file-path class="column">resources/sass/variables/fonts.scss</file-path>
            <file-path class="column">resources/less/variables/fonts.less</file-path>
        </div>
        <div class="ui divider"></div>
            <h2 class="ui croud header">Headline Fonts</h2>
            <p>
                We have two headline fonts. The main one being Pathway Gothic One in uppercase but you
                can also use Libre Baskerville as an accented font on headings. - If you are unsure then just use Pathway
                Gothic One.
            </p>
            <typewriter v-for="(value, font) in this.typefaces.headline"
                        class="headline"
                        :class="{[font]:true}"
                        :default-text="generateShortText"
                        :italic="italics(font)"
                        :uppercase="uppercase(font)"
                        >
            </typewriter>
        <div class="ui divider"></div>
        <h2 class="ui croud header">Body Fonts</h2>
        <p>Crouds main body font is Lato, which is to be used in all elements that are not headings.</p>
        <typewriter v-for="(value, font) in this.typefaces.body"
                    class="body"
                    :default-text="generateLongText"
                    :class="{[font]: true}">
        </typewriter>
        <div class="ui divider"></div>
        <h2 class="ui croud header">Font Sizes</h2>
        <ul class="fontSizes">
            <li v-for="(value, fontSize) in this.fontSizes"
                class="fontSizes__text"
                :class="{[fontSize]:true}">
                {{fontSize}}
            </li>
        </ul>
    </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Typewriter from './Typewriter'
import FilePath from './FilePath'

export default {
    data() {
        return {}
    },
    components: {
        Typewriter,
        FilePath,
    },
    computed: {
        ...mapGetters([
            'fonts',
        ]),
        generateShortText() {
            return this.$faker().company.bs()
        },
        generateLongText() {
            return this.$faker().lorem.paragraph()
        },
        typefaces() {
            const template = {
                headline: null,
                body: null,
            }

            const typefaces = _.pick(this.fonts, _.keys(template))

            return typefaces
        },
        fontSizes() {
            return this.fonts.sizes
        },
    },

    methods: {
        italics(key) {
            return key === 'croud-font-headline-accent'
        },
        uppercase(key) {
            return key === 'croud-font-headline'
        },
    },
}
</script>

<style lang="scss">
@import "../resources/sass/variables/fonts.scss";
@import "../resources/fontsMap.scss";

$fontSizes: map-get($fontsMap, 'sizes');

.fontSizes{
    list-style-type: none;
    padding-left: 0;
}

@each $key, $val in $fontSizes {
    .fontSizes__text.#{$key}{
        font-size: #{$val};
        margin: 1em 0;
    }
}

</style>
