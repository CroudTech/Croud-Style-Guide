<template lang="html">
    <div class="file-path">
        <div class="folder">
            <i class="fa fa-folder-open"></i>
        </div>
        <slot class="path"></slot>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
    @import '../resources/sass/variables/colours.scss';

    .file-path {
        background-color: $croud-colour-grey-lighter;
        padding: .8em 1em;
        color: $croud-colour-grey-dark;
        font-style: italic;
        text-align: right;
        margin: .8em;
        width: 100%;
    }

    .folder {
        display: inline-block;
        float: left;
        color: $croud-colour-grey-medium;
    }
</style>
