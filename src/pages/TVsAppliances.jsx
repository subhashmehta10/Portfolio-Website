import PageHero from '../components/PageHero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { imageFromQuery } from '../utils/images.js'

function TVsAppliances(){
  const products = Array.from({length:10}).map((_,i)=>({ id:i, title:`Appliance ${i+1}`, price:(4999+i*250), rating:(3.8+((i%4)*0.2)).toFixed(1), image: imageFromQuery('television-appliance', i) }))
  return (
    <div>
      <PageHero title="TVs & Appliances" subtitle="Smart TVs, refrigerators, washing machines" />
      <ProductGrid products={products} />
    </div>
  )
}
export default TVsAppliances


