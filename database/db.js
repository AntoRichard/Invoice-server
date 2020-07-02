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
      console.log(insertedData);
      return {
        success: true,
        data: insertedData,
      };
    } catch (error) {
      console.log(error.message);
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
      console.log(error.message);
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
      console.log(error.message);
      return this.failed(error);
    }
  }
  static async findAll(model) {
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
      console.log(error.message);
      return this.failed(error);
    }
  }
}

module.exports = Database;
