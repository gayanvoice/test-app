const CosmosDbClient = require("../middlewares/cosmos_db_client");
const SensorModel = require("../models/sensor_model");

class ApiController{
    constructor(databaseId = 'ivy-tech-acdb', containerId = 'sensors-container', endpoint = 'https://ivy-tech-acdba.documents.azure.com:443/'){
        this.cosmosClient = new CosmosDbClient(databaseId, containerId, endpoint);
    }
    async post(request, response){
        try {
            const formModel = SensorModel.createFromJSON(request.body);
            let result = await this.cosmosClient.upsert(formModel)
            if (result.statusCode === 201) {
                return response.status(201).send({message: "Post successful", data: result.resource});
            }
            return response.status(400).send({error: "No item created or updated"});
        }
        catch (error) {
            return response.status(400).send({error: error});
        }
    }
    async get(request, response) {
        const {id, partition_key} = request.query;
        if (id === undefined) {
            return response.status(400).send({error: "No id"});
        }
        if (partition_key === undefined) {
            return response.status(400).send({error: "No id"});
        }
        try {
            let result = await this.cosmosClient.read(id, partition_key)
            if (result.statusCode === 200) {
                return response.status(200).send({message: "Get successful", data: result.resource});
            }
            return response.status(400).send({error: "No item found"});
        }
        catch (error) {
            return response.status(400).send({error: error});
        }
    }
    async getAll(request, response) {
        try {
            let result = await this.cosmosClient.readAll();
            if (result.resources.length === 0) {
                return response.status(200).send({error: "No items found"});
            }
            return response.status(200).send({message: "GetAll successful", data: result.resources});
        }
        catch (error) {
            return response.status(400).send({ error: error.message });
        }
    }
    async query(request, response) {
        const query = request.body;
        if(query === undefined) {
            return response.status(400).send({ error: "No query" });
        }
        try {
            let result = await this.cosmosClient.query(query);
            if (result.resources.length === 0) {
                return response.status(200).send({error: "No items found"});
            }
            return response.status(200).send({message: "Query successful", data: result.resources});
        }
        catch (error) {
            return response.status(400).send({ error: error.message });
        }
    }
    async delete(request, response) {
        const {id, partition_key} = request.query;
        if (id === undefined) {
            return response.status(400).send({error: "No id"});
        }
        if (partition_key === undefined) {
            return response.status(400).send({error: "No id"});
        }
        try {
            let result = await this.cosmosClient.delete(id, partition_key)
            if (result.statusCode === 204) {
                return response.status(204).send();
            }
            return response.status(400).send({error: "Delete error"});
        }
        catch (error) {
            return response.status(400).send({ error: error.message});
        }
    }
}
module.exports = ApiController;