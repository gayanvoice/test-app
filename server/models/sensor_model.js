const {v4} = require("uuid");

class SensorModel {
    constructor(id, partition_key, text) {
        this.id = id;
        this.partition_key = partition_key;
        this.text = text;
    }
    static create(){
        return new SensorModel(v4(), 'heat_sensor', this.getRandomWord(5));
    }
    static createFromJSON(json) {
        return new SensorModel(json.id,  json.partition_key, json.text);
    }
    static getRandomWord(chars) {
        const letters = "abcdefghijklmnopqrstuvwxyz";
        let word = "";
        for (let i = 0; i < chars; i++) {
            word += letters[Math.floor(Math.random() * letters.length)];
        }
        return word;
    }
}
module.exports = SensorModel;