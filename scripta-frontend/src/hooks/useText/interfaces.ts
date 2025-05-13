export interface feedBackText {
  category: string
  data: string
  question: string
  explanation: string
  position: [number, number]
}

export interface UseText {
  feedBack: feedBackText[]
  setFeedBack: (feedBack: feedBackText[]) => void
}
