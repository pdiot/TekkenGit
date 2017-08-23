$(function() { 
    $("#btnSave").click(function() { 
        html2canvas($("#combo"), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                document.body.appendChild(canvas);

                canvas.toBlob(function(blob) {
					saveAs(blob, "Combo.png"); 
				});
            }
        });
    });
}); 