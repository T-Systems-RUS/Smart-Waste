<template>
  <div class="container">
    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <slot name="header">
            <th>Header</th>
          </slot>
        </tr>
      </thead>
      <tbody>
        <TreeItem
          v-for="item of tableDataComputed"
          :item="item">
          <slot :item="item"/>
        </TreeItem>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import TreeItem from './TreeItem.vue';

  export interface ITreeItem {
    name: string;
    expanded?: boolean;
    children?: ITreeItem[];
    level?: number;
  }

  export default Vue.extend({
    components: {
      TreeItem
    },
    props: {
      items: Array as () => ITreeItem[]
    },
    computed: {
      tableDataComputed() {
        const tableData: ITreeItem[] = [];
        this.getChildren(this.items, tableData, 0);
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
