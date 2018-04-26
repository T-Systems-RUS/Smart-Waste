<template>
  <Tree :items="items">
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
  import Tree, {ITreeItem} from './Tree.vue';
  import GroupService from '../../common/classes/service/GroupService';

  //const data = [{
  //   name: 'Big group',
  //   children: [
  //     {
  //       name: 'child group',
  //       children: [
  //         {
  //           name: 'child group',
  //           children: [
  //             {name: 'device 1', serial: 123, event: 'blabla'},
  //             {name: 'device 123', serial: 'sdasd', event: 'ASDASD'}
  //           ]
  //         },
  //         {name: 'Other device'},
  //         {name: 'even more'},
  //         {
  //           name: 'group',
  //           children: [
  //             {name: 'device', serial: 9999, event: 'Last event'},
  //             {name: 'device 3'}
  //           ]
  //         }
  //       ]
  //     },
  //     {name: 'device 4'},
  //     {name: 'device 123123'}
  //   ]
  // }];

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
        console.log(this.collectionToTree(groups.data));

        this.items = this.collectionToTree(groups.data);
      });
    },
    methods: {
      collectionToTree(data: IGroupResponse) {
        return data.managedObjects.map(item => {
          const treeItem: ITreeItem = {
            name: item.name
          };
          treeItem.children = item.childAssets.references.map(asset => ({name: asset.managedObject.name}));
          return treeItem;
        });
      }
    }
  });
</script>
