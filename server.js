const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { json } = require('express');

app.use(json());

const users = []

app.get('/users', (req, res) => {
    res.json(users)


});

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt)
        console.log(hashPassword)


        const user =  {name: req.body.name, password: hashPassword}
        users.push(user);
        res.status(201).send(users);
    } catch {
        res.status(500).send();
    }


});

app.post('/users/login', async (req, res) => {
     const user = users.find(user => user.name = req.body.name)

    if (user == null){

         return res.status(400).send('user not found');
    }

    try{
        if (await bcrypt.compare(req.body.password, user.password)) {

            res.send('success');
        } else {

            res.send('not allow');
        }

    } catch{


        res.status(500).send();
    }

})

app.listen(3000);