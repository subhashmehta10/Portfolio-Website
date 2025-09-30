import { useEffect, useState } from 'react'

function loadProducts(){
  try { return JSON.parse(localStorage.getItem('admin-products')||'[]') } catch { return [] }
}
function saveProducts(list){
  try { localStorage.setItem('admin-products', JSON.stringify(list)) } catch {}
}

function Products(){
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ title:'', price:'', image:'', category:'' })

  useEffect(()=>{ setProducts(loadProducts()) }, [])

  function addProduct(e){
    e.preventDefault()
    const id = `${form.title}-${Date.now()}`
    const price = Number(form.price)||0
    const next = [...products, { id, title: form.title, price, image: form.image, category: form.category }]
    setProducts(next); saveProducts(next); setForm({ title:'', price:'', image:'' })
  }
  function removeProduct(id){
    const next = products.filter(p=>p.id!==id)
    setProducts(next); saveProducts(next)
  }

  return (
    <div>
      <h2>Products</h2>
      <form className="login" onSubmit={addProduct} style={{marginBottom:12}}>
        <label>Title<input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required /></label>
        <label>Price<input type="number" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} required /></label>
        <label>Image URL<input value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})} /></label>
        <label>Category<input value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} placeholder="Electronics / Fashion / ..." /></label>
        <button type="submit">Add Product</button>
      </form>
      <div className="grid">
        {products.map(p=> (
          <div key={p.id} className="product">
            <div className="product__image">{p.image? <img src={p.image} alt={p.title}/>:<div className="product__placeholder"/>}</div>
            <div className="product__body">
              <div className="product__title">{p.title}</div>
              <div className="product__meta"><span className="product__price">₹{p.price}</span></div>
              <button className="product__btn" onClick={()=>removeProduct(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Products


