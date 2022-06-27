import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { Comic_Creators } from "./Comic_Creators";

@Entity({name: 'creator', schema: 'marvel'})
export class Creator{
  @Column({primary: true})
  id: number

  @Column({nullable: false})
  name: string

  @Column({nullable: false, name: 'resource_uri'})
  resourceUri: string

  @OneToMany(() => Comic_Creators, comicCreators => comicCreators.creator)
  comics: Comic_Creators[]

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}