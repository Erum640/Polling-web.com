import {
  getDatabase,
  set,
  get,
  ref,
  child,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const dbRef = ref(getDatabase());

let op1,
  op2,
  op3,
  op4,
  c1 = 0,
  c2 = 0,
  c3 = 0,
  c4 = 0;
get(child(dbRef, "thepoll/PollData"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      op1 = snapshot.child("option1/name").val();
      op2 = snapshot.child("option2/name").val();
      op3 = snapshot.child("option3/name").val();
      op4 = snapshot.child("option4/name").val();
      c1 = snapshot.child("option1/count").val();
      c2 = snapshot.child("option2/count").val();
      c3 = snapshot.child("option3/count").val();
      c4 = snapshot.child("option4/count").val();

      document.getElementById("c1-nme").innerHTML = op1;
      document.getElementById("c2-nme").innerHTML = op2;
      document.getElementById("c3-nme").innerHTML = op3;
      document.getElementById("c4-nme").innerHTML = op4;

      document.getElementById("c1-votes").innerHTML = c1;
      document.getElementById("c2-votes").innerHTML = c2;
      document.getElementById("c3-votes").innerHTML = c3;
      document.getElementById("c4-votes").innerHTML = c4;
    }
  })
  .catch((error) => {
    console.error(error);
    alert("Oops! Seems like you are offline.Reload the page");
  });
