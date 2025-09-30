import PageHero from '../components/PageHero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { imageFromQuery } from '../utils/images.js'

function Women(){
  const products = Array.from({length:10}).map((_,i)=>({ id:i, title:`Women's Fashion ${i+1}`, price:(449+i*60), rating:(4.1+((i%3)*0.2)).toFixed(1), image: imageFromQuery('womens-fashion-clothing', i) }))
  return (
    <div>
      <PageHero title="Women" subtitle="Trending styles and essentials" />
      <ProductGrid products={products} />
    </div>
  )
}
export default Women


