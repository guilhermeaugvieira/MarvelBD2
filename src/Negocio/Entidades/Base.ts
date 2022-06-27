import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class EntityBase{
  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}