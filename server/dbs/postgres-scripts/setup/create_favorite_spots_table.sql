CREATE TABLE "FavoriteSpots" (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "Users" (id) ON DELETE CASCADE,
    vacation_spot_id INT REFERENCES "VacationSpots" (id) ON DELETE CASCADE,
    notes TEXT DEFAULT ''
);