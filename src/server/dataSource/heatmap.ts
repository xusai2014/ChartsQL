import { MongoDataSource } from 'apollo-datasource-mongodb'

export default class HeatMapData extends MongoDataSource<any,any> {
   async addHeatMap(heatMap) {
   const res = await this.collection.insertOne(heatMap);
   return res.result.ok === 1;
  }

  async getHeatMaps(){
      const result =  await this.collection.find({}).toArray();
      //const data = result.cursor();
      return result;
  }
}
