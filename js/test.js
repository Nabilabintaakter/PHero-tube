// function getTimeString (time){
//     const hours = parseInt(time/3600);
//     let restSeconds = parseInt(time % 3600);
//     const restMinutes = parseInt(restSeconds/60);
//     restSeconds = parseInt(restSeconds%60)
//     return `${hours} hrs ${restMinutes} min ${restSeconds} seconds ago`;
// }
// console.log(getTimeString(1234564340));


function getTimeString(time) {
    const days = parseInt(time / 86400);
    let restSeconds = parseInt(time % 86400);

    const restHours = parseInt(restSeconds / 3600);
    restSeconds = parseInt(restSeconds % 3600);

    const restMinutes = parseInt(restSeconds / 60);
    restSeconds = parseInt(restSeconds % 60);
    
    return `${days} days ${restHours} hrs ${restMinutes} min ${restSeconds} seconds ago`;
}
console.log(getTimeString(5415));