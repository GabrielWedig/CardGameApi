import AppDataSource from 'data-source';
import { GameSeeder } from './game.seeder';

async function runSeeders() {
  try {
    await AppDataSource.initialize();

    await GameSeeder.run(AppDataSource);

    await AppDataSource.destroy();
  } catch (err) {
    console.error('Error running seeders:', err);
    process.exit(1);
  }
}

runSeeders();
