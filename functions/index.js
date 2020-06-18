const express = require('express');
const cors = require('cors');

//Firebase init
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

//Express and CORS middleware init
const app = express();
app.use(cors());

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});


app.post('/', (request, response) => {
    const entry = request.body;

    return admin.database().ref('/entries').push(entry)
        .then(() => {
            return response.status(200).send("Entry successful " + entry)
        }).catch(error => {
            console.error(error);
            return response.status(500).send('Oh no! Error: ' + error);
        })
});

app.get('/', (request, response) => {
    return admin.database().ref('/entries').on("value", snapshot => {
        return response.status(200).send(snapshot.val());
    }, error => {
        console.error(error);
        return response.status(500).send('Oh no! Error: ' + error);
    });
});

exports.entries = functions.https.onRequest(app);

