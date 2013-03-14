//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//	goo.gl URL Shortener is licensed under a Creative Commons Attribution-Noncommercial-No Derivative Works 3.0 License.
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

var shortcuts;

var tooltip = {
	element:[],
	visible: false, 
	
	create: function(){
		this.element = document.createElement("div");	
		this.element.setAttribute('style', 'font-size: 17px; font-style:normal; font-family:arial; font-weight: normal; text-align:left; padding: 10px; border: 1px solid #000000; position:fixed; background-color: #444444; color: #FFFFFF; opacity:0.9; z-index:9999; top:1px; right:1px; border-radius: 4px; width: auto; height:auto;');
	},

	show: function(){
		this.visible = true;
		document.body.appendChild(this.element);	
	},
	
	hide: function(){
		document.body.removeChild(this.element);
		this.visible = false;
	},
	
	style: function(q){
		this.element.setAttribute('style', q);					
	},
	
	text: function(q){
		this.element.innerText = q;
	}
}

function keyUpEventListener(e)
{
	if(tooltip.visible)
		return;
	
	if(e.target.tagName.toLowerCase() == 'input' ||
	   e.target.tagName.toLowerCase() == 'textarea' ||
	   e.target.tagName.toLowerCase() == 'select' ||
	   e.target.tagName.toLowerCase() == 'object')
		return;
	
	var code = (+e.ctrlKey) + "" + (+e.shiftKey) + "" + (+e.altKey) + e.which;
	var temp = "";
		
	for (var shortcut in shortcuts)
	{		
		if(shortcuts[shortcut] == code)
		{
			temp = shortcut;
			break;
		}
	}
	
	if(temp == "")
		return;
	
	tooltip.text("Shortening...");
	tooltip.show();

	chrome.extension.sendRequest({type: "shortcut", shortcut: temp}, function(response) 
	{				
		if(temp == "copy")
		{
			if(response.status == "error")
				tooltip.text("Error");
			else
				tooltip.text(response.message + " copied!");
			
			setTimeout("tooltip.hide()", 2000);
		}
		else
		{
			tooltip.hide();
		}
	});
}

function init()
{
	chrome.extension.sendRequest({type: "preferences"}, function(response) 
	{	
		shortcuts = response;
		
		if(shortcuts.shortcuts_enabled)
		{
			tooltip.create();			
			document.addEventListener("keyup", keyUpEventListener);
		}
	});
}

init();
