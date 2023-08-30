const sendButton = document.querySelector("button");
const inputField = document.querySelector("input");
const messagesContainer = document.querySelector(".message_history");
const clearButton = document.querySelector(".clear");
const mrDuck = document.querySelector(".mr_duck");
let isFunctionAllowed = true;
let count = 0;

// Function to get messages from local storage
function getMessagesFromStorage() {
  // "messages" in local storage is a string which needs to be converted into a JS object
  // || [] is a fallback if the retrieval and parsing of the local storage data fails.
  const previousMessages = JSON.parse(localStorage.getItem("messages")) || [];
  return previousMessages;
}

// Function to save messages to local storage
function saveMessageToStorage(messages) {
  localStorage.setItem("messages", JSON.stringify(messages));
  console.log(messages);
  console.log(JSON.stringify(messages));
}

// Get time stamp
function getCurrentTime() {
  let now = new Date();
  let currentHour = now.getHours();
  let currentMinutes = now.getMinutes();
  let formattedMinutes =
    currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
  return `${currentHour}:${formattedMinutes}`;
}

// Create the message
function createMessage(timeStamp, senderClass, sender, message) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("message");
  newDiv.innerHTML = `<span class="time_stamp">${timeStamp}</span><span class="${senderClass}">${sender}: </span><p>${message}</p>`;
  messagesContainer.appendChild(newDiv);
  inputField.value = "";

  // Save the new message to local storage
  const messages = getMessagesFromStorage();
  messages.push({ timeStamp, senderClass, sender, message });
  saveMessageToStorage(messages);
}

function reCreateMessages(timeStamp, senderClass, sender, message) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("message");
  newDiv.innerHTML = `<span class="time_stamp">${timeStamp}</span><span class="${senderClass}">${sender}: </span><p>${message}</p>`;
  messagesContainer.appendChild(newDiv);
}

// Get the input value
function sendMessage() {
  const message = inputField.value;
  const timeStamp = getCurrentTime();
  createMessage(timeStamp, "you", "You", message);
  if (message.includes("you suck")) {
    setTimeout(() => {
      createMessage(timeStamp, "yellow", "Mr.Duck", "That's mean :((");
    }, 1000);
  } else if (message.includes("sorry")) {
    setTimeout(() => {
      createMessage(
        timeStamp,
        "yellow",
        "Mr.Duck",
        "It's okay, I forgive you :)"
      );
    }, 1000);
  }
}

// Load messages from local storage on page load
window.addEventListener("load", () => {
  const previousMessages = getMessagesFromStorage();

  // Clear the messages container before displaying messages
  messagesContainer.innerHTML = "";

  for (const { timeStamp, senderClass, sender, message } of previousMessages) {
    reCreateMessages(timeStamp, senderClass, sender, message);
  }
});

// Click submit
sendButton.addEventListener("click", () => {
  if (inputField.value !== "") {
    sendMessage();
  }
});

// Hit Enter
inputField.addEventListener("keypress", (e) => {
  if (inputField.value !== "" && e.key === "Enter") {
    sendMessage();
  }
});

mrDuck.addEventListener("mouseover", () => {
  if (!isFunctionAllowed) {
    return;
  }
  const timeStamp = getCurrentTime();
  count++;
  console.log(count);

  if (count === 1) {
    createMessage(timeStamp, "yellow", "Mr.Duck", "Hey don't touch me! >:(");
  } else if (count === 2) {
    createMessage(timeStamp, "yellow", "MrDuck", "What did I tell you?! :@");
  } else if (count === 3) {
    createMessage(timeStamp, "yellow", "MrDuck", "You're really asking for it");
  } else {
    createMessage(timeStamp, "yellow", "MrDuck", "You're dead to me.");
  }

  isFunctionAllowed = false;
  setTimeout(() => {
    isFunctionAllowed = true;
  }, 5000);
});

clearButton.addEventListener("click", () => {
  localStorage.clear();
  messagesContainer.innerHTML = "";
});
