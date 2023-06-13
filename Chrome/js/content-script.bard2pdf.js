(async () => {
  const src = chrome.runtime.getURL("js/content-main.bard2pdf.js");
  const contentMain = await import(src);
  contentMain.main();
})();