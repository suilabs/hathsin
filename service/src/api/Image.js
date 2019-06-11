import ImageModel from "../model/ImageModel";

export default {
  Query: {
    async images(parent, args, context, info) {
      return ImageModel.getAll();
    },
    async image(parent, { id }) {
      return ImageModel.getById(id);
    }
  },
  Mutation: {
    async insertImage(parent, newImage, context, info) {
      return ImageModel.create(newImage);
    },
    async updateImage(parent, { id, name, url, filename }, context, info) {
      return ImageModel.update(id, { name, url, filename });
    },
    async deleteImages(parent, { ids }, context, info) {
      const deleteImages = [];
      ids.forEach(id => {
        deleteImages.push(ImageModel.delete(id));
      });
      return deleteImages;
    }
  }
};
