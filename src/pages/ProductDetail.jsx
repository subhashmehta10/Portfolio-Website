
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function loadProducts() {
  try { return JSON.parse(localStorage.getItem('products')||'[]') } catch { return [] }
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const all = loadProducts();
    const prod = all.find(p => String(p.id) === String(id));
    setProduct(prod || null);
    // Suggest up to 4 other products from same category, else random
    let sugg = all.filter(p => prod && p.category === prod.category && p.id !== prod.id);
    if (sugg.length < 4) {
      sugg = sugg.concat(all.filter(p => p.id !== prod.id && !sugg.includes(p)));
    }
    setSuggestions(sugg.slice(0, 4));
  }, [id]);

  if (!product) return <div className="hero">Product not found.</div>;

  return (
    <div style={{maxWidth: '900px', margin: '0 auto', padding: '24px 0'}}>
      <button onClick={()=>navigate(-1)} style={{marginBottom:24, background:'#2874f0', color:'#fff', border:'none', borderRadius:6, padding:'8px 18px', fontWeight:600, fontSize:'1em', cursor:'pointer'}}>&larr; Back</button>
      <div style={{display:'flex',flexWrap:'wrap',gap:32,alignItems:'center',background:'#fff',borderRadius:16,boxShadow:'0 4px 24px #0001',padding:'32px 24px',marginBottom:40}}>
        <div style={{flex:'1 1 320px',display:'flex',justifyContent:'center',alignItems:'center',minWidth:220}}>
          <div className="product__image" style={{height:260,width:260,background:'#f6f7f9',borderRadius:16,boxShadow:'0 2px 12px #0001'}}>
            {product.image ? <img src={product.image} alt={product.title} style={{maxHeight:220,maxWidth:220,borderRadius:12,boxShadow:'0 2px 8px #0002'}}/> : <div className="product__placeholder" style={{height:120}}/>}
          </div>
        </div>
        <div style={{flex:'2 1 340px',minWidth:240}}>
          <div className="product__title" style={{fontSize:'2em',marginBottom:10,lineHeight:1.15}}>{product.title}</div>
          <div className="product__meta" style={{marginBottom:18,fontSize:'1.2em'}}>
            <span className="product__price" style={{color:'#ff6600',fontWeight:800,fontSize:'1.3em',marginRight:18}}>₹{product.price}</span>
            {product.category && <span style={{background:'#e3e7ef',padding:'4px 14px',borderRadius:8,fontSize:15,color:'#2874f0',fontWeight:600}}>{product.category}</span>}
          </div>
          <div style={{color:'#555',marginBottom:18,fontSize:'1.1em'}}>Product ID: <span style={{fontWeight:600}}>{product.id}</span></div>
          <button style={{background:'#2874f0',color:'#fff',padding:'12px 32px',border:'none',borderRadius:8,fontWeight:700,fontSize:'1.1em',boxShadow:'0 2px 8px #2874f033',marginTop:8,cursor:'pointer'}}>Add to Cart</button>
        </div>
      </div>
      <h3 style={{margin:'18px 0 10px 0',fontSize:'1.3em',color:'#2874f0',fontWeight:700}}>You may also like</h3>
      <div className="grid" style={{marginBottom:32}}>
        {suggestions.map(s => (
          <div key={s.id} className="product" onClick={()=>navigate(`/product/${s.id}`)} style={{cursor:'pointer',transition:'box-shadow 0.2s',boxShadow:'0 2px 8px #0001'}}>
            <div className="product__image">{s.image ? <img src={s.image} alt={s.title}/> : <div className="product__placeholder"/>}</div>
            <div className="product__body">
              <div className="product__title">{s.title}</div>
              <div className="product__meta"><span className="product__price">₹{s.price}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
