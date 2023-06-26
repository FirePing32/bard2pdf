"use strict";
(async () => {
  var preloadScripts = document.querySelectorAll("link, script");
  for (let i = 0; i < preloadScripts.length; i++) {
      preloadScripts[i].setAttribute("data-html2canvas-ignore", "true");
  }
  const src = chrome.runtime.getURL("js/content-main.js");
  const contentMain = await import(src);
})();