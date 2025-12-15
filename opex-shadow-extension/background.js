chrome.runtime.onInstalled.addListener(() => {
  console.log('Opex Shadow Recorder installed')
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.command === 'log-shadow-steps') {
    console.log('Shadow steps received in background', message.payload)
    sendResponse({ status: 'logged' })
  }
})
