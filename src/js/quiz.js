// Quiz interactivity
document.addEventListener("DOMContentLoaded", function () {
  var options = document.querySelectorAll(".quiz-option");
  options.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var siblings = btn.parentElement.querySelectorAll(".quiz-option");
      siblings.forEach(function (s) { s.classList.remove("selected"); });
      btn.classList.add("selected");
    });
  });
});

function checkQuiz() {
  var questions = document.querySelectorAll(".quiz-question");
  var score = 0;
  var total = questions.length;

  questions.forEach(function (q) {
    var correct = parseInt(q.getAttribute("data-correct"), 10);
    var selected = q.querySelector(".quiz-option.selected");
    var feedback = q.querySelector(".quiz-feedback");
    var allOpts = q.querySelectorAll(".quiz-option");

    allOpts.forEach(function (o) {
      o.classList.remove("correct", "wrong");
    });

    if (selected) {
      var idx = parseInt(selected.getAttribute("data-index"), 10);
      if (idx === correct) {
        selected.classList.add("correct");
        feedback.textContent = "Correct!";
        feedback.style.color = "#6bcb77";
        score++;
      } else {
        selected.classList.add("wrong");
        allOpts[correct].classList.add("correct");
        feedback.textContent = "Not quite. The correct answer is highlighted.";
        feedback.style.color = "#ff6b9d";
      }
    } else {
      feedback.textContent = "Please select an answer.";
      feedback.style.color = "#ffa94d";
    }
  });

  var scoreEl = document.getElementById("quiz-score");
  scoreEl.textContent = "Your Score: " + score + " / " + total;
  scoreEl.className = "quiz-score";
  if (score === total) {
    scoreEl.classList.add("perfect");
    scoreEl.textContent += " - Perfect!";
  } else if (score >= total * 0.6) {
    scoreEl.classList.add("good");
    scoreEl.textContent += " - Good job!";
  } else {
    scoreEl.classList.add("try-again");
    scoreEl.textContent += " - Keep trying!";
  }
}
