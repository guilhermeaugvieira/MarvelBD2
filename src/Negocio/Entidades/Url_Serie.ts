import { Entity, ManyToOne, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Serie } from "./Serie"
import { Url } from "./Url"

@Entity({name: 'url_serie', schema: 'marvel'})
export class Url_Serie{

  @Column({primary: true})
  id: string

  @ManyToOne(() => Serie, serie => serie.urls, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  serie: Serie

  @ManyToOne(() => Url, url => url.series, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  url: Url

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}