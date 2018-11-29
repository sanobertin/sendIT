CREATE TABLE IF NOT EXISTS  users(userID serial , name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, username TEXT NOT NULL UNIQUE, pass TEXT NOT NULL, rights TEXT NOT NULL, date_created timestamp NOT NULL DEFAULT NOW(), PRIMARY KEY (userID) );
insert into users (name, email, username, pass, rights)
values('admin', 'admin.sendit.dv', 'admin', 'admin1234', 'admin');

insert into users (name, email, username, pass, rights)
values('admin', 'admin.sendit.dv', 'admin2', 'admin1234', 'admin');
insert into users (name, email, username, pass, rights)
values('bertin','bertin@sendit.dv','bertin', 'admin1234', 'user');
insert into users (name, email, username, pass, rights)
values('user2', 'user2@sendit.dv', 'user2', 'admin1234', 'user');
insert into users (name, email, username, pass, rights)
values('andela', 'andela@sendit.dv', 'andela', 'admin1234', 'user');

CREATE TABLE IF NOT EXISTS parcels (parcelID SERIAL,owne TEXT NOT NULL,parcelName TEXT NOT NULL,fromlocation TEXT NOT NULL, tolocation TEXT NOT NULL, presentLocation TEXT NOT NULL, price DECIMAL(60, 3) NOT NULL, status TEXT NOT NULL, date_created TIMESTAMP NOT NULL DEFAULT NOW() , PRIMARY KEY (parcelID) );

insert into parcels(owne, parcelName, fromlocation, tolocation, presentlocation, price, status)
values('bertin', 'Parcel 1', 'Kigali', 'Huye', 'Huye', 1400, 'Delivered');
insert into parcels(owne, parcelName, fromlocation, tolocation, presentlocation, price, status)
values('user2', 'Parcel 2', 'Kigali', 'Rwamagana', 'Gasabo', 1000, 'In transit');
insert into parcels(owne, parcelName, fromlocation, tolocation, presentlocation, price, status)
values('bertin', 'Parcel 3', 'Bugesera', 'Kibungo', 'Kigali', 12000, 'Canceled');
insert into parcels(owne, parcelName, fromlocation, tolocation, presentlocation, price, status)
values('user2', 'Parcel 4', 'Muhanga', 'Kigali', 'Kigali', 200000, 'Delivered');
insert into parcels(owne, parcelName, fromlocation, tolocation, presentlocation, price, status)
values('bertin', 'Parcel 5', 'Musanze', 'Rubavu', 'Nyabihu', 23000, 'In transit');