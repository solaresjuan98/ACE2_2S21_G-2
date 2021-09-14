use proyecto1;

-- Crear modelo

CREATE TABLE usuario
  (
     id_usuario     INT auto_increment NOT NULL,
     correo_usuario VARCHAR(50),
     contrasenia    VARCHAR(50),
     PRIMARY KEY (id_usuario)
  );

CREATE TABLE silla
  (
     id_silla        INT auto_increment NOT NULL,
     nombre_silla    VARCHAR(50),
     ubicacion_silla VARCHAR(50),
     id_usuario      INT,
     PRIMARY KEY (id_silla),
     CONSTRAINT fk_id_usuario FOREIGN KEY(id_usuario) REFERENCES usuario(
     id_usuario)
  ); 
  
CREATE TABLE registro
  (
     id_registro 	 INT auto_increment NOT NULL,
     fecha_registro  DATE,
     hora_inicio     TIMESTAMP,
     hora_final      TIMESTAMP,
     peso_registrado float,
     id_silla	     INT,
     primary key(id_registro),
     CONSTRAINT fk_id_silla_reg FOREIGN KEY(id_silla) REFERENCES silla(id_silla)
  );

ALTER TABLE registro MODIFY peso_registrado float;


-- borrar modelo

drop table registro;
drop table silla;
drop table usuario;