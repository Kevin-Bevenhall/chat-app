import { FieldValue, Timestamp } from "firebase/firestore"

export interface ChatMessageWrite {
  id: string,
  author: {
    uid: string,
    username: string
    photoUrl: string
  }
  content: string,
  createdAt: FieldValue
}

export interface ChatMessage {
  id: string,
  author: {
    uid: string,
    username: string
    photoUrl: string
  }
  content: string,
  createdAt: Timestamp | null
}

