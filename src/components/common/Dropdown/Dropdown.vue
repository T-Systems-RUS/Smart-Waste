<template>
  <div
    class="dropdown is-right"
    :class="{'is-active': isOpen }">
    <div class="dropdown-trigger">
      <button
        class="button is-small action-toggle"
        @click="toggleDropdown(item)">
        <slot name="toggle">
          Open
        </slot>
      </button>
    </div>
    <div class="dropdown-menu">
      <div class="dropdown-content">
        <slot name="items">
          <a class="dropdown-item">
            Dropdown item
          </a>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        isOpen: false
      };
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      }
    }
  });
</script>

<style lang="scss" scoped>
  .action-toggle {
    padding: 12px 5px;
  }

  .dropdown-item {
    text-decoration: none;
  }
</style>
