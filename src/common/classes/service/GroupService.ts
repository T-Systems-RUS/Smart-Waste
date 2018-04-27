import axios from 'axios';
import Util from '../Util';
import {AUTH} from '../../../store/modules/auth/getter-types';
import store from '../../../store';

export default class GroupService {

  /**
   * Get all groups
   * @returns {AxiosPromise<any>}
   */
  static getAllGroups() {
    const headers = {
      Authorization: store.getters[AUTH]
    };
    return axios.get(Util.getApiUrl('inventory/managedObjects?pageSize=1000&type=c8y_DeviceGroup&withTotalPages=true'), {headers});
  }

  static getGroupById(id: string) {
    return axios.get(Util.getApiUrl(`inventory/managedObjects${id}`));
  }
}
