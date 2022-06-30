import { Entity, Column, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"
import { Url } from "./Url"
import { Character_Comics } from "./Character_Comics"
import { Character_Stories } from "./Character_Stories"
import { Character_Events } from "./Character_Events"
import { Character_Series } from "./Character_Series"
import { Url_Character } from "./Url_Character"

@Entity({name: 'character', schema: 'marvel'})
export class Character{

    @Column({primary: true})
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: true})
    description: string

    @Column({nullable: true})
    modified?: Date

    @Column({nullable: false, name: 'resource_uri'})
    resourceUri: string

    @OneToMany(() => Url_Character, urlCharacter => urlCharacter.character)
    urls: Url_Character[]
    
    @Column({nullable: false})
    thumbnail: string

    @OneToMany(() => Character_Comics, character_comics => character_comics.character)
    comics: Character_Comics[]

    @OneToMany(() => Character_Stories, character_stories => character_stories.character)
    stories: Character_Stories[]

    @OneToMany(() => Character_Events, character_events  => character_events.character)
    events: Character_Events[]

    @OneToMany(() => Character_Series, character_series => character_series.character)
    series: Character_Series[]

    @CreateDateColumn({nullable: false})
    created_at?: Date
  
    @UpdateDateColumn({nullable: false})
    updated_at?: Date
}
