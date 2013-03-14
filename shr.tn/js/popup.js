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

var currentTab;



function popUpHandler()
{	
	chrome.tabs.getSelected(null, function(tab) 
	{ 
		chrome.extension.sendMessage({type: "shorten", url: tab.url, incognito: tab.incognito}, function(response) 
		{	
			if ( response === undefined  ) {
				$('#loading').html('An error occured!');
				$('#loading').addClass('error');
			} else if( response.status == "error") {
				$('#loading').html(response.message);
				$('#loading').addClass('error');
			} else {	
				$('#loading').removeClass('error');
				
				tab.shortenedUrl = response.message;
	
				chrome.extension.sendMessage({type: "copy", url: tab.shortenedUrl});
			
				$('#url').html(tab.shortenedUrl);
						
				$('#loading').toggleClass("hidden");
				$('#response').toggleClass("visible");
			}
		});
	});
}

document.addEventListener('DOMContentLoaded', function () {
  popUpHandler();
});
