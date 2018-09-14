DROP TABLE IF EXISTS "VacationSpots";

CREATE TABLE "VacationSpots" (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT DEFAULT '' NOT NULL,
    image TEXT
);