// @ts-check
import { log } from './log';

const toAbsoluteUrl = (function() {
  let anchor;

  return function(url) {
    if (!anchor) {
      anchor = document.createElement('a');
    }

    anchor.href = url;

    return new URL(anchor.href);
  };
})();

function lastElement(array) {
  return array[array.length - 1];
}

const fileExtensionRegex = /\.[\w-]+$/;

function getFileName(el, url) {
  const download = el.getAttribute('download');

  if (download) {
    return download;
  }

  const text = el.textContent.trim().replace(/\:/g, '');

  if (text && fileExtensionRegex.test(text)) {
    return text;
  }

  const last = lastElement(url.pathname.split('/'));

  if (last && fileExtensionRegex.test(last)) {
    return decodeURI(last);
  }

  return decodeURI(last) || text;
}

function onDragStart(e) {
  log('dragstart', e.target);

  if (e.target.nodeName === 'A' && e.target.getAttribute('href') !== null) {
    const url = toAbsoluteUrl(e.target.getAttribute('href'));

    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      log('dragged link protocol not http or https');
      return;
    }

    const file = getFileName(e.target, url);
    const downloadUrl = `:${file}:${url.href}`;

    log('Setting data transfer object', e.target, downloadUrl);

    e.dataTransfer.setData('DownloadURL', downloadUrl);
  } else {
    log('dragged element not a link, or missing href');
  }
}

document.addEventListener('dragstart', onDragStart, {
  capture: true,
  passive: true,
});

window.addEventListener(
  'unload',
  () => {
    document.removeEventListener('dragstart', onDragStart, {
      capture: true,
    });
  },
  { once: true }
);
