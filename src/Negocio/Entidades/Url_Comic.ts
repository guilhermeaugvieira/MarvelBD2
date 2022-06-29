import { Entity, ManyToOne, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Comic } from "./Comic"
import { Url } from "./Url"

@Entity({name: 'url_comic', schema: 'marvel'})
export class Url_Comic{

  @Column({primary: true})
  id: string

  @ManyToOne(() => Comic, comic => comic.urls, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  comic: Comic

  @ManyToOne(() => Url, url => url.comics, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  url: Url

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}