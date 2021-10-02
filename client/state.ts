import { Router } from "@vaadin/router";
import { rtdb } from "./database";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

const state = {
  data: {
    name: "",
    rivalName: "",
    userId: "",
    shortId: "",
    rtdbId: "",
    jugador: "",
    choice: "",
    rivalChoice: "",
    score: "",
    rivalScore: "",
  },
  listeners: [],

  /////////////////////////////////////////////////////////////////////////////////////////////

  getState() {
    return this.data;
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb(newState);
    }
    localStorage.setItem("local-storage", JSON.stringify(newState));

    console.log("state cambio", newState);
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  init() {
    const localData = localStorage.getItem("local-storage");

    this.setState(JSON.parse(localData));
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  setName(name: string) {
    const cs = this.getState();
    cs.name = name;
    this.setState(cs);
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  signIn(callback?) {
    console.log("SignIn");

    const cs = this.getState();
    if (cs.userId == "") {
      fetch(API_BASE_URL + "/signIn", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name: cs.name, userId: cs.userId }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.userId = data.userId;
          this.setState(cs);
          callback();
        });
    } else {
      console.log("Ya tenes id");

      callback();
    }
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  createRoom(callback?) {
    console.log("CreateRoom");

    const cs = this.getState();
    fetch(API_BASE_URL + "/rooms", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: cs.name, userId: cs.userId }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        cs.shortId = data.shortId;
        cs.rtdbId = data.rtdbId;
        cs.jugador = data.jugador;
        cs.rivalName = data.rivalName;
        this.setState(cs);
        callback();
      });
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  getRTDBID(shortId: string, callback?) {
    console.log("getRTDBID");

    const cs = this.getState();
    fetch(API_BASE_URL + "/rooms/" + shortId + `?userId=${cs.userId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.rtdbId = data.rtdbId;
        cs.shortId = shortId;
        this.setState(cs);
        callback();
      });
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  connectoToRoom(callback?) {
    console.log("connectToRoom");

    const cs = this.getState();
    fetch(API_BASE_URL + `/rooms/${cs.rtdbId}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: cs.name, shortId: cs.shortId }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.jugador = data.jugador;
        this.setState(cs);
        callback();
      });
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  getRoomInfo(callback?) {
    const cs = this.getState();
    fetch(API_BASE_URL + `/rooms/info/${cs.shortId}/${cs.jugador}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.rivalName = data.rivalName;
        cs.score = data.score;
        cs.rivalScore = data.rivalScore;
        this.setState(cs);
        callback();
      });
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  setReady() {
    const cs = this.getState();
    fetch(API_BASE_URL + "/setReady/", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        rtdbId: cs.rtdbId,
        jugador: cs.jugador,
      }),
    });
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  listenReady() {
    const cs = this.getState();
    const roomRef = rtdb.ref("/rooms/" + cs.rtdbId);

    roomRef.on("value", (snapshot) => {
      const oneReady = snapshot.val().jugador1.ready;
      const twoReady = snapshot.val().jugador2.ready;
      if (oneReady == true && twoReady == true) {
        Router.go("/play");
      }
    });
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  setMyPLay(choice) {
    const cs = this.getState();
    cs.choice = choice;
    this.setState(cs);
    fetch(API_BASE_URL + "/setChoice", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        rtdbId: cs.rtdbId,
        jugador: cs.jugador,
        choice: cs.choice,
      }),
    });
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  listenRivalChoice() {
    const cs = this.getState();
    const roomsRef = rtdb.ref("/rooms/" + cs.rtdbId);
    roomsRef.on("value", (snapshot) => {
      if (cs.jugador == "jugador1") {
        var rivalChoice = snapshot.val().jugador2.choice;
        cs.rivalChoice = rivalChoice;
        this.setState(cs);
      }
      if (cs.jugador == "jugador2") {
        var rivalChoice = snapshot.val().jugador1.choice;
        cs.rivalChoice = rivalChoice;
        this.setState(cs);
      }
    });
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  setWinner() {
    const cs = this.getState();
    if (
      (cs.choice == "tijera" && cs.rivalChoice == "papel") ||
      (cs.choice == "piedra" && cs.rivalChoice == "tijera") ||
      (cs.choice == "papel" && cs.rivalChoice == "piedra")
    ) {
      cs.score++;
      cs.resultado = "Ganaste";
    } else if (
      (cs.choice == "tijera" && cs.rivalChoice == "piedra") ||
      (cs.choice == "piedra" && cs.rivalChoice == "papel") ||
      (cs.choice == "papel" && cs.rivalChoice == "tijera")
    ) {
      cs.rivalScore++;
      cs.resultado = "Perdiste";
    } else {
      cs.resultado = "Empate";
    }
    this.setState(cs);
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  quitReady() {
    const cs = this.getState();
    fetch(API_BASE_URL + "/quitReady", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        rtdbId: cs.rtdbId,
        jugador: cs.jugador,
      }),
    });
  },

  /////////////////////////////////////////////////////////////////////////////////////////////

  pushWinner() {
    const cs = this.getState();
    fetch(API_BASE_URL + "/pushWinner", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        rtdbId: cs.rtdbId,
        jugador: cs.jugador,
        score: cs.score,
        rivalScore: cs.rivalScore,
        shortId: cs.shortId,
      }),
    });
  },
};

export { state };
