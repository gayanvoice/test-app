const express = require('express')
const ApiController = require('./controllers/api_controller')
const router = express.Router()

router.get('/get', async (request, response) => {
    const apiController = new ApiController()
    return await apiController.get(request, response)
})
router.get('/getAll', async (request, response) => {
    const apiController = new ApiController()
    return await apiController.getAll(request, response)
})
router.post('/query', async (request, response) => {
    const apiController = new ApiController()
    return await apiController.query(request, response)
})
router.post('/post', async (request, response) => {
    const apiController = new ApiController()
    return await apiController.post(request, response)
})
router.delete('/delete', async (request, response) => {
    const apiController = new ApiController()
    return await apiController.delete(request, response)
})
module.exports = router