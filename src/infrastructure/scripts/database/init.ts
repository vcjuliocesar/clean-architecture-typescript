import { Database } from "../../config/database";
import { ClientConfig } from "../../config/config"
import { ClientConfigWithoutDatabaseDto } from "../../dtos/database-config.dto";

const config: ClientConfigWithoutDatabaseDto = {
    host: ClientConfig.host,
    port: ClientConfig.port,
    user: ClientConfig.user,
    password: ClientConfig.password
}

async function databaseExists(client: Database, dbName: string): Promise<boolean> {

    const result = await client.query(
        `SELECT datname FROM pg_catalog.pg_database WHERE datname = $1`,
        [dbName]
    )

    return (result.rows.length > 0) ?? false
}

async function tableExists(client: Database, tableName: string): Promise<boolean> {
    const result = await client.query(
        `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1) AS "exists"`,
        [tableName]
    );
    
    return result.rows[0].exists
}

export async function createDataBase() {

    const client = Database.getInstance()

    const dbName = ClientConfig.database

    try {
        await client.connect(config)

        const dbExists = await databaseExists(client, dbName)

        if (!dbExists) {
            await client.query(`CREATE DATABASE ${dbName}`)
        } else {
            console.log(`La base de datos '${dbName}' ya existe.`);
        }

    } catch (error) {
        console.error('Error en el proceso:', error)
    } finally {
        await client.disconnect();
    }
}

export async function createTables() {

    const client = Database.getInstance()

    try {

        await client.connect(ClientConfig)
        
        const tablesToCreate = [
            {
                name: 'users',
                query:`
                CREATE TABLE users (
                  id SERIAL PRIMARY KEY,
                  name VARCHAR(50) NOT NULL,
                  phone VARCHAR(50) NOT NULL,
                  email VARCHAR(100) UNIQUE NOT NULL,
                  age INTEGER NOT NULL,
                  gender VARCHAR(50) NOT NULL,	
                  password VARCHAR(100) NOT NULL,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
              `,
            },
        ]

        for(const table of tablesToCreate) {
            const tableExistsResult = await tableExists(client,table.name)
            
            if(!tableExistsResult) {
                await client.query(table.query)
                console.log(`Tabla '${table.name}' creada.`);
            }else{
                console.log(`La tabla '${table.name}' ya existe.`);
            }
        }
    } catch (error) {
        console.error('Error en el proceso:', error)
    }finally{
        await client.disconnect()
        console.log('Proceso completado.');
    }

}

createDataBase()
    .then(() => createTables())
    .catch(error => {
        console.error('Error durante la inicialización:', error)
    })