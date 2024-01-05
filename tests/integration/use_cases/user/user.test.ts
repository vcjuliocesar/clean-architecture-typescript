import { UserEntity } from "../../../../src/domain/entities/user-entity"
import { ClientConfig } from "../../../../src/infrastructure/config/config"
import { Database } from "../../../../src/infrastructure/config/database"
import { config,databaseExists, tableExists } from "../../../../src/infrastructure/scripts/database/init"


describe('Set up:database',()=>{
   
    const mainClient = Database.getInstance(config)
    const testDatabase = `test_${ClientConfig.database}`

    beforeAll(async () => {
        try{
            
            await mainClient.connect()

            const dbExists = await databaseExists(mainClient, testDatabase)

            if(!dbExists) {
                await mainClient.query(`CREATE DATABASE ${testDatabase}`)
            }

            await mainClient.disconnect()
            
            const testDbConfig = {...config,database:testDatabase}
            
            const testClient = Database.getInstance(testDbConfig)
            
            await testClient.connect()
            
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
                
                const tableExistsResult = await tableExists(testClient,table.name)
                
                if(!tableExistsResult) {
                    await testClient.query(table.query)
                }
            }

            await testClient.disconnect()
            
        
        }catch(error){
            throw error
        }
    })

    afterAll(async () => {
        try {
            
            await mainClient.connect()
            
            await mainClient.query(`DROP DATABASE IF EXISTS ${testDatabase} WITH (FORCE)`)

            await mainClient.disconnect()

        } catch (error) {
            throw error;
        }
    })
    describe('Use case:create user', () => {
        it('return an exception if user already exists', async () => {
          //const persistUser:UserEntity = new UserEntity(1,)
        });
    });    
})

