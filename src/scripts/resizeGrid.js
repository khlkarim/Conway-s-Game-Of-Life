resolutionElement.addEventListener("input", (e)=>{
    let width = getResolution();
    let firstRow = gridElement.childNodes[0]; 

    while(firstRow.childNodes.length != width){
        if(firstRow.childNodes.length < width){
            gridElement.childNodes.forEach((row, r)=>{
                row.appendChild(createCell(r, row.childNodes.length));
            });
        }else{
            gridElement.childNodes.forEach((row)=>{
                row.removeChild(row.lastChild);
            });
        }
    }

    resizeGridCells();
});

resolutionElement.addEventListener("input", (e)=>{
    let height = getResolution();

    while(gridElement.childNodes.length != height){
        if(gridElement.childNodes.length < height){
            gridElement.appendChild(createRow(gridElement.childNodes.length, getResolution()));
        }else{
            gridElement.removeChild(gridElement.lastChild);
        }
    }

    resizeGridCells();
});

