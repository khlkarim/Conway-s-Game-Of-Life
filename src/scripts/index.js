const gridElement = document.querySelector('#grid');

const resolutionElement = document.querySelector('#resolution');
const simSpeedElement = document.querySelector('#speed');

const startSimulationBtn = document.querySelector('#start-simulation-btn');
const randomizeBtn = document.querySelector('#randomize-btn');
const resetStateBtn = document.querySelector('#reset-state-btn');

function getResolution(){
    return Math.min(100, Math.max(1,resolutionElement.value));
}

function getSimSpeed(){
    return Math.min(100, Math.max(1,simSpeedElement.value));
}