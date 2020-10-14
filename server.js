const express = require('express');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt-nodejs');

const app = express();

app.use(bodyParser.json());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            // will create a Date object in Javascript
            joined: new Date()
		},
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            // will create a Date object in Javascript
            joined: new Date()
		}
    ],
    login: [
        {
            id: '987',
            // hash
            has: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req,res) => {
    res.send(database.users);
})

app.post('/signin', (req,res) => {
    // res.send('signing');
  	// then will receive JSON string in POSTMAN
  	if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
      res.json('success');
    }else{
      res.status(400).json('error logging in');
    }
})

app.post('/register', (req,res) => {
    const { email, name, password} = req.body;
    
    bcrypt.hash(password, null, null, function(err, hash) {
    	console.log(hash);
	});


    database.users.push({
        id: '125',
        name: name,
        email: email,
        password:password,
        entries:0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
    
})

app.get('/profile/:id', (req,res) => {
	const { id } = req.params;
  let found = false;
  database.users.forEach(user =>{
    if(user.id === id){
      found = true;
      return res.json(user);
    } 
  })
  if(!found){
    res.status(404).json('not found');
  }
})

app.post('/image', (req,res) => {
	const { id } = req.body;
    let found = false;
    database.users.forEach(user =>{
    if(user.id === id){
      found = true;
      user.entries++;
      return res.json(user);
    } 
    })
    if(!found){
        res.status(404).json('not found');
    }
})

/*
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/

app.listen(3000, () => {
    console.log('app is running on port 3000');
})


/*
/ --> res = this is working
/signin --> POST = success/fail
    use post because we want hide pw in the body
/register --> POST = user
/profile/: userId --> GET = user
/image --> PUT --> user

*/