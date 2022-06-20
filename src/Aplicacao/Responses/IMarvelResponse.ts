interface IMarvelSeriesSummary{
  resourceURI: string,
  name: string,
}

interface IMarvelSeriesList{
  available: string,
  returned: number,
  collectionURI: string,
  items: IMarvelSeriesSummary[]
}

interface IMarvelEventSummary{
  resourceURI: string,
  name: string,
}

interface IMarvelEventList{
  available: string,
  returned: number,
  collectionURI: string,
  items: IMarvelEventSummary[]
}

interface IMarvelStorySummary{
  resourceURI: string,
  name: string,
  type: string
}

interface IMarvelStoryList{
  available: string,
  returned: number,
  collectionURI: string,
  items: IMarvelStorySummary[]
}

interface IMarvelComicSummary{
  resourceURI: string,
  name: string,
}

interface IMarvelComicList{
  available: number,
  returned: number,
  collectionURI: string,
  items: IMarvelComicSummary[]
}

interface IMarvelImage{
  path: string,
  extension: string
}

interface IMarvelURL{
  type: string,
  url: string,
}

interface IMarvelCharacter{
  id: number,
  name: string,
  description?: string,
  modified: Date,
  resourceURI: string,
  urls: IMarvelURL[],
  thumbnail: IMarvelImage,
  comics: IMarvelComicList,
  stories: IMarvelStoryList,
  events: IMarvelEventList,
  series: IMarvelSeriesList
}

interface IMarvelCharacterDataContainer{
  offset: number,
  limit: number,
  total: number,
  count: number,
  results: IMarvelCharacter[]
}

interface IMarvelResponse{
  code: number
  status: string,
  copiryght: string,
  attributionText: string,
  attributionHTML: string,
  data:IMarvelCharacterDataContainer,
  etag: string
}

export { 
  IMarvelResponse,
  IMarvelCharacterDataContainer,
  IMarvelCharacter,
  IMarvelURL,
  IMarvelImage,
  IMarvelComicList,
  IMarvelComicSummary,
  IMarvelStoryList,
  IMarvelStorySummary,
  IMarvelEventList,
  IMarvelEventSummary,
  IMarvelSeriesList,
  IMarvelSeriesSummary
}