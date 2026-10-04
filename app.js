/* 
  FarmLink Demo Frontend
  - Uses localStorage for cart & order persistence
  - Pseudo data for products & farmers
  - Delivery status is mocked
*/

const products = [
  { id: "p1", title: "Tomatoes (250gm)", price: 40, farmer: "Ravi Kumar", category: "vegetable", image:"images/tomatoes.jpg" },
  { id: "p2", title: "Fresh Mangoes (1kg)", price: 120, farmer: "Meera Devi", category: "fruit", image:"images/mangoes.jpg" },
  { id: "p3", title: "Cow Milk (1L)", price: 60, farmer: "Suresh", category: "other", image:"images/milk.jpg" },
  { id: "p4", title: "Brown Rice (5kg)", price: 450, farmer: "Anita Sharma", category: "other", image:"images/brownrice.jpg" },
  { id: "p5", title: "Honey (250ml)", price: 500, farmer: "Vineet", category: "other", image:"images/honey.jpg"},
  { id: "p6", title: "Bananas (12pcs)", price: 60, farmer: "Ajay Sharma", category: "fruit", image:"images/bananas.jpg"},
  { id: "p7", title: "Grapes (250gm)", price: 100, farmer: "Santosh Ram", category: "fruit", image:"images/grapes.jpg"},
  { id: "p8", title: "Apples (5pcs)", price:100, farmer : "Satvik", category: "fruit", image:"images/apples.jpg" },
  { id: "p19", title: "Watermelon (1pc)", price: 80, farmer : "Amal", category: "fruit", image:"images/watermelon.jpg" },
  { id: "p9", title: "Fresh Carrots (250gm)", price: 30, farmer: "Ashok", category: "vegetable", image:"images/carrots.jpg"},
  { id: "p10", title: "beetroot (250gm)", price: 40, farmer: "Ravi Kumar", category: "vegetable", image:"images/beetroot.jpg"},
  { id: "p11", title: "Fresh potatoes (250gm)", price: 35, farmer: "Kiran", category: "vegetable", image: "images/potatoes.jpg"},
  { id: "p12", title: "Capsicum (250gm)", price: 40, farmer: "Teja", category: "vegetable", image:"images/capsicum.jpg"},
  { id: "p13", title: "Spinach (1 bunch)", price: 35, farmer: "Amal", category: "vegetable", image: "images/spinach.jpg"},
  { id: "p14", title: "Cauliflower (1 pc)", price: 40, farmer: "Satvik", category:"vegetable", image: "images/cauliflower.jpg"},
  { id: "p15", title: "Cucumber (250gm)", price: 30, farmer: "Santosh Ram", category: "vegetable", image: "images/cucumber.jpg"},
  { id: "p16", title: "Oranges (250gm)", price: 50, farmer: "Karan", category:"fruit", image:"images/oranges.jpg"},
  { id: "p17", title: "Pineapple (1pc)", price: 50, farmer: "Karan", category: "fruit", image: "images/pineapples.jpg"},
  { id: "p18", title: "Strawberries (250gm)", price: 80, farmer: "Teja", category: "fruit", image: "images/strawberries.jpg"},

];

const farmers = [
  { id: "f1", name: "Ravi Kumar", location: "Kolar", status: "(Verified)", description: "3rd generation farmer specializing organic vegetables. Certified organic farm with sustainable farming practices.", rating:"4.8" },
  { id: "f2", name: "Meera Devi", location: "Belagavi", status: "", description:"Sustainable farming advocate growing traditional crops and millets using natural methods.", rating:"4.7" },
  { id: "f3", name: "Suresh", location: "Mandya", status: "(Verified)", description:"Multi-crop farmer with expertise in seasonal fruits and vegetables. Known for premium quality produce.", rating:"4.5" },
  { id: "f4", name: "Anita Sharma", location: "Mysuru", status: "(Verified)", description:"Family-owned dairy farm operated by a 4th generation farmer. Emphasizes animal welfare and uses renewable energy sources.", rating:"4.2"  },
  { id: "f5", name: "Vineet", location: "warangal", status:"(Verified)", description:"Experienced grain farmer specializing in non-GMO wheat. Implements crop rotation and soil health management techniques.", rating:"3.5" },
  { id: "f6", name: "Ajay Sharma", location: "chennai", status:"(Verified)", description:"1st generation farmer growing specialty herbs and medicinal plants. Practices water conservation and natural pest control methods.",rating:"3.9" },
  { id: "f7", name: "Santosh Ram", location: "tirupati", status:"(Verified)", description:"5th generation farmer raising grass-fed cattle. Maintains rotational grazing and regenerative soil practices for sustainability.", rating:"4.1" },
  { id: "f8", name: "Satvik", location: "hyderabad", status:"(Verified)", description:"Organic berry farmer with over 20 years of experience. Certified organic with emphasis on minimal chemical inputs and biodiversity.", rating:"5.0" },
  { id: "f9", name: "Amal", location: "punjab", status:"(Verified)", description:"Technology-driven farmer cultivating high-value vegetables hydroponically. Focused on resource efficiency and reducing environmental footprint.",rating:"4.2" },
  { id: "f10", name: "Ashok", location: "delhi", status:"(Verified)", description:"Small-scale poultry farmer specializing in free-range eggs. Adheres to ethical husbandry and eco-friendly waste recycling programs.", rating:"3.6" },
  { id: "f11", name: "Ravi Kumar", location: "hyderabad", status:"", description:"3rd generation rice farmer embracing traditional and modern techniques. Focuses on water-efficient irrigation and soil fertility preservation.",rating:"3.8" },
  { id: "f12", name: "Kiran", location: "mysuru", status:"", description:"Long-standing vineyard owner specializing in organic wines. Uses cover crops and natural pest management to enhance terroir.", rating:"3.0" },
  { id: "f13", name: "Teja", location: "kolar", status:"(Verified)", description:"2nd generation orchard farmer cultivating exotic fruits. Practices integrated pest management and organic fertilization methods.", rating:"4.0" },
  { id: "f14", name: "Karan", location: "chennai", status:"", description:"Family-operated vegetable farm with a focus on community-supported agriculture. Certified organic with strong emphasis on local food systems and sustainability.",rating:"4.5" },
];
// Temporary selected quantities (not yet in cart)
const selectedQty = {};  // key = product id, value = qty

