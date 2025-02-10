let intervalId = undefined;

function toggleState(cell){
    cell.classList.toggle('state-alive');
    cell.classList.toggle('state-dead');
}

function createStateMatrix(height, width){
    let res = new Array();

    for(let r = 0; r<height; r++){
        res.push(new Array());

        for(let c = 0; c<width; c++){
            res[r].push(0);
        }
    }

    return res;
}

function determineState(width, height){
    const shouldToggle = createStateMatrix(height, width);

    for(let r = 0; r < height; r++){
        let currentRow = gridElement.children[r];
        shouldToggle.push(new Array());

        for(let c = 0; c < width; c++){
            let currentCell = currentRow.children[c];
            let currentAlive = currentCell.classList.contains('state-alive');

            let votes = 0;

            for(let i = r-1; i <= r+1; i++){
                for(let j = c-1; j <= c+1; j++){
                    if(i == r && j == c) continue;

                    if(i >= 0 && i < height && j >= 0 && j < width){
                        let row = gridElement.children[i];
                        let cell = row.children[j];

                        if(cell.classList.contains('state-alive')){
                            votes++;
                        }
                    }
                }
            }

            if(currentAlive == true){
                if(votes < 2 || votes > 3) shouldToggle[r][c] = 1;
            }else{
                if(votes == 3) shouldToggle[r][c] = 1;
            }
        }
    }

    return shouldToggle;
}

function updateState(shouldToggle, width, height){
    for(let r = 0; r < height; r++){
        let currentRow = gridElement.children[r];
        shouldToggle.push(new Array());

        for(let c = 0; c < width; c++){
            let currentCell = currentRow.children[c];

            if(shouldToggle[r][c]){
                toggleState(currentCell);
            }            
        }
    }
}

function nextState(){
    let width = getResolution();
    let height = getResolution();

    const shouldToggle = determineState(width, height);
    updateState(shouldToggle, width, height);
}

function startSimulation(){
    intervalId = setInterval(nextState, (1/getSimSpeed())*1000);
}
function stopSimulation(){
    clearInterval(intervalId);
    intervalId = undefined;
}

startSimulationBtn.addEventListener('click', 
    (e)=>{
        if(startSimulationBtn.value == 'Start Simulation'){
            startSimulation();
            startSimulationBtn.value = 'Stop Simulation';
        }else{
            stopSimulation();
            startSimulationBtn.value = 'Start Simulation';
        }
    }
);

simSpeedElement.addEventListener('input', 
    (e)=>{
        if(intervalId){
            stopSimulation();
            startSimulation();
        }
    }
);

resetStateBtn.addEventListener('click',
    (e)=>{
        if(intervalId){
            stopSimulation();
            startSimulationBtn.value = 'Start Simulation';
        }

        gridElement.childNodes.forEach((row)=>{
            row.childNodes.forEach((cell)=>{
                if(cell.classList.contains('state-alive')){
                    toggleState(cell);
                }
            });
        });
    }
);

window.addEventListener("resize", () => {
    resizeGridCells();
});

randomizeBtn.addEventListener("click", 
    (e)=>{
        gridElement.childNodes.forEach((row)=>{
            row.childNodes.forEach((cell)=>{
                if(Math.random()<0.1){
                    toggleState(cell);
                }
            });
        });
    }  
);
