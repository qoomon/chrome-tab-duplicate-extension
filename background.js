async function duplicateTab() {
    const activeTab = await getActiveTab()
    return chrome.tabs.duplicate(activeTab.id)
}

async function getActiveTab() {
    return (await chrome.tabs.query({currentWindow: true, active: true}))[0];
}

// -----------------------------------------------------------------------------

chrome.commands.onCommand.addListener(async (command) => {
    console.debug(`command: ${command}`)
    switch (command) {
        case 'duplicate-tab':
            return duplicateTab()
    }
});
