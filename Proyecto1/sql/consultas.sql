use proyecto1;

-- ================= CONSULTAS =================

-- === Grafica de tendencia de peso del usuario
select r.fecha_registro, r.peso_registrado
from registro r
         join silla s on s.id_silla = r.id_silla
         join usuario u on u.id_usuario = s.id_usuario
where u.id_usuario= 2;

-- ==== Veces que se levanta el usuario (realizar promedio desde el backend)
select distinct date(fecha_registro), count(*) as veces_levantado
from registro
         join silla s on s.id_silla = registro.id_silla
         join usuario u on u.id_usuario = s.id_usuario
where s.id_usuario = 1
group by date(fecha_registro);

-- ==== Obtener el dia y el numero de horas (solo falta agrupar por semanas en un where)
select date(fecha_registro) as fecha, SUM(timestampdiff(second, hora_inicio, hora_final) / 3600) as horas from registro
    join silla s on s.id_silla = registro.id_silla
    join usuario u on u.id_usuario = s.id_usuario
where  u.id_usuario = 1
group by fecha;


-- ==== Obtener ultimo registro
select *
from registro
         join silla s on s.id_silla = registro.id_silla
         join usuario u on u.id_usuario = s.id_usuario
where u.id_usuario = 1
order by hora_final desc
limit 1;

-- ==== Historial del tiempo de uso de la silla

