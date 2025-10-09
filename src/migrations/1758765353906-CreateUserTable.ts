import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserTable1758765353906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'displayName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'photo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'nationalityId',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'about',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'since',
            type: 'timestamptz',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        columnNames: ['nationalityId'],
        referencedTableName: 'nationality',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
