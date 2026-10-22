// Minimal interactions — no dependencies, no animation library.
const nav = document.getElementById('primary-nav');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main > section')];
const progress = document.querySelector('.reading-progress');
const toast = document.getElementById('copy-toast');
const discord = document.querySelector('[data-copy]');
let toastTimeout;

function closeMenu() {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}

menuButton.addEventListener('click', () => {
  const open = !nav.classList.contains('is-open');
  nav.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', (event) => {
  if (nav.classList.contains('is-open') && !nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});

function onScroll() {
  const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  progress.style.width = `${Math.min(100, Math.max(0, window.scrollY / total * 100))}%`;
  const marker = window.scrollY + Math.min(window.innerHeight * .45, 390);
  let active = sections[0];
  for (const section of sections) {
    if (section.offsetTop <= marker) active = section;
  }
  const activeNav = active.dataset.section;
  navLinks.forEach(link => {
    const selected = link.dataset.nav === activeNav;
    link.classList.toggle('is-active', selected);
    if (selected) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });
onScroll();

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

async function copyUsername() {
  const username = discord.dataset.copy;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(username);
    } else {
      const input = document.createElement('textarea');
      input.value = username;
      input.setAttribute('readonly', '');
      input.style.cssText = 'position:fixed;left:-9999px;opacity:0';
      document.body.appendChild(input);
      input.select();
      const copied = document.execCommand('copy');
      input.remove();
      if (!copied) throw new Error('Clipboard blocked');
    }
    toast.textContent = `Copied ${username} to clipboard`;
  } catch (error) {
    toast.textContent = `Discord: ${username} — select and copy`;
    // Make the username available for manual selection if the browser blocks clipboard access.
    window.prompt('Copy Discord username:', username);
  }
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2700);
}
discord.addEventListener('click', copyUsername);
