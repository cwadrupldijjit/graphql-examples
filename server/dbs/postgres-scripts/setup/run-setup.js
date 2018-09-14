const { join } = require('path');
const massive = require('massive');

massive('postgres://sample:12345@localhost:5432/sample', { scripts: join(__dirname)})
    .then(db => {
        db.clean_current_database()
            .then(() => db.create_users_table())
            .then(() => db.create_vacation_spots_table())
            .then(() => db.create_favorite_spots_table())
            .then(() => db.insert_users())
            .then(() => db.insert_vacation_spots())
            .then(() => db.insert_favorite_spots())
            .then(() => {
                console.log('All tables and starter info has been seeded');
            })
            .catch(err => {
                console.warn('Error while seeding:', err);
            });
    })
    .catch(err => console.warn('Error connecting to the DB:', err));