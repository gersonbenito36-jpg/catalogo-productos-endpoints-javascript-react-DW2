const API_URL = 'https://dummyjson.com/products';



// ======TRAER U OBTENER TODOS LOS PRODUCTOS=======
export async function getProducts(limit = 12, skip = 0) {
    const response = await fetch (
        `${API_URL}?limit=${limit}&skip=${skip}`
    );

    if(!response.ok){
        throw new Error("Error al intentar obtener los productos");
    }

    return await response.json();
}



// ===========OBTENER PRODUCTOS POR SU ID ==============
export async function getProductById(id) {
    const response = await fetch (`${API_URL}/${id}`);

    if(!response.ok){
        throw new Error("Producto no encontrado");
    }

    return await response.json();
}



//========PARA BUSCAR PRODUCTOS========
export async function searchProducts(query) {
    const response = await fetch(
        `${API_URL}/search?q=${encodeURIComponent(query)}`
    );

    if(!response.ok)
    {
        throw new Error("Error al intentar buscar producto");
    }

    return await response.json()
}


//============PARA OTBENER CATEGORIAS=====
export async function getCategories() {
    const response = await fetch(`${API_URL}/categories`);
    
    if(!response.ok){
        throw new Error("No se pudo obtener las categorias");
    }

    return await response.json();
}



//==== FUNCION PARA OBTENER PRODUCTOS POR SU CATEGORIA====
export async function getProductsByCategory(category) {
    const response = await fetch(
        `${API_URL}/category/${encodeURIComponent(category)}`
    );

    if(!response.ok){
        throw new Error("Error al filtrar productos por categoria");
    }

    return await response.json()
}


//============FUNCION PARA CREAR PRODUCTOS======
export async function createProduct(product) {
    const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(product),
    });

    if(!response.ok){
        throw new Error("Error al crear nuevo producto");
    }

    return await response.json()
}




//===============FUNCION PARA ACTUALIZAR PRODUCTO=============
export async function updateProduct(id, product) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',

        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    
    if(!response.ok){
        throw new Error("Error al actualizar producto");
    }

    return await response.json();
}



//==============FUNCION PARA ELIMINAR UN PRODUCTO==============
export async function deleteProduct(id) {
    const response = await fetch (`${API_URL}/${id}`,{
        method: "DELETE",
    });

    if(!response.ok){
        throw new Error("No se pudo eliminar el producto seleccionado");
    }
    return await response.json();
}
export default API_URL;