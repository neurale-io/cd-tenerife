import { useState, useEffect } from 'react'
import { ArrowLeft, Ticket, ChevronRight } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { products, matches } from '../data'
import type { Product } from '../types'

type Tab = 'tienda' | 'entradas'
type StoreView = 'main' | 'list' | 'product' | 'purchase'

export default function Store() {
  const navigate = useNavigate()
  const location = useLocation()
  const activeTab: Tab = location.pathname === '/entradas' ? 'entradas' : 'tienda'
  const [view, setView] = useState<StoreView>('main')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => { setView('main') }, [location.pathname])

  const featuredJersey = products.find(p => p.category === 'jersey') ?? products[0]
  const jerseys = products.filter(p => p.category === 'jersey')
  const upcomingMatch = matches.find(m => m.status === 'upcoming')

  const openProduct = (p: Product) => { setSelectedProduct(p); setView('product') }

  if (view === 'list') {
    return <ProductListView products={products} onSelect={openProduct} onBack={() => setView('main')} />
  }
  if (view === 'product' && selectedProduct) {
    return <ProductView product={selectedProduct} onBack={() => setView(view === 'product' ? 'main' : 'list')} />
  }
  if (view === 'purchase') {
    return <PurchaseView match={upcomingMatch} onBack={() => setView('main')} />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#060f22' }}>

      {/* ── Header ── */}
      <div
        className="safe-top shrink-0"
        style={{
          display: 'flex', alignItems: 'center', position: 'relative',
          padding: '0 16px 14px',
          background: '#060f22',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(255,255,255,0.07)', border: 'none',
            cursor: 'pointer', color: '#fff', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <span style={{
          position: 'absolute', left: 0, right: 0, textAlign: 'center',
          fontSize: 16, fontWeight: 700, letterSpacing: '0.04em',
          pointerEvents: 'none',
        }}>
          TIENDA & ENTRADAS
        </span>
      </div>

      {/* ── Tab toggle ── */}
      <div style={{ padding: '14px 16px 0', background: '#060f22', flexShrink: 0 }}>
        <div style={{
          display: 'flex', width: '100%',
          background: '#0c1b3a', borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden', padding: 3,
        }}>
          {(['tienda', 'entradas'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => navigate(tab === 'tienda' ? '/store' : '/entradas')}
              style={{
                flex: 1, padding: '9px 0',
                border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 700,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                background: activeTab === tab ? '#fff' : 'transparent',
                color: activeTab === tab ? '#060f22' : 'rgba(255,255,255,0.45)',
                borderRadius: 7,
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {tab === 'tienda' ? 'TIENDA' : 'ENTRADAS'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="scroll-area flex-1" style={{ padding: '14px 16px 20px' }}>
        {activeTab === 'tienda' ? (
          <TiendaTab
            featured={featuredJersey}
            jerseys={jerseys}
            onViewProduct={p => openProduct(p)}
            onViewAll={() => setView('list')}
            onViewEntradas={() => navigate('/entradas')}
          />
        ) : (
          <EntradasTab
            match={upcomingMatch}
            onBuyTickets={() => setView('purchase')}
          />
        )}
      </div>
    </div>
  )
}

/* ── TIENDA tab ─────────────────────────────────────────────── */
function TiendaTab({
  featured,
  jerseys,
  onViewProduct,
  onViewAll,
  onViewEntradas,
}: {
  featured: Product
  jerseys: Product[]
  onViewProduct: (p: Product) => void
  onViewAll: () => void
  onViewEntradas: () => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

      {/* Featured jersey card */}
      <div style={{
        background: '#0c1b3a', borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.07)',
        padding: 16,
        display: 'flex', gap: 14, alignItems: 'flex-start',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {featured.badge && (
            <span style={{
              display: 'inline-block', marginBottom: 6,
              background: 'rgba(212,167,38,0.15)', color: '#d4a726',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
              padding: '2px 8px', borderRadius: 4,
            }}>
              {featured.badge}
            </span>
          )}
          <p style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 700 }}>{featured.name}</p>
          <p style={{ margin: '0 0 10px', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
            {featured.description}
          </p>
          <p style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 900, color: '#fff' }}>
            {featured.price.toFixed(2).replace('.', ',')} €
          </p>
          <button
            onClick={() => onViewProduct(featured)}
            style={{
              padding: '8px 18px',
              background: 'transparent',
              border: '1.5px solid rgba(255,255,255,0.4)',
              borderRadius: 8, cursor: 'pointer',
              fontSize: 12, fontWeight: 700, color: '#fff',
              letterSpacing: '0.04em',
            }}
          >
            VER PRODUCTO
          </button>
        </div>
        <img
          src={featured.image}
          alt={featured.name}
          style={{ width: 90, height: 90, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
        />
      </div>

      {/* Other jerseys mini-row */}
      <div style={{ display: 'flex', gap: 8 }}>
        {jerseys.slice(1).map(p => (
          <button
            key={p.id}
            onClick={() => onViewProduct(p)}
            style={{
              flex: 1, background: '#0c1b3a', borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '10px 8px', cursor: 'pointer', textAlign: 'left',
            }}
          >
            <img src={p.image} alt={p.name}
              style={{ width: '100%', height: 60, objectFit: 'cover', borderRadius: 7, display: 'block', marginBottom: 7 }} />
            <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 700, color: '#fff',
              overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {p.name}
            </p>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: '#d4a726' }}>
              {p.price.toFixed(2).replace('.', ',')} €
            </p>
          </button>
        ))}
      </div>

      <LinkRow label="Ver todas las camisetas" onClick={onViewAll} />
      <LinkRow label="Ver próximos partidos" onClick={onViewEntradas} />
    </div>
  )
}

/* ── ENTRADAS tab ────────────────────────────────────────────── */
function EntradasTab({
  match,
  onBuyTickets,
}: {
  match: typeof matches[0] | undefined
  onBuyTickets: () => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{
        background: '#0c1b3a', borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.07)',
        padding: 16,
      }}>
        <p style={{ margin: '0 0 2px', fontSize: 16, fontWeight: 700 }}>Entradas</p>
        <p style={{ margin: '0 0 14px', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
          Próximo partido en casa
        </p>

        {match ? (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700 }}>
                {match.homeTeam} vs {match.awayTeam}
              </p>
              <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                {match.date} · {match.time} h
              </p>
            </div>
            <div style={{
              width: 44, height: 44,
              background: 'rgba(255,255,255,0.06)', borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Ticket size={20} style={{ color: 'rgba(255,255,255,0.6)' }} />
            </div>
          </div>
        ) : (
          <p style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
            No hay partidos programados en casa.
          </p>
        )}

        <button
          onClick={onBuyTickets}
          style={{
            width: '100%', padding: '12px 0',
            background: 'transparent',
            border: '1.5px solid rgba(255,255,255,0.35)',
            borderRadius: 8, cursor: 'pointer',
            fontSize: 13, fontWeight: 700, color: '#fff',
            letterSpacing: '0.04em',
          }}
        >
          COMPRAR ENTRADAS
        </button>
      </div>

      <LinkRow label="Ver próximos partidos" onClick={() => {}} />
    </div>
  )
}

/* ── All products list view ──────────────────────────────────── */
function ProductListView({
  products: allProducts,
  onSelect,
  onBack,
}: {
  products: Product[]
  onSelect: (p: Product) => void
  onBack: () => void
}) {
  const [filter, setFilter] = useState<string>('all')
  const categories = [
    { id: 'all', label: 'Todo' },
    { id: 'jersey', label: 'Camisetas' },
    { id: 'training', label: 'Equipación' },
    { id: 'kids', label: 'Niños' },
    { id: 'accessories', label: 'Accesorios' },
  ]
  const filtered = filter === 'all' ? allProducts : allProducts.filter(p => p.category === filter)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#060f22' }}>

      <div
        className="safe-top shrink-0"
        style={{
          display: 'flex', alignItems: 'center', position: 'relative',
          padding: '0 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: 'none', cursor: 'pointer', color: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowLeft size={18} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 16, fontWeight: 700, pointerEvents: 'none' }}>
          TIENDA
        </span>
      </div>

      {/* Category filters */}
      <div style={{ display: 'flex', gap: 6, padding: '12px 16px', overflowX: 'auto', flexShrink: 0, scrollbarWidth: 'none' }}>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            style={{
              whiteSpace: 'nowrap', padding: '7px 14px', borderRadius: 20,
              border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
              background: filter === c.id ? '#d4a726' : '#0c1b3a',
              color: filter === c.id ? '#060f22' : 'rgba(255,255,255,0.55)',
              flexShrink: 0,
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="scroll-area flex-1" style={{ padding: '0 16px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(p => (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              style={{
                display: 'flex', gap: 14, alignItems: 'center',
                background: '#0c1b3a', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.07)',
                padding: 12, cursor: 'pointer', textAlign: 'left',
              }}
            >
              <img src={p.image} alt={p.name}
                style={{ width: 76, height: 76, borderRadius: 9, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                {p.badge && (
                  <span style={{
                    display: 'inline-block', marginBottom: 4,
                    background: 'rgba(212,167,38,0.15)', color: '#d4a726',
                    fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
                    padding: '2px 6px', borderRadius: 3,
                  }}>
                    {p.badge}
                  </span>
                )}
                <p style={{ margin: '0 0 2px', fontSize: 14, fontWeight: 700, color: '#fff' }}>
                  {p.name}
                </p>
                <p style={{ margin: '0 0 6px', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                  {p.description}
                </p>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#d4a726' }}>
                  {p.price.toFixed(2).replace('.', ',')} €
                </p>
              </div>
              <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {!p.inStock && (
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>Agotado</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Row link ────────────────────────────────────────────────── */
function LinkRow({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', padding: '16px',
        background: '#0c1b3a', borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.07)',
        cursor: 'pointer', textAlign: 'left', color: '#fff',
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 500 }}>{label}</span>
      <ChevronRight size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
    </button>
  )
}

/* ── Product detail view ─────────────────────────────────────── */
function ProductView({ product, onBack }: { product: Product; onBack: () => void }) {
  const [size, setSize] = useState<string | null>(null)
  const [added, setAdded] = useState(false)
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#060f22' }}>

      <div
        className="safe-top shrink-0"
        style={{
          display: 'flex', alignItems: 'center', position: 'relative',
          padding: '0 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: 'none', cursor: 'pointer', color: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowLeft size={18} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 16, fontWeight: 700, pointerEvents: 'none' }}>
          TIENDA
        </span>
      </div>

      <div className="scroll-area flex-1">
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }}
        />
        <div style={{ padding: '20px 16px' }}>
          {product.badge && (
            <span style={{
              display: 'inline-block', marginBottom: 8,
              background: 'rgba(212,167,38,0.15)', color: '#d4a726',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
              padding: '3px 9px', borderRadius: 4,
            }}>
              {product.badge}
            </span>
          )}
          <p style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800 }}>{product.name}</p>
          <p style={{ margin: '0 0 14px', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>{product.description}</p>
          <p style={{ margin: '0 0 22px', fontSize: 28, fontWeight: 900, color: '#d4a726' }}>
            {product.price.toFixed(2).replace('.', ',')} €
          </p>

          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Talla
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {sizes.map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  width: 48, height: 48, borderRadius: 10,
                  border: size === s ? '2px solid #d4a726' : '1px solid rgba(255,255,255,0.15)',
                  background: size === s ? 'rgba(212,167,38,0.12)' : '#0c1b3a',
                  color: size === s ? '#d4a726' : '#fff',
                  fontWeight: size === s ? 700 : 500, fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        padding: '14px 16px',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 24px)',
        background: '#060f22', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0,
      }}>
        {product.inStock ? (
          <button
            onClick={handleAdd}
            className="btn btn-primary"
            style={{ width: '100%', padding: '15px 0', borderRadius: 12, fontSize: 15, fontWeight: 700 }}
          >
            {added ? '¡Añadido al carrito!' : 'Añadir al carrito'}
          </button>
        ) : (
          <button disabled className="btn" style={{ width: '100%', padding: '15px 0', borderRadius: 12, fontSize: 15, fontWeight: 700, background: '#0c1b3a', color: 'rgba(255,255,255,0.3)', cursor: 'not-allowed' }}>
            Agotado
          </button>
        )}
      </div>

    </div>
  )
}

/* ── Ticket purchase view ────────────────────────────────────── */
function PurchaseView({ match, onBack }: { match: typeof matches[0] | undefined; onBack: () => void }) {
  const [qty, setQty] = useState(1)
  const [done, setDone] = useState(false)
  const price = 28

  if (done) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', height: '100%', background: '#060f22',
        alignItems: 'center', justifyContent: 'center', padding: 32,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(76,175,80,0.15)', border: '2px solid rgba(76,175,80,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
        }}>
          <Ticket size={32} style={{ color: '#4caf50' }} />
        </div>
        <h2 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800, textAlign: 'center' }}>
          ¡Entradas confirmadas!
        </h2>
        <p style={{ margin: '0 0 32px', fontSize: 14, color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: 1.6 }}>
          {qty} entrada{qty > 1 ? 's' : ''} para {match?.homeTeam} vs {match?.awayTeam}
        </p>
        <button
          className="btn btn-primary"
          style={{ padding: '14px 32px', borderRadius: 12, fontSize: 14, fontWeight: 700 }}
          onClick={onBack}
        >
          Volver a Tienda
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#060f22' }}>

      <div
        className="safe-top shrink-0"
        style={{
          display: 'flex', alignItems: 'center', position: 'relative',
          padding: '0 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: 'none', cursor: 'pointer', color: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ArrowLeft size={18} />
        </button>
        <span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontSize: 16, fontWeight: 700, pointerEvents: 'none' }}>
          COMPRAR ENTRADAS
        </span>
      </div>

      <div className="scroll-area flex-1" style={{ padding: '20px 16px 0' }}>

        {match && (
          <div style={{ background: '#0c1b3a', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', padding: '14px 16px', marginBottom: 20 }}>
            <p style={{ margin: '0 0 3px', fontSize: 16, fontWeight: 700 }}>
              {match.homeTeam} vs {match.awayTeam}
            </p>
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
              {match.date} · {match.time} h · {match.stadium}
            </p>
          </div>
        )}

        <div style={{ background: '#0c1b3a', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', padding: '14px 16px', marginBottom: 20 }}>
          <p style={{ margin: '0 0 14px', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Cantidad
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.07)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
            <span style={{ fontSize: 20, fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{qty}</span>
            <button onClick={() => setQty(q => Math.min(6, q + 1))} style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.07)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          </div>
        </div>

        <div style={{ background: '#0c1b3a', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', padding: '14px 16px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14 }}>Entrada general × {qty}</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>€{(price * qty).toFixed(2).replace('.', ',')}</span>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 10, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Total</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#d4a726' }}>€{(price * qty).toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

      </div>

      <div style={{
        padding: '14px 16px',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 24px)',
        background: '#060f22', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0,
      }}>
        <button
          onClick={() => setDone(true)}
          className="btn btn-primary"
          style={{ width: '100%', padding: '15px 0', borderRadius: 12, fontSize: 15, fontWeight: 700 }}
        >
          Confirmar compra · €{(price * qty).toFixed(2).replace('.', ',')}
        </button>
      </div>

    </div>
  )
}
