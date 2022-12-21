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

  export type Comment = {
    content: string;
    author: string;
    author_id: string;
    date: Date;
  }

  export type Member = {
    id: string;
    username: string;
    nickname: string;
    email: string;
  }