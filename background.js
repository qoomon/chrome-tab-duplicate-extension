async function duplicateTab() {
  let [activeTab] = await chrome.tabs.query({
    currentWindow: true,
    active: true
  })

  return chrome.tabs.duplicate(activeTab.id)
}

// -----------------------------------------------------------------------------

chrome.commands.onCommand.addListener(async (command) => {
  console.debug(`command: ${command}`)
  switch (command) {
    case 'duplicate-tab':
      return duplicateTab()
  }
})
