$(document).ready(function () {

  /* ══════════════════════════════════════════
     STATE
  ══════════════════════════════════════════ */
  let cart      = [];   // { id, name, price, img, qty }
  let wishlist  = [];   // { id, name, price, img }
  let compareList = []; // { id, name, price, img, category, material, rating, warranty, color }

  /* ══════════════════════════════════════════
     NAV — active link
  ══════════════════════════════════════════ */
  $('.nav-links a, .mobile-menu a').on('click', function () {
    $('.nav-links a, .mobile-menu a').removeClass('active');
    $(this).addClass('active');
  });

  /* ════════════════ HAMBURGER ════════════════ */
  $('#hamburger').click(function () {
    $(this).toggleClass('open');
    $('#mobileMenu').slideToggle(200);
  });
// Mobile menu — trigger existing drawer buttons
 
  document.getElementById('mobileCompareBtn')?.addEventListener('click', () => {
    document.getElementById('compareNavBtn').click();
    document.getElementById('mobileMenu').style.display = 'none';
  });
  document.getElementById('mobileAccountBtn')?.addEventListener('click', () => {
    document.getElementById('accountBtn').click();
    document.getElementById('mobileMenu').style.display = 'none';
  });
  /* ══════════════════════════════════════════
     SEARCH OVERLAY
  ══════════════════════════════════════════ */
  $('#searchBtn').click(function () {
    $('#searchOverlay').fadeIn(200).css('display', 'flex');
    $('#searchInput').val('').focus();
  });

  $('#searchClose, #searchOverlay').click(function (e) {
    if (e.target.id === 'searchOverlay' || e.target.id === 'searchClose') {
      $('#searchOverlay').fadeOut(200);
    }
  });

  $('#searchClose').click(function () {
    $('#searchInput').val('');
    $('.product-card').show();
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $('#searchInput').val('');
      $('.product-card').show();
      $('#searchOverlay').fadeOut(200);
    }
  });

  $('#searchInput').on('keyup', function () {
    let value = $(this).val().toLowerCase().trim();
    if (value === '') { $('.product-card').show(); return; }
    $('.product-card').each(function () {
      let name = $(this).data('name').toLowerCase();
      $(this).toggle(name.includes(value));
    });
  });

  $('#searchInput').on('keypress', function (e) {
    if (e.which === 13) $('#searchOverlay').fadeOut(200);
     // ✅ scroll to product section
    document.getElementById("products").scrollIntoView({
      behavior: "smooth"
    });
  });

  /* ══════════════════════════════════════════
     STICKY SHADOW
  ══════════════════════════════════════════ */
  $(window).on('scroll', function () {
    $('header').css('box-shadow',
      $(this).scrollTop() > 10
        ? '0 4px 20px rgba(0,0,0,0.10)'
        : '0 2px 10px rgba(0,0,0,0.06)'
    );
  });

  /* ══════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════ */
  function fmt(p) {
    return 'Rp ' + Number(p).toLocaleString('id-ID');
  }

  function showToast(msg) {
    $('#toast').stop(true, true).text(msg).addClass('show');
    setTimeout(() => $('#toast').removeClass('show'), 2000);
  }

  function updateCartBadge() {
    const total = cart.reduce((s, x) => s + x.qty, 0);
    if (total > 0) {
      $('#cartBadge').text(total).css('display', 'flex');
      $('#cartBadge').css('transform', 'scale(1.4)');
      setTimeout(() => $('#cartBadge').css('transform', 'scale(1)'), 200);
    } else {
      $('#cartBadge').hide();
    }
  }

  function updateWishBadge() {
    const total = wishlist.length;
    if (total > 0) $('#wishBadge').text(total).css('display', 'flex');
    else $('#wishBadge').hide();
  }

  /* ══════════════════════════════════════════
     CART DRAWER
  ══════════════════════════════════════════ */
  function openCart() {
    $('#cartDrawer').addClass('open');
    $('#cartBackdrop').fadeIn(200);
    $('body').css('overflow', 'hidden');
  }

  function closeCart() {
    $('#cartDrawer').removeClass('open');
    $('#cartBackdrop').fadeOut(200);
    $('body').css('overflow', '');
  }

 function renderCart() {
    $('#cartItems .cart-item').remove();
    if (cart.length === 0) { $('#cartEmpty').show(); $('#cartTotal').text('Rp 0'); return; }
    $('#cartEmpty').hide();
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty;
      const leftBtn = item.qty === 1
        ? `<button class="drawer-stepper-btn drawer-trash" data-id="${item.id}" title="Remove">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13">
               <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
               <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
             </svg>
           </button>`
        : `<button class="drawer-stepper-btn drawer-minus" data-id="${item.id}" title="Decrease">−</button>`;
 
      const html = `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-thumb">
            <img src="${item.img}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-unit-price">${fmt(item.price)}</div>
            <div class="drawer-stepper">
              ${leftBtn}
              <span class="drawer-stepper-count">${item.qty}</span>
              <button class="drawer-stepper-btn drawer-plus" data-id="${item.id}" title="Increase">+</button>
            </div>
          </div>
          <div class="cart-item-line-price">${fmt(item.price * item.qty)}</div>
        </div>`;
      $('#cartItems').append(html);
    });
    $('#cartTotal').text(fmt(total));
  }
 
  /* ── Drawer stepper + ── */
  $(document).on('click', '.drawer-plus', function () {
    const id = $(this).data('id');
    const item = cart.find(x => x.id == id);
    if (item) { item.qty++; renderCart(); updateCartBadge(); }
  });
 
  /* ── Drawer stepper − ── */
  $(document).on('click', '.drawer-minus', function () {
    const id = $(this).data('id');
    const item = cart.find(x => x.id == id);
    if (item) {
      item.qty--;
      if (item.qty <= 0) cart = cart.filter(x => x.id != id);
      renderCart(); updateCartBadge();
    }
  });
 
  /* ── Drawer trash (qty was 1) ── */
  $(document).on('click', '.drawer-trash', function () {
    const id = $(this).data('id');
    cart = cart.filter(x => x.id != id);
    renderCart(); updateCartBadge();
    showToast('Removed from cart');
  });
 
  $('#cartToggleBtn').on('click', function () {
    if ($('#cartDrawer').hasClass('open')) closeCart(); else openCart();
  });
  $('#cartCloseBtn, #cartBackdrop').on('click', closeCart);
 

  /* ── ADD TO CART ── */
  $(document).on('click', '.btn-addcart', function (e) {
    e.stopPropagation();
    const card = $(this).closest('.product-card');
    const id   = card.data('id');
    let item = cart.find(x => x.id == id);
    if (item) item.qty++;
    else {
      cart.push({
        id,
        name:  card.data('name'),
        price: +card.data('price'),
        img:   card.find('img').attr('src'),
        qty:   1
      });
    }
    renderCart();
    updateCartBadge();
    showToast('Added to cart');
  });

  /* ── ADD TO CART from compare table ── */
  $(document).on('click', '.btn-compare-addcart', function () {
    const id   = $(this).data('id');
    const card = $(`.product-card[data-id="${id}"]`);
    let item = cart.find(x => x.id == id);
    if (item) item.qty++;
    else {
      cart.push({
        id,
        name:  card.data('name'),
        price: +card.data('price'),
        img:   card.find('img').attr('src'),
        qty:   1
      });
    }
    renderCart();
    updateCartBadge();
    showToast('Added to cart');
  });

  /* ══════════════════════════════════════════
     WISHLIST DRAWER
  ══════════════════════════════════════════ */
  function openWish() {
    $('#wishDrawer').addClass('open');
    $('#wishBackdrop').fadeIn(200);
    $('body').css('overflow', 'hidden');
  }

  function closeWish() {
    $('#wishDrawer').removeClass('open');
    $('#wishBackdrop').fadeOut(200);
    $('body').css('overflow', '');
  }

  function renderWish() {
    $('#wishItems .cart-item').remove();
    if (wishlist.length === 0) { $('#wishEmpty').show(); return; }
    $('#wishEmpty').hide();
    wishlist.forEach(item => {
      const html = `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-thumb">
            <img src="${item.img}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:4px;">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-qty-price">${fmt(item.price)}</div>
          </div>
          <button class="wish-item-remove" data-id="${item.id}" title="Remove">
            <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>`;
      $('#wishItems').append(html);
    });
  }

  $(document).on('click', '.wish-item-remove', function () {
    const id = $(this).data('id');
    wishlist = wishlist.filter(x => x.id != id);
    $(`.product-card[data-id="${id}"] .card-wish-btn`).removeClass('wished');
    renderWish();
    updateWishBadge();
  });

  $('#wishlistNavBtn').on('click', function () {
    if ($('#wishDrawer').hasClass('open')) closeWish(); else openWish();
  });
  $('#wishCloseBtn, #wishBackdrop').on('click', closeWish);

  $(document).on('click', '.card-wish-btn', function (e) {
    e.stopPropagation();
    const card = $(this).closest('.product-card');
    const id   = card.data('id');
    const exists = wishlist.find(x => x.id == id);
    if (exists) {
      wishlist = wishlist.filter(x => x.id != id);
      $(this).removeClass('wished');
    } else {
      wishlist.push({
        id,
        name:  card.data('name'),
        price: +card.data('price'),
        img:   card.find('img').attr('src')
      });
      $(this).addClass('wished');
    }
    renderWish();
    updateWishBadge();
  });

  /* ══════════════════════════════════════════
     SCROLL ANIMATION on cards
  ══════════════════════════════════════════ */
  function checkVisible() {
    $('.product-card').each(function (i) {
      if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 40) {
        setTimeout(() => $(this).css({ opacity: 1, transform: 'translateY(0)' }), i * 80);
      }
    });
  }
  $('.product-card').css({ opacity: 0, transform: 'translateY(24px)', transition: 'opacity 0.45s ease, transform 0.45s ease' });
  $(window).on('scroll', checkVisible);
  setTimeout(checkVisible, 100);

  /* ══════════════════════════════════════════
     SLIDER
  ══════════════════════════════════════════ */
  const totalSlides = $('.insp-slide').length;
  let current = 0;
  let autoTimer = null;

  for (let i = 0; i < totalSlides; i++) {
    $('#sliderDots').append(`<button class="dot${i === 0 ? ' active' : ''}" data-idx="${i}"></button>`);
  }

  function goTo(idx) {
    if (idx >= totalSlides) idx = 0;
    if (idx < 0) idx = totalSlides - 1;
    current = idx;
    const slideWidth = $('.insp-slide').outerWidth(true);
    $('#sliderTrack').css('transform', `translateX(-${current * slideWidth}px)`);
    $('.dot').removeClass('active').eq(current).addClass('active');
  }

  function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 4000); }
  function stopAuto()  { clearInterval(autoTimer); }

  $('#sliderNext').on('click', function () { stopAuto(); goTo(current + 1); startAuto(); });
  $(document).on('click', '.dot', function () { stopAuto(); goTo(+$(this).data('idx')); startAuto(); });

  let touchStartX = 0;
  $('#sliderWrap').on('touchstart', e => { touchStartX = e.originalEvent.touches[0].clientX; });
  $('#sliderWrap').on('touchend', e => {
    const diff = touchStartX - e.originalEvent.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { stopAuto(); goTo(diff > 0 ? current + 1 : current - 1); startAuto(); }
  });

  $('#sliderWrap').on('mouseenter', stopAuto).on('mouseleave', startAuto);
  $(window).on('resize', () => goTo(current));

  $('#btnExplore').on('click', function () {
    $(this).text('Exploring...').css('background', '#9a7426');
    setTimeout(() => $(this).text('Explore More').css('background', ''), 1800);
  });

  startAuto();

  /* ══════════════════════════════════════════
     GALLERY — hover-zone scroll, infinite loop
     (all scroll bugs fixed)
  ══════════════════════════════════════════ */
  const track    = document.getElementById('galleryTrack');
  const viewport = document.getElementById('galleryViewport');

  const SPEED = 3;
  let rafId     = null;
  let direction = 0;

  function singleSetWidth() {
    return track.scrollWidth / 2;
  }

  // Self-cancels when direction is 0 — no ghost frames
  function animate() {
    if (direction === 0) {
      rafId = null;  // cleared so startScroll can restart
      return;
    }
    let current = viewport.scrollLeft;  // plain DOM — frame-accurate
    const half  = singleSetWidth();
    current += direction * SPEED;
    if (current >= half) current -= half;
    if (current < 0)     current += half;
    viewport.scrollLeft = current;
    rafId = requestAnimationFrame(animate);
  }

  function startScroll(dir) {
    if (direction === dir) return;
    direction = dir;
    if (!rafId) rafId = requestAnimationFrame(animate);
  }

  function stopScroll() {
    direction = 0;
    // let animate() self-cancel — avoids race condition
  }

  document.getElementById('zoneRight').addEventListener('mouseenter', () => startScroll(1));
  document.getElementById('zoneRight').addEventListener('mouseleave', stopScroll);
  document.getElementById('zoneLeft').addEventListener('mouseenter',  () => startScroll(-1));
  document.getElementById('zoneLeft').addEventListener('mouseleave',  stopScroll);

  viewport.style.overflowX = 'hidden';

  /* ═══════════════ COMPARE PRODUCTS ══════════════════ */

  const btn = document.getElementById("compareNavBtn");
  const section = document.getElementById("compareSection");
  const MAX_COMPARE = 4;

  btn.addEventListener("click", () => {
    section.classList.toggle("hidden");
  });

  /* ── Badge ── */
  function updateCompareBadge() {
    const n = compareList.length;
    if (n > 0) $('#compareBadge').text(n).css('display', 'flex');
    else       $('#compareBadge').hide();
  }

  /* ── Tray ── */
  function renderTray() {
    $('#compareTraySlots').empty();

    compareList.forEach(item => {
      const slot = `
        <div class="compare-slot" data-id="${item.id}">
          <img src="${item.img}" alt="${item.name}">
          <span>${item.name}</span>
          <button class="compare-slot-remove" data-id="${item.id}" title="Remove">
            <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>`;
      $('#compareTraySlots').append(slot);
    });

    if (compareList.length > 0) {
      $('#compareTray').addClass('visible');
      $('#compareEmpty').hide();
    } else {
      $('#compareTray').removeClass('visible');
      $('#compareTableWrap').hide();
      $('#compareEmpty').show();
    }
  }

  /* ── Star renderer ── */
  function renderStars(rating) {
    const full  = Math.floor(rating);
    const half  = (rating % 1) >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    let html = '';
    for (let i = 0; i < full;  i++) html += '<span class="compare-stars">★</span>';
    if (half)                        html += '<span class="compare-stars">½</span>';
    for (let i = 0; i < empty; i++) html += '<span class="compare-stars-empty">★</span>';
    return html + ` <small style="color:var(--muted);font-size:12px;">(${rating})</small>`;
  }

  /* ── Find lowest price in compare list ── */
  function getBestPriceId() {
    if (compareList.length === 0) return null;
    return compareList.reduce((best, x) => x.price < best.price ? x : best).id;
  }

  function getBestRatingId() {
    if (compareList.length === 0) return null;
    return compareList.reduce((best, x) => +x.rating > +best.rating ? x : best).id;
  }

  /* ── Build comparison table ── */
  function renderCompareTable() {
    if (compareList.length < 2) {
      showToast('Select at least 2 products to compare');
      return;
    }

    const bestPriceId  = getBestPriceId();
    const bestRatingId = getBestRatingId();

    let thead = '<tr><th class="row-label"></th>';
    compareList.forEach(item => {
      thead += `
        <td class="compare-prod-header">
          <img src="${item.img}" alt="${item.name}" class="compare-prod-img">
          <div class="compare-prod-name">${item.name}</div>
          <div class="compare-prod-price">${fmt(item.price)}</div>
          <button class="compare-prod-remove" data-id="${item.id}">Remove</button>
        </td>`;
    });
    thead += '</tr>';

    /* Row definitions: label, key, formatter */
    const rows = [
      { label: 'Category',  key: 'category',  fmt: v => v },
      { label: 'Material',  key: 'material',  fmt: v => v },
      { label: 'Color',     key: 'color',     fmt: v => v },
      { label: 'Warranty',  key: 'warranty',  fmt: v => v },
      { label: 'Rating',    key: 'rating',    fmt: v => renderStars(+v) },
      { label: 'Price',     key: 'price',     fmt: (v, item) => {
          const isBest = item.id == bestPriceId;
          return `<span style="font-weight:600;color:${isBest ? 'var(--gold)' : 'var(--text)'}">${fmt(v)}</span>`;
        }
      },
    ];

    let tbody = '';
    rows.forEach(row => {
      tbody += `<tr><td class="row-label">${row.label}</td>`;
      compareList.forEach(item => {
        const isBestPrice  = row.key === 'price'  && item.id == bestPriceId;
        const isBestRating = row.key === 'rating' && item.id == bestRatingId;
        const highlight = isBestPrice || isBestRating ? ' compare-best' : '';
        const val = row.fmt(item[row.key], item);
        tbody += `<td class="${highlight}">${val}</td>`;
      });
      tbody += '</tr>';
    });

    /* Add to cart row */
    let cartRow = '<tr><td class="row-label">Add to Cart</td>';
    compareList.forEach(item => {
      cartRow += `<td><button class="btn-compare-addcart" data-id="${item.id}">Add to Cart</button></td>`;
    });
    cartRow += '</tr>';

    const tableHTML = `<table class="compare-table"><thead>${thead}</thead><tbody>${tbody}${cartRow}</tbody></table>`;
    $('#compareTable').html(tableHTML);
    $('#compareTableWrap').slideDown(300);

    /* Scroll to compare section */
    $('html, body').animate({ scrollTop: $('#compare').offset().top - 90 }, 500);
  }

  /* ── Add to compare ── */
  $(document).on('click', '.btn-compare', function (e) {
    e.stopPropagation();
    const card = $(this).closest('.product-card');
    const id   = card.data('id');

    if (compareList.find(x => x.id == id)) {
      showToast(`${card.data('name')} is already in compare`);
      return;
    }
    if (compareList.length >= MAX_COMPARE) {
      showToast(`Max ${MAX_COMPARE} products can be compared`);
      return;
    }

    compareList.push({
      id,
      name:     card.data('name'),
      price:    +card.data('price'),
      img:      card.find('img').attr('src'),
      category: card.data('category') || '—',
      material: card.data('material') || '—',
      rating:   card.data('rating')   || '0',
      warranty: card.data('warranty') || '—',
      color:    card.data('color')    || '—'
    });

    card.addClass('compare-selected');
    renderTray();
    updateCompareBadge();
    showToast(`${card.data('name')} added to compare`);
  });

  /* ── Remove from tray ── */
  $(document).on('click', '.compare-slot-remove', function () {
    const id = $(this).data('id');
    removeFromCompare(id);
  });

  /* ── Remove column from table ── */
  $(document).on('click', '.compare-prod-remove', function () {
    const id = $(this).data('id');
    removeFromCompare(id);
    if (compareList.length >= 2) renderCompareTable();
    else $('#compareTableWrap').hide();
  });

  function removeFromCompare(id) {
    compareList = compareList.filter(x => x.id != id);
    $(`.product-card[data-id="${id}"]`).removeClass('compare-selected');
    renderTray();
    updateCompareBadge();
  }

  /* ── Compare Now button ── */
  $('#btnCompareNow').on('click', renderCompareTable);

  /* ── Clear All ── */
  $('#btnClearCompare').on('click', function () {
    compareList.forEach(item => {
      $(`.product-card[data-id="${item.id}"]`).removeClass('compare-selected');
    });
    compareList = [];
    renderTray();
    updateCompareBadge();
    $('#compareTableWrap').hide();
    $('#compareEmpty').show();
  });

  /* ── Compare nav icon → scroll to section ── */
  $('#compareNavBtn').on('click', function () {
    $('html, body').animate({ scrollTop: $('#compare').offset().top - 90 }, 500);
  });

  /* Init compare empty state */
  $('#compareEmpty').show();

});
