import { Column, Entity, ManyToOne } from "typeorm";
import { EntityBase } from "./Base";
import { Comic } from "./Comic";
import { Creator } from "./Creator";

@Entity({name: 'comic_creators', schema: 'marvel'})
export class Comic_Creators extends EntityBase{
  
  @Column({primary: true})
  id: string

  @ManyToOne(() => Comic, comic => comic.creators, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  comic: Comic

  @ManyToOne(() => Creator, creator => creator.comics, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE"
  })
  creator: Creator

  @Column({nullable: false})
  role: string
}
