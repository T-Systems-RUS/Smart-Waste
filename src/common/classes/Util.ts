
export default class Util {
  private static API_LOCATION = 'https://tsitest.test-ram.m2m.telekom.com';

  /**
   * Get REST API URL
   * @param {string} url part to get full URL
   * @returns {string} full REST API URL
   */
  static getApiUrl(url: string) {
    return `${Util.API_LOCATION}/${url}`;
  }
}
