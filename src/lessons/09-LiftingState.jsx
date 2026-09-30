/**
 * LESSON 9 — LIFTING STATE UP
 * ===========================
 * Problem: two sibling components need the SAME data.
 * Siblings can't talk to each other directly.
 *
 * Solution: move ("lift") the state up to their closest common PARENT.
 *   - Parent owns the state.
 *   - Parent passes the VALUE down as a prop.
 *   - Parent passes a FUNCTION down so the child can request changes.
 *
 *          ShoppingPage  (owns cart state)
 *           /         \
 *   ProductList      CartSummary
 *   (onAdd prop)     (items prop)
 */
import { useState } from 'react'
import Lesson, { Demo, Exercise } from '../components/Lesson.jsx'

const products = [
  { id: 'p1', name: 'Keyboard', price: 49 },
  { id: 'p2', name: 'Mouse', price: 25 },
  { id: 'p3', name: 'Monitor', price: 199 },
]

// Child 1: doesn't own any state, just calls the function it was given
function ProductList({ onAdd }) {
  return (
    <div className="stack">
      {products.map((p) => (
        <div key={p.id} className="row">
          <span style={{ minWidth: 100 }}>{p.name}</span>
          <span className="muted">${p.price}</span>
          <button onClick={() => onAdd(p)}>Add</button>
        </div>
      ))}
    </div>
  )
}

// Child 2: just displays what it's given
function CartSummary({ items, onRemove }) {
  const total = items.reduce((sum, item) => sum + item.price, 0)
  return (
    <div className="card">
      <strong>🛒 Cart ({items.length})</strong>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item.name} <button onClick={() => onRemove(i)}>✕</button>
          </li>
        ))}
      </ul>
      <strong>Total: ${total}</strong>
    </div>
  )
}

// Parent: the single source of truth for the cart
function ShoppingPage() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => setCart([...cart, product])
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index))

  return (
    <div className="grid">
      <ProductList onAdd={addToCart} />
      <CartSummary items={cart} onRemove={removeFromCart} />
    </div>
  )
}

// Another classic example: two inputs that stay in sync
function TemperatureConverter() {
  const [celsius, setCelsius] = useState(20)
  const fahrenheit = Math.round((celsius * 9) / 5 + 32) // derived, not stored

  return (
    <div className="row">
      <label>°C <input type="number" value={celsius} onChange={(e) => setCelsius(Number(e.target.value))} /></label>
      <label>°F <input type="number" value={fahrenheit} onChange={(e) => setCelsius(Math.round(((Number(e.target.value) - 32) * 5) / 9))} /></label>
    </div>
  )
}

export default function LiftingStateLesson() {
  return (
    <Lesson slug="lifting-state">
      <p>
        When two components need to share data, move the state to their <strong>closest common
        parent</strong> and pass it down via props.
      </p>

      <pre><code>{`function Parent() {
  const [cart, setCart] = useState([])
  return (
    <>
      <ProductList onAdd={(p) => setCart([...cart, p])} />
      <CartSummary items={cart} />
    </>
  )
}`}</code></pre>

      <Demo>
        <h4>Shared cart</h4>
        <ShoppingPage />
        <h4>Synced inputs</h4>
        <TemperatureConverter />
      </Demo>

      <Exercise>
        <ol>
          <li>Add quantities: adding the same product twice should show "Keyboard × 2".</li>
          <li>Add a third component <code>&lt;CartBadge /&gt;</code> that shows just the item count.</li>
          <li>What would you do if a component deep in the tree needed the cart? (→ next lesson!)</li>
        </ol>
      </Exercise>
    </Lesson>
  )
}
