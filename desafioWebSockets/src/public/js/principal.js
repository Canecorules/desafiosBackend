
let username;
let socket = io ({
    autoConnect:false
}) 

let chatBox = document.getElementById('chatBox');
Swal.fire({
    title: "Identifícate",
    input: "text",
    text: "Ingresa el usuario para identificarte en el chat",
    inputValidator: (value) => {
        return !value && '¡Necesitas escribir un nombre de usuario para continuar!'
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    socket.connect()
    username = result.value
});

chatBox.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", { user: username, message: chatBox.value });
            chatBox.value = "";
        }
    }
})

socket.on('newConnection', data => {
    if (username) {
        Swal.fire({
            text: "Nuevo usuario conectado",
            toast: true,
            position: "top-right",
            time: 2000
        })
    }
});

socket.on('log',data=>{
    let log = document.getElementById('log');
    let messages = "";
    data.forEach(message=>{
        messages = messages+`${message.user} dice: ${message.message}</br>`
    })
    log.innerHTML = messages;
})

socket.on("listProducts", data=>{    
    console.log(data)
    let tablaProducts= document.getElementById('products') 
    let str = ''     
    if(data.length===0){
        tablaProducts.innerHTML = str='<br><h3>There are no products</h3>'
    }else{
        for(const item of data){
            console.log(item)
            tablaProducts.innerHTML = str+=`
                <ul class="list-group list-group-horizontal row">
                    <li class="list-group-item col-4">${item.name}</li>
                    <li class="list-group-item col-4">$ ${item.price}</li>
                    <li class="list-group-item col-4">
                        <img src="${item.img}" alt="${item.name} image" style="height: 80px;">
                    </li>
                </ul>
                `
        }
    }
})

const nameProduct = document.getElementById("name");
const price = document.getElementById("price");
const img = document.getElementById("img");
const btn = document.getElementById("button");

btn.addEventListener('click', (e) => {
    e.preventDefault()
    let product = {}
    if (nameProduct.value.trim().length > 0 && img.value.trim().length > 0) {
        product.name = nameProduct.value;
        product.price = price.value;
        product.img = img.value
        socket.emit('addProduct', product);
        nameProduct.value = '';
        price.value = '';
        img.value = '';
    } else {
        Swal.fire({
            text: "There is no space to a blank spot!",
            toast: true
        })
    } 
})
