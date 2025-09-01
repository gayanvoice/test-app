import { describe, it, expect } from "vitest"
import SensorModel from "../server/models/sensor_model";


describe("API test", () => {

    let sensorModel= SensorModel.create();

    console.log(sensorModel);

    it("localhost/api/post", async () => {
        const url = new URL("http://localhost:8080/api/post")
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sensorModel)
        });
        if (response.ok) {
            const responseJson = await response.json();
            // console.log(responseJson);
            expect(responseJson.data.id).toBe(sensorModel.id);
            expect(responseJson.data.partition_key).toBe(sensorModel.partition_key);
            expect(responseJson.data.text).toBe(sensorModel.text);
        }
    }, 10000)
    it("localhost/api/get", async () => {
        const url = new URL("http://localhost:8080/api/get")
        url.searchParams.append("id", sensorModel.id)
        url.searchParams.append("partition_key", sensorModel.partition_key)

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        if (response.ok) {
            const responseJson = await response.json();
            // console.log(responseJson);
            expect(responseJson.data.id).toBe(url.searchParams.get("id"));
            expect(responseJson.data.partition_key).toBe(url.searchParams.get("partition_key"));
            expect(responseJson.data.text).toBe(sensorModel.text);
        }
    }, 10000);
    it("localhost/api/getAll", async () => {
        const url = new URL("http://localhost:8080/api/getAll")
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const responseJson = await response.json();
        // console.log(responseJson);
        expect(response.ok).toBe(true);
    }, 10000);

    it("localhost/api/query", async () => {
        const querySpec = {
            query: "SELECT * FROM c WHERE c.id = '" + sensorModel.id+ "'",
        };
        const url = new URL("http://localhost:8080/api/query")
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(querySpec)
        });
        if (response.ok) {
            const responseJson = await response.json();
            console.log(responseJson);
            expect(responseJson.data[0].id).toBe(sensorModel.id);
            expect(responseJson.data[0].partition_key).toBe(sensorModel.partition_key);
            expect(responseJson.data[0].text).toBe(sensorModel.text);
        }
    }, 10000)
    it("localhost/api/delete", async () => {
        const url = new URL("http://localhost:8080/api/delete")
        url.searchParams.append("id", sensorModel.id)
        url.searchParams.append("partition_key", sensorModel.partition_key)

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        console.log(response)
        expect([204, 404]).toContain(response.status);
    }, 10000);

})
