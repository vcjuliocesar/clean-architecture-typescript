import { createDataBase, createTables } from "../scripts/database/init"

export const init = () => {
    createDataBase()
        .then(() => createTables())
        .catch(error => {
            console.error('Error durante la inicialización:', error)
        })
}