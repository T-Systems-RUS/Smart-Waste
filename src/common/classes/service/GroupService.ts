import axios from 'axios';
import Util from '../Util';

export default class GroupService {

  /**
   * Get all groups
   * @returns {AxiosPromise<any>}
   */
  static getAllGroups() {
    const headers = {
      Authorization: 'Basic SWdvci5NaW5pbkB0LXN5c3RlbXMuY29tOlNvbWV0aGluZzU2OCE='
    };
    return axios.get(Util.getApiUrl('inventory/managedObjects?pageSize=1000&type=c8y_DeviceGroup&withTotalPages=true'), {headers});
  }

  static getGroupById(id: string) {
    return axios.get(Util.getApiUrl(`inventory/managedObjects${id}`));
  }
}
