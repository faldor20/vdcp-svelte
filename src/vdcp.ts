import axios from "axios";
import { element } from "svelte/internal";
export module vdcp {
  type Ports = Array<{
    port: number;
    name: string;
  }>;
  type Times=Map<number,number>;
  ///gets the vdcp data from the server at the url provided, if null is given dummy data will be returned
  export function getData(url: string) {
    if (url == null) {
      return [
        { port: 1, name: "cairns" },
        { port: 2, name: "bun" },
        { port: 3, name: "hvy" },
        { port: 4, name: "port 4" },
        { port: 5, name: "port 5" },
      ];
    } else {
      let portsString = "";
      let ports: Ports = [];
      axios
        .get(url + "/ports")
        .then((data) => (ports = JSON.parse(data.data)))
        .catch((err) => console.log(err));
      return ports;
    }
}
    export function setData(url: string,data:Times) {
       if(url==null){
            console.log("would have sent:",data);
       }else{
            axios.put(url+"/times",data).catch(err=>console.error(err));
       }
  }
}
