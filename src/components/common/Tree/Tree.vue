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
          v-for="(item, index) of tableDataComputed"
          :item="item"
          :key="index"
          @toggled="toggled(item)">

          <template slot="item-name">
            <slot
              name="item-name"
              :item="item"/>
          </template>
          <template slot="item-columns">
            <slot
              name="item-columns"
              :item="item"/>
          </template>
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
    lazy?: boolean;
    root?: boolean;
    loading?: boolean;
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
        this.items.forEach(item => { item.root = true; });
        this.getChildren(this.items, tableData, 0);
        return tableData;
      }
    },
    methods: {
      getChildren(items: ITreeItem[], table: ITreeItem[], index: number) {
        items.forEach(item => {
          if (item.root) {
            index = 0;
          }
          item.level = index;
          table.push(item);
          if (item.expanded && item.children && item.children.length) {
            index += 1;
            this.getChildren(item.children, table, index);
          }
        });
      },
      toggled(item: ITreeItem) {
        this.$emit('toggled', item);
      }
    }
  });
</script>
