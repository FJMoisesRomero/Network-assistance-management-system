-- CreateTable
CREATE TABLE "marcas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "sitio_web" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "parabolas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "marca_id" INTEGER,
    "modelo" TEXT NOT NULL,
    "banda" INTEGER DEFAULT 5,
    "ganancia" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "parabolas_marca_id_fkey" FOREIGN KEY ("marca_id") REFERENCES "marcas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "equipos_modelos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL,
    "marca_id" INTEGER,
    "alimentacion" INTEGER NOT NULL,
    "consumo_energia" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "equipos_modelos_marca_id_fkey" FOREIGN KEY ("marca_id") REFERENCES "marcas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "casillas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL,
    "marca_id" INTEGER,
    "dimensiones" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "casillas_marca_id_fkey" FOREIGN KEY ("marca_id") REFERENCES "marcas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "zonas_estados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "zonas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "estado_id" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "zonas_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "zonas_estados" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "nodos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "zona_id" INTEGER,
    "casilla_id" INTEGER,
    "fecha_instalacion" DATETIME,
    "camara" BOOLEAN NOT NULL DEFAULT false,
    "telefono" TEXT,
    "direccion" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "latitud" TEXT NOT NULL,
    "longitud" TEXT NOT NULL,
    "descripcion" TEXT,
    "altura" INTEGER NOT NULL,
    "propiedad" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "nodos_zona_id_fkey" FOREIGN KEY ("zona_id") REFERENCES "zonas" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "nodos_casilla_id_fkey" FOREIGN KEY ("casilla_id") REFERENCES "casillas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "torres" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dimension" TEXT NOT NULL,
    "medida_cara_interna" REAL NOT NULL,
    "medida_cara_externa" REAL NOT NULL,
    "dimension_cano" REAL NOT NULL,
    "riendas" INTEGER NOT NULL,
    "nodo_id" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "torres_nodo_id_fkey" FOREIGN KEY ("nodo_id") REFERENCES "nodos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "equipos_rf" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "modelo_id" INTEGER,
    "parabola_id" INTEGER,
    "modo_equipo" TEXT NOT NULL DEFAULT 'No asignado',
    "nodo_id" INTEGER,
    "estado_no_instalado" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "equipos_rf_modelo_id_fkey" FOREIGN KEY ("modelo_id") REFERENCES "equipos_modelos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "equipos_rf_parabola_id_fkey" FOREIGN KEY ("parabola_id") REFERENCES "parabolas" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "equipos_rf_nodo_id_fkey" FOREIGN KEY ("nodo_id") REFERENCES "nodos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "paneles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL,
    "amperaje" INTEGER NOT NULL,
    "voltaje" INTEGER NOT NULL,
    "woltaje" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "inversores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL,
    "amperaje" INTEGER NOT NULL,
    "voltaje" INTEGER NOT NULL,
    "woltaje" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "reguladores" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL,
    "amperaje" INTEGER NOT NULL,
    "voltaje" INTEGER NOT NULL,
    "woltaje" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "baterias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "amperaje" INTEGER NOT NULL,
    "voltaje" INTEGER NOT NULL,
    "woltaje" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "fuentes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "voltaje" INTEGER NOT NULL,
    "amperaje" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "obras" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "encargados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "puesto" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "asistencias_trabajos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "asistencias_causas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "asistencias_motivos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "asistencias_tipos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "asistencias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nodo_id" INTEGER,
    "tipo_id" INTEGER,
    "motivo_id" INTEGER,
    "causa_id" INTEGER,
    "trabajo_id" INTEGER,
    "encargado_id" INTEGER,
    "numero_ot" INTEGER,
    "fecha_asistencia" DATETIME,
    "hora_salida" DATETIME,
    "hora_llegada" DATETIME,
    "hora_retiro" DATETIME,
    "link_fotos" TEXT,
    "observaciones" TEXT,
    "tarea_realizada" BOOLEAN NOT NULL DEFAULT false,
    "equipo_desintalado" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "asistencias_nodo_id_fkey" FOREIGN KEY ("nodo_id") REFERENCES "nodos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "asistencias_tipo_id_fkey" FOREIGN KEY ("tipo_id") REFERENCES "asistencias_tipos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "asistencias_motivo_id_fkey" FOREIGN KEY ("motivo_id") REFERENCES "asistencias_motivos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "asistencias_causa_id_fkey" FOREIGN KEY ("causa_id") REFERENCES "asistencias_causas" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "asistencias_trabajo_id_fkey" FOREIGN KEY ("trabajo_id") REFERENCES "asistencias_trabajos" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "asistencias_encargado_id_fkey" FOREIGN KEY ("encargado_id") REFERENCES "encargados" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cuadrillas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "obra_id" INTEGER,
    "chofer" BOOLEAN NOT NULL DEFAULT false,
    "asistencia_id" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "cuadrillas_obra_id_fkey" FOREIGN KEY ("obra_id") REFERENCES "obras" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "cuadrillas_asistencia_id_fkey" FOREIGN KEY ("asistencia_id") REFERENCES "asistencias" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
