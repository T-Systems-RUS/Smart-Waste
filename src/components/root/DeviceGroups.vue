<template>
  <Tree :config="config">
    <template slot="header">
      <th>Name</th>
      <th>Serial</th>
      <th>Event</th>
    </template>
    <template scope="{item}">
      <td>{{ item.serial }}</td>
      <td>{{ item.event }}</td>
    </template>
  </Tree>
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
              {name: 'device 1', serial: 123, event: 'blabla'},
              {name: 'device 123', serial: 'sdasd', event: 'ASDASD'}
            ]
          },
          {name: 'Other device'},
          {name: 'even more'},
          {
            name: 'group',
            children: [
              {name: 'device', serial: 9999, event: 'Last event'},
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
