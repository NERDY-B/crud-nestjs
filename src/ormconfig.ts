import { DataSource } from 'typeorm';
// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '@Esan0234',
  database: 'crud',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  // migrations: [__dirname + '/migrations/**/*{.ts, .js}'],
  migrations: ['src/migrations/*{.ts, .js}'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
