<template>
  <div class="e-collapsable-list">
    <header>
      <div class="left"><span v-if="required" class="label-required">必須</span><slot name="header" /></div>
      <div class="right"><slot name="header-right" /></div>
    </header>
    <slot name="content" />
  </div>
</template>

<script>
export default {
  props: {
    required: {
      default: false,
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
.e-collapsable-list {
  border: 2px solid $color-gray;
  border-radius: 4px;
  margin: 8px 0;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2em;
    padding: 8px;

    .button,
    button,
    a {
      font-size: 0.9em;
      padding: 4px 8px;
    }

    .label-required {
      margin: 4px 4px 4px 0;
      padding: 4px;
      border: 2px solid $color-danger;
      border-radius: 4px;
      color: $color-danger;
      font-weight: bold;
      font-size: 1rem;
    }
  }

  .e-collapsable-list-item {
    border-top: 1px solid $color-gray;
  }
}
</style>
