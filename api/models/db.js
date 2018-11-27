// This where you can find db
// Data
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
    parcelID: 1, owner: users[1].username, parcelName: 'Parcel 1', from: 'Kigali', to: 'Huye', status: 'Delivered',
  },
  {
    parcelID: 2, owner: users[2].username, parcelName: 'Parcel 2', from: 'Kigali', to: 'Rwamagana', status: 'In transit',
  },
  {
    parcelID: 3, owner: users[1].username, parcelName: 'Parcel 3', from: 'Bugesera', to: 'Kibungo', status: 'Canceled',
  },
  {
    parcelID: 4, owner: users[2].username, parcelName: 'Parcel 4', from: 'Muhanga', to: 'Kigali', status: 'Delivered',
  },
  {
    parcelID: 5, owner: users[1].username, parcelName: 'Parcel 5', from: 'Musanze', to: 'Rubavu', status: 'In transit',
  },
];
// End of data
require('dotenv').config();

const cs = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
console.log(cs);
const createtParcelsTableQuery = 'CREATE TABLE parcels IF NOT EXISTS('
+ 'parcelID SERIAL,'
+ 'owner text VARCHAR(100) not null,'
+ 'parcelName VARCHAR(100) not null,'
+ 'from text VARCHAR(100) not null, '
+ 'to text VARCHAR(100) not null, '
+ 'presentLocation VARCHAR(100) not null'
+ 'price DECIMAL(600, 3) not null'
+ 'status text VARCHAR(100) not null )'
+ 'PRIMARY KEY (parcelID)'
+ 'FOREIGN KEY (userID) REFERENCES users(userID)'
+ ');';

const createUsersTableQuery = 'CREATE TABLE users IF NOT EXISTS('
+ 'userID INT not null AUTO_INCREMENT,'
+ 'name VARCHAR(100) not null, '
+ 'email VARCHAR(100) not null, '
+ 'username VARCHAR(100) not null, '
+ 'password VARCHAR(100) not null, '
+ 'right VARCHAR(100) not null, '
+ 'PRIMARY KEY (userID)'
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


const connect = async () => pool.connect();

const execute = async (sql, data = []) => {
  const connection = await connect();
  try {
    return await connection.query(sql, data);
  } catch (error) {
    console.log(error.message);
  } finally {
    connection.release();
  }
};


async () => await execute(createtParcelsTableQuery);
async () => await execute(createUsersTableQuery);
module.exports = { execute, parcels, users };
