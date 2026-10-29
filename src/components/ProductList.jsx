import ProductCard from "./ProductCard";

function ProductList ({products, onEdit, onDelete}) {
    if(!products || products.length === 0)  {
        return <p>No se encontraron productos.</p>;
    }

    return (
        <section className="product-grid">
            {products.map((product) =>(
                <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </section>
    )
}

export default ProductList;