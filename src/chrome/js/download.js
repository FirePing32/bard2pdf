"use strict";
import { jsPDF } from "jspdf";

const downloadPDF = (event) => {
    let buttonContainer = event.target
    let parentNode = buttonContainer.parentNode.parentNode.parentNode.parentNode.parentNode
    let messageContent = parentNode.querySelector(".model-response-text");

    // Fix text color
    // Fetch query name from DOM
    var doc = new jsPDF();
    doc.html(messageContent, {
        callback: function (pdf) {
            pdf.save("bard2pdf.pdf");
        },
        margin: [10, 10, 10, 10],
        autoPaging: "text",
        x: 15,
        y: 15,
        width: 170,
        windowWidth: 650,
    });
}

export {downloadPDF};