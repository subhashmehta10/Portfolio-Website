import PageHero from '../components/PageHero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { imageFromQuery } from '../utils/images.js'

function Books(){
  const products = Array.from({length:10}).map((_,i)=>({ id:i, title:`Book Title ${i+1}`, price:(199+i*20), rating:(4.3-((i%5)*0.1)).toFixed(1), image: imageFromQuery('books-reading', i) }))
  return (
    <div>
      <PageHero title="Books" subtitle="Bestsellers, academics, novels and more" />
      <ProductGrid products={products} />
    </div>
  )
}
export default Books


