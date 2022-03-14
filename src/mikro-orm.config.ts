import { LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';

const microConfig: Options = {
    migrations: {
        path: 'dist/migrations',
        pathTs: 'src/migrations',
    },
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    host: process.env.HOST,
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
    debug: false,
    loadStrategy: LoadStrategy.JOINED,
    type: 'postgresql',
};

export default microConfig;
