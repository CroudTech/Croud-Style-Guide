<template>
    <section class="ui column stackable grid">
        <div class="ui divider sixteen wide column"></div>
        <header class="ui column sixteen wide heading">
                <h1 class="catagory-heading">{{ title }}</h1>
        </header>
        <section class="ten wide column">
            <slot name="description"></slot>
        </section>
        <section class="six wide column">
            <div class="examples">
                <slot class="example" name="examples"></slot>
            </div>
        </section>
    </section>
</template>

<script>
export default {
    name: 'DisplaySection',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
    .ui.grid {
        margin: 0;
    }

    .column {
        padding: 0!important;
    }

    .examples {
        padding: 0 1em;
    }

  .ui.divider.sixteen.wide.column {
    padding: 0;
  }
  
  .heading {
    padding: 0!important;
  }

  .catagory-heading {
    font-weight: normal;
    font-size: 24px;
    margin-top: 0;
    margin-bottom: 16px;
  }
</style>
