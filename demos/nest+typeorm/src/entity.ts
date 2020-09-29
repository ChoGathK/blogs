/**
 * @type: postgres
 */

import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, FindOneOptions, FindManyOptions, DeepPartial, FindConditions } from "typeorm";

@Entity('Demo', { schema: 'public' })
export class Demo extends BaseEntity  {
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

  /**
   * @static toFindById 按 ID 查询一条记录
   *
   * @param: id `number`
   * @param: options 可选，查询条件
   */

  static async toFindById(id: number, options?: FindOneOptions<Demo>): Promise<Demo> {
    const result = await this.findOne({ id, isDeleted: false }, options);
    return result;
  }

  /**
   * @static toFind 按条件查询一条记录
   *
   * @param: options 查询条件
   */
  static async toFind(options: FindOneOptions<Demo>): Promise<Demo> {
    options.where = Object.assign(options.where, { isDeleted: false });
    const result = await this.findOne(options);
    return result;
  }

  /**
   * @static toFindAll 按条件查询全部
   *
   * @param: options 查询条件
   */
  static async toFindAll(options: FindManyOptions<Demo>): Promise<Demo[]> {
    options.where = Object.assign(options.where, { isDeleted: false });
    const result = await this.find(options);
    return result;
  }

  /**
   * @static toCreate 创建实体（如果存在且变动就更新，不存在就执行新增）
   *
   * @param: partialEntity 实体
   */
  static async toCreate(partialEntity: DeepPartial<Demo>): Promise<void> {
    const entity = this.create(partialEntity);
    await this.save(entity);
  }

  /**
   * @static toCreateAll 创建全部实体（如果存在且变动就更新，不存在就执行新增）
   *
   * @param: partialEntitys 实体列表
   */
  static async toCreateAll(partialEntitys: Array<DeepPartial<Demo>>): Promise<void> {
    const entitys = this.create(partialEntitys);
    await this.save(entitys);
  }

  /**
   * @static toChange 更新符合条件的实体
   *
   * @param: conditions 更新条件
   * @param: entityPart 需要更新的部分实体
   */
  static async toChange(conditions: FindConditions<Demo>, entityPart: QueryDeepPartialEntity<Demo>): Promise<void> {
    await this.update(conditions, entityPart);
  }

}
