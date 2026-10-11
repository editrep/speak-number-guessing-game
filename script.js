
const msgEl = document.getElementById('msg');

// Generate random number
// floor makes it a whole number, always round down
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const randomNum = getRandomNumber();
console.log('Number:', randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(event) {
  const msg = event.results[0][0].transcript;  // You can log the event to view the structure of the data
  writeMessage(msg);
}

// Speak result
recognition.addEventListener('result', onSpeak);

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = ''; // This is fine because it's just clearing out old data, not passing in untrusted data
  const div = document.createElement('div');
  div.textContent = 'You said: ';
  const span = document.createElement('span');
  span.classList.add('box');
  span.textContent = msg;

  msgEl.append(div, span);

  // Isecure
  //msgEl.innerHTML = `
    //<div>You said: </div>
    //<span class="box">${msg}</span>
  //`;
}

// Check msg against the secret number
function checkNumber(msg) {

    // converts the spoken content to a number
  const num = Number(msg);

  // Check if the spoken content is a valid number
  // if spocken content is not a number, display an error message
  if (Number.isNaN(num)) {
    const div = document.createElement('div');
    div.textContent = 'That is not a valid number';
    msgEl.append(div);

    return;
  }

  // Check if it's in range
  // if guess in not in range
  if (num < 1 || num > 100) {
    const div = document.createElement('div');
    div.textContent = 'Number must be between 1 and 100';
    msgEl.append(div);

    return;
  }

  // Check the number and provide feedback
  // if guess is correct
  if (num === randomNum) {
    const h2 = document.createElement('h2');
    h2.textContent = `Congrats! You have guessed the number! It was ${num}`;

    const button = document.createElement('button');
    button.classList.add('play-again');
    button.id = 'play-again';
    button.textContent = 'Play Again';
    // Add listener and handler to button
    button.addEventListener('click', () => window.location.reload());

    msgEl.append(h2, button);

    // if guess is greater than randomNum
  } else if (num > randomNum) {
    const div = document.createElement('div');
    div.textContent = 'GO LOWER';
    msgEl.append(div);

  } else {
    // if guess is less than randomNum
    const div = document.createElement('div');
    div.textContent = 'GO HIGHER';
    msgEl.append(div);
  }
}