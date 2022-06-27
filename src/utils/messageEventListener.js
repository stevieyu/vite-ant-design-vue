export default (type) => {
  const el = window;
  let cbTmp;

  const cbFn = (event) => {
    if (typeof cbTmp !== 'function') return;
    const {data} = event;
    if (typeof data !== 'object' || data.type !== type) return;
    cbTmp(data.data);
  };

  return {
    in: window.self !== window.top,
    on(listener) {
      cbTmp = listener;
      el.addEventListener('message', cbFn);
    },
    off() {
      el.removeEventListener('message', cbFn);
    },
    emit(data, emitEl = null) {
      const message = {
        type,
        data,
      };
      if (!emitEl) {
        el.parent.postMessage(message, '*');
      } else {
        console.log('postMessage', data);
        emitEl.contentWindow.postMessage(message, '*');
      }
    },
  };
};
