import mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';

const project = (obj) => {
  const { _id, ...rest} = obj;
  return {
    ...rest,
    id: _id,
  }
};

export default class AbstractModel {

  constructor(name, schema) {
    this.schema = new mongoose.Schema(schema);
    this.model = mongoose.model(name, this.schema);
  }

  async getAll(info) {
    const results = await this.model.find({}, info);
    return results.map(result => project(result.toObject()));
  }

  async getById(id) {
    const result = await this.model.findById(id);
    return result ? project(result.toObject()) : {};
  }

  create(data) {
    const result = new this.model({
      _id: uuidv4(),
      ...data
    });
    result.save();
    return project(result.toObject());
  }

  async update(id, data) {
    let result;
    try {
      result = await this.model.findByIdAndUpdate(id, {$set: data}, { rawResults: true });
    } catch (err) {
      console.log(err);
    }
    return result ? project(result.toObject()) : {};
  }

  async delete(id) {
    const result = await this.model.findByIdAndRemove(id, { rawResults: true });
    return result ? project(result.toObject()) : {};
  }
}
