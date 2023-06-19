"use strict";
(async () => {
  const src = chrome.runtime.getURL("js/content-main.js");
  const contentMain = await import(src);
})();