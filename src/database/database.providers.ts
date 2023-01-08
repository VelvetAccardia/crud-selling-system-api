import { DataSource } from 'typeorm';

const port = Number(process.env.API_PORT);

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSourcePG = new DataSource({
        type: 'postgres',
        host: process.env.API_HOST,
        port: port,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [__dirname + '/database/postgres/**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      const dataSourceMDB = new DataSource({
        type: 'mongodb',
        database: 'mongo-database',
        synchronize: true,
        logging: ['query', 'error'],
        entities: [__dirname + '/database/mongo/**/*.entity{.ts,.js}'],
        migrations: [],
        subscribers: [],
      });

      dataSourcePG.initialize();
      dataSourceMDB.initialize();
    },
  },
];
