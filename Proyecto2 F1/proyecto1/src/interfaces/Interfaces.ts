
export interface HistorialUso {
    fecha: string;
    hora_inicio: string;
    hora_final: string;
}

export interface HistorialPeso {
    fecha: string;
    peso_registrado: number;
}

export interface SillaUsuario {
    id_silla: number;
    nombre_silla: number;
    ubicacion_silla: number;
}

export interface Tarea {
    tarea: string;
    veces_total?: number;
    fecha_registro?: string;
    total_horas?: number;
}