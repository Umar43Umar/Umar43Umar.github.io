const express = require ('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require ('knex');
const signin = require ('./controllers/signin');
const register = require('./controllers/register.js');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : '60777812',
    database : 'smart-brain'
  }
});

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res)=>{
	res.send('success');
})

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))

app.listen(3000, ()=>{
	console.log('app is running')
})