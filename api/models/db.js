const users = [{
  name: 'Admin', email: 'Admin@sendit.dv', username: 'admin', password: 'admin1234', right: 'admin',
},
{
  name: 'bertin', email: 'bertin@sendit.dv', username: 'bertin', password: 'admin1234', right: 'user',
},
{
  name: 'user2', email: 'user2@sendit.dv', username: 'user2', password: 'admin1234', right: 'user',
},
];
const parcels = [
  {
    parcelID: 1, owner: 'bertin', parcelName: 'Parcel 1', from: 'Kigali', to: 'Huye', status: 'Delivered',
  },
  {
    parcelID: 2, owner: 'user2', parcelName: 'Parcel 2', from: 'Kigali', to: 'Rwamagana', status: 'In transit',
  },
  {
    parcelID: 3, owner: 'bertin', parcelName: 'Parcel 3', from: 'Bugesera', to: 'Kibungo', status: 'Canceled',
  },
  {
    parcelID: 4, owner: 'user2', parcelName: 'Parcel 4', from: 'Muhanga', to: 'Kigali', status: 'Delivered',
  },
  {
    parcelID: 5, owner: 'bertin', parcelName: 'Parcel 5', from: 'Musanze', to: 'Rubavu', status: 'In transit',
  },
];
// End of data
require('dotenv').config();

const cs = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
const createtParcelsTableQuery = 'CREATE TABLE parcels IF NOT EXISTS('
+ 'parcelID SERIAL,'
+ 'owner text TEXT NOT NULL,'
+ 'parcelName TEXT NOT NULL,'
+ 'from text TEXT NOT NULL, '
+ 'to text TEXT NOT NULL, '
+ 'presentLocation TEXT NOT NULL'
+ 'price DECIMAL(600, 3) NOT NULL'
+ 'status text TEXT NOT NULL )'
+ 'PRIMARY KEY (parcelID)'
+ 'FOREIGN KEY (userID) REFERENCES users(userID)'
+ ');';

const createUsersTableQuery = 'CREATE TABLE users IF NOT EXISTS('
+ 'userID INT PRIMARY KEY,'
+ 'name TEXT NOT NULL, '
+ 'email TEXT NOT NULL, '
+ 'username TEXT NOT NULL, '
+ 'password TEXT NOT NULL, '
+ 'right TEXT NOT NULL, '
+ 'FOREIGN KEY (parcelID) REFERENCES parcels(parcelID)'
+ ');';

const { Pool } = require('pg');

const pool = new Pool({
  PGUSER: 'postgres',
  PGHOST: 'localhost',
  PGPASSWORD: 'admindev',
  PGDATABASE: 'sendit',
  PGPORT: 5432,
  connectionString: cs,
});


//const connect = async () => pool.connect();

/*const execute = async (sql, data = []) => {
  const connection = await connect();
  try {
    return await connection.query(sql, data);
  } catch (error) {
    console.log(error.message);
  } finally {
    connection.release();
  }
}; */

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
const createParcels = () => {
  pool.query(createtParcelsTableQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
const createUsers = () => {
  pool.query(createtParcelsTableQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

//async () => await execute(createtParcelsTableQuery);
//async () => await execute(createUsersTableQuery);
module.exports = { createParcels, createUsers, parcels, users };
