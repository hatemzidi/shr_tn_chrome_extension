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


function copyToClipboard(text)
{
	var input = document.getElementById('url');
	alert(input);
	if(input == undefined)
		return;
	
	input.value = text;					
	input.select();
	document.execCommand('Copy');
}

function shortenUrl(url, incognito)
{
	var response;
	
	username = getItem('shrtn_username'); 
 	key	 = getItem('shrtn_key');
 	
 	_url  = " http://shr.tn/api/v1/short?long="+encodeURIComponent(url);
	_url += "&format=txt&username="+username;
	_url += "&api_key="+key;

		$.getJSON(  _url,  function(_data){
			if(_data.resp.code == 200 || _data.resp.code == 201 ) {
			alert('here');
				return 1;//{status: "success", message: _data.data.short_url};
			} else	{
				return {status: "error", message: _data.resp.message};
			}
	 	}, "json");
}

function init()
{
	createContextMenu();
	
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) 
	{	

		switch(request.type)
		{
			case "shorten":
			aler('aaaaaa');
				var response = shortenUrl(request.url, request.incognito);
				sendResponse(response);
			break;
			
			case "copy":
				copyToClipboard(request.url);
			break;
			
			case "shortcut":
				chrome.tabs.getSelected(null, function(tab) 
				{	
					var response = shortenUrl(tab.url, tab.incognito);
					tab.shortenedUrl = response.message;
					
					if(request.shortcut == "copy")
						copyToClipboard(response.message);
					else
						share(request.shortcut, tab);
								
					sendResponse(response);
				});
			break;
			
			case "preferences":	
				var shortcuts = shortcutsGetter();
				var preferences = preferencesGetter();
				shortcuts.shortcuts_enabled = preferences.shortcuts_enabled;
				
				sendResponse(shortcuts);	
			break;
			
			case "context":
				createContextMenu();
			break;
		}
	});
}
