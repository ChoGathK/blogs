/**
 * @type: postgres
 */

import { CommonEntity } from './common';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Demo', { schema: 'public' })
export class Demo extends CommonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text', { default: '\'\'', nullable: true })
  detail!: string;

  @Column('boolean', { default: 'false' })
  isDeleted!: boolean;

  @CreateDateColumn()
  createTime!: Date;

  @UpdateDateColumn()
  updateTime!: Date;
}
