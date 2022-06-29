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

interface IMarvelCharactersResponse{
  code: number
  status: string,
  copiryght: string,
  attributionText: string,
  attributionHTML: string,
  data:IMarvelCharacterDataContainer,
  etag: string
}

interface IMarvelCreatorSummary{
  resourceURI: string,
  name: string,
  role: string, //Isso entra na relação N para N
}

interface IMarvelCreatorList{
  available: string,
  returned: number,
  collectionURI: string,
  items: IMarvelCreatorSummary[]
}

interface IMarvelComic{
  id: number,
  digitalId: number,
  title: string,
  issueNumber: number,
  variantDescription?: string,
  description?: string,
  modified: Date,
  isbn: string,
  upc: string,
  diamondCode: string,
  ean: string,
  issn: string,
  format: string,
  pageCount: number,
  urls: IMarvelURL[],
  series: IMarvelSeriesSummary,
  creators: IMarvelCreatorList,
  thumbnail: IMarvelImage,
  resourceURI: string
}

interface IMarvelComicDataContainer{
  offset: number,
  limit: number,
  total: number,
  count: number,
  results: IMarvelComic[]
}

interface IMarvelComicResponse{
  code: number
  status: string,
  copiryght: string,
  attributionText: string,
  attributionHTML: string,
  data:IMarvelComicDataContainer,
  etag: string
}

interface IMarvelEvent{
  id: number,
  title: string,
  description?: string,
  resourceURI: string,
  urls: IMarvelURL[],
  modified: Date,
  start: Date,
  end: Date,
  next: IMarvelEventSummary,
  previous: IMarvelEventSummary
}

interface IMarvelEventDataContainer{
  offset: number,
  limit: number,
  total: number,
  count: number,
  results: IMarvelEvent[]
}
interface IMarvelEventResponse{
  code: number
  status: string,
  copiryght: string,
  attributionText: string,
  attributionHTML: string,
  data:IMarvelEventDataContainer,
  etag: string
}

interface IMarvelSeries{
  id: number,
  title: string,
  description?: string,
  urls: IMarvelURL[],
  startYear: number,
  endYear: number,
  modified: Date,
  next: IMarvelSeriesSummary,
  previous: IMarvelSeriesSummary,
  resourceURI: string
}

interface IMarvelSeriesDataContainer{
  offset: number,
  limit: number,
  total: number,
  count: number,
  results: IMarvelSeries[]
}
interface IMarvelSeriesResponse{
  code: number
  status: string,
  copiryght: string,
  attributionText: string,
  attributionHTML: string,
  data:IMarvelSeriesDataContainer,
  etag: string
}

interface IMarvelStory{
  id: number,
  title: string,
  description?: string,
  modified: Date,
  originalIssue: IMarvelComicSummary  
}

interface IMarvelStoryDataContainer{
  offset: number,
  limit: number,
  total: number,
  count: number,
  results: IMarvelStory[]
}
interface IMarvelStoryResponse{
  code: number
  status: string,
  copiryght: string,
  attributionText: string,
  attributionHTML: string,
  data:IMarvelStoryDataContainer,
  etag: string
}

export { 
  IMarvelCharactersResponse,
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
  IMarvelSeriesSummary,
  IMarvelComicResponse,
  IMarvelComicDataContainer,
  IMarvelComic,
  IMarvelCreatorList,
  IMarvelCreatorSummary,
  IMarvelEventResponse,
  IMarvelEventDataContainer,
  IMarvelEvent,
  IMarvelSeries,
  IMarvelSeriesDataContainer,
  IMarvelSeriesResponse,
  IMarvelStoryResponse,
  IMarvelStoryDataContainer,
  IMarvelStory
}