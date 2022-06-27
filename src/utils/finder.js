document.addEventListener('click', async ({target}) => {
  if (target.tagName !== 'IMG') return;
  if (!target.src) return;

  // const {finder} = await import('https://jsdelivr.stevie.top/npm/@medv/finder');
  // if (!finder(target).includes('.rich-text')) return;

  window.open(target.src);
});
