
const questions = [
  {
    question: "What is the capital city of Nigeria?",
    choices: ["Lagos", "Abuja", "Kano", "Ibadan"],
    answer: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Jupiter", "Mars", "Mercury"],
    answer: 2
  },
  {
    question: "How many days are in a leap year?",
    choices: ["364", "365", "366", "367"],
    answer: 2
  },
  {
    question: "Which animal is known as the king of the jungle?",
    choices: ["Tiger", "Lion", "Elephant", "Leopard"],
    answer: 1
  },
  {
    question: "How many colours are traditionally in a rainbow?",
    choices: ["Five", "Six", "Seven", "Eight"],
    answer: 2
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3
  },
  {
    question: "What is 12 multiplied by 8?",
    choices: ["88", "96", "108", "86"],
    answer: 1
  },
  {
    question: "Which sport uses a shuttlecock?",
    choices: ["Tennis", "Badminton", "Basketball", "Volleyball"],
    answer: 1
  },
  {
    question: "Which of these animals is a mammal?",
    choices: ["Shark", "Crocodile", "Dolphin", "Tuna"],
    answer: 2
  },
  {
    question: "How many months are in one year?",
    choices: ["10", "11", "12", "13"],
    answer: 2
  },
  {
    question: "Which organ pumps blood around the body?",
    choices: ["Brain", "Heart", "Lungs", "Kidneys"],
    answer: 1
  },
  {
    question: "What do bees make?",
    choices: ["Milk", "Honey", "Butter", "Juice"],
    answer: 1
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    choices: ["Spanish", "French", "Portuguese", "Italian"],
    answer: 2
  },
  {
    question: "How many sides does a triangle have?",
    choices: ["Three", "Four", "Five", "Six"],
    answer: 0
  },
  {
    question: "Which star is closest to Earth?",
    choices: ["Sirius", "The Sun", "Polaris", "Vega"],
    answer: 1
  }
];

const $ = id => document.getElementById(id);

const startScreen = $("start-screen");
const quizScreen = $("quiz-screen");
const resultScreen = $("result-screen");

let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;
let playerName = "";

function shuffleQuestions(list) {
  const shuffled = [...list];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function startQuiz() {
  playerName = $("player-name").value.trim();
  score = 0;
  currentQuestion = 0;
  answered = false;

  // Shuffle once per round, so no question repeats in that round.
  quizQuestions = shuffleQuestions(questions);

  $("live-score").textContent = score;
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  showQuestion();
}

function showQuestion() {
  answered = false;

  const item = quizQuestions[currentQuestion];
  const total = quizQuestions.length;
  const progress = Math.round(((currentQuestion + 1) / total) * 100);

  $("question-number").textContent =
    `Question ${currentQuestion + 1} of ${total}`;
  $("progress-percent").textContent = `${progress}%`;
  $("progress-bar").style.width = `${progress}%`;
  $("question-text").textContent = item.question;
  $("choices").innerHTML = "";
  $("feedback").textContent = "";
  $("next-btn").disabled = true;

  const letters = ["A", "B", "C", "D"];

  item.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "choice";

    const letter = document.createElement("span");
    letter.className = "choice-letter";
    letter.textContent = letters[index];

    const label = document.createElement("span");
    label.textContent = choice;

    button.append(letter, label);
    button.addEventListener("click", () => selectAnswer(index, button));
    $("choices").appendChild(button);
  });

  $("next-btn").textContent =
    currentQuestion === total - 1
      ? "See my results ✨"
      : "Next question →";
}

function selectAnswer(selectedIndex, selectedButton) {
  if (answered) return;

  answered = true;

  const item = quizQuestions[currentQuestion];
  const buttons = $("choices").querySelectorAll(".choice");

  buttons.forEach(button => {
    button.disabled = true;
  });

  if (selectedIndex === item.answer) {
    score++;
    $("live-score").textContent = score;
    $("feedback").textContent = "Correct! You're doing amazing ✨";
    $("feedback").style.color = "#23834d";
  } else {
    selectedButton.classList.add("incorrect");
    $("feedback").textContent =
      `Not quite! The answer is ${item.choices[item.answer]}. 💙`;
    $("feedback").style.color = "#b63849";
  }

  buttons[item.answer].classList.add("correct");
  $("next-btn").disabled = false;
}

function nextQuestion() {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  $("final-score").textContent = score;
  $("result-heading").textContent = playerName
    ? `Well done, ${playerName}!`
    : "Amazing job!";

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    $("result-message").textContent =
      "Perfect score! You absolutely smashed it! 🏆";
  } else if (percentage >= 70) {
    $("result-message").textContent =
      "Brilliant work! Your brain is shining! ✨";
  } else if (percentage >= 40) {
    $("result-message").textContent =
      "Good effort! You're learning every round. 💙";
  } else {
    $("result-message").textContent =
      "Keep practising. Your next score can be even better! 🌷";
  }
}

function restartQuiz() {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  $("live-score").textContent = "0";
}

$("start-btn").addEventListener("click", startQuiz);
$("next-btn").addEventListener("click", nextQuestion);
$("restart-btn").addEventListener("click", restartQuiz);
