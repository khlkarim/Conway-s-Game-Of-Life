function createRow(r, width){
    let row = document.createElement("div");
    row.classList.add('row');
    row.id = `row-${r}`;

    for(let c = 0; c<width; c++){
        let cell = createCell(r, c);
        row.appendChild(cell);
    }

    return row;
}

function createCell(r, c){
    let cell = document.createElement('div');
    cell.classList.add(`cell`);
    cell.classList.add(`row-${r}`);
    cell.classList.add(`column-${c}`);
    cell.classList.add(`state-dead`);
    cell.id = `cell-${r}-${c}`;

    cell.addEventListener("click", (e)=>{
        cell.classList.toggle('state-alive');
        cell.classList.toggle('state-dead');
    });

    return cell;
}

function resizeGridCells(){
    let cellHeight = (GRID_HEIGHT - 2*(heightElement.value-1))/heightElement.value;
    let cellWidth = (GRID_WIDTH - 2*(widthElement.value-1))/widthElement.value;

    gridElement.childNodes.forEach((row)=>{
        row.childNodes.forEach((cell)=>{
            cell.style.height = `${cellHeight}px`;
            cell.style.width = `${cellWidth}px`;
        });
    });
}

function fillGrid(width, height){
    for(let i = 0; i<height; i++){
        let currentRow = createRow(i, width);
        gridElement.appendChild(currentRow);
    }

    resizeGridCells();
}
fillGrid(heightElement.value, widthElement.value);