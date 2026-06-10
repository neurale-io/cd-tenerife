import { useState } from 'react'
import { ShoppingCart, Check, X } from 'lucide-react'
import TopBar from '../components/TopBar'
import { products } from '../data'
import type { Product } from '../types'

const CATEGORIES = ['All', 'Jersey', 'Training', 'Accessories', 'Kids'] as const
type Cat = typeof CATEGORIES[number]

export default function Store() {
  const [activeCat, setActiveCat] = useState<Cat>('All')
  const [cart, setCart] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filtered = activeCat === 'All'
    ? products
    : products.filter(p => p.category === activeCat.toLowerCase())

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product.id])
    setToast(product.name)
    setTimeout(() => setToast(null), 2500)
  }

  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} onAdd={() => { addToCart(selectedProduct); setSelectedProduct(null) }} />
  }

  return (
    <div className="flex flex-col h-full">
      <TopBar title="Store" />

      {/* Category tabs */}
      <div className="shrink-0 scroll-area flex gap-2 px-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#060f22', overflowX: 'auto', display: 'flex', whiteSpace: 'nowrap' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className="px-4 py-1.5 rounded-full shrink-0 transition-all"
            style={{
              fontSize: 13,
              fontWeight: activeCat === cat ? 700 : 500,
              background: activeCat === cat ? 'linear-gradient(135deg, #f5cc50, #c9880a)' : '#112248',
              color: activeCat === cat ? '#0c1b3a' : 'rgba(255,255,255,0.6)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="scroll-area flex-1 px-4 pt-4 pb-4">
        {/* Banner */}
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3 mb-4"
          style={{ background: 'linear-gradient(90deg, #162d60, #1c3a7a)', border: '1px solid rgba(245,204,80,0.2)' }}
        >
          <span style={{ fontSize: 20 }}>🎽</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700 }}>Members get 10–20% off everything</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>Join for $5/month to unlock discounts</p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 stagger">
          {filtered.map(product => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="rounded-xl overflow-hidden text-left active:opacity-90 flex flex-col"
              style={{ background: '#112248' }}
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full object-cover" style={{ height: 140 }} />
                {product.badge && (
                  <span
                    className="absolute top-2 left-2 px-2 py-0.5 rounded-full"
                    style={{ fontSize: 9, fontWeight: 800, background: '#c9880a', letterSpacing: '0.05em' }}
                  >
                    {product.badge}
                  </span>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.55)' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>Sold Out</span>
                  </div>
                )}
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{product.name}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{product.description}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-gold-gradient" style={{ fontSize: 16, fontWeight: 900 }}>€{product.price}</span>
                  {product.inStock && (
                    <button
                      onClick={e => { e.stopPropagation(); addToCart(product) }}
                      className="w-8 h-8 rounded-full flex items-center justify-center btn-gold"
                    >
                      <ShoppingCart size={14} />
                    </button>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cart button */}
      {cart.length > 0 && (
        <div className="shrink-0 px-4 pb-4">
          <button className="btn-gold w-full py-4 flex items-center justify-center gap-2 font-bold text-sm">
            <ShoppingCart size={18} />
            View Cart ({cart.length} items)
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-full slide-in-right"
          style={{ background: '#1a7a3c', zIndex: 100, maxWidth: 300, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
        >
          <Check size={16} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Added: {toast}</span>
        </div>
      )}
    </div>
  )
}

function ProductDetail({ product, onBack, onAdd }: { product: Product; onBack: () => void; onAdd: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="relative shrink-0" style={{ height: 300 }}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #060f22 0%, transparent 60%)' }} />
        <button
          onClick={onBack}
          className="absolute top-12 left-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}
        >
          <X size={18} />
        </button>
        {product.badge && (
          <span
            className="absolute top-12 right-4 px-3 py-1 rounded-full"
            style={{ fontSize: 11, fontWeight: 800, background: '#c9880a' }}
          >
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex-1 scroll-area px-4 pt-5 pb-4" style={{ background: '#060f22' }}>
        <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 4 }}>{product.name}</h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>{product.description}</p>
        <p className="text-gold-gradient" style={{ fontSize: 32, fontWeight: 900, marginBottom: 20 }}>€{product.price}</p>
        {product.colors && (
          <div className="mb-5">
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Colors</p>
            <div className="flex gap-3">
              {product.colors.map((c, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2" style={{ background: c, borderColor: 'rgba(255,255,255,0.3)' }} />
              ))}
            </div>
          </div>
        )}
        <div className="mb-6">
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Size</p>
          <div className="flex gap-2 flex-wrap">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
              <button key={s} className="px-3 py-1.5 rounded-lg text-sm font-600" style={{ background: '#112248', border: '1px solid rgba(255,255,255,0.15)' }}>
                {s}
              </button>
            ))}
          </div>
        </div>
        {product.inStock ? (
          <button className="btn-gold w-full py-4 font-bold" onClick={onAdd}>
            Add to Cart — €{product.price}
          </button>
        ) : (
          <button className="w-full py-4 rounded-xl font-bold" style={{ background: '#112248', color: 'rgba(255,255,255,0.4)' }} disabled>
            Out of Stock
          </button>
        )}
      </div>
    </div>
  )
}
