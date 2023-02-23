// Nota: npm a veces no se iniciar con todos los nombres de carpeta usar camel case y guión bajo.

import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import art from 'ascii-art';



const app = express();
app.use(cors())

app.get('/', (req, res) => {
    console.log(chalk.green('Se recibió una petición GET.'));
    art.font('SEBASTIAN AGUILERA', 'Doom')
      .then(rendered => {
        console.log(chalk.yellow(rendered));
      })
      .catch(error => {
        console.error(error);
      });
    res.send('¡Hola! Esta es una petición GET.');
  });
  
app.post('/', (req, res) => {
    console.log(chalk.blue('Se recibió una petición POST.'));
    art.font('POST', 'Doom')
      .then(rendered => {
        console.log(chalk.yellow(rendered));
      })
      .catch(error => {
        console.error(error);
      });
    res.send('¡Hola! Esta es una petición POST.');
});
  
app.put('/', (req, res) => {
    console.log(chalk.red('Se recibió una petición PUT.'));
    art.font('PUT', 'Doom')
      .then(rendered => {
        console.log(chalk.yellow(rendered));
      })
      .catch(error => {
        console.error(error);
      });
    res.send('¡Hola! Esta es una petición PUT.');
});
  
app.delete('/', (req, res) => {
    console.log(chalk.magenta('Se recibió una petición DELETE.'));
    art.font('DELETE', 'Doom')
      .then(rendered => {
        console.log(chalk.yellow(rendered));
      })
      .catch(error => {
        console.error(error);
      });
    res.send('¡Hola! Esta es una petición DELETE.');
});


  


app.listen(3000, ()=> console.log('Escuchando en http://localhost:3000'));

