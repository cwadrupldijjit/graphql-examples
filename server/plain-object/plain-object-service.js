const users = [
    {
        name: 'Adrianne',
        email: 'minnie_fan@gmail.com',
        id: 1,
        created_at: '2018-06-21T02:31:01.264Z',
        modified_at: '2018-06-21T02:31:01.264Z',
    },
    {
        name: 'David',
        email: 'dave_rockclimber@yahoo.com',
        id: 2,
        created_at: '2018-06-21T02:31:01.264Z',
        modified_at: '2018-06-21T02:31:01.264Z',
    },
    {
        name: 'Caroline',
        email: 'artiste_passionne@outlook.com',
        id: 3,
        created_at: '2018-06-21T02:31:01.264Z',
        modified_at: '2018-06-21T02:31:01.264Z',
    },
    {
        name: 'Bob',
        email: 'myNameIsBob@gmail.com',
        id: 4,
        created_at: '2018-06-21T05:07:52.249Z',
        modified_at: '2018-06-21T05:07:52.249Z',
    },
];
users.latestCount = 4;

const collections = {
    users,
};

function getUsers() {
    return users;
}

function getUser(id) {
    const user = users.find(user.id);
    
    if (user) {
        
    }
}