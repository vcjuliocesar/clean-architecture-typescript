import { Client } from 'pg'
import { ClientConfigDto } from '../dtos/database-config.dto'

export class Database {

    private static instance: Database | null = null
    private client: Client | null

    constructor() {
        this.client = null
    }

    static getInstance(): Database {

        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance
    }

    async connect(config: ClientConfigDto) {

        try {
            this.client = new Client(config)

            await this.client.connect()

            console.log('Conexión establecida con la base de datos')
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error)

            throw new Error(`${error}`)
        }

    }

    async query(sqlQuery: string, values: any[] = []) {
        
        if (!this.client) {
            throw new Error('No hay conexión con la base de datos.')
        }

        try {
            return await this.client.query(sqlQuery, values)
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            throw new Error(`${error}`)
        }
    }

    async disconnect() {

        if (this.client) {
            await this.client.end()
            console.log('Conexion cerrada')
        }
    }
}