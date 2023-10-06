"use strict";
import { downloadPDF } from "./download.js";

const observer = new MutationObserver(function (mutationsList) {
    mutationsList.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (addedNode) {
            if (
                Array(addedNode.classList).length > 0 &&
                addedNode.classList !== undefined
            ) {
                if (
                    addedNode.nodeName.toUpperCase() == "SCRIPT" ||
                    addedNode.nodeName.toUpperCase() == "LINK"
                ) {
                    addedNode.setAttribute("data-html2canvas-ignore", "true");
                }
                if (addedNode.classList.contains("buttons-container-v2")) {
                    var downloadButton = document.createElement("button");
                    downloadButton.innerHTML = "Download";

                    var buttonProps = document.querySelector(
                        '[mattooltip="More"]'
                    );
                    var attrs = buttonProps.attributes;
                    var restrictedAttrs = ["aria-label", "mattooltip"];

                    for (var i = 0; i < attrs.length; i++) {
                        if (!restrictedAttrs.includes(attrs[i])) {
                            try {
                                downloadButton.setAttribute(
                                    attrs[i].name,
                                    attrs[i].value
                                );
                            } catch (e) {
                                console.log(`${attrs[i]} ${e}`);
                            }
                        }
                    }

                    downloadButton.setAttribute(
                        "action",
                        "bard2pdf.download"
                    );
                    downloadButton.style.borderRadius = "7.5px"
                    downloadButton.style.color = "#ffffff"
                    downloadButton.style.backgroundColor = "#1F2023"
                    downloadButton.addEventListener("click", downloadPDF),
                    addedNode.appendChild(downloadButton);
                }
            }
        });
    });
});

var chatHistoryContainer = undefined;
// content script was failing to find DOM elements in some cases even after full paint, so this is a safety check
const findChatContainer = () => {
    var findContainer = setInterval(() => {
        if (chatHistoryContainer !== undefined) {
            clearInterval(findContainer);
            observer.observe(chatHistoryContainer, {
                subtree: true,
                childList: true,
            });
        }
        chatHistoryContainer =
            document.querySelector("infinite-scroller.chat-history");
    }, 500);
};

window.addEventListener("load", findChatContainer, true);
