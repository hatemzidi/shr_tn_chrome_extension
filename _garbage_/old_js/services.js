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

function share(service, tab)
{
	var temp = servicesJSON[service].url;
	temp = temp.replace("${short-url}", encodeURIComponent(tab.shortenedUrl));
	temp = temp.replace("${title}", encodeURIComponent(tab.title));
	
	if(temp.indexOf("mailto:") == 0)
		chrome.tabs.update(tab.id, { url: temp });
	else
		chrome.tabs.create({url: temp});
}

var servicesJSON = 
{
	blogger: 
	{
		name : "Blogger",
		icon : "blogger.png",
		url : "http://www.blogger.com/blog_this.pyra?t=&u=${short-url}&n=${title}"
	},
	
	delicious:
	{
		name : "Delicious",
		icon : "delicious.png",
		url : "http://delicious.com/save?url=${short-url}"
	},
		
	digg:
	{
		name : "Digg",
		icon : "digg.png",
		url : "http://digg.com/submit?phase=2&url=${short-url}"
	},

	evernote:
	{	
		name : "Evernote",
		icon : "evernote.png",
		url : "http://www.evernote.com/clip.action?url=${short-url}&title=${title}"
	},
	
	facebook:
	{
		name : "Facebook",
		icon : "facebook.png",
		url : "http://www.facebook.com/share.php?u=${short-url}"
	},
	
	friendfeed:
	{
		name : "FriendFeed",
		icon : "friendfeed.png",
		url : "http://friendfeed.com/share?url=${short-url}&title=${title}"
	},

	gmail:
	{
		name : "Gmail",
		icon : "gmail.png",
		url : "https://mail.google.com/mail/?ui=2&view=cm&fs=1&tf=1&su=${title}&body=${short-url}"	
	},

	google_bookmarks:
	{
		name : "Google Bookmarks",
		icon : "google_bookmarks.png",
		url : "http://www.google.com/bookmarks/mark?op=edit&bkmk=${short-url}&title=${title}"
	},
	
	google_buzz: 
	{
		name : "Google Buzz",
		icon : "google_buzz.png",
		url : "http://www.google.com/buzz/post?url=${short-url}"
	},
	
	google_reader:
	{
		name : "Google Reader",
		icon : "google_reader.png",
		url : "http://www.google.com/reader/link?url=${short-url}&title=${title}"
	},

	hotmail:
	{
		name : "Hotmail",
		icon : "hotmail.png",
		url : "http://hotmail.com/secure/start?action=compose&subject=${title}&body=${short-url}"
	},
	
	instapaper:
	{
		name : "Instapaper",
		icon : "instapaper.png",
		url : "http://www.instapaper.com/edit?url=${short-url}&title=${title}"
	},

	linkedin:
	{
		name : "LinkedIn",
		icon : "linkedin.png",
		url : "http://www.linkedin.com/shareArticle?mini=true&url=${short-url}&title=${title}"
	},
	
	mail:
	{
		name : "Mail",
		icon : "mail.png",
		url : "mailto:?subject=${title}&body=${short-url}"
	},

	myspace:
	{
		name : "MySpace",
		icon : "myspace.png",
		url : "http://www.myspace.com/Modules/PostTo/Pages/?u=${short-url}&t=${title}"
	},
	
	netlog:
	{
		name : "Netlog",
		icon : "netlog.png",
		url : "http://en.netlog.com/go/manage/links/view=save&origin=external&url=${short-url}&title=${title}&description="
	},
	
	orkut:
	{
		name : "Orkut",
		icon : "orkut.png",
		url : "http://promote.orkut.com/preview?nt=orkut.com&tt=${title}&du=${short-url}"
	},
	
	pingfm:
	{
		name : "Ping.fm",
		icon : "pingfm.png",
		url : "http://ping.fm/ref/?link=${short-url}&title=${title}"
	},
	
	posterous:
	{
		name : "Posterous",
		icon : "posterous.png",
		url : "http://posterous.com/share?linkto=${short-url}&title=${title}"
	},
	
	reddit:
	{
		name : "Reddit",
		icon : "reddit.png",
		url : "http://reddit.com/submit?url=${short-url}&title=${title}"
	},
	
	readitlater:
	{
		name : "Read It Later",
		icon : "readitlater.png",
		url : "https://readitlaterlist.com/save?url=${short-url}&title=${title}"
	},
	
	stumbleupon:
	{
		name : "StumbleUpon",
		icon : "stumbleupon.png",
		url : "http://www.stumbleupon.com/submit?url=${short-url}&title=${title}"
	},
	
	technorati:
	{
		name : "Technorati",
		icon : "technorati.png",
		url : "http://www.technorati.com/faves?add=${short-url}"
	},
	
	tumblr:
	{
		name : "Tumblr",
		icon : "tumblr.png",
		url : "http://www.tumblr.com/share?v=3&u=${short-url}&t=${title}"
	},

	twitter:
	{
		name : "Twitter",
		icon : "twitter.png",
		url : "http://twitter.com/home?status=${title}%20-%20${short-url}"
	},
	
	yahoo_bookmarks:
	{
		name : "Yahoo! Bookmarks",
		icon : "yahoo_bookmarks.png",
		url : "http://bookmarks.yahoo.com/toolbar/savebm?opener=tb&u=${short-url}&t=${title}"
	},
	
	yahoo_mail:
	{
		name : "Yahoo! Mail",
		icon : "yahoo_mail.png",
		url : "http://us.mg1.mail.yahoo.com/mc/compose?ymv=0&body=${short-url}&Subj=${title}"
	}
}
