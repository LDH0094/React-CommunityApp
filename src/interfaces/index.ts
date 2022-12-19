export type Thread = {
    _id?: string
    author?: Author
    category?: string
    comments?: string
    content?: string
    date?: Date
    title?: string
    upvotes?: string[]
  
  }
  
  export type Author = {
    nickname: string
    _id: string
  }