// NAV
const nav = document.getElementById('nav');
if(nav) {
    window.addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 30));
}

// BURGER
const burger = document.getElementById('burger');
const menu = document.getElementById('mobileMenu');
if(burger && menu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        menu.classList.toggle('open');
    });
}
function closeMenu(){
    if(burger && menu) {
        burger.classList.remove('open');
        menu.classList.remove('open');
    }
}

// REVEAL
const revealEls = document.querySelectorAll('.reveal');
if(revealEls.length) {
    const revObs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if(e.isIntersecting){
                setTimeout(() => e.target.classList.add('in'), i * 70);
                revObs.unobserve(e.target);
            }
        });
    }, {threshold: 0.1});
    revealEls.forEach(el => revObs.observe(el));
}

// COUNTER (for home page)
function countUp(el, target, prefix='', suffix='') {
    let start = 0;
    const dur = 1800;
    const step = 16;
    const inc = target / (dur / step);
    const timer = setInterval(() => {
        start += inc;
        if (start >= target) { start = target; clearInterval(timer); }
        el.textContent = prefix + Math.round(start) + suffix;
    }, step);
}

const numEls = document.querySelectorAll('[data-count]');
if(numEls.length) {
    const numObs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if(e.isIntersecting){
                const el = e.target;
                const count = parseInt(el.dataset.count);
                const prefix = el.dataset.prefix || '';
                const suffix = el.dataset.suffix || '';
                countUp(el, count, prefix, suffix);
                numObs.unobserve(el);
            }
        });
    }, {threshold: 0.5});
    numEls.forEach(el => numObs.observe(el));
}

// MARQUEE pause on hover (home page)
const track = document.getElementById('mtrack');
if(track && track.parentElement) {
    track.parentElement.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.parentElement.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}

// DOM ready
window.addEventListener('DOMContentLoaded', () => {
    const navEl = document.getElementById('nav');
    if(navEl){
        const links = navEl.querySelectorAll('.nav-links a');
        links.forEach((a,i) => a.style.transitionDelay = `${120 + i*60}ms`);
        setTimeout(() => navEl.classList.add('loaded'), 120);
    }

    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((b,i) => setTimeout(() => b.classList.add('pop-anim'), 420 + i * 180));
});