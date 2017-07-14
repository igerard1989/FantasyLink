/*!
 *    "I am rarely happier than when spending an entire day programming my computer to
 *    perform automatically a task that it would otherwise take me a good ten seconds 
 *    to do by hand." ~ Douglas Adams, just zis guy, you know
 */

var options;
var observerConfig = {
    childList: true,
    characterData: true,
    subtree: true
};

$(document).ready(function () {
    getOptions(function (opt) {
        options = opt;
        if (options.toolbar) {
            chrome.extension.sendRequest("showPageAction");
        }
        if (options.enabled) {
            addSites();
        }
    });
});

function addSites() {
        addYahooLinks();
        addYahooEvents();
}

function addYahooLinks() {
    $('.FantasyLinkLink').remove();
    $('.ysf-player-name a').each(function () {
        $(this).parent().append(getLinks($(this).text()));
    });
}

function addYahooEvents() {
    var target = document.querySelector('#yspmaincontent');

    var observerYahoo = new MutationObserver(function (mutations) {
        observerYahoo.disconnect();
        if (mutations.length > 0) {
            addYahooLinks();
        }
        observerYahoo.observe(target, observerConfig);
    });
    observerYahoo.observe(target, observerConfig);
}

function getLinks(playerName) {
    var returnString = '';
	var googleFavIconUrl = 'http://www.google.com/s2/favicons?domain=http://thecsc.win';
        returnString += getLinkHTML(playerName, googleFavIconUrl);
    return returnString;
}

function getLinkHTML(playerName, favIconLink) {
    return '<a class="FantasyLinkLink" href="' +
        '" target="_blank"><img src=http://thecsc.win"' + favIconLink + '" height="12" width="12" border="0"' +
        ' style="margin:0 6px 0 6px" title="' + playerName + '" /></a>';
}
