chrome.action.onClicked.addListener(async (tab) => {
    console.log(tab.url)
    if(tab.url.startsWith("https://tabs.ultimate-guitar.com/tab/")) {
        var id =tab.url.split("-").slice(-1)[0]
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (theid) => {
                var form = document.createElement("form")
                form.action = "https://tabs.ultimate-guitar.com/tab/download"
                var input = document.createElement("input")
                input.type = "hidden"
                input.name = "id"
                input.value = theid
                form.appendChild(input)
                document.body.appendChild(form)
                form.submit()
                document.body.removeChild(form)
            },
            args: [id]
        });
    } else {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => alert("This extension only works on Ultimate Guitar tabs.")
        });
    }
});