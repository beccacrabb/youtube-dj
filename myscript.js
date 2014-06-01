$(document).ready(function() {

	chrome.runtime.onMessage.addListener(
  		function(request, sender, sendResponse) {
  		parseCommand(request.command);
  		console.log(request, sender)
    	console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
     	sendResponse({status: "200 OK"});
     	
  	});

	var currentUrl = document.URL;
	
	// For debugging
	var videoId = $("meta[itemprop=videoId]").attr("content");
	console.log(videoId);

});

function getNextUrl() {
	return "https://www.youtube.com" + $('a.next-playlist-list-item').attr("href");
}

function getPrevUrl() {
	return "https://www.youtube.com" + $('a.prev-playlist-list-item').attr("href");
}

function parseCommand(command) {
	if (command == "next") {
 	 	$('.yt-uix-button-icon-watch-appbar-play-next').click();
  	}
  	else if (command == "previous") {
 	 	$('.yt-uix-button-icon-watch-appbar-play-prev').click();
  	}
  	else if (command == "pause-or-play") {
  		$('div.html5-video-container').click();
  	}
  	else if (command == "shuffle") {
  		$('button.shuffle-playlist').click();
  	}
}

function loadUrl(url) {
	console.log(url);
	window.location.href = url;
}