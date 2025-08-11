import { AxiosInstance } from "axios";
type uuidFunction = () => string;

export class helloWorld {
  private uuid: uuidFunction;
  private httpClient: AxiosInstance;
  

  constructor(httpClient: AxiosInstance, uuid: uuidFunction) {
    // Receive dependencies
    
    this.httpClient = httpClient;
    this.uuid = uuid;
  }

  async init() {
    // Add business logic here!

    return { success: true };
  }
}