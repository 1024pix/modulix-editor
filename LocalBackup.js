export default class LocalBackup {
  static localStorageKey = 'modulix-schema';

  static save(schema) {
    const schemaAsString = JSON.stringify(schema);
    window.localStorage.setItem(this.localStorageKey, schemaAsString);
  }

  static load() {
    const schemaAsString = window.localStorage.getItem(this.localStorageKey);
    try {
      return JSON.parse(schemaAsString);
    } catch {
      window.localStorage.removeItem(this.localStorageKey);
    }
  }
}
