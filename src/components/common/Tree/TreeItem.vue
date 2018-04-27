<template>
  <tr>
    <td>
      <div>
        <div class="expander">
          <img
            class="expand-icon"
            :class="{'open': item.expanded}"
            v-if="(item.children && item.children.length) || item.lazy"
            @click="toggled"
            src="./expand_outline.svg">
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
        Vue.set(this.item, 'expanded', !this.item.expanded);
        if (this.item.expanded) {
          this.$emit('toggled', this.item);
        }
      }
    }
  });
</script>

<style lang='scss' scoped>
  .expander {
    .expand-icon {
      cursor: pointer;
      width: 16px;
      transform: rotate(-90deg);
      transition: all 0.3s ease-out;

      &.open {
        transform: rotate(0deg);
      }
    }

    display: inline-block;
    width: 30px;
  }

  .item-name {
    position: relative;
  }
</style>
