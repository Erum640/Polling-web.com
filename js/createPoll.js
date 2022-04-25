import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

const db = getDatabase();

var create = document.getElementById("save");
console.log(create);

function InsertData() {
  if (
    $.trim($("#p1-input").val()) == "" ||
    $.trim($("#cn1-inp").val()) == "" ||
    $.trim($("#cn2-inp").val()) == "" ||
    $.trim($("#cn3-inp").val()) == "" ||
    $.trim($("#cn4-inp").val()) == ""
  ) {
    alert("Input can not be left blank");
  } else {
    var poll = "PollData";
    var pollname = document.getElementById("p1-input").value;
    var op1 = document.getElementById("cn1-inp").value;
    var op2 = document.getElementById("cn2-inp").value;
    var op3 = document.getElementById("cn3-inp").value;
    var op4 = document.getElementById("cn4-inp").value;
    console.log(pollname, op1, op2, op3, op4);
    set(ref(db, "thepoll/" + poll), {
      question: pollname,
      option1: {
        name: op1,
        count: 0,
      },
      option2: {
        name: op2,
        count: 0,
      },
      option3: {
        name: op3,
        count: 0,
      },
      option4: {
        name: op4,
        count: 0,
      },
    })
      .then(() => {
        alert("data stored successfully");
        window.location.href = "spoll.html";
      })
      .catch((error) => {
        alert("unsuccessful, error" + error);
      });
  }
}

create.addEventListener("click", InsertData);
