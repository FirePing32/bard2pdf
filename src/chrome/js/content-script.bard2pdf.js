"use strict";
(async () => {
  const src = chrome.runtime.getURL("js/content-main.bard2pdf.min.js");
  const contentMain = await import(src);
})();