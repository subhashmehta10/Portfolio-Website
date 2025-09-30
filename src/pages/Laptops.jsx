import PageHero from '../components/PageHero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { imageFromQuery } from '../utils/images.js'

function Laptops(){
  const products = Array.from({length:10}).map((_,i)=>({ id:i, title:`Laptop ${i+1}`, price:(25999+i*1000), rating:(4.3-((i%4)*0.1)).toFixed(1), image: imageFromQuery('laptop-computer', i) }))
  return (
    <div>
      <PageHero title="Laptops" subtitle="Gaming, ultrabooks, and work laptops" />
      <ProductGrid products={products} />
    </div>
  )
}
export default Laptops


