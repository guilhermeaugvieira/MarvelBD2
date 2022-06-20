import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "PostgresBD2",
    database: "marvel",
    synchronize: false,
    logging: false,
    entities: [
        "src/Negocio/Entidades/**/*.{ts, js}"
    ],
    migrations: [
        "src/Dados/Migrations/**/*.{ts, js}"
    ],
    subscribers: [],
    entityPrefix: 'tbl__',
    applicationName: 'MarvelAPI'
});