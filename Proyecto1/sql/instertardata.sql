use proyecto1;
-- 
-- obtener hora actual
select current_time();
-- hora actual del sistema 2
select current_timestamp();

-- restar horas para obtener la hora actual
select subtime(current_time(), "06:00:00") as fecha_gt;
-- sumar horas para obtener la hora final
select addtime(subtime(current_timestamp(), "06:00:00"), "02:00:00") as fecha;

-- seleccionar dia, mes y año de la fecha actual del sistema
select date(current_timestamp());
-- seleccionar hora de la fecha actual del sistema
select time(current_timestamp());
-- ============================================================

-- INSERTAR USUARIO
insert into usuario(correo_usuario, contrasenia) value("usuario@correo.com", "1234");
select * from usuario;

-- INSERTAR SILLA
describe silla;
insert into silla(nombre_silla, ubicacion_silla, id_usuario) values("Mi silla", "(1, 1)", 1);


-- INSERTAR REGISTROS
describe registro;
insert into registro(fecha_registro, hora_inicio, hora_final, peso_registrado, id_silla) 
	values(date(current_timestamp(), subtime(current_timestamp(), "06:00:00"),  addtime(subtime(current_timestamp(), "06:00:00"), "02:00:00"), 50, 1));
select current_timestamp();

