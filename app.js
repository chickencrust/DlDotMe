/** Main part of the biznit **/

//Get dependencies
const https = require('https');

//Start deezloader
const { spawn } = require('child_process');
const deezLoader = spawn('Deezloader Remix 4.4.0.exe', ['-s']);

let httpPlaylistTemplate = `
{
    "spotifyplaylist": "REPLACE"
}`


//Initialise stuff
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
//Main function

function main(args){
    
    
    readline.question('Entrer un nom de playlist spotify.', (nom) => {
        spotifyPlaylistResults(nom);
        console.log('Execution repartie');
        cleanupDeezLoader(deezLoader);
        readline.close();
      })

    
    //killed does not mean the process is shut down, just means the kill message has been successfully sent to deezloader
    console.log(deezLoader.killed);

}

main();
//TODO : complete this, see dox to prepare post properly 
//https://nodejs.org/api/http.html#http_http_request_url_options_callback
//gets a spotify playlist tracklist then returns the tracknames
function spotifyPlaylistResults(query){
    let requestData = httpPlaylistTemplate.replace("REPLACE",query);
    const options = {
        hostname: 'localhost',
        port : '1730',
        path : '/api/tracks/',
        method : 'POST',
        json : requestData

    }

    let httpRequest = 
    https.request(options, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(JSON.parse(data).explanation);
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
    
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
  //TODO: Make a UI/proper CLI ?
  //TODO: Multi plat support