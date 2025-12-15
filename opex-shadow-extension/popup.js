const recordButton = document.getElementById('record')
const stopButton = document.getElementById('stop')
const statusEl = document.getElementById('status')
const output = document.getElementById('output')

async function getActiveTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return tab?.id
}

async function sendMessageToActiveTab(message) {
  const tabId = await getActiveTabId()
  if (!tabId) throw new Error('No active tab found')
  return chrome.tabs.sendMessage(tabId, message)
}

async function startRecording() {
  statusEl.textContent = 'Recording...'
  output.value = ''
  try {
    const response = await sendMessageToActiveTab({ command: 'start-recording' })
    if (response?.status === 'recording') {
      await chrome.storage.local.set({ shadowRecording: true })
    }
  }
  catch (error) {
    statusEl.textContent = 'Unable to start recording'
    console.error(error)
  }
}

async function stopRecording() {
  try {
    const response = await sendMessageToActiveTab({ command: 'stop-recording' })
    if (response?.data) {
      const payload = { ...response.data, capturedAt: new Date().toISOString() }
      const json = JSON.stringify(payload, null, 2)
      output.value = json
      statusEl.textContent = 'Stopped'
      await chrome.storage.local.set({ shadowRecording: false, shadowSteps: payload })
    }
  }
  catch (error) {
    statusEl.textContent = 'Unable to stop recording'
    console.error(error)
  }
}

recordButton.addEventListener('click', startRecording)
stopButton.addEventListener('click', stopRecording)

chrome.storage.local.get(['shadowSteps'], ({ shadowSteps }) => {
  if (shadowSteps) {
    output.value = JSON.stringify(shadowSteps, null, 2)
  }
})
