export type BooksApiResponse = {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfo
  saleInfo: SaleInfo
  accessInfo: AccessInfo
  searchInfo: SearchInfo
}
export type Items = {
  kind?: string
  totalItems?: string
  items: BooksApiResponse[]
}

export type Data<Response> = {
  data: Response
}
export type VolumeInfo = {
  title: string
  subtitle: string
  authors: string[]
  publishedDate: string
  description: string
  industryIdentifiers: IndustryIdentifier[]
  readingModes: ReadingModes
  pageCount: number
  printType: string
  categories: string[]
  maturityRating: string
  allowAnonLogging: boolean
  contentVersion: string
  panelizationSummary: PanelizationSummary
  imageLinks: ImageLinks
  language: string
  publisher: string
  previewLink: string
  infoLink: string
  canonicalVolumeLink: string
}

export type IndustryIdentifier = {
  type: string
  identifier: string
}

export type ReadingModes = {
  text: boolean
  image: boolean
}

export type PanelizationSummary = {
  containsEpubBubbles: boolean
  containsImageBubbles: boolean
}

export type ImageLinks = {
  smallThumbnail: string
  thumbnail: string
}

export type SaleInfo = {
  country: string
  saleability: string
  isEbook: boolean
}

export type AccessInfo = {
  country: string
  viewability: string
  embeddable: boolean
  publicDomain: boolean
  textToSpeechPermission: string
  epub: Epub
  pdf: Pdf
  webReaderLink: string
  accessViewStatus: string
  quoteSharingAllowed: boolean
}

export type Epub = {
  isAvailable: boolean
}

export type Pdf = {
  isAvailable: boolean
}

export type SearchInfo = {
  textSnippet: string
}
