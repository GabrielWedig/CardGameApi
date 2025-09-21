import { Game } from 'src/game/game.entity';
import { DataSource } from 'typeorm';

export class GameSeeder {
  static async run(dataSource: DataSource) {
    const repo = dataSource.getRepository(Game);

    const games = [
      { name: 'América' },
      // { name: 'Europa' },
      // { name: 'Asia' },
      { name: 'Africa' },
      // { name: 'Oceania' },
      // { name: 'Outros' },
    ];

    for (const game of games) {
      await repo.save(game);
    }

    console.log('Games seeded!');
  }
}
