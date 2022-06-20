interface IURL{
  id: string
  type: string
  url: string
}

interface IImage{
  id: string
  path: string
  extension: string
}

interface IComics{
  id: number
  resourceURI: string
  name: string
}

interface IStory{
  id: number
  name: string
  type: string
  resourceUri: string
}

interface IEvent{
  id: number
  name: string
  resourceUri: string
}

interface ISerie{
  id: number
  name: string
  resourceUri: string
}

interface IChargeResponse {
  id: number,
  name: string,
  description: string,
  modified: Date,
  resourceURI: string,
  urls: IURL[],
  thumbnail: IImage,
  comics: IComics[],
  stories: IStory[],
  events: IEvent[],
  series: ISerie[],
}

export { 
  IChargeResponse, 
  ISerie, 
  IEvent, 
  IStory, 
  IComics, 
  IImage, 
  IURL
}