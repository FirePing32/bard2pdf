"use strict";

const observer = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		mutation.addedNodes.forEach(function(added_node) {
			if (Array(added_node.classList).length > 0 && added_node.classList !== undefined) {
				if(added_node.classList.contains('buttons-container')) {
					console.log(added_node);
				}
			}
		});
	});
});

var chatHistoryContainer = undefined
// content script was failing to find DOM elements in some cases even after complete page load, so this is a safety check
const findChatContainer = () => {
	var findContainer = setInterval(() => {
		if (chatHistoryContainer !== undefined){
			clearInterval(findContainer)
			observer.observe(chatHistoryContainer, { subtree: true, childList: true });
		}
		chatHistoryContainer = document.getElementsByClassName("chat-history")[0]
	}, 500)
}

window.addEventListener("load", function(){
	findChatContainer()
}, true)


