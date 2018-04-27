<template>
  <Tree
    :items="items"
    @toggled="toggled">
    <template slot="header">
      <th>Name</th>
      <th>Owner</th>
      <th>Id</th>
    </template>
    <template slot-scope="{item}">
      <td>{{ item.owner }}</td>
      <td>{{ item.id }}</td>
    </template>
  </Tree>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tree, {ITreeItem} from './Tree.vue';
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
        this.items = this.collectionToTree(groups.data);
      });
    },
    methods: {
      collectionToTree(data: IGroupResponse) {
        return data.managedObjects.map(item => {
          (item as ITreeItem).lazy = Boolean(item.childAssets.references.length);
          return item;
        });
      },
      toggled(item: IGroup) {
        GroupService.getGroupById(item.id).then(group => {
          const children = group.data.references
            .map(asset => {
              (asset.managedObject as ITreeItem).lazy = Boolean(asset.managedObject.childAssets.references.length);
              return asset.managedObject;
            });
          Vue.set(item, 'children', children);
        });
      }
    }
  });
</script>
