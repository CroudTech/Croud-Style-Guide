<template>
  <div class="import-path">
    {{importStatement}}
    <i class="icon-copy" ref="button" :data-clipboard-text="importStatement">
        <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style="vertical-align: middle;">
            <g>
                <path d="m31.6 35v-23.4h-18.2v23.4h18.2z m0-26.6c1.8 0 3.4 1.4 3.4 3.2v23.4c0 1.8-1.6 3.4-3.4 3.4h-18.2c-1.8 0-3.4-1.6-3.4-3.4v-23.4c0-1.8 1.6-3.2 3.4-3.2h18.2z m-5-6.8v3.4h-20v23.4h-3.2v-23.4c0-1.8 1.4-3.4 3.2-3.4h20z"></path>
            </g>
        </svg>
    </i>
  </div>
</template>

<script>
import Clipboard from 'clipboard'

export default {
    data() {
        return {
            importStatement: `@import '~croud-style-guide/src/resources/sass/variables/_${this.fileName}.scss';`,
            clipboard: undefined,
        }
    },
    props: {
        fileName: {
            type: String,
            required: true,
        },
    },
    watch: {
        fileName: () => {
            this.importStatement = `@import '~croud-style-guide/src/resources/sass/variables/_${this.fileName}.scss';`
        },
    },
    mounted() {
        this.clipboard = new Clipboard(this.$refs.button)
    },
}
</script>

<style lang="scss">
    @import '../../resources/sass/variables/all.scss';
    .import-path {
        margin: 1em 0;
        color: #999;
        font-size: 13px;
        font-family: Consolas, "Liberation Mono", Menlo, monospace;
    }

    .icon-copy {
        cursor: pointer;
        margin-left: 4px;
        &:hover {
            color: $croud-colour-info-accent;
        }
    }
</style>
