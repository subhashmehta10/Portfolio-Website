import PageHero from '../components/PageHero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { imageFromQuery } from '../utils/images.js'

function Sports(){
  const products = Array.from({length:10}).map((_,i)=>({ id:i, title:`Sports Gear ${i+1}`, price:(599+i*70), rating:(4.2-((i%5)*0.1)).toFixed(1), image: imageFromQuery('sports-fitness', i) }))
  return (
    <div>
      <PageHero title="Sports" subtitle="Cricket, fitness, outdoor and more" />
      <ProductGrid products={products} />
    </div>
  )
}
export default Sports


