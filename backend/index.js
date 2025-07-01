const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {dbConnection} = require("./src/database/connection");
const apiRouter = require('./src/routes');

const PORT = 8001;

// Configuración de CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Configuración de cabeceras para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', corsOptions.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  // Manejo de la solicitud preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

apiRouter(app);

app.get('/', (req, res) => {
    res.json({ message: 'Hello mr' });
});

const init = async () => {
    try {
        await dbConnection.authenticate();

        dbConnection.sync({ force: false })
            .then(() => {
                app.listen(PORT, () => {
                    console.log(`App listening at http://localhost:${PORT}`)
                });
            }).catch(err => {
            console.error('>>> Error al iniciar:', err);
        });
    } catch (error) {
        console.error("Ocurrió un error al conectar con la base de datos");
    }
};

init();