const express = require('express');
const app = express();
const cors = require('cors');
const {dbConnection} = require("./src/database/connection");
const apiRouter = require('./src/routes');

const PORT = 8001;

app.use(cors());
app.use(express.json());

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
        console.error(error);
    }
};

init();