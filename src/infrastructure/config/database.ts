import { Client, QueryResult } from 'pg'
import { ClientConfigDto } from '../dtos/database-config.dto'

export class Database {

    private static instance: Database | null = null
    private client: Client | null
    private config: ClientConfigDto

    private constructor(config: ClientConfigDto) {
        this.client = null
        this.config = config
    }

    static getInstance(config: ClientConfigDto): Database {

        if (!Database.instance) {
            Database.instance = new Database(config)
        }

        if(config.database?.startsWith('test_')){
            Database.instance = new Database(config)
        }

        return Database.instance
    }

    async connect(){

        try {
            if (!this.client) {

                this.client = new Client(this.config)

                await this.client.connect()

                //console.log('Conexión establecida con la base de datos')
            }
        } catch (error) {
            //console.error('Error al conectar con la base de datos:', error)
            throw new Error(`${error}`)

        }

    }

    async query(sqlQuery: string, values: any[] = []){

        try {
            
            if (!this.client) {
                throw new Error('No hay conexión con la base de datos.')
            }

            const result = await this.client.query(sqlQuery, values)
            return result
        } catch (error) {
            throw error
        }
    }

    async disconnect() {

        if (this.client) {
            //console.log('Conexion cerrada')
            await this.client.end()
            this.client = null
        }
    }
}