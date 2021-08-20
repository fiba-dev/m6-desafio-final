type choose = "piedra" | "papel" | "tijera";
import * as _ from "lodash";
import { rtdb } from "./rtdb";

const state = {
  data: {
    userKey: "",
    userName: "",
    guestName: "",
    online: true,
    guestOnline: false,
    guestPlay: "",
    userPlay: "",
    guestStart: "",
    start: "",

    roomId: "",
    rtdbRoomId: "",
    history: [],
  },
  // init para cuando inicia tome los datos del localstorage
  // init() {
  //   const currentGame = this.getState();

  //   const localData = localStorage.getItem("saved-state");

  //   if (JSON.parse(localData) != null)
  //     currentGame.history = JSON.parse(localData);
  // },

  //setRoom , crea un room y devuelve el roomId
  createRoom(callback) {
    const cs = this.getState();
    console.log("RTDB", rtdb);
    fetch("/rooms", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userName: cs.userName,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.roomId = data.id;

        if (callback) callback();
      });
  },
  // get History, obtiene historial de partidas
  getHistory(callback) {
    const cs = this.getState();

    fetch("/rooms/" + cs.roomId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.history = data.history;
      });
    if (callback) callback();
  },
  //accesoTo Room, accede a al room en la RTDB desde el roomId
  accessToRoom(callback?) {
    const cs = this.getState();

    fetch("/rooms/" + cs.roomId + "?userName=" + cs.userName)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.history = data.history;
        cs.rtdbRoomId = data.rtdbRoomId;

        if (callback) callback();
      });
  },
  //añade un usuario a la RTDB
  adduser() {
    const cs = this.getState();

    const rtdbRoomId = cs.rtdbRoomId;

    let data = fetch("/rooms/" + rtdbRoomId, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userName: cs.userName,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.listenRoom();

        return data;
      });
    return data;
  },

  //escucha los cambios del room
  listenRoom(callback) {
    const cs = this.getState();

    const chatRoomRef = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/users");

    chatRoomRef.on("value", (snapshot) => {
      const usuarios = snapshot.val();

      const usuariosList: any = _.map(usuarios);

      usuariosList.forEach((element, index) => {
        if (element.userName == cs.userName) {
          cs.userKey = index.toString();
        }
        if (element.userName != cs.userName) {
          cs.guestName = element.userName;
          cs.guestPlay = element.userPlay;
          cs.guestOnline = element.online;
          cs.guestStart = element.start;
        }
      });

      this.setState(cs);
    });
    if (callback) callback();
  },
  //envia los cambios al backend
  updateState(callback) {
    const cs = this.getState();

    fetch("/rooms/" + cs.rtdbRoomId + "/users", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        roomId: cs.roomId,
        userKey: cs.userKey,
        userName: cs.userName,
        userPlay: cs.userPlay,
        online: cs.online,
        start: cs.start,
      }),
    });

    if (callback) callback();
  },

  //set move que recibe movimiento del jugador y realiza el update al backend
  setMove(move: string) {
    const currentState = this.getState();
    currentState.userPlay = move;

    this.updateState();
  },
  //pushHistory donde guarda la history actual en el localStorage
  // pushHistory(userPlay: choose, guestPlay: choose) {
  //   const currentState = this.getState();

  //   currentState.history.push({ userPlay, guestPlay });
  //   localStorage.setItem("saved-state", JSON.stringify(currentState.history));
  // },
  //Whowins dependiendo de la jugada del player y la maquina interpreta quien gano retornano "perdiste", "ganaste","empataste"
  whoWins(userPlay: choose, guestPlay: choose) {
    if (userPlay == "papel") {
      if (guestPlay == "papel") return "empataste";
      if (guestPlay == "piedra") return "ganaste";
      if (guestPlay == "tijera") return "perdiste";
    }
    if (userPlay == "tijera") {
      if (guestPlay == "papel") return "ganaste";
      if (guestPlay == "piedra") return "perdiste";
      if (guestPlay == "tijera") return "empataste";
    }
    if (userPlay == "piedra") {
      if (guestPlay == "papel") return "perdiste";
      if (guestPlay == "piedra") return "empataste";
      if (guestPlay == "tijera") return "ganaste";
    }
  },
  //getScore recorre el array del history clasificando quien gano y añade los puntos correspondiente a cada score
  getScore() {
    this.getHistory();
    let cs = this.getState();

    let myScore = 0;
    let guestScore = 0;
    let empates = 0;
    let history = cs.history;

    //score del currentGame
    if (this.whoWins(cs.userPlay, cs.guestPlay) == "ganaste") myScore++;
    if (this.whoWins(cs.userPlay, cs.guestPlay) == "empataste") empates++;
    if (this.whoWins(cs.userPlay, cs.guestPlay) == "perdiste") guestScore++;
    //score del history
    for (const key of history) {
      if (key.player1.userName == cs.userName) {
        if (
          this.whoWins(key.player1.userPlay, key.player2.userPlay) == "ganaste"
        )
          myScore++;
        if (
          this.whoWins(key.player1.userPlay, key.player2.userPlay) ==
          "empataste"
        )
          empates++;
        if (
          this.whoWins(key.player1.userPlay, key.player2.userPlay) == "perdiste"
        )
          guestScore++;
      }
      if (key.player2.userName == cs.userName) {
        if (
          this.whoWins(key.player2.userPlay, key.player1.userPlay) == "ganaste"
        )
          myScore++;
        if (
          this.whoWins(key.player2.userPlay, key.player1.userPlay) ==
          "empataste"
        )
          empates++;
        if (
          this.whoWins(key.player2.userPlay, key.player1.userPlay) == "perdiste"
        )
          guestScore++;
      }
    }

    return { myScore, guestScore, empates };
  },
  //retorna toda la data
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;

    localStorage.setItem("state", JSON.stringify(newState));
  },
};

export { state };
