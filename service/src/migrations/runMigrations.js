import fs from 'fs';
import path from 'path';

import ProjectModel from '../model/ProjectModel';
import MigrationModel from '../model/MigrationModel';

export default async () => {
  const migrationsRun = (await MigrationModel.getMigrations()).map(({ name }) => name);
  const filesInMigrationFolder = fs.readdirSync(path.join(__dirname, '.'))
    .filter(
      (filename) => !filename.includes('runMigrations.js') && !migrationsRun.includes(filename)
    )

  const models = {
    projects: ProjectModel
  }

  for (let filename of filesInMigrationFolder) {
    const filepath = `./${filename}`
    console.log(filepath)
    const { up, down } = require(filepath)
    try {
      console.log('RUNNING MIGRATION', filename)
      await up(models)
      await MigrationModel.trackMigrationDone(filename)
    } catch (e) {
      console.log('MIGRATION', filename, 'FAILED')
      await down(models)
      await MigrationModel.trackMigrationFailed(filename)
    }
  }
}
