// Imports
const geoip = require('geoip-lite');
const express = require('express');
const ngrok = require('ngrok');
const path = require('path');
const app = express()
const port = 8080


// Your ngrok auth token (Get it here: https://dashboard.ngrok.com/get-started/your-authtoken)
const token = 'PUT YOUR AUTH TOKEN HERE'


// Terminal Color Variables
const Reset = '\x1b[0m'
const Bold = '\x1b[1m'
const Dim = '\x1b[2m'
const Underline = '\x1b[4m'
const FgGreen = '\x1b[32m'
const FgMagenta = '\x1b[35m'
const FgCyan = '\x1b[36m'

// Main Server Function
function startServer() {
    // Creating Ngrok Tunnel
    (async function() {
        const url = await ngrok.connect({authtoken: token, addr: 8080})
        console.log(Bold + FgMagenta + 'Your url: ' + Reset, url)
    })();

    // App Request Handler
    app.get('/', (req, res) => {
        // Declare User Request Variables
        var userAgent = req.get('User-Agent')
        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        if (ip.substr(0, 7) == '::ffff:') {
            ip = ip.substr(7)
        }
        var geo = geoip.lookup(ip);

        // Server Side Responses (Admin Feedback)
        console.log(Bold + FgCyan + '\nNew Request Received ✔️\n' + Reset)
        console.log(FgGreen + 'IP: ' + Reset, Underline + ip + Reset)
        console.log(FgGreen + 'User-Agent: ' + Reset, userAgent)
        console.log(FgGreen + 'Geo: ' + Reset, JSON.stringify(geo, null, 2) + '\n')

        //Client Side Responses (Client View)
        res.sendFile(path.join(__dirname, 'public/index.html'))
    })

    // App Listener
    app.listen(port, () => {
        console.log(FgMagenta + ' _____ _     _                                     \n|  ___(_)___| |__   ___ _ __ _ __ ___   __ _ _ __  \n| |_  | / __| \'_ \\ / _ \\ \'__| \'_ \` _ \\ / _` | \'_ \\ \n|  _| | \\__ \\ | | |  __/ |  | | | | | | (_| | | | |\n|_|   |_|___/_| |_|\\___|_|  |_| |_| |_|\\__,_|_| |_|')
        console.log(Dim + 'By Dox-Dev (https://github.com/dox-dev)\n' + Reset)
    })
}

// Start Server
startServer()