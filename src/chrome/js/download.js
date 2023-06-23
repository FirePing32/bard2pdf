"use strict";
import { jsPDF } from "jspdf";

const downloadPDF = (event) => {
    let buttonContainer = event.target
    let parentNode = buttonContainer.parentNode.parentNode.parentNode.parentNode.parentNode
    let messageContent = parentNode.querySelector(".model-response-text");

    var doc = new jsPDF();
    doc.html(messageContent, {
        callback: function (pdf) {
            pdf.save("DOC.pdf");
        },
    });
}

export {downloadPDF};