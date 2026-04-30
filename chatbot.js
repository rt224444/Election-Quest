// Politi-Bot Logic

const responses = {
    "hello": "Hello! I'm Politi-Bot. I can tell you about Voter ID, Nominations, or how school elections work. What's on your mind?",
    "indian": "The Indian election system is the world's largest democracy! It involves the Election Commission, Voter IDs, and voting for Members of Parliament (MPs).",
    "education": "In schools, elections are often for Class Representatives or the Student Council. It's a great way to learn leadership and responsibility!",
    "vote": "Voting is your voice! In India, you must be 18 to vote. In school, every student usually gets one vote per post.",
    "age": "In India, the minimum age to vote is 18 years. To contest in Lok Sabha elections, you must be at least 25.",
    "nomination": "A nomination is when a person officially enters the race as a candidate. They usually have to fill out forms and meet certain criteria.",
    "default": "That's a great question! While I'm still learning, you can try asking about 'Voter ID', 'Age limit', or 'School elections'."
};

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getResponse(input) {
    const lowerInput = input.toLowerCase();
    for (const key in responses) {
        if (lowerInput.includes(key)) {
            return responses[key];
        }
    }
    return responses["default"];
}

function handleSendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (text === "") return;

    addMessage(text, 'user');
    input.value = "";

    // Simulate bot thinking
    setTimeout(() => {
        const reply = getResponse(text);
        addMessage(reply, 'bot');
    }, 500);
}

// Event Listeners
document.getElementById('chatbot-trigger').addEventListener('click', () => {
    document.getElementById('chatbot-window').classList.toggle('hidden');
});

document.getElementById('close-chat').addEventListener('click', () => {
    document.getElementById('chatbot-window').classList.add('hidden');
});

document.getElementById('send-chat').addEventListener('click', handleSendMessage);

document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSendMessage();
});
