import { Column, Entity, OneToMany } from "typeorm";
import { EntityBase } from "./Base";
import { Comic_Creators } from "./Comic_Creators";

@Entity({name: 'creator', schema: 'marvel'})
export class Creator extends EntityBase{
  @Column({primary: true})
  id: number

  @Column({nullable: false})
  name: string

  @Column({nullable: false, name: 'resource_uri'})
  resourceUri: string

  @OneToMany(() => Comic_Creators, comicCreators => comicCreators.creator)
  comics: Comic_Creators[]
}