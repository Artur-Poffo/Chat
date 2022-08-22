const socket = io();
let user = "";

socket.on("update_message", (messages) => {
  update_messages_screnn(messages);
});

function update_messages_screnn(msg) {
  let list = "<ul>";
  msg.map((message) => {
    list += `<li>${message.user}: ${message.msg}</li>`;
  });
  list += "</ul>";
  let messages_div = document.querySelector("#messages");
  messages_div.innerHTML = list;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form_div");
  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!user) {
      alert("Defina um usuário");
      return;
    }

    const message = document.forms["form_name"]["msgs"].value;
    document.forms["form_name"]["msgs"].value = "";
    socket.emit("New_Message", { user: user, msg: message });
    console.log(message);
  });

  const userform = document.querySelector("#userform_div");
  userform.addEventListener("submit", e => {
    e.preventDefault();
    user = document.forms["UserForm"]["userInput"].value;
    userform.parentNode.removeChild(userform);
  });
});
