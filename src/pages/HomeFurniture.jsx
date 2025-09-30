import PageHero from '../components/PageHero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { imageFromQuery } from '../utils/images.js'

function HomeFurniture(){
  const products = Array.from({length:10}).map((_,i)=>({ id:i, title:`Home & Furniture ${i+1}`, price:(999+i*120), rating:(3.7+((i%5)*0.2)).toFixed(1), image: imageFromQuery('furniture-home-decor', i) }))
  return (
    <div>
      <PageHero title="Home & Furniture" subtitle="Beds, sofas, decor and more" />
      <ProductGrid products={products} />
    </div>
  )
}
export default HomeFurniture


