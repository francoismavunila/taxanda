var mqtt = require('mqtt');

var options = {
    host: '9c641868feef4f288cb222c3d38b905e.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'Francois',
    password: '12345Fra'
}

//initialize the MQTT client
 const conn = (opts)=>{
    var client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});
}

export default conn;
