"use strict";
import { jsPDF } from "jspdf";

const downloadPDF = (event) => {
    let buttonContainer = event.target
    let parentNode = buttonContainer.parentNode.parentNode.parentNode.parentNode.parentNode
    let messageContent = parentNode.querySelector(".model-response-text");

    // Fix script load
    var doc = new jsPDF();
    doc.html(messageContent, {
        callback: function (pdf) {
            pdf.output("dataurlnewwindow");
        },
        html2canvas: {onclone: (clonedDoc) => {
            const style = clonedDoc.createElement("style");
            style.innerHTML =
                "* { color: #000000 !important; }";
            clonedDoc.body.appendChild(style);
        }},
        margin: [10, 10, 10, 10],
        autoPaging: "text",
        x: 15,
        y: 15,
        width: 170,
        windowWidth: 650,
    });
}

export {downloadPDF};