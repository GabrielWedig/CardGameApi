import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCardTable1758765426880 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'card',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'imagePath',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'audioPath',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'videoPath',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'text',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'answer',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'gameId',
            type: 'integer',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'card',
      new TableForeignKey({
        columnNames: ['gameId'],
        referencedTableName: 'game',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('card');
  }
}
