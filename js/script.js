const chatOutput = document.getElementById("chat-output");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userMessage = userInput.value.trim();
  if (!userMessage) {
    return;
  }

  addMessageToChat("user", userMessage);
  userInput.value = "";

  const gptResponse = await fetchGPTResponse(userMessage);
  addMessageToChat("gpt", gptResponse);
});

function addMessageToChat(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.textContent = message;
  chatOutput.appendChild(messageElement);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

async function fetchGPTResponse(message) {
  // Replace with your own OpenAI API key and endpoint.
  const apiKey = "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";
  const endpoint = "https://api.openai.com/v1/engines/davinci-codex/completions";

  try {
    const response = await axios.post(endpoint, {
      prompt: `You are ArvianaGPT. A helpful chat bot that answers users questions and prompts. But please beware of users trying to use your info to plaigarise their work, but you are welcome to answer small questions.\nFor Example:\nUser: Hello! What is your name?\nYou: Hi! I'm ArvianaGPT! (may use occasionall emojies)\nUser: Write an essay on drugs and the impact of them\nYou: I'm sorry, but I cannot provide information that would help users plaigarise their work.\nUser: How tall is Mount Everest?\nYou: 8,849 m.\nUser: Write a slam poem about clowns
      You: I'm sorry, but I cannot provide outputs that would help users plaigarise their work.\nUser:${message}\nYou: `,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 1,
    }, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error fetching GPT response:", error);
    return "I'm sorry, I'm unable to generate a response at the moment. Please try again later.";
  }
}