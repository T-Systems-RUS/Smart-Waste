<template>
  <Tree :config="config"/>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tree from './Tree.vue';

  const data = [{
    name: 'Big group',
    children: [
      {
        name: 'child group',
        children: [
          {
            name: 'child group',
            children: [
              {name: 'device 1'},
              {name: 'device 123'}
            ]
          },
          {name: 'Other device'},
          {name: 'even more'},
          {
            name: 'group',
            children: [
              {name: 'device'},
              {name: 'device 3'}
            ]
          }
        ]
      },
      {name: 'device 4'},
      {name: 'device 123123'}
    ]
  }];

  export default Vue.extend({
    components: {
      Tree
    },
    data() {
      return {
        config: {
          data
        }
      };
    }
  });
</script>
