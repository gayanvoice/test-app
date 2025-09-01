const {DefaultAzureCredential} = require("@azure/identity");
const {CosmosClient} = require("@azure/cosmos");

class CosmosDbClient{
    constructor(databaseId = 'ivy-tech-acdb', containerId = 'sensors-container', endpoint = 'https://ivy-tech-acdba.documents.azure.com:443/'){
        this.databaseId = databaseId;
        this.containerId = containerId;
        this.cosmosClient = new CosmosClient({ endpoint: endpoint, aadCredentials:new DefaultAzureCredential() });
    }
    async read(id, partition_key) {
        const database = await this.cosmosClient.database(this.databaseId);
        const container = database.container(this.containerId);
        return await container.item(id, partition_key).read();
    }
    async readAll() {
        const database = await this.cosmosClient.database(this.databaseId);
        const container = database.container(this.containerId);
        return await container.items.readAll().fetchAll();
    }
    async query(query){
        const database = await this.cosmosClient.database(this.databaseId);
        const container = database.container(this.containerId);
        return await container.items.query(query).fetchAll();
    }
    async upsert(item) {
        const database = await this.cosmosClient.database(this.databaseId);
        const container = database.container(this.containerId);
        return await container.items.upsert(item);

    }
    async delete(id, partition_key) {
        const database = await this.cosmosClient.database(this.databaseId);
        const container = database.container(this.containerId);
        return await container.item(id, partition_key).delete();
    }
}
module.exports = CosmosDbClient;