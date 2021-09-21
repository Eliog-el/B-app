const dotenv = require('dotenv')
dotenv.config()

const DB_URL = `${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_DBNAME}`;
const PORT = process.env.PORT;
const TOKEN_SECRET = process.env.TOKEN_SECRET;

module.export = {
    DB_URL,
    PORT,
    TOKEN_SECRET
}

