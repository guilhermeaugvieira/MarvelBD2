import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";
import { Comic } from "./Comic";
import { Creator } from "./Creator";

@Entity({name: 'comic_creators', schema: 'marvel'})
export class Comic_Creators{
  
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

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}
