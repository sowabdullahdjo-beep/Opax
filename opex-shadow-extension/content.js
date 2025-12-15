let isRecording = false
let recordedSteps = []

function buildElementDescriptor(target) {
  if (!target) {
    return {}
  }

  const descriptor = {
    tag: target.tagName?.toLowerCase(),
    id: target.id || undefined,
    name: target.getAttribute?.('name') || undefined,
    type: target.getAttribute?.('type') || undefined,
    classes: target.className || undefined,
    text: undefined,
  }

  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    descriptor.value = target.value
  }
  else if (target instanceof HTMLButtonElement) {
    descriptor.text = target.innerText?.trim() || undefined
  }
  else if (target instanceof HTMLElement) {
    descriptor.text = target.innerText?.trim() || undefined
  }

  return descriptor
}

function recordClick(event) {
  if (!isRecording) return

  recordedSteps.push({
    type: 'click',
    timestamp: Date.now(),
    element: buildElementDescriptor(event.target),
  })
}

function recordInput(event) {
  if (!isRecording) return
  const target = event.target

  if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) {
    return
  }

  recordedSteps.push({
    type: 'input',
    timestamp: Date.now(),
    element: buildElementDescriptor(target),
    value: target.value,
  })
}

function startRecording() {
  isRecording = true
  recordedSteps = []
}

function stopRecording() {
  isRecording = false
  const payload = {
    url: window.location.href,
    steps: recordedSteps,
  }
  recordedSteps = []
  return payload
}

document.addEventListener('click', recordClick, true)
document.addEventListener('input', recordInput, true)

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.command === 'start-recording') {
    startRecording()
    sendResponse({ status: 'recording' })
    return true
  }

  if (message?.command === 'stop-recording') {
    const data = stopRecording()
    sendResponse({ status: 'stopped', data })
    return true
  }

  return false
})
