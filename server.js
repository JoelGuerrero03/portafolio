require('./config/config');
const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cors = require('cors');
const email = require("./server/email");
const compression = require('compression');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(compression());
// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');
app.all('/', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use(cors());

app.get('/', (req, res) => {
    res.render('home');
});


var transporter = new email({
    "service": "gmail",
    "port": 588,
    "auth": {
        "user": "joelg100314@gmail.com", // Cambialo por tu email
        "pass": "Semeolvido1003" // Cambialo por tu password
    },
    "tls": {
        "rejectUnauthorized": false
    }
});
app.post('/api/contacto', function(req, res, next) {
    var email = {
        from: `"${req.body.n} 👻" <${req.body.co}>`,
        to: "joelg1014@hotmail.com",
        subject: `${req.body.a}`,
        html: `
            <strong>Nombre:</strong> ${req.body.n} <br/>
            <strong>E-mail:</strong> ${req.body.co}  <br/>
            <strong>Celular:</strong> ${req.body.ce} <br/>
            <strong>Mensaje:</strong> ${req.body.m}
            `
    };
    transporter.enviarCorreo(email);
    res.send("OK");
});
// server-sent event stream
app.get('/events', function(req, res) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')

    // send a ping approx every 2 seconds
    var timer = setInterval(function() {
        res.write('data: ping\n\n')

        // !!! this is the important part
        res.flush()
    }, 2000)

    res.on('close', function() {
        clearInterval(timer)
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando peticiones en el puerto`, process.env.PORT)
});