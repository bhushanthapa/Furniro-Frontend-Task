# Furniro 🛋️

A modern furniture e-commerce landing page built with HTML, CSS, and jQuery.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=flat&logo=jquery&logoColor=white)

---

## 🖥️ Live Preview

🔗 **[View Live Site](https://bhushanthapa.github.io/Furniro-Frontend-Task/index.html)**

<img width="1893" height="868" alt="hero-sec-img" src="https://github.com/user-attachments/assets/3ddcc50e-a208-4ffb-8d6b-0fb0ffe749e3" />
<img width="1054" height="863" alt="compare-img" src="https://github.com/user-attachments/assets/d048ca12-97a9-4494-85de-45c69a264aad" />
<img width="365" height="661" alt="responsive-phone-img" src="https://github.com/user-attachments/assets/f061f35f-5c50-4696-83cb-66bda782ab19" />


> Open `index.html` in your browser — no build step or server required.

---

## ✨ Features

### 🛍️ Shopping
- **Add to Cart** — add products from the hover overlay on any product card
- **Cart Drawer** — slide-in cart with item list, subtotal, and checkout button
- **Quantity Stepper** — pill-shaped `−  qty  +` control inside the cart drawer; left button becomes a trash icon when qty = 1 to remove the item
- **Wishlist** — heart button on every card; saved to a separate slide-in drawer with its own badge counter

### 🔍 Search
- Live search overlay filters product cards by name as you type
- Press `Enter` or `Escape` to close

### 🔄 Compare Products
- Click **Compare** on any product card overlay (up to 4 products)
- A floating tray shows selected products with remove pills
- **Compare Now** builds a full side-by-side table: Category, Material, Color, Warranty, Rating, and Price
- Best price and highest rating columns are automatically highlighted in gold
- Add to Cart directly from the comparison table

### 🖼️ Gallery
- Infinite-loop horizontal scroll triggered by hovering the left/right edge zones
- Smooth `requestAnimationFrame` animation — no CSS transitions or jQuery scroll
- Image cards scale up on hover with a depth shadow

### 🛋️ Room Inspiration Slider
- Auto-advancing slider with dot navigation and next arrow
- Touch/swipe support for mobile
- Pauses on hover

### 📱 Responsive
- 4-column product grid → 3 → 2 → 1 as screen narrows
- Hamburger mobile menu
- Sticky header with scroll shadow

---

## 📁 Project Structure

```
Furniro-Frontend-Task/
├── index.html        # Main page structure
├── style.css         # All styles
├── script.js         # All interactivity (jQuery)
└── images/
    └── browse/
        ├──  browse-img-1.png
        ├──  browse-img-2.png
        ├──  browse-img-3.png
    └── gallery/
        ├──gallery-img-1.png ... gallery-img-9.png
    └── hero/
        ├── hero-img-back.png
    └── logo-icon/
        ├── favicon-32x32.png
        ├── furniro-logo.png
    └── product/
        ├── product-1.png ... product-3.png
        ├── product-4.jpg (JPG)
        ├── product-5.png  product-6.png (PNG)
        ├── product-7.jpg  product-8.jpg (JPG)
    └── slider/
        ├── slider-img-1.png ... slider-img-4.png
        
```

---

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/bhushanthapa/Furniro-Frontend-Task.git
   ```

2. Open the project folder
   ```bash
   cd Furniro-Frontend-Task
   ```

3. Open `index.html` in your browser
   ```bash
   # On Mac
   open index.html

   # On Windows
   start index.html
   ```

> No npm, no build tools, no dependencies to install. jQuery is loaded via CDN.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and semantics |
| CSS3 | Styling, animations, responsive layout |
| JavaScript (ES6+) | Logic and state management |
| jQuery 3.7.1 | DOM manipulation, events, animations |
| Google Fonts (Poppins) | Typography |

---

## 📸 Sections

| Section | Description |
|---------|-------------|
| **Hero** | Full-viewport banner with animated content card |
| **Browse the Range** | 3 category cards with hover overlay |
| **Our Products** | 8-product grid with cart, wishlist, and compare actions |
| **Compare Products** | Side-by-side product comparison table |
| **Room Inspiration** | Auto-sliding room showcase with dots |
| **Gallery** | Hover-to-scroll infinite image strip |
| **Footer** | Links, help, and newsletter subscription |

---

## 🎨 Design Tokens

```css
--gold:     #B88E2F   /* Primary accent */
--text:     #333333   /* Body text */
--muted:    #999999   /* Secondary text */
--border:   #E8E8E8   /* Dividers */
--bg:       #FFFFFF   /* Background */
--hover-bg: #F9F1E7   /* Hover surfaces */
```

---

<p align="center">Made with ☕ by <a href="https://github.com/bhushanthapa">Bhushan Thapa</a></p>
