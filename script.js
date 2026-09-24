const cursor = document.querySelector('.cursor');
if (window.matchMedia('(pointer:fine)').matches && cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
  });
});
