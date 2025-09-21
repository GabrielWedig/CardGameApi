import AppDataSource from 'data-source';
import { GameSeeder } from './game.seeder';
import { CardSeeder } from './card.seeder';

async function runSeeders() {
  try {
    await AppDataSource.initialize();

    await GameSeeder.run(AppDataSource);
    await CardSeeder.run(AppDataSource);

    await AppDataSource.destroy();
  } catch (err) {
    console.error('Error running seeders:', err);
    process.exit(1);
  }
}

runSeeders();
