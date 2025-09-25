import { Game } from 'src/game/game.entity';
import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';

export class GameSeeder {
  static async run(dataSource: DataSource) {
    const repo = dataSource.getRepository(Game);
    const userRepo = dataSource.getRepository(User);

    const user = await userRepo.findOneBy({ name: 'admin' });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const names = ['América', 'Europa', 'Asia', 'Africa', 'Oceania', 'ONU'];
    const games = names.map((name) => ({ name, createdBy: user }));

    for (const game of games) {
      await repo.save(game);
    }

    console.log('Games seeded!');
  }
}
