// tslint:disable:one-line
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity, ObjectType, FindOneOptions, ObjectID, FindConditions, FindManyOptions, SaveOptions, DeepPartial, UpdateResult } from 'typeorm';

/**
 * typeorm 实体公共方法
 */
export class CommonEntity extends BaseEntity {

  /**
   * 按 ID 查询单条记录
   *
   * @param id ID
   * @param maybeOptions 特殊配置
   */
  static toFindById<T extends BaseEntity>(
    this: ObjectType<T>,
    id: number,
    maybeOptions?: FindOneOptions<T>,
  )

  : Promise<T|undefined>

  {
    return (this as any).getRepository().findOne({ where: { id, isDeleted: false } }, maybeOptions);
  }

  /**
   * 按条件查询单条记录
   *
   * @param optionsOrConditions 查询条件
   * @param maybeOptions 可选配置
   */
  static toFindOne<T extends BaseEntity>(
    this: ObjectType<T>,
    optionsOrConditions?: FindOneOptions<T>,
    maybeOptions?: FindOneOptions<T>,
  )

  : Promise<T|undefined>

  {
    optionsOrConditions = { ...optionsOrConditions as any, where: { isDeleted: false } };
    return (this as any).getRepository().findOne(optionsOrConditions, maybeOptions);
  }

  /**
   * 按条件查询多条记录
   *
   * @param optionsOrConditions 查询条件
   * @param maybeOptions 可选配置
   */
  static toFindAll<T extends BaseEntity>(
    this: ObjectType<T>,
    optionsOrConditions?: FindManyOptions<T>,
  )

  : Promise<T[]>

  {
    optionsOrConditions = { ...optionsOrConditions as any, where: { isDeleted: false } };
    return (this as any).getRepository().find(optionsOrConditions);
  }

  /**
   * 创建实体
   *
   * @param entityPart 实体（部分）
   * @param maybeOptions 写入时的可选配置
   */
  static toCreate<T extends BaseEntity>(
    this: ObjectType<T>,
    entityPart: DeepPartial<T>,
    maybeOptions?: SaveOptions,
  )

  : Promise<T>

  {
    const entity = (this as any).getRepository().create(entityPart);
    return (this as any).getRepository().save(entity as any, maybeOptions);
  }

  /**
   * 创建全部
   *
   * @param entityPartArray 实体（部分）列表
   * @param maybeOptions 写入时的可选配置
   */
  static toCreateAll<T extends BaseEntity>(
    this: ObjectType<T>,
    entityPartArray: Array<DeepPartial<T>>,
    maybeOptions?: SaveOptions,
  )

  : Promise<T[]>

  {
    const entities = (this as any).getRepository().create(entityPartArray);
    return (this as any).getRepository().save(entities as any, maybeOptions);
  }

  /**
   * 更新符合条件的实体
   *
   * @param criteria 更新条件
   * @param entityPart 需要更新的部分实体
   * @param maybeOptions 写入时的可选配置
   */

  static toChange<T extends BaseEntity>(
    this: ObjectType<T>,
    criteria: string|string[]|number|number[]|Date|Date[]|ObjectID|ObjectID[]|FindConditions<T>,
    entityPart: QueryDeepPartialEntity<T>,
    maybeOptions?: SaveOptions,
  )

  : Promise<UpdateResult>

  {
    criteria = { ...criteria as any, isDeleted: false };
    return (this as any).getRepository().update(criteria, entityPart, maybeOptions);
  }

  /**
   * 软删除符合条件的实体
   *
   * @param criteria 更新条件
   * @param entityPart 需要更新的部分实体
   * @param maybeOptions 写入时的可选配置
   */

  static toSoftRemove<T extends BaseEntity>(
    this: ObjectType<T>,
    criteria: string|string[]|number|number[]|Date|Date[]|ObjectID|ObjectID[]|FindConditions<T>,
    maybeOptions?: SaveOptions,
  )

  : Promise<UpdateResult>

  {
    criteria = { ...criteria as any, isDeleted: false };
    return (this as any).getRepository().update(criteria, { isDeleted: true }, maybeOptions);
  }

}