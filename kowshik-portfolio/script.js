/* ============================================================
   KOWSHIKA V — PORTFOLIO JAVASCRIPT
   ============================================================ */
 
/* ---- Loader ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    // Trigger hero animations
    document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 200 + i * 150);
    });
  }, 1800);
});
 
/* ---- Custom Cursor ---- */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
 
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
 
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});
 
// Smooth ring follow
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();
 
// Hover effect on interactive elements
document.querySelectorAll('a, button, .skill-card, .project-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});
 
/* ---- Scroll Progress ---- */
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (scrollTop / docHeight * 100) + '%';
}, { passive: true });
 
/* ---- Navbar ---- */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
 
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.pageYOffset > 60);
}, { passive: true });
 
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});
 
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});
 
/* ---- Typing Animation ---- */
const roles = ['Frontend Developer', 'Web Designer', 'IT Student'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedText = document.getElementById('typedText');
 
function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
 
  let delay = isDeleting ? 60 : 110;
 
  if (!isDeleting && charIndex === current.length) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
setTimeout(type, 2200);
 
/* ---- Particle Canvas ---- */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
 
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas, { passive: true });
 
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.speedX; this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.fill();
  }
}
 
function initParticles() {
  particles = [];
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 120);
  for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();
window.addEventListener('resize', initParticles, { passive: true });
 
function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}
 
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();
 
/* ---- Scroll Reveal (Intersection Observer) ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars when skills section visible
      if (entry.target.classList.contains('skill-card')) {
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) fill.style.width = fill.dataset.width + '%';
      }
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
 
document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  // Stagger children in grids
  const parent = el.parentElement;
  const siblings = [...parent.children].filter(c => c.classList.contains(el.classList[0]));
  const idx = siblings.indexOf(el);
  el.style.transitionDelay = idx * 0.08 + 's';
  revealObserver.observe(el);
});
 
/* ---- Back to Top ---- */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.pageYOffset > 600);
}, { passive: true });
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
 
/* ---- Active Nav Highlight ---- */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
 
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.pageYOffset >= section.offsetTop - 100) current = section.id;
  });
  navItems.forEach(item => {
    item.style.color = '';
    if (item.getAttribute('href') === '#' + current) {
      item.style.color = 'var(--white)';
    }
  });
}, { passive: true });
 
/* ---- Contact Form ---- */
const form = document.getElementById('contactForm');
 
function validateForm() {
  let valid = true;
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg = document.getElementById('fmsg').value.trim();
  const nameErr = document.getElementById('nameErr');
  const emailErr = document.getElementById('emailErr');
  const msgErr = document.getElementById('msgErr');
 
  nameErr.textContent = '';
  emailErr.textContent = '';
  msgErr.textContent = '';
 
  if (!name || name.length < 2) {
    nameErr.textContent = 'Please enter your name (min. 2 chars)';
    valid = false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    emailErr.textContent = 'Please enter a valid email address';
    valid = false;
  }
  if (!msg || msg.length < 10) {
    msgErr.textContent = 'Message must be at least 10 characters';
    valid = false;
  }
  return valid;
}
 
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.querySelector('.btn-text').style.display = 'none';
  submitBtn.querySelector('.btn-loader').style.display = 'inline';
  submitBtn.disabled = true;
 
  setTimeout(() => {
    submitBtn.querySelector('.btn-text').style.display = 'inline';
    submitBtn.querySelector('.btn-loader').style.display = 'none';
    submitBtn.disabled = false;
    form.reset();
    showPopup();
  }, 1400);
});
 
function showPopup() {
  document.getElementById('successPopup').classList.add('active');
  document.getElementById('popupOverlay').classList.add('active');
}
function closePopup() {
  document.getElementById('successPopup').classList.remove('active');
  document.getElementById('popupOverlay').classList.remove('active');
}
window.closePopup = closePopup;
 
/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});