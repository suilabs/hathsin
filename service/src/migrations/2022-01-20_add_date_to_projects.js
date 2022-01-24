export const up = async ({ projects: model }) => {
  const all = await model.getPublishedAndDraft()
  for (let project of all) {
    if (!project.date) {
      project.date = ''
      await model.update(project.id, project)
    }
  }
}

export const down = async ({ projects: model }) => {
  const all = await model.getPublishedAndDraft()
  for (let project of all) {
    if (project.date) {
      project.date = undefined
      await model.update(project.id, project)
    }
  }
}
