var options = {
    enabled: true,
    toolbar: true
};

function getOptions(func) {
    chrome.storage.sync.get(options, function (data) {
        if (data !== undefined) {
            options = data;
        }
        func(options);
    });
}

function setOptions(func) {
    chrome.storage.sync.set(options, function () {
        func();
    });
}
