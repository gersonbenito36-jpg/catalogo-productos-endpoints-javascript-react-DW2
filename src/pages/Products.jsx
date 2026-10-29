import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import {getProducts, deleteProduct, searchProducts, getCategories, getProductsByCategory, createProduct, updateProduct} from '../services/productService';


function Products () {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const limit = 12;


    const [form, setForm] = useState({
        title: "",
        price: "",
        description: ""
    });
    
    useEffect(() =>{
        loadProducts();
        loadCategories();
    }, []);

    async function loadProducts(pageNumber = 1) {
        try{
            setLoading(true);
            const skip = (pageNumber-1) * limit;
            const data = await getProducts(limit, skip);

            setProducts(data.products);
            setTotal(data.total)
        } catch(error){
            setError(error.message);
        } finally{
            setLoading(false);
        }
    }


    
    async function loadCategories() {
        try{
            const data = await getCategories();

            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    }




    async function handleDelete(id) {
        try{
            await deleteProduct(id);
            
            setProducts(products.filter((product) => product.id !== id));
        } catch (error){
            setError(error.message);
        }
    }


    function handleEdit(product){
        setEditingId(product.id);
        setForm({
            title: product.title,
            price: product.price,
            description: product.description,
        })
    }
    if(loading){
        return <p>Cargando productos....</p>;
    }
    
    if(error){
        return <p>{error}</p>;
    }

    async function handleSearch(event) {
        event.preventDefault();
        
        try{
            setLoading(true);
            if(search.trim() === ""){
                await loadProducts();
                return;
            }
            const data = await searchProducts(search);
            setProducts(data.products);
        } catch(error){
            setError(error.message);
        } finally{
            setLoading(false);
        }
    }



    async function handleUpdate(event) {
        event.preventDefault();
        try{
            const update = await updateProduct(
                editingId,
                {
                    ...form, price: Number(form.price),
                }
            );
            setProducts(
                products.map((product)=>
                product.id === editingId? {...product, ...update} : product)
            );
            alert("Producto editado correctamente")
            setEditingId(null);
            setForm({
                title: "",
                price: "",
                description: "",
            });
        } catch(error){
            setError(error.message);
        }
    }


    async function handleCategory(event) {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);

        try {
            setLoading(true);
            if(selectedCategory === ""){
                await loadProducts();
                return;
            }
            const data = await getProductsByCategory(selectedCategory);
            setProducts(data.products);
        } catch (error){
            setError(error.message);
        } finally{
            setLoading(false);
        }
    }

    function handleChange(event){
        const {name, value} = event.target;
        setForm({
            ...form, [name]: value,
        });
    }
    async function handleCreate(event) {
        event.preventDefault();

        try{
            const newProduct = await createProduct({
                ...form, price: Number(form.price),
            });

            setProducts([newProduct, ...products]);
            setForm({ title: "", price: "", description: ""});
            alert("Producto creado exitosamente")
        } catch (error){
            setError(error.message);
        }
    }


    function nextPage(){
        const totalPages = Math.ceil(total/limit);
        if(page<totalPages){
            const newPage = page +1;
            setPage(newPage);
            loadProducts(newPage);
        }
    }

    function previousPage(){
        if(page>1){
            const newPage = page -1;
            setPage(newPage);
            loadProducts(newPage);
        }
    }




    return (
        <section className="section-product">
            <h2>Productos</h2>

            <form action="" onSubmit={handleSearch} className="search-form">
                <input type="text" className="input-search"
                placeholder="Buscar producto..."
                value={search}
                onChange={(event)=> setSearch(event.target.value)}
                />
                <button type="submit" className="button-buscar">
                    Buscar
                </button>
            </form>
            
            <select value={category}
            onChange={handleCategory}
            className="todas-categorias"
            >
                <option value="" >
                    Todas las categorias
                </option>
                {categories.map((item)=>{
                    const value = item.slug ?? item;
                    const label = item.slug ?? item;
                    return (
                        <option
                        key={value}
                        value={value}
                        >
                            {label}
                        </option>

                    );
                })}

            </select>

            <h2>Agregar producto</h2>

            <form onSubmit={editingId? handleUpdate : handleCreate} className="product-form">

                <div className="detalle-producto">
                    <input type="text" name="title" placeholder="Nombre producto" className="nombre-precio"
                    value={form.title}
                    onChange={handleChange}
                    required
                    />
                    <input type="number"name="price" className="nombre-precio"
                    placeholder="Precio producto"
                    value={form.price}
                    onChange={handleChange}
                    required 
                    />
                </div>
                
                 <textarea name="description" placeholder="Descripción" className="producto-descripcion"
                 value={form.description}
                 onChange={handleChange}
                 >
                 </textarea>
                 <button type="submit" className="button-textarea">
                    {editingId? "Actualizar": "Guardar"}
                 </button>
            </form>




            <h1>Productos</h1>
            <ProductList
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            />
            <div className="pagination">
                <button onClick={previousPage} 
                disabled = {page ===1}
                >
                    Anterior
                </button>
                <span>
                    Página {page}
                </span>
                <button onClick={nextPage}
                 disabled={page>= Math.ceil(total / limit)}
                 >
                    Siguiente
                </button>
            </div>
        </section>
    );
}

export default Products;