import { imageFromQuery } from '../utils/images.js'
import HeroCarousel from '../components/HeroCarousel.jsx'
import ProductCard from '../components/ProductCard.jsx'

function Home() {
  const featured = [
    { label: 'Mobiles', q: 'smartphone,mobile' },
    { label: 'Laptops', q: 'laptop,computer' },
    { label: 'Televisions', q: 'television,tv' },
    { label: 'Appliances', q: 'appliance,kitchen' },
    { label: 'Grocery', q: 'grocery,vegetables' },
  ]

  const sections = [
    { title: 'Top Deals', q: 'sale,discount,shopping', base: 299, step: 50 },
    { title: 'Best of Electronics', q: 'electronics,gadgets', base: 999, step: 250 },
    { title: 'Fashion Finds', q: 'fashion,style', base: 449, step: 60 },
    { title: 'Home Essentials', q: 'home,decor', base: 599, step: 80 },
    { title: 'Beauty & Personal Care', q: 'beauty,cosmetics', base: 249, step: 40 },
    { title: 'Sports & Outdoors', q: 'sports,fitness', base: 549, step: 70 },
    { title: 'Books & Learning', q: 'books,reading', base: 199, step: 20 },
  ]

  function makeProducts(query, titlePrefix, basePrice, step) {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: `${titlePrefix}-${i}`,
      title: `${titlePrefix} ${i + 1}`,
      price: basePrice + i * step,
      rating: (4 + ((i % 3) * 0.2)).toFixed(1),
      image: imageFromQuery(query, i),
    }))
  }

  return (
    <div>
      <section className="home__hero">
        <h1>Big Savings, Top Brands</h1>
        <p>Shop the latest deals across electronics, fashion, and more.</p>
        <HeroCarousel images={[
          imageFromQuery('sale-discount-banner','b1'),
          imageFromQuery('fashion-banner','b2'),
          imageFromQuery('electronics-banner','b3')
        ]} />
      </section>

      <section className="home__section">
        <h2>Featured Categories</h2>
        <div className="home__grid">
          {featured.map((item) => (
            <div className="home__card" key={item.label}>
              <img className="home__card-img" src={imageFromQuery(item.q, item.label)} alt={item.label} />
              <div className="home__card-title">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {sections.map((s) => {
        const products = makeProducts(s.q, s.title, s.base, s.step)
        return (
          <section className="home__section" key={s.title}>
            <h2>{s.title}</h2>
            <div className="home__grid">
              {products.map((p) => (
                <ProductCard key={p.id} id={p.id} title={p.title} price={p.price} image={p.image} rating={p.rating} sectionProducts={products} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default Home


