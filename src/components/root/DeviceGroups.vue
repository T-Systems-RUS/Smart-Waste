<template>
  <div>
    <Tree
      :items="items"
      @toggled="toggled">
      <template slot="header">
        <th>Name</th>
        <th>Owner</th>
        <th>Id</th>
        <th/>
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
        <td>
          <Dropdown v-if="!item.c8y_IsDevice">
            <span
              slot="toggle"
              class="icon is-small">
              <img
                class="more-icon"
                src="./assets/more.svg">
            </span>
            <template slot="items">
              <a
                class="dropdown-item"
                @click="toggleAddModal">
                Add child group
              </a>
              <a
                class="dropdown-item"
                @click="toggleDeleteModal">
                Delete group
              </a>
            </template>
          </Dropdown>
        </td>
      </template>
    </Tree>
    <ConfirmModal
      v-if="isDeleteModalShown"
      @exit="toggleDeleteModal"
      @confirm="deleteGroup">
      <template slot="modal-title">Delete group?</template>
      <div
        class="has-text-centered"
        slot="modal-body">
        <p class="is-size-6 popup-body">
          Are you sure you want to delete this group?
        </p>
      </div>
      <template slot="confirm-button">
        <button
          class="button is-primary"
          slot="modal-buttons">
          Delete group
        </button>
      </template>
    </ConfirmModal>
    <ConfirmModal
      v-if="isAddModalShown"
      @exit="toggleAddModal"
      @confirm="addGroup">
      <template slot="modal-title">Add new child group?</template>
      <div
        class="has-text-centered"
        slot="modal-body">
        <p class="is-size-6 popup-body">
          Please specify a name for new child group
        </p>
        <input
          class="input group-name"
          type="text"
          placeholder="Group name">
      </div>
      <template slot="confirm-button">
        <button
          class="button is-primary"
          slot="modal-buttons">
          Add group
        </button>
      </template>
    </ConfirmModal>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tree, {ITreeItem} from '../common/Tree/Tree.vue';
  import Dropdown from '../common/Dropdown/Dropdown.vue';
  import ConfirmModal from '../common/ConfirmModal/ConfirmModal.vue';
  import GroupService from '../../common/classes/service/GroupService';
  import {IGroup, IGroupResponse} from '../../common/interfaces/IGroup';

  interface IDeviceGroupData {
    isDeleteModalShown: boolean;
    isAddModalShown: boolean;
    items: ITreeItem[];
  }

  export default Vue.extend({
    components: {
      Tree,
      Dropdown,
      ConfirmModal
    },
    data(): IDeviceGroupData {
      return {
        isAddModalShown: false,
        isDeleteModalShown: false,
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
      },
      toggleDeleteModal() {
        this.isDeleteModalShown = !this.isDeleteModalShown;
      },
      toggleAddModal() {
        this.isAddModalShown = !this.isAddModalShown;
      },
      deleteGroup() {

      },
      addGroup() {

      }
    }
  });
</script>

<style lang="scss" scoped>
  $icon-width: 16px;

  .group-icon {
    width: $icon-width;
    height: $icon-width;
    position: relative;
    top: 2px;
  }

  .more-icon {
    position: relative;
    top: -8px;
    width: $icon-width;
    transform: rotate(90deg);
  }

  .group-name {
    margin-top: 20px;
  }
</style>

