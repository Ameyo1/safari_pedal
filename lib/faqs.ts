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
    answer: ` Pedal Safari is a tri-annual ecotourism event. It promotes cycling and 
vanpool tourism in multiple regions of Africa. Pedal Safari events showcases the beauty of a 
region abundant with magnificent landscapes, unique flora and fauna, lakes, rivers, waterfalls, 
flanked by the Atlantic Ocean to the West and the Indian Ocean to the East, with the Mediterranean Sea 
to the north, and a wealth of cultural attributes to the north, and a wealth of cultural attributes. `,
  },

  {
    id: 2,
    question: 'What are the event dates?',
    answer: `The next Pedal Safari event is scheduled for September 15-22, 2026.`,
  },
  {
    id: 3,
    question: 'How many events are there in a year?',
    answer: `The Pedal Safari event occurs once in a year with an event divided into 5 legs.`,
  },
  {
    id: 4,
    question: 'How do I book for an event?',
    answer: `Click on Get Started to get access to our different tour and affordable package`,
  },
  // …more items
]
