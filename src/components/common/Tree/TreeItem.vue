<template>
  <tr>
    <td>
      <div>
        <div class="expander">
          <Checkbox
            v-if="(item.children && item.children.length) || item.lazy"
            :checked.sync="item.expanded"
            @update:checked="toggled"/>
        </div>
        <slot name="item-name">
          <span
            class="item-name"
            :style="{left: item.level * 10 + 'px' }">
            {{ item.name }}
          </span>
        </slot>
      </div>
    </td>
    <slot name="item-columns"/>
  </tr>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'TreeItem',
    props: {
      item: Object
    },
    methods: {
      toggled() {
        if (this.item.expanded) {
          this.$emit('toggled', this.item);
        }
      }
    }
  });
</script>

<style lang='scss' scoped>
  .expander {
    .checkbox {
      top: -14px;
    }

    display: inline-block;
    width: 30px;
  }

  .item-name {
    position: relative;
  }
</style>
