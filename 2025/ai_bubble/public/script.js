const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const closeChatButton = document.getElementById('closeChatButton');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessageButton = document.getElementById('sendMessageButton');

const API_URL = '/chat';

let chatHistory = [{
    role: "model",
    parts: [{
        text: "Salut! 👋\n\n Sunt asistentul tău intern. Te pot ajuta să găsești tutoriale și informații despre fiecare departament și operațiunile sale.\n\nÎncearcă să mă întrebi ceva de genul:\n• \"Cum adaug o cerere de ofertă de articole?\"\n• \"Tutorial livrări\"\n• \"Cum funcționează pagina de evenimente?\""
    }]
}];
let isSendingMessage = false;

function toggleChatWindow() {
    const isOpening = !chatWindow.classList.contains('open');
    chatWindow.classList.toggle('open');
    chatButton.classList.toggle('hidden-button');

    if (isOpening) {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
            chatInput.focus();
        }, 300);
    }
}

chatButton.addEventListener('click', toggleChatWindow);
closeChatButton.addEventListener('click', toggleChatWindow);

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    const processedText = text.replace(/```sql\n([\s\S]*?)\n```/g, '<pre><code>$1</code></pre>');
    messageDiv.innerHTML = processedText;
    chatMessages.appendChild(messageDiv);

    setTimeout(() => {
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

function addErrorMessage(text) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle mr-2"></i>${text}`;
    chatMessages.appendChild(errorDiv);
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
    });
}

function showLoadingIndicator(message = "Generezare răspuns...") {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingIndicator';
    loadingDiv.classList.add('loading-indicator');
    loadingDiv.innerHTML = `<i class="fas fa-cog spinner"></i> ${message}`;
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
    });
}

function hideLoadingIndicator() {
    const loadingDiv = document.getElementById('loadingIndicator');
    if (loadingDiv) loadingDiv.remove();
}

async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage || isSendingMessage) return;

    isSendingMessage = true;
    sendMessageButton.disabled = true;
    chatInput.value = '';

    addMessage(userMessage, 'user');
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });
    showLoadingIndicator();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ contents: chatHistory })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API error: ${response.status} - ${errorText}`);
        }

        const result = await response.json();

        if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
            const aiResponse = result.candidates[0].content.parts[0].text;
            addMessage(aiResponse, 'ai');
            chatHistory.push({ role: "model", parts: [{ text: aiResponse }] });
        } else {
            addErrorMessage("Nu am putut obține un răspuns de la AI. Încearcă din nou.");
        }

    } catch (error) {
        console.error("Backend error:", error);
        addErrorMessage("Eroare! Verifică dacă serverul backend funcționează corect.");
    } finally {
        hideLoadingIndicator();
        isSendingMessage = false;
        sendMessageButton.disabled = false;
    }
}

sendMessageButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') sendMessage();
});

document.addEventListener('DOMContentLoaded', () => {
    chatWindow.classList.remove('open');
    chatButton.classList.remove('hidden-button');
});

chatInput.addEventListener('focus', function () {
    this.parentElement.style.transform = 'translateY(-2px)';
});

chatInput.addEventListener('blur', function () {
    this.parentElement.style.transform = 'translateY(0)';
});
