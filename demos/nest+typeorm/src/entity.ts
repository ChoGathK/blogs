/**
 * @global: postgres
 */

import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, UpdateDateColumn } from 'typeorm';

@Entity('Demo', { schema: 'public' })
export class Demo extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('text', { name: 'detail', nullable: true, default: '\'\'' })
  detail!: string;

  @Column('boolean', { name: 'isDeleted', default: 'false' })
  isDeleted!: boolean;

  @Column('bigint', { name: 'createTime', default: () => Date.now().toString() })
  createTime!: string;

  @Column('bigint', { name: 'updateTime', default: () => Date.now().toString() })
  updateTime!: string;

  /**
   * 设定默认方法
   *
   * @static findById
   * @static updateOne
   */

  static async findById(id: number) {
    const result = await this.findOne({
      where: { id, isDeleted: false },
    });
    return result;
  }

  static async updateById(id: number, detail: string) {
    await this.update(
      { id, isDeleted: false },
      { detail, updateTime: Date.now().toString() },
    );
  }

}
