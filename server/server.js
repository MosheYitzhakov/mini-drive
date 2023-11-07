const express = require('express')
const app = express();
const GRouter = require('./routers/get')
const PutRouter = require('./routers/put')
const PostRouter = require('./routers/post')
const DeleteRouter = require('./routers/delete')
const cors = require('cors');

app.use(express.json())
app.use(cors());

app.use(express.static('userData'))

app.get('/*', GRouter)
app.put('/*',PutRouter)
app.post('/*',PostRouter)
app.delete('/*',DeleteRouter)



const port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

