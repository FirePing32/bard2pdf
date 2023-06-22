"use strict";
import { jsPDF } from "jspdf";

const downloadPDF = (event) => {
    let buttonContainer = event.target
    let messageContent = buttonContainer.parentNode.parentNode.parentNode.parentNode.parentNode

    var doc = new jsPDF();
    doc.html(messageContent, {
        callback: function (pdf) {
            pdf.save("DOC.pdf");
        },
    });
}

export {downloadPDF};