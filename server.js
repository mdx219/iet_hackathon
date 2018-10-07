const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('@pusher/chatkit-server');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:6953dac6-6667-45b1-b5d5-22f22ebd8d1c',
    key: 'ab0b3e58-81d3-4850-bdaf-1c42bb32e115:SZlGYzeh05agOjnOClNTp9EEyTS6dURHLxL2QzEPVwk=',
});

const PORT = 3001

app.post('/users', (req, res) => {
    const { username } = req.body
    chatkit.createUser({
        id: username,
        name: username,
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
        if (error.error_type === 'servoces/chatkit/user_already_exists') {
            console.log(error.statusCode);
            res.sendStatus(200);
        } else {
            res.status(error.status).json(error);
        }
    });
});

app.post('/authenticate', (req, res) => {
    const { grant_type } = req.body
    res.json(chatkit.authenticate({ 
        grant_type, 
        userId: req.query.user_id 
    }))
    // const authData = chatkit.authenticate({ userId: req.query.user_id })
    // res.status(authData.status).send(authData.body)
})


app.listen(PORT, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Running on port ${PORT}`);
    }
})