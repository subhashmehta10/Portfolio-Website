import PageHero from '../components/PageHero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { imageFromQuery } from '../utils/images.js'

function Fashion(){
  const products = Array.from({length:10}).map((_,i)=>({ id:i, title:`Fashion Pick ${i+1}`, price:(549+i*65), rating:(4.0+((i%3)*0.1)).toFixed(1), image: imageFromQuery('fashion-style', i) }))
  return (
    <div>
      <PageHero title="Fashion" subtitle="Latest trends for all" />
      <ProductGrid products={products} />
    </div>
  )
}
export default Fashion


