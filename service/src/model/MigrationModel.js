import { Schema } from 'mongoose';
import AbstractModel from './AbstractModel';
import CommonTypes from './common';

export const STATUS = {
  DONE: true,
  FAIL: false,
}

class MigrationModel extends AbstractModel {
  static modelName = 'migration';
  static schema = {
    ...CommonTypes.idNameSchema,
    status: { type: Boolean },
    runDate: Date,
  }

  constructor() {
    super(MigrationModel.modelName, MigrationModel.schema);
  }

  async getMigrations() {
    return this.getAll()
  }

  async _trackMigration(migrationName, status) {
    return this.create({
      name: migrationName,
      status: STATUS.DONE,
      runDate: new Date(),
    })
  }

  async trackMigrationDone(migrationName) {
    return this._trackMigration(migrationName, STATUS.DONE)
  }

  async trackMigrationFailed(migrationName) {
    return this._trackMigration(migrationName, STATUS.FAIL)
  }
}

export default new MigrationModel()
