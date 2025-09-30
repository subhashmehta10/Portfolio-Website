import PageHero from '../components/PageHero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { imageFromQuery } from '../utils/images.js'

function Mobile(){
  const products = Array.from({length:10}).map((_,i)=>({ id:i, title:`Smartphone ${i+1}`, price:(6999+i*500), rating:(4.4-((i%4)*0.1)).toFixed(1), image: imageFromQuery('smartphone-mobile', i) }))
  return (
    <div>
      <PageHero title="Mobiles" subtitle="Latest smartphones and accessories" />
      <ProductGrid products={products} />
    </div>
  )
}
export default Mobile


