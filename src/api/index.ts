export * from './sp2000'
export * from './ncbiEutils'

export interface ApiResponse {
  code: number
  message: string
  data: any
}
