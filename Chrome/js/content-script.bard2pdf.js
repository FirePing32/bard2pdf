"use strict";

const observer = new MutationObserver(function(mutationsList) {
	mutationsList.forEach(function(mutation) {
		mutation.addedNodes.forEach(function(addedNode) {
			if (Array(addedNode.classList).length > 0 && addedNode.classList !== undefined) {
				if(addedNode.classList.contains('buttons-container')) {

					var downloadButton = document.createElement("button")
					downloadButton.innerHTML = "Download";

					var buttonClasses = "mat-mdc-tooltip-trigger stroked-icon-button mdc-button mdc-button--outlined mat-mdc-outlined-button gmat-mdc-button-with-prefix mat-unthemed mat-mdc-button-base gmat-mdc-button ng-star-inserted".split(" ")
					downloadButton.classList.add(...buttonClasses)

					addedNode.appendChild(downloadButton);

				}
			}
		});
	});
});

var chatHistoryContainer = undefined
// content script was failing to find DOM elements in some cases even after full paint, so this is a safety check
const findChatContainer = () => {
	var findContainer = setInterval(() => {
		if (chatHistoryContainer !== undefined){
			clearInterval(findContainer)
			observer.observe(chatHistoryContainer, { subtree: true, childList: true });
		}
		chatHistoryContainer = document.getElementsByClassName("chat-history")[0]
	}, 500)
}

window.addEventListener("load", findChatContainer, true)


