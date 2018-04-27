import axios from 'axios';
import Util from '../Util';
import {AUTH} from '../../../store/modules/auth/getter-types';
import store from '../../../store';
import {IGroupChildrenResponse, IGroupResponse} from '../../interfaces/IGroup';

export default class GroupService {
  /**
   * Get all groups
   * @returns {AxiosPromise<IGroupResponse>}
   */
  static getAllGroups() {
    return axios.get<IGroupResponse>(
      Util.getApiUrl('inventory/managedObjects?pageSize=1000&type=c8y_DeviceGroup&withTotalPages=true'),
      {headers: this.getHeaders()});
  }

  static getGroupById(id: string) {
    return axios.get<IGroupChildrenResponse>(Util.getApiUrl(`inventory/managedObjects/${id}/childAssets`),
      {headers: this.getHeaders()});
  }

  private static getHeaders() {
    return {
      Authorization: store.getters[AUTH]
    };
  }
}
