//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//	shr.tn URL Shortener is licensed under a Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 License.
//	License (http://creativecommons.org/licenses/by-nc-nd/3.0/)
//
//	You are free:
//		* to Share - to copy, distribute and transmit the work
//
//	Under the following conditions:
//		* Attribution - You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
//		* Noncommercial - You may not use this work for commercial purposes.
//		* No Derivative Works - You may not alter, transform, or build upon this work.
//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
   chrome.contextMenus.create({"title": "Shorten link with shr.tn", "contexts": ["link"], "id": "parent"});
});


function onClickHandler(info, tab)
{
	var response = shortenUrl(info.linkUrl, tab.incognito);	

	if ( response === undefined  || response.status == "error") {
		title = " Oops, I can't shorten this url !"
		msg = "An error occured while processing this link.";
	} else {	
		title = " Yeay, " + response.message;
		msg = "Already copied to clipboard!";
		copyToClipboard(response.message);
	}
	showNotification(title, msg);
    
}
