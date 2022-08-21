const socket = io()

socket.on("update_message",messages => {
    update_messages_screnn(messages)
})

function update_messages_screnn(msg) {
    let list = "<ul>"
    msg.map(message => {
        list += `<li>${message}</li>`
    })
    list += "</ul>"
    let messages_div = document.querySelector("#messages");
    messages_div.innerHTML = list
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form_div")
    form.addEventListener("submit", e => {
        e.preventDefault()
        const message = document.forms["form_name"]["msgs"].value
        document.forms["form_name"]["msgs"].value = ""
        socket.emit("New_Message", {msg: message})
        console.log(message)
    })
})