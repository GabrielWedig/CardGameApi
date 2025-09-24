import AppDataSource from 'data-source';
import { GameSeeder } from './game.seeder';
import { CardSeeder } from './card.seeder';
import { NationalitySeeder } from './nationality.seeder';
import { UserSeeder } from './user.seeder';

async function runSeeders() {
  try {
    await AppDataSource.initialize();

    await NationalitySeeder.run(AppDataSource);
    await UserSeeder.run(AppDataSource);
    await GameSeeder.run(AppDataSource);
    await CardSeeder.run(AppDataSource);

    await AppDataSource.destroy();
  } catch (err) {
    console.error('Error running seeders:', err);
    process.exit(1);
  }
}

runSeeders();
