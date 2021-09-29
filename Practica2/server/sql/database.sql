
CREATE TABLE registro_clima
(
    id_registro      INT AUTO_INCREMENT NOT NULL,
    fecha_registro   DATE               NOT NULL,
    hora_registro    TIMESTAMP          NOT NULL,
    velocidad_viento FLOAT              NOT NULL,
    humedad          FLOAT              NOT NULL,
    temperatura      FLOAT              NOT NULL,
    direccion_viento VARCHAR(15)        NOT NULL,
    cantidad_luz     FLOAT              NOT NULL,
    PRIMARY KEY (id_registro)
);