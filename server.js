const express = require('express')
const app = express()
const port = 2222
const cors = require('cors')

const { products } = require('./products')

// Cors
const corsOptions = {
    origin: 'http://10.247.194.99:5173',
}

app.use(cors(corsOptions))

// Middlewares
function logUserAgent(req, res, next) {
    console.log(req.headers['user-agent'])
    next()
}

function stopRequest(req, res, next) {
    console.log('Stop request');
    res.status(403).send('Stop request');
}

// Paths
app.use('/secret', stopRequest);
app.use(logUserAgent)

app.get('/products', (req, res) => {
    res.json(products)
});

app.get('/', (req, res) => {
    res.json('Hello World!')
});

app.post('/', (req, res) => {
    res.json('Create data')
});

app.put('/', (req, res) => {
    res.json('Update data')
})

app.delete('/', (req, res) => {
    res.json('Delete data')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})