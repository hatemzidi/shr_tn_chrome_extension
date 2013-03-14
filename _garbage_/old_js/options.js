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

function save()
{
	if(!checkLocalStorage())
		return;
	
	clearLocalStorage();
	
	preferencesSetter({
		auto_copy : document.getElementsByName("auto_copy").item(0).checked,
		shortcuts_enabled : document.getElementsByName("shortcuts_enabled").item(0).checked,
		contextmenu_enabled : document.getElementsByName("contextmenu_enabled").item(0).checked,
		history_enabled : document.getElementsByName("history_enabled").item(0).checked
	});
	
	actionsSetter({
		copy : document.getElementById("copy").checked,
		details : document.getElementById("details").checked,
		qrcode : document.getElementById("qrcode").checked
	});
	
	var services = {};
	var shortcuts = { copy : document.getElementById("hiddenCopyShortcut").value };
	
	for (var service in servicesJSON)
	{		
		var elementService = document.getElementById(service);
		services[service] = elementService == undefined ? false : elementService.checked;
		
		var elementShortcut = document.getElementById("hidden" + service + "Shortcut");
		shortcuts[service] = elementShortcut == undefined ? "" : elementShortcut.value;
	}
	
	servicesSetter(services);	
	shortcutsSetter(shortcuts);
		
	chrome.extension.sendRequest({type: "context"});
}

function init()
{
	if(!checkLocalStorage())
		return;
	
	var preferences = preferencesGetter();
	
	if(preferences.auto_copy)
		document.getElementsByName("auto_copy").item(0).checked = true;
	else
		document.getElementsByName("auto_copy").item(1).checked = true;
	
	if(preferences.shortcuts_enabled)
		document.getElementsByName("shortcuts_enabled").item(0).checked = true;
	else
		document.getElementsByName("shortcuts_enabled").item(1).checked = true;
	
	if(preferences.contextmenu_enabled)
		document.getElementsByName("contextmenu_enabled").item(0).checked = true;
	else
		document.getElementsByName("contextmenu_enabled").item(1).checked = true;	

	if(preferences.history_enabled)
		document.getElementsByName("history_enabled").item(0).checked = true;
	else
		document.getElementsByName("history_enabled").item(1).checked = true;				
	
	var actions = actionsGetter();
	
	document.getElementById("copy").checked = actions.copy;
	document.getElementById("details").checked = actions.details;
	document.getElementById("qrcode").checked = actions.qrcode;
	
	var services = servicesGetter();
	var shortcuts = shortcutsGetter();
	
	document.getElementById("hiddenCopyShortcut").value = shortcuts.copy;
	document.getElementById("spanCopyShortcut").innerText = getStringByShortcutCode(shortcuts.copy);
	
	for (var service in servicesJSON)
	{
		var servicesTable = document.getElementById("servicesTable");
		
		if(servicesTable != undefined)
		{
			var serviceTr = document.createElement('tr');
			
			var serviceTd1 = document.createElement('td');
			serviceTd1.setAttribute("width", "23");
			
			var checkbox = document.createElement('input');
			checkbox.setAttribute("id", service);
			checkbox.setAttribute("type", "checkbox");
			checkbox.setAttribute("onchange", "save();");
			checkbox.checked = services[service];
			serviceTd1.appendChild(checkbox);
			
			var serviceTd2 = document.createElement('td');
			serviceTd2.setAttribute("width", "23");
			
			var image = document.createElement('img');
			image.setAttribute("width", "16");
			image.setAttribute("src", "icons/" + servicesJSON[service].icon);
			
			serviceTd2.appendChild(image);
			
			var serviceTd3 = document.createElement('td');
			serviceTd3.innerText = servicesJSON[service].name;
			
			serviceTr.appendChild(serviceTd1);
			serviceTr.appendChild(serviceTd2);
			serviceTr.appendChild(serviceTd3);
			
			servicesTable.appendChild(serviceTr);
		}
		
		var shortcutsTable = document.getElementById("shortcutsTable");
		
		if(shortcutsTable != undefined)
		{
			var shortcutTr = document.createElement('tr');
			
			var shortcutTd1 = document.createElement('td');
			shortcutTd1.setAttribute("class", "div-preferences");
			shortcutTd1.innerText = servicesJSON[service].name;
			
			var shortcutTd2 = document.createElement('td');
			shortcutTd2.setAttribute("class", "div-preferences");
			
			var shortcutSpan = document.createElement('span');
			shortcutSpan.setAttribute("id", "span" + service + "Shortcut");
			shortcutSpan.innerText = getStringByShortcutCode(shortcuts[service]);
			
			var shortcutHidden = document.createElement('input');
			shortcutHidden.setAttribute("id", "hidden" + service + "Shortcut");
			shortcutHidden.setAttribute("type", "hidden");
			shortcutHidden.value = shortcuts[service];
			
			shortcutTd2.appendChild(shortcutSpan);
			shortcutTd2.appendChild(shortcutHidden);
			
			var shortcutTd3 = document.createElement('td');
			shortcutTd3.setAttribute("class", "div-preferences");
			
			var shortcutSpanCreate = document.createElement('span');
			shortcutSpanCreate.setAttribute("class", "link");
			shortcutSpanCreate.setAttribute("onclick", "createShortcut('" + service + "Shortcut');");
			shortcutSpanCreate.innerText = "edit";

			shortcutTd3.appendChild(shortcutSpanCreate);
			
			var shortcutTd4 = document.createElement('td');
			shortcutTd4.setAttribute("class", "div-preferences");
			
			var shortcutSpanDelete = document.createElement('span');
			shortcutSpanDelete.setAttribute("class", "link");
			shortcutSpanDelete.setAttribute("onclick", "deleteShortcut('" + service + "Shortcut');");	
			shortcutSpanDelete.innerText = "delete";

			shortcutTd4.appendChild(shortcutSpanDelete);
			
			shortcutTr.appendChild(shortcutTd1);
			shortcutTr.appendChild(shortcutTd2);
			shortcutTr.appendChild(shortcutTd3);
			shortcutTr.appendChild(shortcutTd4);
			
			shortcutsTable.appendChild(shortcutTr);
		}
	}
}

