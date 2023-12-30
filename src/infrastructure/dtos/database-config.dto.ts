import { ClientInterface } from "../config/interfaces/client-interface";


export interface ClientConfigWithoutDatabaseDto extends Omit<ClientInterface,'database'>{}

export interface ClientConfigDto extends Partial<ClientInterface>{}