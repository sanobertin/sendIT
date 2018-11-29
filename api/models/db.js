//import dotenv from 'dotenv'
require('dotenv').config()
const { Pool, Client } =require('pg')
const cs = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
console.log(cs)

const pool = new Pool({
  PGUSER: process.env.PGUSER,
  PGHOST: process.env.PGHOST,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PGPORT: process.env.PGPORT,
  connectionString: cs,
});


pool.on('connect', () => {
  console.log('connected to the db');
});

// got inspiration from https://www.codementor.io/olawalealadeusi896/building-a-simple-api-with-nodejs-expressjs-and-postgresql-db-masuu56t7
function execute (sql, data=[]){
  return new Promise((resolve, reject) =>{
    pool.query(sql)
    .then((res) =>{
      resolve(res);
    })
    .catch((err) =>{
      reject(err);
    })
  })
  
}

module.exports = {execute};
