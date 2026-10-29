import { Link } from "react-router-dom";

function ProductCard ({product, onEdit, onDelete}) {
    return (
        <article className="product-card">
            <img 
               src={product.thumbnail}
               alt={product.title}
            />
            <div className="information-card">
                <h3>{product.title}</h3>
                <p>{product.category}</p>
                <strong>Precio:{product.price}</strong>
            </div>
            <div className="actions">
                <Link to={`/products/${product.id}`} className="detalles-link">
                    Ver detalles
                </Link>
                <div className="botones-card">
                    <button className="boton-editar" onClick={()=>onEdit(product)}>Editar</button>
                    <button className="boton-eliminar" onClick={()=>onDelete(product.id)}>Eliminar</button>
                </div>
            </div>
                
        </article>
    );
}

export default ProductCard;
