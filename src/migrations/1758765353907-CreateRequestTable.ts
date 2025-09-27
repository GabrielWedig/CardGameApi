import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRequestTable1758765353907 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'request',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'senderId', type: 'int', isNullable: false },
          { name: 'receiverId', type: 'int', isNullable: false },
          { name: 'isAccepted', type: 'boolean', default: false },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'request',
      new TableForeignKey({
        columnNames: ['senderId'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'request',
      new TableForeignKey({
        columnNames: ['receiverId'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('request');
  }
}
