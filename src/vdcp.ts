import axios from "axios";
import { element } from "svelte/internal";
export module vdcp {

  export type Config = {
    ports: Array<{
      port: number;
      name: string;
      segments: [string];
    }>;
  };
  export class VDCPAPI {
		public ports:string;
		public times:string;
    constructor(serverURL:string){
      if( serverURL==null){
        console.log("OH NO, no server URL")
      }
      this.ports=serverURL+"/api/ports"
      this.times=serverURL+"/api/times"
    }
	}
  export type VDCPTimes = { times: Map<number, [number]> };
  ///gets the vdcp data from the server at the url provided, if null is given dummy data will be returned
  export async function getData(api:VDCPAPI) {
    /* if (url == null) {
      return {
        ports: [
          { port: 1, name: "cairns" },
          { port: 2, name: "bun" },
          { port: 3, name: "hvy" },
          { port: 4, name: "port 4" },
          { port: 5, name: "port 5" },
        ]
      };
    } */
    
    let portsString = "";
    let config: Config = (await axios
      .get(api.ports)).data


    return config;
  

  }
  export function setData(api:VDCPAPI, data: VDCPTimes) {
    /* if (url == null) {
      console.log("would have sent:", data);
    } */
  
    console.log("sent times:", data);
    axios.put(api.times, data).catch(err => console.error(err)).then(a => { console.log("got response:"); console.log(a) });
  
  }
}
