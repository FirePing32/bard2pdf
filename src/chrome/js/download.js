"use strict";
import { jsPDF } from "jspdf";

const downloadPDF = (event) => {
    let buttonContainer = event.target;
    buttonContainer.setAttribute("disabled", true);
    buttonContainer.style.color = "#8c8c8c"
    buttonContainer.innerText = "Generating";
    let parentNode =
        buttonContainer.parentNode.parentNode.parentNode.parentNode.parentNode;
    let messageContent = parentNode.querySelector(".model-response-text");

    var doc = new jsPDF();
    doc.html(messageContent, {
        callback: function (pdf) {
            pdf.output("dataurlnewwindow");
            buttonContainer.innerText = "Download";
            buttonContainer.removeAttribute("disabled");
            buttonContainer.style.color = "#ffffff";
        },
        html2canvas: {
            onclone: (clonedDoc) => {
                let sources = clonedDoc.querySelectorAll("a.source");
                sources.forEach((source) => {
                    source.remove();
                });

                let images = clonedDoc.querySelectorAll("img");
                images.forEach((img) => {
                    if (img.naturalHeight == 0) {
                        img.remove();
                    }
                });

                let codeBlocksInfo = clonedDoc.querySelectorAll(
                    ".code-block-decoration.footer"
                );
                codeBlocksInfo.forEach((block) => {
                    block.remove()
                })

                let rmCaptions = clonedDoc.querySelectorAll(".caption");
                rmCaptions.forEach((caption) => {
                    caption.remove();
                });

                let rmExportSheet = clonedDoc.querySelectorAll(
                    ".export-sheets-button-wrapper"
                );
                if (rmExportSheet !== null) {
                    rmExportSheet.forEach((button) => {
                        button.remove();
                    });
                }

                if (clonedDoc.body.getAttribute("class") == "dark-theme") {
                    const darkStyle = clonedDoc.createElement("style");
                    darkStyle.innerHTML =
                        "*:not(th,.code-block-decoration.header,code,code span) { color: #000000 !important; } p > code { color: #000000 !important; background-color: #e9e8e8 !important; } ";
                    clonedDoc.body.appendChild(darkStyle);
                }

                const style = clonedDoc.createElement("style");
                style.innerHTML =
                    "img.image { width: unset !important; }";
                clonedDoc.body.appendChild(style);
            },
            allowTaint: false,
            useCORS: true
        },
        margin: [10, 10, 10, 10],
        autoPaging: "text",
        x: 15,
        y: 15,
        width: 170,
        windowWidth: 650,
    });
};

export { downloadPDF };