// Helpers
function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function getOrders() {
  return JSON.parse(localStorage.getItem("orders") || "[]");
}
function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}

// Update cart count everywhere
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll("#cart-count").forEach(el => el.textContent = count);
}

// Render products on Home page
function renderProducts() {
  const vegGrid = document.getElementById("veg-grid");
  const fruitGrid = document.getElementById("fruit-grid");
  const otherGrid = document.getElementById("other-grid");

  if (!vegGrid || !fruitGrid || !otherGrid) return;

  vegGrid.innerHTML = "";
  fruitGrid.innerHTML = "";
  otherGrid.innerHTML = "";

  products.forEach(p => {
    // default qty = 1
    if (!selectedQty[p.id]) selectedQty[p.id] = 1;

    const el = document.createElement("div");
    el.className = "card product-card";

    el.innerHTML = `
      <img src="${p.image}" alt="${p.title}" class="product-img">
      <h3>${p.title}</h3>
      <div class="price">₹${p.price}</div>
      <div class="small">by ${p.farmer}</div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="adjustSelectedQty('${p.id}', -1)">−</button>
        <span class="qty" id="qty-${p.id}">${selectedQty[p.id]}</span>
        <button class="qty-btn" onclick="adjustSelectedQty('${p.id}', 1)">+</button>
      </div>
      <button class="btn primary" onclick="addSelectedToCart('${p.id}')">Add to Cart</button>
    `;

    if (p.category === "vegetable") vegGrid.appendChild(el);
    else if (p.category === "fruit") fruitGrid.appendChild(el);
    else otherGrid.appendChild(el);
  });
}




// Render farmers
function renderFarmers() {
  const grid = document.getElementById("farmer-grid");
  if (!grid) return;
  grid.innerHTML = "";
  farmers.forEach(f => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `<h3>${f.name} <small id="small-font1">${f.status}  ⭐${f.rating}</small></h3><div>📍 ${f.location}</div><br><div>${f.description}</div>`;
    grid.appendChild(el);
  });
}

// Add to cart
function addToCart(id) {
  let qtyField = document.getElementById(`qty-${id}`);
  let qty = qtyField ? parseInt(qtyField.value) || 1 : 1;

  let cart = getCart();
  let item = cart.find(i => i.id === id);
  if (item) item.qty += qty;
  else cart.push({ id, qty });
  saveCart(cart);
  updateCartCount();
//   alert(`${qty} item(s) added to cart`);
}


