async function duplicateTab() {
  const activeTab = await getActiveTab()
  return chrome.tabs.duplicate(activeTab.id)
}

async function newTab() {
    const activeTab = await getActiveTab()
    return chrome.tabs.create({
        openerTabId: activeTab.id,
        index: activeTab.index + 1,
        active: true,
    })
}

async function getActiveTab() {
    return (await chrome.tabs.query({
        currentWindow: true,
        active: true,
    }))[0]
}

// -----------------------------------------------------------------------------

chrome.commands.onCommand.addListener(async (command) => {
  console.debug(`command: ${command}`)
  switch (command) {
    case 'duplicate-tab':
      return duplicateTab()
    case 'new-tab':
        return newTab()
  }
})

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({
            url: "chrome://extensions/shortcuts"
        })
    }
})
