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
            <typewriter v-for="(value, font) in this.fonts.headline"
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
        <typewriter v-for="(value, font) in this.fonts.body"
                    class="body"
                    :default-text="generateLongText"
                    :class="{[font]: true}">
        </typewriter>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Typewriter from './Typewriter'
import FilePath from './FilePath'

export default {
    data() {
        return {}
    },
    components: {
        typewriter: Typewriter,
        'file-path': FilePath,
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
</style>
