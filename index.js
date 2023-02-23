const http = require('http');
const url = require('url');
const handlebars = require('handlebars');

// Parámetros de configuración del servidor
const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
let allowedFormat = '24h';
let allowedMonth = 'number';
let allowedYear = 'complete';
let empresa = '';

// Configuración del template Handlebars
const template = handlebars.compile(`
    <html>
        <head>
            <title>Fecha y hora actual</title>
        </head>
        <body>
            <h1>Fecha y hora actual</h1>
            <p>{{fecha}}</p>
            <p>{{hora}}</p>
            <p>Este servicio llega a usted gracias a {{empresa}}</p>
        </body>
    </html>
`);

// Creación del servidor HTTP
const server = http.createServer((req, res) => {
    const method = req.method.toUpperCase();
    const urlParts = url.parse(req.url, true);
    const query = urlParts.query;
    const path = urlParts.pathname;

    // Verificar si el método es válido
    if (!allowedMethods.includes(method)) {
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end(`Method ${method} Not Allowed`);
        return;
    }

    // Verificar si se proporcionó el parámetro de empresa
    if (query.empresa) {
        empresa = query.empresa;
    }

    // Verificar si se proporcionó el parámetro de formato de hora
    if (query.formato) {
        allowedFormat = query.formato;
    }

    // Verificar si se proporcionó el parámetro de formato de mes
    if (query.mes) {
        allowedMonth = query.mes;
    }

    // Verificar si se proporcionó el parámetro de formato de año
    if (query.anio) {
        allowedYear = query.anio;
    }

    // Obtener la fecha y hora actual
    const now = new Date();
    const year = allowedYear === 'complete' ? now.getFullYear() : now.getFullYear().toString().slice(-2);
    const month = allowedMonth === 'name' ? now.toLocaleString('default', {month: 'long'}) : now.getMonth() + 1;
    const day = now.getDate();
    const hour = allowedFormat === '24h' ? now.getHours() : (now.getHours() % 12 || 12);
    const minute = now.getMinutes();
    const second = now.getSeconds();

    // Generar la fecha y hora en el formato deseado
    const fecha = `${day}-${month}-${year}`;
    const hora = `${hour}:${minute}:${second} ${allowedFormat === '24h' ? '' : now.getHours() < 12 ? 'AM' : 'PM'}`;

    // Generar la respuesta HTML
    const html = template({fecha, hora, empresa});

    // Enviar la respuesta
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

// Iniciar el servidor
server.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});

// Para personalizar el servidor con los parámetros indicados, agrega los parámetros correspondientes a la 
// URL al acceder al servidor. Por ejemplo, para cambiar el formato de hora a AM/PM, agrega formato=ampm a la 
// URL de esta manera: http://localhost:3000/?formato=ampm.
// Para capturar el valor de "empresa" será capturado por el servidor y utilizado para mostrarlo en la respuesta.
// proporciona un valor para el parámetro "empresa" en la URL al hacer la petición al servidor. Con su respectivo 
// valor en la URL al hacer la petición, por ejemplo: "http://localhost:3000/?empresa=Mi%20Empresa".
// Por ejemplo, para obtener la fecha y hora en formato de 12 horas, con el mes en nombre completo y el año 
// abreviado, debes hacer una solicitud con la siguiente URL:
// En esta URL, el parámetro formato tiene el valor 12h para indicar que se desea el formato de 12 horas, el parámetro 
// mes tiene el valor name para indicar que se desea el mes en nombre completo y el parámetro anio tiene el valor 
// abreviado para indicar que se desea el año abreviado. También se ha proporcionado el parámetro empresa con el 
// valor MiEmpresa para mostrarlo en el mensaje de respuesta.