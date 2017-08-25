<template>
    <section>
        <div class="path-container">
            <slot name="path"></slot>
        </div>
        <slot name="intro"></slot>
        <slot name="sections"></slot>
    </section>
</template>

<script>
export default {
    name: 'display',
}
</script>

<style>
    .path-container {
        margin-bottom: 24px;
    }
</style>
