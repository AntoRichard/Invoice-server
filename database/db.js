
class Database {
    static async insert(model, data) {
        try {
            await model.create(data);
            return {
                success: true
            };
        } catch (error) {
            console.log(error.message);
            return {
                error: error.message,
                success: false
            };
        }
    }   
}

module.exports = Database;