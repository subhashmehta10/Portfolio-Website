import ProductCard from './ProductCard.jsx'

function ProductGrid({ products }) {
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} id={p.id} title={p.title} price={p.price} image={p.image} rating={p.rating} />
      ))}
    </div>
  )
}

export default ProductGrid


