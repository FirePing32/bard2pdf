"use strict";
import { jsPDF } from "jspdf";

const downloadPDF = (event) => {
    let buttonContainer = event.target;
    let parentNode =
        buttonContainer.parentNode.parentNode.parentNode.parentNode.parentNode;
    let messageContent = parentNode.querySelector(".model-response-text");

    var doc = new jsPDF();
    doc.html(messageContent, {
        callback: function (pdf) {
            pdf.output("dataurlnewwindow");
        },
        html2canvas: {
            onclone: (clonedDoc) => {
                let sources = clonedDoc.querySelectorAll("a.source");
                sources.forEach((source) => {
                    source.remove()
                })

                // Fix content wrapping
                //
                // let images = clonedDoc.querySelectorAll("img")
                // images.forEach((img) => {
                //     img.onerror = "this.onerror = null;";
                // })

                var rmCaptions = clonedDoc.querySelectorAll(".caption")
                if (rmCaptions !== null) {
                    rmCaptions.forEach((caption) => {
                        caption.remove()
                    })
                }

                var rmExportSheet = clonedDoc.querySelectorAll(
                    ".export-sheets-button-wrapper"
                );
                if (rmExportSheet !== null) {
                    rmExportSheet.forEach((button) => {button.remove()})
                }

                const style = clonedDoc.createElement("style");
                style.innerHTML =
                    "*:not(th) { color: #000000 !important; } img.image { width: unset !important; }";
                clonedDoc.body.appendChild(style);
            }
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
