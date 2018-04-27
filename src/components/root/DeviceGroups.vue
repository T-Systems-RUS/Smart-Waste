<template>
  <Tree
    :items="items"
    @toggled="toggled">
    <template slot="header">
      <th>Name</th>
      <th>Owner</th>
      <th>Id</th>
    </template>
    <template
      slot="item-name"
      slot-scope="{item}">
      <span
        class="item-name"
        :style="{left: item.level * 20 + 'px' }">
        <span
          class="level"
          v-if="item.level"/>
        <img
          v-if="item.c8y_IsDevice"
          class="group-icon"
          src="./assets/device.svg">
        <img
          v-else
          class="group-icon"
          src="./assets/group.svg">
        {{ item.name }}
        <img
          v-if="item.loading"
          class="loading-icon"
          src="../../assets/loading_outline.svg">
      </span>
    </template>
    <template
      slot="item-columns"
      slot-scope="{item}">
      <td>{{ item.owner }}</td>
      <td>{{ item.id }}</td>
    </template>
  </Tree>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tree, {ITreeItem} from '../common/Tree/Tree.vue';
  import GroupService from '../../common/classes/service/GroupService';
  import {IGroup, IGroupResponse} from '../../common/interfaces/IGroup';

  interface IDeviceGroupData {
    items: ITreeItem[];
  }

  export default Vue.extend({
    components: {
      Tree
    },
    data(): IDeviceGroupData {
      return {
        items: []
      };
    },
    created() {
      GroupService.getAllGroups().then(groups => {
        this.items = this.groupsToTree(groups.data);
      });
    },
    methods: {
      toggled(item: IGroup) {
        (item as ITreeItem).loading = true;
        GroupService.getGroupById(item.id).then(group => {
          Vue.set(item, 'children', group.data.references.map(asset => this.mapGroupToTreeItem(asset.managedObject)));
          (item as ITreeItem).loading = false;
        });
      },
      // Private
      groupsToTree(data: IGroupResponse) {
        return data.managedObjects.map(item => this.mapGroupToTreeItem(item));
      },
      mapGroupToTreeItem(item: IGroup) {
        (item as ITreeItem).lazy = Boolean(item.childAssets.references.length);
        return item;
      }
    }
  });
</script>

<style lang="scss" scoped>
  .group-icon {
    width: 16px;
    height: 16px;
    position: relative;
    top: 2px;
  }
</style>

