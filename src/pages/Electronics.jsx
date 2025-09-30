import PageHero from '../components/PageHero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { imageFromQuery } from '../utils/images.js'

function Electronics(){
  const products = Array.from({length:10}).map((_,i)=>({ id:i, title:`Electronics Item ${i+1}`, price:(999+i*100), rating:(4+((i%3)*0.3)).toFixed(1), image: imageFromQuery('electronics-gadgets', i) }))
  return (
    <div>
      <PageHero title="Electronics" subtitle="Mobiles, laptops, cameras and more" />
      <ProductGrid products={products} />
    </div>
  )
}
export default Electronics


