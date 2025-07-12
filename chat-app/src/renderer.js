const ws = new WebSocket("ws://localhost:8080");

const msgBox = document.getElementById("messages");
const input = document.getElementById("msgInput");

ws.onmessage = (event) => {
    msgBox.value += "Friend: " + event.data + "\n";

};

window.sendMsg = () => {
    const msg =  input.value;
    if(msg.trim()){
        ws.send(msg);
        msgBox.value += "You: " + msg + "\n";
        input.value = "";
    }
};
