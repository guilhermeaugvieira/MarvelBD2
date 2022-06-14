import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "PostgresBD2",
    database: "marvel",
    synchronize: true,
    logging: false,
    entities: [
        "src/entity/**/*.{ts, js}"
    ],
    migrations: [
        "src/migration/**/*.{ts, js}"
    ],
    subscribers: [],
    entityPrefix: 'tbl__',
    applicationName: 'MarvelAPI'
})