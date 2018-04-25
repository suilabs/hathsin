import AbstractModelController from './AbstractController';

/**
 * Schema
 *
 * type Project {
 *   key: String!
 *   title: String!
 *   subTitle: String!
 *   coverImage: String!
 *   position: Int!
 *   type: ProjectType!
 *   images: [ImageBoxDef]
 * };
 */
class Project extends AbstractModelController {
  get key() {
    return this.object.key;
  }

  get title() {
    return this.object.title;
  }

  get subTitle() {
    return this.object.subTitle;
  }

  get coverImage() {
    return this.object.coverImage;
  }

  get position() {
    return this.object.position;
  }

  get types() {
    return this.object.types;
  }

  get images() {
    return this.object.images;
  }

  set title(value) {
    this.object.title = value;
  }

  set subTitle(value) {
    this.object.subTitle = value;
  }

  set coverImage(value) {
    this.object.coverImage = value;
  }

  set position(value) {
    this.object.position = value;
  }

  set types(value) {
    this.object.types = value || [];
  }

  set images(value) {
    this.object.images = value || [];
  }

  /**
   *
   * @param {string} key - unique key
   * @param {string} title - Project title
   * @param {string} subTitle - Project subtitle
   * @param {ImageBox} coverImage - Project image to use as cover
   * @param {number} position - Position in the Projects array (ignored by now)
   * @param {Array<string>} types - Names of the types
   * @param {Array<string>} images - Names of the images associated
   */
  constructor({ key, title, subTitle, coverImage, position, types, images }) {
    super();
    this.object = {};
    this.object.key = key;
    this.object.title = title;
    this.object.subTitle = subTitle;
    this.object.coverImage = coverImage;
    this.object.position = position;
    this.object.types = types;
    this.object.images = images;
  }

  /**
   * Adds a type to the project
   * @param {string} type - Name of the type
   * @return {this} - The same object
   */
  addType(type) {
    this.object.type.push(type);
    return this;
  }

  /**
   * Adds image to the project
   * @param {string} image - Name of the image to associate
   * @returns {this} - the same object
   */
  addImage(image) {
    this.object.images.push(image);
    return this;
  }
}

Project.prototype.objectName = 'projects';

export default Project;
