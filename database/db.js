class Database {
  failed(error) {
    return {
      error: error.message,
      success: false,
    };
  }
  static async insert(model, data) {
    try {
      await model.create(data);
      return {
        success: true,
      };
    } catch (error) {
      console.log(error.message);
      return this.failed(error);
    }
  }

  static async findByKey(model, key) {
    try {
      const data = await model.findOne(key);
      if(!data) {
        return {
          success: false
        }
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
