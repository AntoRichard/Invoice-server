class Database {
  static failed(error) {
    return {
      error: error.message,
      success: false,
    };
  }
  static async insert(Model, data) {
    try {
      const insertedData = await new Model(data).save();
      return {
        success: true,
        data: insertedData,
      };
    } catch (error) {
      return this.failed(error);
    }
  }

  static async findByKey(model, key) {
    try {
      const data = await model.findOne(key);
      if (!data) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      return this.failed(error);
    }
  }

  static async findAllByKey(model, key) {
    try {
      const data = await model.find(key);
      if (!data) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      return this.failed(error);
    }
  }
  static async findAll(model, select = []) {
    try {
      const data = await model.find({});

      if (!data) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      return this.failed(error);
    }
  }

  static async findOneAndUpdate(model, key, value) {
    try {
      const data = await model.findOneAndUpdate(key, value);
      if (!data) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      return this.failed(error);
    }
  }

  static async findOneAndDelete(model, key) {
    try {
      const data = await model.findOneAndDelete(key);
      if (!data) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      return this.failed(error);
    }
  }

  static async sortDataBy(model, type, key) {
    try {
      let data;
      if (key) {
        data = await model.find(key).sort(type);
      } else {
        data = await model.find({}).sort(type);
      }
      if (!data) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      return this.failed(error);
    }
  }

  static async filterDataBy(model, time, key) {
    try {
      let data;
      if (key) {
        data = await model.find({
          ...key,
          date: { $gte: time.start, $lte: time.end },
        });
      } else {
        data = await model.find({ date: { $gte: time.start, $lte: time.end } });
      }
      if (!data) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      return this.failed(error);
    }
  }

  static async filterAndSortDataBy(model, type, time, key) {
    let timeLimit;
    if (time) {
      timeLimit = { date: { $gte: time.start, $lte: time.end } };
    }
    try {
      let data;
      if (key) {
        data = await model
          .find({
            ...key,
            ...timeLimit,
          })
          .sort(type);
      } else {
        data = await model.find({ ...timeLimit}).sort(type);
      }
      if (!data) {
        return {
          success: false,
        };
      }
      return {
        success: true,
        data,
      };
    } catch (error) {
      return this.failed(error);
    }
  }
}

module.exports = Database;