// Render cart
function renderCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!list || !totalEl) return;

  let cart = getCart();
  list.innerHTML = "";
  if (cart.length === 0) {
    list.innerHTML = "<div>Your cart is empty.</div>";
    totalEl.textContent = "0.00";
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const p = products.find(pr => pr.id === item.id);
    const lineTotal = p.price * item.qty;
    total += lineTotal;

    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <div class="cart-info">
        <span class="title">${p.title}</span>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeCartQty('${item.id}', -1)">−</button>
          <span class="qty" id="cart-qty-${item.id}">${item.qty}</span>
          <button class="qty-btn" onclick="changeCartQty('${item.id}', 1)">+</button>
        </div>
        <span class="line-total">₹${lineTotal}</span>
      </div>
    `;
    list.appendChild(el);
  });
  totalEl.textContent = total.toFixed(2);
}
// changing cart quantity
function changeCartQty(id, delta) {
  let cart = getCart();
  let item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    // Remove item from cart if qty drops to 0
    cart = cart.filter(i => i.id !== id);
  }

  saveCart(cart);
  updateCartCount();

  // Update qty display in cart
  const qtySpan = document.getElementById(`cart-qty-${id}`);
  if (qtySpan) {
    qtySpan.textContent = item.qty > 0 ? item.qty : 0;
  }

  // Refresh cart totals and items
  renderCart();
}

// adjusting selected quantity
function adjustSelectedQty(id, delta) {
  selectedQty[id] = (selectedQty[id] || 0) + delta;  // start from 0, not 1
  if (selectedQty[id] < 1) selectedQty[id] = 1;
  const span = document.getElementById(`qty-${id}`);
  if (span) span.textContent = selectedQty[id];
}

//adding selected quantity to cart
function addSelectedToCart(id) {
  const qty = selectedQty[id] || 1;
  let cart = getCart();
  let item = cart.find(i => i.id === id);
  if (item) item.qty += qty;
  else cart.push({ id, qty });
  saveCart(cart);
  updateCartCount();
  //alert(`${qty} item(s) added to cart`);
}

// remove from cart
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  updateCartCount();
  renderCart();
}

// change quantity
function changeQty(id, delta) {
  let cart = getCart();
  let item = cart.find(i => i.id === id);

  if (!item && delta > 0) {
    cart.push({ id, qty: delta });
  } else if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  }

  saveCart(cart);
  updateCartCount();
  
  // Update qty display in product grid if present
  let qtySpan = document.getElementById(`qty-${id}`);
  if (qtySpan) {
    let updatedItem = cart.find(i => i.id === id);
    qtySpan.textContent = updatedItem ? updatedItem.qty : 0;
  }

  // Refresh cart page if we’re on it
  if (document.getElementById("cart-items")) {
    renderCart();
  }
}
 renderCart();


// Checkout (mock → saves order + clears cart)
// Checkout (mock → saves order + clears cart)
function setupCheckout() {
  const btn = document.getElementById("checkout-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const cart = getCart();
    if (cart.length === 0) { 
      alert("Cart is empty"); 
      return; 
    }

    let orders = getOrders();
    orders.push({
      id: typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : "ORD-" + Date.now(),
      items: cart,
      status: "Pending"
    });
    saveOrders(orders);
    saveCart([]);
    updateCartCount();

    // Instead of delivery.html → go to payment.html
    window.location.href = "payment.html";
  });
}


// Render delivery status
function renderOrders() {
  const list = document.getElementById("order-list");
  if (!list) return;
  let orders = getOrders();

  if (orders.length === 0) {
    list.innerHTML = "<div>No orders yet.</div>";
    return;
  }

  list.innerHTML = "";
  orders.forEach(order => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <h3>Order ${order.id}</h3>
      <p>Status: <strong>${order.status}</strong></p>
      <p>Items: ${order.items.map(i => {
        const p = products.find(pr => pr.id === i.id);
        return `${p.title} × ${i.qty}`;
      }).join(", ")}</p>
      ${order.status === "Pending" || order.status === "Paid" ? 
    `<div id="cancellation-statement">ⓘ (Cancellation only allowed upto 4hr after payment)</div><div class="right-align"><button class="btn secondary small" onclick="cancelOrder('${order.id}')">Cancel Order</button></div>` 
    : ""}

    `;
    list.appendChild(el);
  });
}

//cancellation of orders
function cancelOrder(orderId) {
  let orders = getOrders();
  let order = orders.find(o => o.id === orderId);

  if (!order) return;

  // Allow cancellation for Pending or Paid orders
  if (order.status !== "Pending" && order.status !== "Paid") {
    alert("This order cannot be cancelled (already processed).");
    return;
  }

  order.status = "Cancelled";
  saveOrders(orders);
  renderOrders();
  alert(`Order ${orderId} has been cancelled. You will be refunded the full amount within 24 hours.`);
}

// to clear up the delivery history:
function clearDeliveredOrders() {
  let orders = getOrders();
  const before = orders.length;
  // Keep only non-delivered orders
  orders = orders.filter(o => o.status !== "Delivered" && o.status !== "Cancelled");
  saveOrders(orders);
  renderOrders();
  alert(`Removed ${before - orders.length} delivered/cancelled order(s) from history.`);
}



// cart total calc:
// function loadCartTotal() {
//   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//   let total = 0;

//   cart.forEach(item => {
//     if (item.price) {
//       // Case A: price is already in cart
//       total += item.price * item.qty;
//     } else {
//       // Case B: fallback to products lookup
//       const products = JSON.parse(localStorage.getItem("products") || "[]");
//       const product = products.find(p => p.id === item.id);
//       if (product) total += product.price * item.qty;
//     }
//   });
//
//   document.getElementById("cart-total").textContent = "₹" + total;
//   return total;
// }




// //to return no orders when its cancelled
// orders = orders.filter(o => o.id !== orderId);
// saveOrders(orders);



// Run relevant renderers per page
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProducts();
  renderFarmers();
  renderCart();
  setupCheckout();
  renderOrders();
});