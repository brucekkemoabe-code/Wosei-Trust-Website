// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  navbar.classList.toggle('menu-open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navbar.classList.remove('menu-open');
  });
});

// ===== DONATE MODAL =====
const modal = document.getElementById('donate-modal');
const openModal = () => {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  modal.classList.remove('open');
  document.body.style.overflow = '';
};

const openBtns = ['open-donate-nav','open-donate-hero','open-donate-impact','open-donate-inv','open-donate-footer','open-donate-footer2','open-donate-mob'];
openBtns.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', openModal);
});
document.getElementById('modal-close-btn').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

// Amount selection
let selectedAmount = 250;
const amountBtns = document.querySelectorAll('.amount-btn');
const donateLabel = document.getElementById('donate-amount-label');
const customWrap = document.getElementById('custom-amount-wrap');
const customInput = document.getElementById('custom-amount-input');

amountBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    amountBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    if (btn.dataset.amount === 'custom') {
      customWrap.classList.remove('hidden');
      donateLabel.textContent = 'Custom';
    } else {
      customWrap.classList.add('hidden');
      selectedAmount = parseInt(btn.dataset.amount);
      donateLabel.textContent = 'P' + btn.textContent;
    }
  });
});

customInput.addEventListener('input', () => {
  const val = customInput.value;
  donateLabel.textContent = val ? 'P' + val : 'Custom';
});

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Donate submit
document.getElementById('donate-submit').addEventListener('click', () => {
  const name = document.getElementById('donor-name').value.trim();
  const email = document.getElementById('donor-email').value.trim();
  if (!name || !email) {
    alert('Please fill in your name and email to proceed.');
    return;
  }
  alert(`Thank you, ${name}! Your generous support means the world to us. We will contact you at ${email} to complete your donation.`);
  closeModal();
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-num');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target; clearInterval(timer); }
        else { el.textContent = Math.floor(current); }
      }, 25);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

// ===== CONTACT FORM =====
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('form-success').classList.remove('hidden');
  e.target.reset();
  setTimeout(() => document.getElementById('form-success').classList.add('hidden'), 5000);
});

// ===== NEWSLETTER FORM =====
document.getElementById('newsletter-form').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('nl-success').classList.remove('hidden');
  e.target.reset();
  setTimeout(() => document.getElementById('nl-success').classList.add('hidden'), 5000);
});

// ===== POLICY TABS =====
const polTabBtns = document.querySelectorAll('.pol-tab-btn');
const polTabContents = document.querySelectorAll('.policies-tab-content');

polTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    polTabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const targetTabId = 'policy-' + btn.dataset.policyTab;
    polTabContents.forEach(content => {
      if (content.id === targetTabId) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
