import { Nationality } from 'src/nationality/nationality.entity';
import { DataSource } from 'typeorm';

export class NationalitySeeder {
  static async run(dataSource: DataSource) {
    const repo = dataSource.getRepository(Nationality);

    const nationalities = [
      {
        name: 'Brasil',
        photo:
          'https://res.cloudinary.com/dqwif7teu/image/upload/v1758654214/nationalities/lbbuszkxhkojzjpltj6v.png',
      },
    ];

    for (const nationality of nationalities) {
      await repo.save(nationality);
    }

    console.log('Nationalities seeded!');
  }
}
