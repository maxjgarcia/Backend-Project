const socket = io()

socket.emit('newUser', 'Nuevo usuario conectado')

const renderProducts = async (products) => {
    try {
        const productsTable = document.getElementById('productsTable')
        productsTable.innerHTML = `
    <tr>
      <th><span>ID</span></th>
      <th><span>Nombre</span></th>
      <th><span>Descripción</span></th>
      <th><span>Categoría</span></th>
      <th><span>Precio</span></th>
      <th><span>Stock</span></th>
      <th><span>¿Eliminar?</span></th>
    </tr>
    `
        for (const product of products) {
            const productTableRow = document.createElement('tr')
            productTableRow.innerHTML = `
    <td>${product.id}</td>
    <td>${product.title}</td>
    <td>${product.description}</td>
    <td>${product.category}</td>
    <td>${product.price}</td>
    <td>${product.stock}</td>
    <td><button id=${product.id} onclick="handleDelete(event, ${product.id})" class="deleteBtn">❌</button></td>
    `
            productsTable.appendChild(productTableRow)
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

const handleSubmit = async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const category = document.getElementById('category').value
    const price = parseInt(document.getElementById('price').value)
    const stock = parseInt(document.getElementById('stock').value)

    const addedProduct = { title, description, category, price, stock }

    try {
        const response = await fetch("http://localhost:8080/realtimeproducts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addedProduct),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);

        e.target.reset();
    } catch (error) {
        console.error("Error:", error);
    }
}

const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
        const response = await fetch(`http://localhost:8080/realtimeproducts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error("Error:", error);
    }
}

socket.on('newArrProducts', (products) => {
    renderProducts(products)
})