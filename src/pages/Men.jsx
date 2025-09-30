import PageHero from '../components/PageHero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { imageFromQuery } from '../utils/images.js'

function Men(){
  const products = Array.from({length:10}).map((_,i)=>({ id:i, title:`Men's Fashion ${i+1}`, price:(399+i*50), rating:(3.9+((i%4)*0.2)).toFixed(1), image: imageFromQuery('mens-fashion-clothing', i) }))
  return (
    <div>
      <PageHero title="Men" subtitle="Clothing, footwear, accessories" />
      <ProductGrid products={products} />
    </div>
  )
}
export default Men


