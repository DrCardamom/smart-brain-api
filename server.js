const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'shimba',
        password: 'shimba',
        database: 'smart-brain'
    }
})

const app = express();
// once i user this express.json() it parses all json data to object (i guess)
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('get req received!');
})

app.post('/signin', (req, res) => { singnin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {
    const {id} = req.body;

    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        // console.log(entries);
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});     