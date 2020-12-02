import axios from "axios";
import { element } from "svelte/internal";
export module vdcp {
  
  export type Config ={
    ports: Array <{
      port: number;
      name: string;
      segments:[string];
  }>;
  };
  
  export type VDCPTimes={times:Map<number,[number]>};
  ///gets the vdcp data from the server at the url provided, if null is given dummy data will be returned
  export async function getData(url: string) {
    if (url == null) {
      return {ports:[
        { port: 1, name: "cairns" },
        { port: 2, name: "bun" },
        { port: 3, name: "hvy" },
        { port: 4, name: "port 4" },
        { port: 5, name: "port 5" },
      ]};
    } else {
      let portsString = "";
      let config:Config =  (await axios
        .get(url + "/ports")).data
       
        
      return config;
    }
    
}
    export function setData(url: string,data:VDCPTimes) {
       if(url==null){
            console.log("would have sent:",data);
       }else{
        console.log("sent times:",data);
            axios.put(url+"/times",data).catch(err=>console.error(err));
       }
  }
}
