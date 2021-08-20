"use strict";
exports.__esModule = true;
var db_1 = require("./db");
var express = require("express");
var _ = require("lodash");
var nanoid_1 = require("nanoid");
var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static("dist"));
var roomsCollection = db_1.firestore.collection("rooms");
//Se encarga de crear el room en la RealTimeDataBase y en la Database, retorna roomId
app.post("/rooms", function (req, res) {
    var userName = req.body.userName;
    var roomRef = db_1.rtdb.ref("rooms/" + nanoid_1.nanoid());
    roomRef
        .set({
        users: [
            {
                userKey: "",
                userName: userName,
                online: true,
                userPlay: "",
                start: "on"
            },
        ],
        roomId: "",
        rtdbRoomId: roomRef.key
    })
        .then(function () {
        var longRoomId = roomRef.key;
        var roomId = 1000 + Math.floor(Math.random() * 99999);
        roomsCollection
            .doc(roomId.toString())
            .set({
            rtdbRoomId: longRoomId,
            history: []
        })
            .then(function () {
            res.json({
                id: roomId.toString()
            });
        });
    });
});
//Se encarga de obtener la data del roomID,devolviendo el history y el codigo de room en la RTDB
app.get("/rooms/:roomId", function (req, res) {
    var userName = req.query.userName;
    var roomId = req.params.roomId;
    var data;
    roomsCollection
        .doc(roomId)
        .get()
        .then(function (snap) {
        data = snap.data();
        res.json(data);
    });
});
//se encarga deobtener informacion de la RTDB, modifica la informacion de los jugadores
//y se encarga de hacer un push de las jugadas en el history.
var cont = 1;
app.post("/rooms/:rtdbRoomId/users", function (req, res) {
    var rtdbRoomId = req.params.rtdbRoomId;
    var user = req.body;
    var newUsers = [];
    var usersRef = db_1.rtdb.ref("/rooms/" + rtdbRoomId + "/users");
    usersRef.once("value", function (snapshot) {
        var users = snapshot.val();
        var usersList = _.map(users);
        usersList.forEach(function (element, index) {
            if (element.userName == user.userName) {
                newUsers.push({
                    userPlay: user.userPlay,
                    userName: user.userName,
                    roomId: user.roomId,
                    online: user.online,
                    start: user.start,
                    userKey: index.toString()
                });
            }
            else {
                newUsers.push(element);
            }
        });
        usersRef.set(newUsers).then(function (err) {
            if (newUsers[0].userPlay != "" && newUsers[1].userPlay != "") {
                if (cont == 3) {
                    var player1 = {
                        userName: newUsers[0].userName,
                        userPlay: newUsers[0].userPlay
                    };
                    var player2 = {
                        userName: newUsers[1].userName,
                        userPlay: newUsers[1].userPlay
                    };
                    var jugada_1 = { player1: player1, player2: player2 };
                    var data_1;
                    roomsCollection
                        .doc(newUsers[0].roomId)
                        .get()
                        .then(function (snap) {
                        data_1 = snap.data();
                        data_1.history.push(jugada_1);
                        roomsCollection
                            .doc(newUsers[0].roomId)
                            .set(data_1)
                            .then(function () {
                            console.log("todo ok");
                        });
                    });
                    cont = 0;
                }
                cont++;
            }
            res.json("todo ok");
        });
    });
});
//añade un jugador en la RTDB y se fija que no sean mas de dos
app.post("/rooms/:rtdbRoomId", function (req, res) {
    var rtdbRoomId = req.params.rtdbRoomId;
    var usersRef = db_1.rtdb.ref("/rooms/" + rtdbRoomId + "/users");
    usersRef.once("value", function (snapshot) {
        var users = snapshot.val();
        var usersList = _.map(users);
        if (usersList.length >= 2) {
            return res.json(false);
        }
        else {
            console.log("soy menor a 2");
            usersRef.push({
                userName: req.body.userName,
                online: true,
                userPlay: "",
                start: "on"
            });
            res.json(true);
        }
    });
}),
    // app.get("*", (req, res) => {
    //   res.sendFile(__dirname + "./dist/index.html");
    // });
    app.listen(port, function () {
        console.log("Example app listening at http://localhost:" + port);
    });
