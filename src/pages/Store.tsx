import { useState } from 'react'
import { ShoppingCart, Check, X, Minus, Plus } from 'lucide-react'
import TopBar from '../components/TopBar'
import { products } from '../data'
import type { Product } from '../types'

const CATEGORIES = ['All', 'Jersey', 'Training', 'Accessories', 'Kids'] as const
type Cat = typeof CATEGORIES[number]

export default function Store() {
  const [activeCat, setActiveCat]     = useState<Cat>('All')
  const [cartIds, setCartIds]         = useState<string[]>([])
  const [toast, setToast]             = useState<string | null>(null)
  const [detail, setDetail]           = useState<Product | null>(null)

  const filtered = activeCat === 'All'
    ? products
    : products.filter(p => p.category === activeCat.toLowerCase())

  const addToCart = (product: Product) => {
    setCartIds(prev => [...prev, product.id])
    setToast(product.name)
    setTimeout(() => setToast(null), 2400)
  }

  if (detail) {
    return (
      <ProductDetail
        product={detail}
        inCart={cartIds.includes(detail.id)}
        onBack={() => setDetail(null)}
        onAdd={() => { addToCart(detail); setDetail(null) }}
      />
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar
        title="Store"
        right={
          cartIds.length > 0 ? (
            <button
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#d4a726', borderRadius: 8, padding: '7px 12px',
                border: 'none', cursor: 'pointer', color: '#060f22', fontSize: 13, fontWeight: 700,
              }}
            >
              <ShoppingCart size={15} />
              {cartIds.length}
            </button>
          ) : undefined
        }
      />

      {/* Category scroll */}
      <div style={{
        display: 'flex', gap: 8, padding: '0 16px 12px',
        overflowX: 'auto', flexShrink: 0,
        background: '#060f22', borderBottom: '1px solid rgba(255,255,255,0.07)',
        scrollbarWidth: 'none',
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            style={{
              padding: '7px 16px', borderRadius: 8, flexShrink: 0,
              border: activeCat === cat ? 'none' : '1px solid rgba(255,255,255,0.1)',
              background: activeCat === cat ? '#d4a726' : 'transparent',
              color:      activeCat === cat ? '#060f22' : 'rgba(255,255,255,0.55)',
              fontSize: 13, fontWeight: activeCat === cat ? 700 : 500,
              cursor: 'pointer', transition: 'background 0.15s, color 0.15s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="scroll-area flex-1" style={{ padding: '16px 16px 20px' }}>

        {/* Member banner */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 14px', borderRadius: 10, marginBottom: 16,
          background: '#0c1b3a', border: '1px solid rgba(212,167,38,0.2)',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
            background: 'rgba(212,167,38,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ShoppingCart size={16} style={{ color: '#d4a726' }} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>Members save 10–20% on every order</p>
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Join for $5/month to unlock discounts</p>
          </div>
        </div>

        {/* Grid */}
        <div
          className="stagger"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={() => setDetail(product)}
              onAdd={() => addToCart(product)}
            />
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#1a4026', borderRadius: 30, padding: '10px 16px',
          border: '1px solid rgba(255,255,255,0.1)', zIndex: 100,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          animation: 'fadeUp 0.25s ease-out',
          whiteSpace: 'nowrap',
        }}>
          <Check size={15} style={{ color: '#4caf50' }} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Added to cart</span>
        </div>
      )}
    </div>
  )
}

function ProductCard({ product, onOpen, onAdd }: { product: Product; onOpen: () => void; onAdd: () => void }) {
  return (
    <div
      className="card"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <button
        onClick={onOpen}
        style={{ position: 'relative', height: 150, border: 'none', padding: 0, cursor: 'pointer', background: 'none' }}
      >
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {product.badge && (
          <span
            className="badge badge-gold"
            style={{ position: 'absolute', top: 8, left: 8 }}
          >
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(6,15,34,0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>Sold Out</span>
          </div>
        )}
      </button>

      <div style={{ padding: '10px 12px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p style={{ margin: '0 0 3px', fontSize: 13, fontWeight: 700, lineHeight: 1.3, color: '#fff' }}>
            {product.name}
          </p>
          <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
            {product.description}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <span className="t-price" style={{ fontSize: 17 }}>€{product.price}</span>
          {product.inStock && (
            <button
              onClick={e => { e.stopPropagation(); onAdd() }}
              style={{
                width: 32, height: 32, borderRadius: 8,
                background: '#d4a726', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#060f22',
              }}
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function ProductDetail({ product, inCart, onBack, onAdd }: {
  product: Product; inCart: boolean; onBack: () => void; onAdd: () => void
}) {
  const [selectedSize, setSelectedSize] = useState('M')
  const [qty, setQty] = useState(1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Image */}
      <div style={{ position: 'relative', height: 320, flexShrink: 0 }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #060f22 0%, transparent 60%)' }} />
        <button
          onClick={onBack}
          className="safe-top"
          style={{
            position: 'absolute', top: 0, left: 16,
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff',
          }}
        >
          <X size={18} />
        </button>
        {product.badge && (
          <span className="badge badge-gold" style={{ position: 'absolute', bottom: 20, left: 20 }}>
            {product.badge}
          </span>
        )}
      </div>

      <div className="scroll-area flex-1" style={{ background: '#060f22', padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: '-0.3px', flex: 1, paddingRight: 16 }}>
            {product.name}
          </h2>
          <span className="t-price" style={{ fontSize: 24, flexShrink: 0 }}>€{product.price}</span>
        </div>
        <p style={{ margin: '0 0 24px', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{product.description}</p>

        {/* Size selector */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 600 }}>Size</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                style={{
                  padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  background: selectedSize === s ? '#d4a726' : 'transparent',
                  color:      selectedSize === s ? '#060f22' : 'rgba(255,255,255,0.6)',
                  border:     selectedSize === s ? 'none' : '1px solid rgba(255,255,255,0.14)',
                  transition: 'background 0.12s, color 0.12s',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Qty */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, flex: 1 }}>Quantity</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setQty(q => Math.max(1, q - 1))}
              style={{ width: 32, height: 32, borderRadius: 8, background: '#0c1b3a', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Minus size={14} />
            </button>
            <span style={{ fontSize: 16, fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{qty}</span>
            <button
              onClick={() => setQty(q => q + 1)}
              style={{ width: 32, height: 32, borderRadius: 8, background: '#0c1b3a', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '14px 20px 28px', background: '#060f22', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
        {product.inStock ? (
          <button
            onClick={onAdd}
            disabled={inCart}
            className="btn btn-primary"
            style={{ width: '100%', padding: '15px 0', borderRadius: 12, fontSize: 15, opacity: inCart ? 0.6 : 1 }}
          >
            {inCart ? <><Check size={16} /> In cart</> : <><ShoppingCart size={16} /> Add to cart — €{(product.price * qty).toFixed(2)}</>}
          </button>
        ) : (
          <button disabled className="btn" style={{ width: '100%', padding: '15px 0', borderRadius: 12, fontSize: 15, background: '#0c1b3a', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>
            Out of Stock
          </button>
        )}
      </div>
    </div>
  )
}
