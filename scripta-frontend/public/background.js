// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log("La extensión se instaló");
});

chrome.runtime.onMessage.addListener((message) => {
  console.log(message)
  if (message.action === "enviarAlContentScript") {
    chrome.tabs.sendMessage(message.tabId, {
      action: "mostrarMensaje",
      data: message.data,
    });
  }
});
