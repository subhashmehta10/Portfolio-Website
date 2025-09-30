import PageHero from '../components/PageHero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { imageFromQuery } from '../utils/images.js'

function Kids(){
  const products = Array.from({length:10}).map((_,i)=>({ id:i, title:`Kids' Wear ${i+1}`, price:(299+i*30), rating:(4+((i%5)*0.1)).toFixed(1), image: imageFromQuery('kids-clothing-toys', i) }))
  return (
    <div>
      <PageHero title="Baby & Kids" subtitle="Clothing, toys, school essentials" />
      <ProductGrid products={products} />
    </div>
  )
}
export default Kids


