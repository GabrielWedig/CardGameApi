import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { Nationality } from 'src/nationality/nationality.entity';
import { UserService } from 'src/user/user.service';
import { DataSource } from 'typeorm';

export class UserSeeder {
  static async run(dataSource: DataSource) {
    const app = await NestFactory.createApplicationContext(AppModule);
    const userService = app.get(UserService);

    const nationalityRepo = dataSource.getRepository(Nationality);
    const nationality = await nationalityRepo.findOneBy({ name: 'Brasil' });

    if (!nationality) {
      throw new Error('Nacionalidade não encontrada.');
    }

    await userService.create({
      name: 'admin',
      password: 'Senha10@',
      displayName: 'CardGame!',
      nationalityId: nationality.id,
    });

    console.log('User seeded!');
    await app.close();
  }
}
