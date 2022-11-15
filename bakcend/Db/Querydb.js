var sql = ("create database IF NOT EXISTS db_pagos;use db_pagos;")
sql += ("use db_pagos;create table IF NOT EXISTS Informacion_personal(Id_info int AUTO_INCREMENT, Nombre varchar(255), Edad int, Fecha_nacimiento date, Cedula varchar(255), PRIMARY KEY (Id_info));create table IF NOT EXISTS Tipo_tarjeta (Id_tipo_tarjeta int AUTO_INCREMENT, Tipo varchar(255), Debito_credito int(2),PRIMARY KEY (Id_tipo_tarjeta));create table IF NOT EXISTS Tipo_banco(Id_banco int auto_increment, banco varchar(255), primary key (Id_banco) );create table IF NOT EXISTS Tarjeta (Id_tarjeta int AUTO_INCREMENT, Nombre_tarjeta varchar(255), Num_tarjeta bigint, Codigo_seg int(3), Fecha_vencimiento date, Id_tipo_tarjeta int, PRIMARY KEY (Id_tarjeta), FOREIGN KEY (Id_tipo_tarjeta) REFERENCES Tipo_tarjeta(Id_tipo_tarjeta));create table IF NOT EXISTS Cuenta_bancaria(Num_cuenta varchar(255), Id_tarjeta int, Cantidad float not null, Id_banco int, PRIMARY KEY (Num_cuenta), FOREIGN KEY (Id_banco) REFERENCES Tipo_Banco(Id_banco), FOREIGN KEY (Id_tarjeta) REFERENCES Tarjeta(Id_tarjeta));create table IF NOT EXISTS Transacciones(Id_transacciones int AUTO_INCREMENT, Id_cuenta_entrega varchar(255), Id_cuenta_recibido varchar(255), Cantidad int not null, PRIMARY KEY (Id_transacciones), FOREIGN KEY (Id_cuenta_entrega) REFERENCES Cuenta_bancaria(Num_cuenta), FOREIGN KEY (Id_cuenta_recibido) REFERENCES Cuenta_bancaria(Num_cuenta));create table IF NOT EXISTS Usuarios(Id_usuario int AUTO_INCREMENT, Usuario varchar(255), Contraseña varchar(255), E_mail varchar(255), Id_info int, Num_cuenta varchar(255), Id_transacciones int, PRIMARY KEY (Id_usuario), FOREIGN KEY (Id_info) REFERENCES Informacion_personal(Id_info), FOREIGN KEY (Num_cuenta) REFERENCES Cuenta_bancaria(Num_cuenta), FOREIGN KEY (Id_transacciones) REFERENCES Transacciones(Id_transacciones));")
var sql2 = ("INSERT INTO tipo_banco (banco) values ('East Bank');INSERT INTO tipo_banco (banco) values ('Western Bank');INSERT INTO tipo_tarjeta (Tipo, Debito_credito) values ('Visa',0);INSERT INTO tipo_tarjeta (Tipo, Debito_credito) values ('Visa',1);INSERT INTO tipo_tarjeta (Tipo, Debito_credito) values ('American Express',0);INSERT INTO tipo_tarjeta (Tipo, Debito_credito) values ('American Express',1);INSERT INTO tipo_tarjeta (Tipo, Debito_credito) values ('Mastercard',1);")
sql2 += ("INSERT INTO tipo_tarjeta (Tipo, Debito_credito) values ('Mastercard',1);INSERT INTO informacion_personal (Nombre, Edad, Fecha_nacimiento, Cedula) values ('jaime',18,'2003-06-15','123456');INSERT INTO informacion_personal (Nombre, Edad, Fecha_nacimiento, Cedula) values ('fernando',18,'2003-09-12','54321');INSERT INTO informacion_personal (Nombre, Edad, Fecha_nacimiento, Cedula) values ('erik',21,'2000-01-02','7634556');INSERT INTO informacion_personal (Nombre, Edad, Fecha_nacimiento, Cedula) values ('clara',40,'1960-04-23','123456');INSERT INTO informacion_personal (Nombre, Edad, Fecha_nacimiento, Cedula) values ('francisca',30,'1990-02-03','5287354');INSERT INTO informacion_personal (Nombre, Edad, Fecha_nacimiento, Cedula) values ('valentina',28,'1994-09-17','41412647');INSERT INTO tarjeta (Nombre_tarjeta, Num_tarjeta, Codigo_seg, Fecha_vencimiento, Id_tipo_tarjeta) values ('Tarjeta 1',1234567812345678,321,'2027-05-12',1);INSERT INTO tarjeta (Nombre_tarjeta, Num_tarjeta, Codigo_seg, Fecha_vencimiento, Id_tipo_tarjeta) values ('Tarjeta 2',4321876512345678,543,'2024-05-15',2);INSERT INTO tarjeta (Nombre_tarjeta, Num_tarjeta, Codigo_seg, Fecha_vencimiento, Id_tipo_tarjeta) values ('Tarjeta 3',1234567843218765,673,'2055-06-01',3);INSERT INTO tarjeta (Nombre_tarjeta, Num_tarjeta, Codigo_seg, Fecha_vencimiento, Id_tipo_tarjeta) values ('Tarjeta 4',9876543211234567,523,'3000-09-24',4);INSERT INTO tarjeta (Nombre_tarjeta, Num_tarjeta, Codigo_seg, Fecha_vencimiento, Id_tipo_tarjeta) values ('Tarjeta 5',8564712342737465,342,'2090-11-21',5);INSERT INTO tarjeta (Nombre_tarjeta, Num_tarjeta, Codigo_seg, Fecha_vencimiento, Id_tipo_tarjeta) values ('Tarjeta 6',4354637265323234,276,'2450-01-17',6);INSERT INTO cuenta_bancaria (Num_cuenta Not unique, Id_tarjeta, Cantidad, Id_banco) values ('0123456789',1,10000,1);INSERT INTO cuenta_bancaria (Num_cuenta, Id_tarjeta, Cantidad, Id_banco) values ('0123456789',2,10000,1);INSERT INTO cuenta_bancaria (Num_cuenta, Id_tarjeta, Cantidad, Id_banco) values ('0123456788',3,98000,2);INSERT INTO cuenta_bancaria (Num_cuenta, Id_tarjeta, Cantidad, Id_banco) values ('0123464678',4,1000,1);INSERT INTO cuenta_bancaria (Num_cuenta, Id_tarjeta, Cantidad, Id_banco) values ('0121134678',5,783900,2);INSERT INTO cuenta_bancaria (Num_cuenta, Id_tarjeta, Cantidad, Id_banco) values ('010203040',5,3000,2);")
sql2 += ("INSERT INTO cuenta_bancaria (Num_cuenta, Id_tarjeta, Cantidad, Id_banco) values ('0121134678',6,783900,2);INSERT INTO usuarios (Usuario, Contraseña, E_mail, Id_info, Id_cuenta) values ('jaim0615','jai150603','jaime@gmail.com',1,0123456789);INSERT INTO usuarios (Usuario, Contraseña, E_mail, Id_info, Id_cuenta) values ('fer0912','fer120903','fer@gmail.com',2,0123456788);INSERT INTO usuarios (Usuario, Contraseña, E_mail, Id_info, Id_cuenta) values ('erik0102','erik020100','erik@gmial.com',3,0123464678);INSERT INTO usuarios (Usuario, Contraseña, E_mail, Id_info, Id_cuenta) values ('clara0423','clara230460','clara@gmial.com',4,0121134678);INSERT INTO usuarios (Usuario, Contraseña, E_mail, Id_info, Id_cuenta) values ('franc0203','franc030290','franc@gmial.com',5,0121134678);INSERT INTO usuarios (Usuario, Contraseña, E_mail, Id_info, Id_cuenta) values ('vale0917','vale170994','vale@gmial.com',6,010203040);")


module.exports = {sql, sql2};