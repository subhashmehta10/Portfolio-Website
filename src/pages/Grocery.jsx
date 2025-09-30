import PageHero from '../components/PageHero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { imageFromQuery } from '../utils/images.js'

function Grocery(){
  const products = Array.from({length:10}).map((_,i)=>({ id:i, title:`Grocery Item ${i+1}`, price:(49+i*10), rating:(4.5-((i%4)*0.1)).toFixed(1), image: imageFromQuery('grocery-vegetables', i) }))
  return (
    <div>
      <PageHero title="Grocery" subtitle="Daily essentials and household needs" />
      <ProductGrid products={products} />
    </div>
  )
}
export default Grocery


