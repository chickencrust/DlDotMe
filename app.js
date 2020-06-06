/** Main part of the biznit **/

//Get dependencies
const https = require('https');

//Start deezloader
const { spawn } = require('child_process');
const deezLoader = spawn('Deezloader Remix 4.4.0.exe', ['-s']);



//Initialise stuff
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
//Main function

function main(args){
    
    
    readline.question(deezLoader.pid, (name) => {
        console.log('Execution repartie');
        cleanupDeezLoader(deezLoader);
        readline.close();
      })

    
    //killed does not mean the process is shut down, just means the kill message has been successfully sent to deezloader
    console.log(deezLoader.killed);

}

main();

function spotifyPlaylistResults(){

}

//Because deezloader somehow spawns 3 processes
//might be a better way to do this
function cleanupDeezLoader(initialProcess){
    initialProcess.kill();
    const { spawn } = require('child_process');
    const cmd = spawn('cmd.exe', ['/c taskkill /f /im Deezloader*']);
}


  //TODO: Handle deezloader crashing/unexpected events
  //TODO: Handle errors 
  //TODO: Parse commands properly
  //TODO: Compare with currently dl'd files or last version of playlist 
  //TODO: AutoAnalyse files with beaTunes
  //TODO: Add option to point output directory for downloads, move to usb key/network location or whatnot