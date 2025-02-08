widthElement.addEventListener("input", (e)=>{
    let width = widthElement.value;
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

heightElement.addEventListener("input", (e)=>{
    let height = heightElement.value;

    while(gridElement.childNodes.length != height){
        if(gridElement.childNodes.length < height){
            gridElement.appendChild(createRow(gridElement.childNodes.length, widthElement.value));
        }else{
            gridElement.removeChild(gridElement.lastChild);
        }
    }

    resizeGridCells();
});

