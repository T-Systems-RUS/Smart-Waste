<template>
  <Tree :items="items">
    <template slot="header">
      <th>Name</th>
      <th>Owner</th>
      <th>Id</th>
    </template>
    <template scope="{item}">
      <td>{{ item.owner }}</td>
      <td>{{ item.id }}</td>
    </template>
  </Tree>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tree, {ITreeItem} from './Tree.vue';
  import GroupService from '../../common/classes/service/GroupService';

  interface IGroupResponse {
    managedObjects: {
      name: string;
      childAssets: {
        references: {
          managedObject: {
            name: string;
          }
        }[]
      }
    }[]
  }

  interface IDeviceGroupData {
    items: ITreeItem[];
  }

  export default Vue.extend({
    components: {
      Tree
    },
    data():IDeviceGroupData {
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
          (item as ITreeItem).children = item.childAssets.references.map(asset => ({name: asset.managedObject.name}));
          return item;
        });
      }
    }
  });
</script>
