let correctAnswer = null;

// Generate random captcha
function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ["+", "-", "*", "/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let question = `${num1} ${operator} ${num2}`;
  switch(operator) {
    case "+": correctAnswer = num1 + num2; break;
    case "-": correctAnswer = num1 - num2; break;
    case "*": correctAnswer = num1 * num2; break;
    case "/": 
      correctAnswer = Math.floor(num1 / num2); 
      question = `${num1} ÷ ${num2}`; 
      break;
  }

  document.getElementById("captchaBox").innerText = `Solve: ${question}`;
}

document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const mobile = document.getElementById("mobile").value.trim();
  const answer = parseInt(document.getElementById("captchaAnswer").value.trim());
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if(answer !== correctAnswer) {
    resultsDiv.innerHTML = "<p style='color:red;'>❌ Verification failed. Try again.</p>";
    generateCaptcha();
    return;
  }

  const filePath = `files/${mobile}.png`;

  fetch(filePath, { method: "HEAD" })
    .then(res => {
      if(res.ok) {
        resultsDiv.innerHTML = `<a href="${filePath}" download class="download-link">🎟️ Download Ticket</a>`;
      } else {
        resultsDiv.innerHTML = "<p>No file found for this number. Please contact Roshan.</p>";
      }
    })
    .catch(() => {
      resultsDiv.innerHTML = "<p>Error fetching the file. Please contact Roshan.</p>";
    });

  generateCaptcha();
});

// Init captcha on load
generateCaptcha();
