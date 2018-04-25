import DB from '../DBConnection/jsonConnector';

class AbstractModelController {
  static all() {
    const elements = DB.get(this.prototype.objectName);
    return elements.map(el => new this.prototype.constructor(el));
  }

  /**
   * Pre: there is only one element with the given key (if any)
   * @param {string} key - Unique key to identify items
   * @returns {Object} - an instance of the element
   */
  static byKey(key) {
    const element = DB.get(this.prototype.objectName, obj => key === obj.key)[0];
    return new this.prototype.constructor(element);
  }

  static byKeyValue(key, value) {
    const elements = DB.get(this.prototype.objectName, element => value === element[key]);
    return elements.map(el => new this.prototype.constructor(el));
  }

  save(persist) {
    if (!DB.exists(this.objectName, this.object)) {
      DB.insert(this.objectName, this.object, persist);
    } else {
      DB.update(this.objectName, this.object, persist);
    }
  }

  delete(persist) {
    DB.delete(this.objectName, this.object, persist);
  }
}

export default AbstractModelController;
