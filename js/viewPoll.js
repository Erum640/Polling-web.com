import {
  getDatabase,
  set,
  get,
  ref,
  child,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
const dbRef = ref(getDatabase());
const db = getDatabase();

function updateData(votes, option, c1, c2, c3, c4) {
  set(ref(db, "thepoll/PollData"), {
    question: title,
    option1: {
      name: op1,
      count: option == op1 ? votes : c1,
    },
    option2: {
      name: op2,
      count: option == op2 ? votes : c2,
    },
    option3: {
      name: op3,
      count: option == op3 ? votes : c3,
    },
    option4: {
      name: op4,
      count: option == op4 ? votes : c4,
    },
  });
  console.log(pollData);
}
function rgbToRgba(rgb, alpha = 1) {
  return `rgba(${rgb
    .substring(rgb.indexOf("(") + 1, rgb.length - 1)
    .split(",")
    .join()}, ${alpha})`;
}

window.poll_name = "";
window.cand_1 = "";
window.cand_2 = "";
window.cand_3 = "";
window.cand_4 = "";
var tt = document.getElementById("poll"),
  title,
  op1,
  op2,
  op3,
  op4,
  c1 = 0,
  c2 = 0,
  c3 = 0,
  c4 = 0;
var id;
let pollData = [];
get(child(dbRef, "thepoll/PollData"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      title = snapshot.child("question").val();
      op1 = snapshot.child("option1/name").val();
      op2 = snapshot.child("option2/name").val();
      op3 = snapshot.child("option3/name").val();
      op4 = snapshot.child("option4/name").val();
      c1 = snapshot.child("option1/count").val();
      c2 = snapshot.child("option2/count").val();
      c3 = snapshot.child("option3/count").val();
      c4 = snapshot.child("option4/count").val();
      console.log(title);
      console.log(tt.innerHTML);
      execute();
    } else {
      console.log("No data available");
      if (
        $("#poll").is(":empty") ||
        $("#1").is(":empty") ||
        $("#2").is(":empty") ||
        $("#3").is(":empty") ||
        $("#4").is(":empty")
      ) {
        if ($("#h_btn").attr("hidden")) {
          $("#contain").attr("hidden", "hidden");
          $(".chart-container").attr("hidden", "hidden");
          $("#h_btn").removeAttr("hidden");

          $("#h_btn").click(function () {
            window.location.href = "createPoll.html";
          });
        }
      }

      if (title) {
        $("#h_btn").attr("hidden", "hidden");
        $("#contain").removeAttr("hidden");
      }
    }
  })
  .catch((error) => {
    console.error(error);

    alert("Oops! Seems like you are offline.Reload the page");
  });

window.pollForm = document.querySelector("#pollForm");

console.log(tt);

function execute() {
  pollData = [
    {
      id: "1",
      option1: op1,
      votes: c1,
      color: "rgb(255, 99, 132)",
    },
    {
      id: "2",
      option2: op2,
      votes: c2,
      color: "rgb(54, 162, 235)",
    },
    {
      id: "3",
      option3: op3,
      votes: c3,
      color: "rgb(36, 36, 36)",
    },
    {
      id: "4",
      option4: op4,
      votes: c4,
      color: "rgb(255, 159, 64)",
    },
  ];
  console.log(pollData);
  if (title) {
    tt.innerHTML = title;
    console.log(title);
    document.getElementById("1").innerHTML = op1;

    document.getElementById("2").innerText = op2;

    document.getElementById("3").innerText = op3;

    document.getElementById("4").innerText = op4;
  } else {
    alert("Oops! Seems like you are offline.Reload the page");
  }

  pollForm.addEventListener("submit", pollFormSubmit);

  function pollFormSubmit(event) {
    event.preventDefault();
    const pollOptionInput = pollForm.querySelectorAll(
      "input[name='pollOptions']"
    );
    for (let radioButtons of pollOptionInput)
      if (radioButtons.checked) {
        id = radioButtons.id;
        console.log(id);
      }
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
          if (pollOptionInput) {
            switch (id) {
              case "first":
                let first = c1;
                first++;
                updateData(first, op1, c1, c2, c3, c4);

                pollData[0].votes = first;
                break;
              case "second":
                let second = c2;
                second++;
                updateData(second, op2, c1, c2, c3, c4);

                pollData[1].votes = second;
                break;
              case "third":
                let third = c3;
                third++;
                updateData(third, op3, c1, c2, c3, c4);

                pollData[2].votes = third;
                break;
              case "fourth":
                let fourth = c4;
                fourth++;
                updateData(fourth, op4, c1, c2, c3, c4);
                pollData[3].votes = fourth;

                break;
            }

            pollChart.data.datasets[0].data = pollData.map(
              (pollOption) => pollOption.votes
            );

            pollChart.update();
            // window.location = window.location;
          }
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Oops! Seems like you are offline.Reload the page");
      });
  }

  if ($("#poll").is(":empty")) {
  } else {
    let label1 = op1;
    let label2 = op2;
    let label3 = op3;
    let label4 = op4;

    let arr = [label1, label2, label3, label4];

    const ctx = document.getElementById("chart").getContext("2d");
    console.log(ctx);

    var pollChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: arr.map((pollOption) => pollOption),
        datasets: [
          {
            label: "# of Votes",
            data: pollData.map((pollOption) => pollOption.votes),
            backgroundColor: pollData.map((pollOption) =>
              rgbToRgba(pollOption.color, 0.75)
            ),
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        title: {
          display: true,
          text: title,
          fontColor: "#333",
          fontSize: 20,
          padding: 20,
        },
        legend: {
          display: false,
        },
      },
    });
  }
}
