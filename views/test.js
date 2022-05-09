const socket = io.connect();

function renderProduct(data) {
    if(data.length !== 0){

        const html = data.default.map(elem => {
            return(`
            <td>${elem.title}</td>
            <td>${elem.price}</td>
            <td><img src="${elem.image}" alt=""></td>
            `)
        }).join(" ");
        document.getElementById('products').innerHTML = html;

    } else {
        document.getElementById('products').innerHTML = '<strong>No hay productos</strong>';
    }
}

socket.on('fakerProducts', function(data) { renderProduct(data); });