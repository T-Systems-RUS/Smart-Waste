import Vue from 'vue';

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

  /**
   * Create two way mapper Getter <-> Mutation for computed property
   * @param {string} getter
   * @param {string} mutation
   * @returns {any} Mapper for computed property
   */
  static mapTwoWay<T>(getter: string, mutation: string) {
    return {
      get(this: Vue): T {
        return this.$store.getters[getter];
      },
      set(this: Vue, value: T) {
        this.$store.commit(mutation, value);
      }
    };
  }
}