function getStringByShortcutCode(shortcutCode)
{
	var shortcut = "";
	 
	if(shortcutCode != undefined && shortcutCode.length >= 4)
	{
		shortcut += shortcutCode.charAt(0) == "1" ? "CTRL+" : "";
		shortcut += shortcutCode.charAt(1) == "1" ? "SHIFT+" : "";
		shortcut += shortcutCode.charAt(2) == "1" ? "ALT+" : "";
		shortcut += String.fromCharCode(shortcutCode.substring(3));
	}
	
	return shortcut;
}

function keyUpEventListener(e)
{
	var shortcutCode = (+e.ctrlKey) + "" + (+e.shiftKey) + "" + (+e.altKey) + e.which;
	
	document.getElementById('hidden' + current_element).value = shortcutCode;
	document.getElementById('span' + current_element).innerText = getStringByShortcutCode(shortcutCode);

	document.getElementById("trWarning").className = "visible";
	
	document.removeEventListener('keyup', keyUpEventListener);
	
	save();
}

var current_element;

function createShortcut(elem)
{
	current_element = elem;
	document.addEventListener('keyup', keyUpEventListener);
	document.getElementById('span' + elem).innerText = "press shortcut keys...";
}

function deleteShortcut(elem)
{
	document.getElementById('span' + elem).innerText = "";
	document.getElementById('hidden' + elem).value = "";
	
	document.getElementById("trWarning").className = "visible-tr";
	
	save();
}

function tabClick(elem)
{
	if(elem == 'preferences')
	{
		document.getElementById("preferencesTab").className = "tab tab-selected";
		document.getElementById("preferencesDiv").className = "tab-selected visible";	
	}
	else
	{
		document.getElementById("preferencesTab").className = "tab tab-unselected";
		document.getElementById("preferencesDiv").className = "tab-selected hidden";
	}	
	
	if(elem == 'actions')
	{
		document.getElementById("actionsTab").className = "tab tab-selected";
		document.getElementById("actionsDiv").className = "tab-selected visible";
	}
	else
	{
		document.getElementById("actionsTab").className = "tab tab-unselected";
		document.getElementById("actionsDiv").className = "tab-selected hidden";
	}
	
	if(elem == 'services')
	{
		document.getElementById("servicesTab").className = "tab tab-selected";
		document.getElementById("servicesDiv").className = "tab-selected visible";
	}
	else
	{
		document.getElementById("servicesTab").className = "tab tab-unselected";
		document.getElementById("servicesDiv").className = "tab-selected hidden";
	}
	
	if(elem == 'shortcuts')
	{
		document.getElementById("shortcutsTab").className = "tab tab-selected";
		document.getElementById("shortcutsDiv").className = "tab-selected visible";
	}
	else
	{
		document.getElementById("shortcutsTab").className = "tab tab-unselected";
		document.getElementById("shortcutsDiv").className = "tab-selected hidden";
	}
	
	if(elem == 'changelog')
	{
		document.getElementById("changelogTab").className = "tab tab-selected";
		document.getElementById("changelogDiv").className = "tab-selected visible";
	}
	else
	{
		document.getElementById("changelogTab").className = "tab tab-unselected";
		document.getElementById("changelogDiv").className = "tab-selected hidden";
	}
}
