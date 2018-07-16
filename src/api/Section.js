import SectionModel from "../model/SectionModel";

export default {
  Query: {
    async sections(parent, args, context, info) {
      return SectionModel.getAll();
    },
    async section(parent, { id }) {
      return SectionModel.getById(id);
    }
  },
  Mutation: {
    async insertSection(parent, newSection, context, info) {
      return SectionModel.create(newSection);
    },
    async updateSection(parent, { id, name }, context, info) {
      return SectionModel.update(id, { name });
    },
    async deleteSections(parent, { ids }, context, info) {
      const deleteItems = [];
      ids.forEach(id => {
        deleteItems.push(SectionModel.delete(id));
      });
      return deleteItems;
    }
  }
};
