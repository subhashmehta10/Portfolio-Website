import PageHero from '../components/PageHero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { imageFromQuery } from '../utils/images.js'

function Beauty(){
  const products = Array.from({length:10}).map((_,i)=>({ id:i, title:`Beauty Product ${i+1}`, price:(249+i*40), rating:(4.2-((i%3)*0.1)).toFixed(1), image: imageFromQuery('beauty-cosmetics', i) }))
  return (
    <div>
      <PageHero title="Beauty" subtitle="Makeup, skincare and grooming" />
      <ProductGrid products={products} />
    </div>
  )
}
export default Beauty


