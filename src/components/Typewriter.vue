<template lang="html">
  <section>
      <h3 class="ui croud header font-title"></h3>
      <div class="typewriter">
          <span class="font-display"
                :class="{italic: italic, uppercase: uppercase}"
                @click="toggleEditor()"
                v-html="text">
          </span>
          <quill v-show="editorOpen" v-model="text" output="html"></quill>
          <div class="font-details">
              <p class="var-display"></p>
              <div class="ui icon buttons">
                <button class="ui button" @click="toggleEditor"><i class="fa fa-pencil"></i></button>
            </div>
          </div>
      </div>
  </section>
</template>

<script>

export default {
    props: {
        italic: false,
        uppercase: false,
        defaultText: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            editorOpen: false,
            text: this.defaultText,
        }
    },
    methods: {
        toggleEditor() {
            this.editorOpen = !this.editorOpen
        },
    },
}
</script>

<style lang="scss">
    @import '../resources/sass/variables/fonts.scss';
    @import '../resources/sass/variables/colours.scss';
    @import '../resources/fontsMap.scss';

    @each $rootKey, $arr in $fontsMap {
        @each $key, $val in $arr {
            .#{$rootKey}.#{$key} {
                 .font-title{
                    &::before{
                        content: "#{$val}";
                    }
                 }
                 .var-display {
                     &::before {
                         content: "#{$key}";
                     }
                 }
                 .font-display {
                     font-family: #{$val};
                     &.uppercase{
                         text-transform: uppercase;
                     }

                     &.italic{
                         font-style: italic;
                     }
                 }

            }
        }
    }

    .typewriter {
        margin: 2em .8em;
        width: 100%;
        background-color: $croud-colour-card;
        box-shadow: 0 2px 5px rgba($croud-colour-black, .3);
        box-sizing: border-box;
    }

    .font-display {
        background-color: rgba($croud-colour-background, .3);
        width: 100%;
        display: flex;
        padding: 2.5em 1em;
        align-items: center;
        overflow: none;
    }

    .font-details {
        padding: 1em;
        display: flex;
        justify-content: space-between;
    }

    .fa-pencil-square {
        color: $croud-colour-info;
    }
</style>
