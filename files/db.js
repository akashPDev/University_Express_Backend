// require('dotenv').config();
// const pgp= require('pg-promise')()
// const dbConnectionString = process.env.POSTGRESQL_CONNECT;
// const db=pgp(dbConnectionString)
// module.exports=db

const pgp = require('pg-promise')()
const connectstring='postgres://ap7171363:ZijxaP8q9SXw@ep-ancient-rice-59780085.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
const db= pgp(connectstring)
module.exports=db