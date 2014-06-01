// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var tabId = 0;
var theCommand = '';

chrome.commands.onCommand.addListener(function(command) {
  theCommand = command;
  if (command) {
 	  createMessage();
  }
});

function createMessage() {
  chrome.tabs.query( {url: "*://www.youtube.com/*"}, function(tabs) {
    sendMessage(tabs[0].id);
  });
}

function sendMessage(theTabId) {
  if (theTabId != null) {
    tabId = theTabId;
  }
  chrome.tabs.sendMessage(tabId, {command:theCommand}, function(response) {console.log(response);})
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  console.log(request, sender)
  console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
  sendResponse({farewell: "goodbye"});
});