chrome.runtime.sendMessage({
  url: window.location.href //Sends current url to background.js (this file runs only for codeforces/com/contest/ URLs)
})