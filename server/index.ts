import * as express from "express";
import { firestore, rtdb } from "./adminbase";
import * as cors from "cors";
import * as path from "path";
import { nanoid } from "nanoid";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(express.static("dist"));

const usersCollection = firestore.collection("users");
const roomCollection = firestore.collection("rooms");

app.post("/signIn", (req, res) => {
  const { name } = req.body;
  const { userId } = req.body;
  console.log(userId);

  usersCollection
    .where("userId", "==", userId)
    .get()
    .then((whereResponse) => {
      if (whereResponse.empty) {
        usersCollection
          .add({
            name,
          })
          .then((newUser) => {
            res.json({
              userId: newUser.id,
            });
          });
      } else {
        res.status(400).json({
          message: "Ya existe este usuario",
        });
      }
    });
});

app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  const { name } = req.body;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const roomRef = rtdb.ref("rooms/" + nanoid());
        roomRef
          .set({
            jugador1: {
              name,
              ready: false,
              choice: false,
              score: 0,
            },
            jugador2: {
              name: "Rival",
              ready: false,
              choice: false,
              score: 0,
            },
          })
          .then(() => {
            const rtdbId = roomRef.key;
            const shortId = 10000 + Math.floor(Math.random() * 9999);
            roomCollection
              .doc(shortId.toString())
              .set({
                rtdbId: rtdbId,
                jugador1: name,
                j1score: 0,
                jugador2: "Rival",
                j2score: 0,
              })
              .then(() => {
                res.json({
                  rtdbId: rtdbId,
                  shortId: shortId.toString(),
                  jugador: "jugador1",
                  rivalName: "Rival",
                });
              });
          });
      } else {
        res.status(401).json({
          message: "no existis",
        });
      }
    });
});

app.get("/rooms/:shortId", (req, res) => {
  const { userId } = req.query;
  const { shortId } = req.params;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomCollection
          .doc(shortId)
          .get()
          .then((snap) => {
            const data = snap.data();
            res.json(data);
          });
      } else {
        res.status(401).json({
          message: "no existís",
        });
      }
    });
});

app.post("/rooms/:rtdbId", (req, res) => {
  const { rtdbId } = req.params;
  const { name } = req.body;
  const { shortId } = req.body;
  const roomRef = rtdb.ref("/rooms/" + rtdbId);
  roomCollection
    .doc(shortId.toString())
    .get()
    .then((doc) => {
      const data = doc.data();
      if (data.jugador1 == name) {
        const roomj1Ref = rtdb.ref("/rooms/" + rtdbId + "/jugador1");
        roomj1Ref.update({
          name,
        });
        roomCollection.doc(shortId.toString()).update({
          jugador1: name,
        });
        res.json({
          jugador: "jugador1",
        });
      } else {
        const roomj2Ref = rtdb.ref("/rooms/" + rtdbId + "/jugador2");
        roomj2Ref.update({
          name,
        });
        roomCollection.doc(shortId.toString()).update({
          jugador2: name,
        });
        res.json({
          jugador: "jugador2",
        });
      }
    });
});

app.get("/rooms/info/:shortId/:jugador", (req, res) => {
  const { shortId } = req.params;
  const { jugador } = req.params;
  roomCollection
    .doc(shortId.toString())
    .get()
    .then((doc) => {
      const data = doc.data();
      if (jugador == "jugador1") {
        res.json({
          rivalName: data.jugador2,
          score: data.j1score,
          rivalScore: data.j2score,
        });
      } else {
        res.json({
          rivalName: data.jugador1,
          score: data.j2score,
          rivalScore: data.j1score,
        });
      }
    });
});

app.post("/setReady", (req, res) => {
  const { rtdbId } = req.body;
  const { jugador } = req.body;
  const roomRef = rtdb.ref("/rooms/" + rtdbId + "/" + jugador);
  roomRef.update({
    ready: true,
  });
  res.json({
    ready: true,
  });
});

app.post("/setChoice", (req, res) => {
  const { rtdbId } = req.body;
  const { choice } = req.body;
  const { jugador } = req.body;
  const roomRef = rtdb.ref("/rooms/" + rtdbId + "/" + jugador);
  roomRef.update({
    choice,
  });
  res.json({
    choice,
  });
});

app.post("/quitReady", (req, res) => {
  const { rtdbId } = req.body;
  const { jugador } = req.body;
  const roomRef = rtdb.ref("/rooms/" + rtdbId + "/" + jugador);
  roomRef.update({
    ready: false,
  });
  res.json({
    ready: false,
  });
});

app.post("/pushWinner", (req, res) => {
  const { rtdbId } = req.body;
  const { jugador } = req.body;
  const { score } = req.body;
  const { rivalScore } = req.body;
  const { shortId } = req.body;
  const roomRef = rtdb.ref("/rooms/" + rtdbId + "/" + jugador);
  roomRef.update({
    score: score,
  });
  res.json({
    message: "listo",
  });
  if (jugador == "jugador1") {
    roomCollection
      .doc(shortId.toString())
      .update({
        j2score: rivalScore,
        j1score: score,
      })
      .then(() => {
        res.json({
          j1score: score,
        });
      });
  }
  if (jugador == "jugador2") {
    roomCollection
      .doc(shortId.toString())
      .update({
        j1score: rivalScore,
        j2score: score,
      })
      .then(() => {
        res.json({
          j2score: score,
        });
      });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log("Funcionando en http://localhost:" + port);
});
