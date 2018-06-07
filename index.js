require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const DarkSkyApi = require('dark-sky-api');
const server = http.createServer(app);
const io = require('socket.io')(server);
const axios = require('axios');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
  res.send('Yay! App is working!')
})

io.origins('*:*');
// io.set('transports', ['websocket']);

// Open port for socket communication
server.listen(process.env.PORT || 3000);
console.log(process.env.REACT_APP_DARKSKY_API);
console.log(process.env.REACT_APP_GOOGLE_API);

// Dark Sky API
DarkSkyApi.apiKey = process.env.REACT_APP_DARKSKY_API;
DarkSkyApi.proxy = true;
DarkSkyApi.initialize();

//Google Geocoding API
const Google_API_KEY = process.env.REACT_APP_GOOGLE_API;

io.on('connection', function (socket) {

    // Receive user's coordinates
    socket.on('coords', function (location) {
        console.log('Receieved user coords' + location);
        // Call Dark Sky API
        DarkSkyApi.extendHourly(true);
        DarkSkyApi.loadForecast(location)
            .then(result => {
                console.log(result);
                socket.emit('darkSkyForecast', result);
            });
        DarkSkyApi.loadCurrent(location)
            .then(result => {
                console.log(result);
                socket.emit('darkSkyCurrent', result);
            });
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${Google_API_KEY}`)
            .then(response => {
                let userAddress = response.data.results[0].formatted_address;
                socket.emit('userAddress', userAddress);
            })
            .catch(error => {
                console.log(error);
            });
    });

    socket.on('zip', (zip) => {
        console.log('User input ZIP code: ' + zip);
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zip}&key=${Google_API_KEY}`)
            .then(response => {
                if (response.data.status != 'ZERO_RESULTS') {
                console.log(response.data.results[0].geometry.location);
                let userLocation = {
                    latitude: response.data.results[0].geometry.location.lat,
                    longitude: response.data.results[0].geometry.location.lng
                };
                let userAddress = response.data.results[0].formatted_address;
                socket.emit('userAddress', userAddress);
                DarkSkyApi.loadForecast(userLocation)
                    .then(result => {
                        console.log(result);
                        socket.emit('darkSkyForecastUpdate', result);
                    });
                DarkSkyApi.loadCurrent(userLocation)
                    .then(result => {
                        console.log(result);
                        socket.emit('darkSkyCurrentUpdate', result);
                    });
                } else {
                    socket.emit('wrongZip', 'Please, enter existing postal code...');
                }
            })
            .catch(error => {
                console.log(error);
            });
    })
});