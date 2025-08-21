// data/faqs.ts
export interface FaqItem {
  id: number
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    id: 1,
    question: 'What is Pedal Safari',
    answer: ` Pedal Safari is a tours and travel company that offers events around the world on a bicycle`,
  },
  {
    id: 2,
    question: 'How do I book for an event?',
    answer: `Click on get started to get access to our different tour and affodable package`,
  },
  // …more items
]
