import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import idGenerator from './src/utils/idGenerator.js'

const app = express()
const port = '8000'

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.json())


const TEST_DATA = [
    { id: 0, description: 'Get some milk' },
    { id: 1, description: 'Slice the bread' },
    { id: 2, description: 'Do some laundry' },
    { id: 3, description: 'Feed a dog'}
]

const getId = idGenerator(TEST_DATA.length)



app.get('/api/todolist', (req,res) => {
    res.json(TEST_DATA)
})


app.post('/api/todolist', (req, res) => {
    const { description } = req.body

    const newItem = {
        id: getId.next().value,
        description: description || '',
    }
    TEST_DATA.push(newItem)
    res.json(newItem)
})


app.post('/api/todolist/:id', (req, res) => {
    const { id } = req.params
    const { description } = req.body

    const index = TEST_DATA.findIndex((description) => description.id === Number(id))
    const item = TEST_DATA[index]

    if (index === -1){
        res.status(404).json({ error: `Item with ID ${id} not found.`})
    } else {
        const item = TEST_DATA[index]
    }

    item.description = description ?? item.description

    res.json(item)
})



app.post('/api/todolist/:id/delete', (req, res) => {
    const { id } = req.params

    const index = TEST_DATA.findIndex((item) => item.id === Number(id))

    if(index === -1 ) {
        res.status(404).json({ error: `Item with ID ${id} not found.`})
    } else {
        TEST_DATA.splice(index,1)
        res.json({ id: Number(id)})
   }
})




ViteExpress.config({ printViteDevServerHost: true })

ViteExpress.listen(app,port, () => console.log(`Listening on http://localhost:${port}`))