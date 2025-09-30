import PageHero from '../components/PageHero.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { imageFromQuery } from '../utils/images.js'

function Appliances(){
  const products = Array.from({length:10}).map((_,i)=>({ id:i, title:`Home Appliance ${i+1}`, price:(1499+i*150), rating:(4.0+((i%2)*0.2)).toFixed(1), image: imageFromQuery('appliance-kitchen', i) }))
  return (
    <div>
      <PageHero title="Appliances" subtitle="Kitchen and home appliances" />
      <ProductGrid products={products} />
    </div>
  )
}
export default Appliances


