<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>Qualification or relegation</th>
        </tr>
      </thead>
      <tbody>
        <TreeItem
          v-for="item of tableDataComputed"
          :item="item"/>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import TreeItem from './TreeItem.vue';

  const data = [{
    name: 'My Tree',
    expanded: true,
    children: [
      {
        name: 'child folder',
        children: [
          {
            name: 'child folder',
            children: [
              {name: 'hello'},
              {name: 'wat'}
            ]
          },
          {name: 'hello'},
          {name: 'wat'},
          {
            name: 'child folder',
            children: [
              {name: 'hello'},
              {name: 'wat'}
            ]
          }
        ]
      },
      {name: 'hello'},
      {name: 'wat'},
      {
        name: 'child folder',
        children: [
          {
            name: 'child folder',
            children: [
              {name: 'hello'},
              {name: 'wat'}
            ]
          },
          {name: 'hello'},
          {name: 'wat'},
          {
            name: 'child folder',
            children: [
              {name: 'hello'},
              {name: 'wat'}
            ]
          }
        ]
      }
    ]
  }];

  interface ITreeItem {
    name: string;
    expanded?: boolean;
    children?: ITreeItem[];
    level?: number;
  }

  interface ITreeData {
    treeData: ITreeItem[];
    tableData: ITreeItem[];
  }

  export default Vue.extend({
    components: {
      TreeItem
    },
    props: {
      field: String,
      title: String
    },
    data(): ITreeData {
      return {
        treeData: data,
        tableData: []
      };
    },
    computed: {
      tableDataComputed() {
        const tableData: ITreeItem[] = [];
        this.getChildren(this.treeData, tableData, 0);
        return tableData;
      }
    },
    methods: {
      getChildren(items: ITreeItem[], table: ITreeItem[], index: number) {
        items.forEach(item => {
          item.level = index;
          table.push(item);
          if (item.expanded && item.children && item.children.length) {
            index += 1;
            this.getChildren(item.children, table, index);
          }
        });
      }
    }
  });
</script>

<style lang='scss' scoped>


</style>
