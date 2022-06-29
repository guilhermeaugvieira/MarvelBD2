import { Entity, Column, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Character_Series } from "./Character_Series"
import { Url } from "./Url"
import { Url_Serie } from "./Url_Serie"

@Entity({name: 'serie', schema: 'marvel'})
export class Serie{
  
  @Column({primary: true})
  id: number

  @Column({nullable: false, name: 'resource_uri'})
  resourceUri: string

  @Column({nullable: false})
  title: string

  @Column({nullable: true})
  description: string

  @OneToMany(() => Url_Serie, urlSerie => urlSerie.serie)
  urls: Url_Serie[]

  @OneToMany(() => Character_Series, character_series => character_series.serie)
  characters: Character_Series[]

  @Column({nullable: false, name: 'start_year'})
  startYear: number

  @Column({nullable: false, name: 'end_year'})
  endYear: number

  @Column({nullable: true})
  modified?: Date

  @OneToOne(() => Serie, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn({name: 'previous_serie'})
  previousSerie: Serie

  @OneToOne(() => Serie, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn({name: 'next_serie'})
  nextSerie: Serie

  @CreateDateColumn({nullable: false})
  created_at?: Date

  @UpdateDateColumn({nullable: false})
  updated_at?: Date
}