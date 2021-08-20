import { firestore, rtdb } from "./db";
import * as express from "express";

import * as _ from "lodash";

import { nanoid } from "nanoid";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("dist"));
const roomsCollection = firestore.collection("rooms");

//Se encarga de crear el room en la RealTimeDataBase y en la Database, retorna roomId
app.post("/rooms", (req, res) => {
  const { userName } = req.body;

  const roomRef = rtdb.ref("rooms/" + nanoid());

  roomRef
    .set({
      users: [
        {
          userKey: "",
          userName: userName,
          online: true,
          userPlay: "",
          start: "on",
        },
      ],

      roomId: "",
      rtdbRoomId: roomRef.key,
    })
    .then(() => {
      const longRoomId = roomRef.key;
      const roomId = 1000 + Math.floor(Math.random() * 99999);
      roomsCollection
        .doc(roomId.toString())
        .set({
          rtdbRoomId: longRoomId,
          history: [],
        })
        .then(() => {
          res.json({
            id: roomId.toString(),
          });
        });
    });
});

//Se encarga de obtener la data del roomID,devolviendo el history y el codigo de room en la RTDB
app.get("/rooms/:roomId", (req, res) => {
  const { userName } = req.query;
  const { roomId } = req.params;

  let data;
  roomsCollection
    .doc(roomId)
    .get()
    .then((snap) => {
      data = snap.data();
      res.json(data);
    });
});
//se encarga deobtener informacion de la RTDB, modifica la informacion de los jugadores
//y se encarga de hacer un push de las jugadas en el history.
let cont = 1;
app.post("/rooms/:rtdbRoomId/users", (req, res) => {
  const rtdbRoomId = req.params.rtdbRoomId;

  const user = req.body;
  const newUsers = [];
  const usersRef = rtdb.ref("/rooms/" + rtdbRoomId + "/users");
  usersRef.once("value", (snapshot) => {
    const users = snapshot.val();
    const usersList = _.map(users);
    usersList.forEach((element: any, index) => {
      if (element.userName == user.userName) {
        newUsers.push({
          userPlay: user.userPlay,
          userName: user.userName,
          roomId: user.roomId,
          online: user.online,
          start: user.start,
          userKey: index.toString(),
        });
      } else {
        newUsers.push(element);
      }
    });

    usersRef.set(newUsers).then((err) => {
      if (newUsers[0].userPlay != "" && newUsers[1].userPlay != "") {
        if (cont == 3) {
          const player1 = {
            userName: newUsers[0].userName,
            userPlay: newUsers[0].userPlay,
          };
          const player2 = {
            userName: newUsers[1].userName,
            userPlay: newUsers[1].userPlay,
          };
          const jugada = { player1, player2 };

          let data;
          roomsCollection
            .doc(newUsers[0].roomId)
            .get()
            .then((snap) => {
              data = snap.data();
              data.history.push(jugada);

              roomsCollection
                .doc(newUsers[0].roomId)
                .set(data)
                .then(() => {
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
app.post("/rooms/:rtdbRoomId", (req, res) => {
  const rtdbRoomId = req.params.rtdbRoomId;

  const usersRef = rtdb.ref("/rooms/" + rtdbRoomId + "/users");

  usersRef.once("value", (snapshot) => {
    const users = snapshot.val();

    const usersList = _.map(users);

    if (usersList.length >= 2) {
      return res.json(false);
    } else {
      console.log("soy menor a 2");
      usersRef.push({
        userName: req.body.userName,
        online: true,
        userPlay: "",
        start: "on",
      });
      res.json(true);
    }
  });
}),
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "../dist/index.html");
  });
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
