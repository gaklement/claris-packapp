export default [
  {
    id: 0,
    question: 'Welches Transportmittel nimmst du?',
    answers: [
      {
        id: 'train',
        option: 'Zug',
        packageIds: ['byTrain'],
      },
      {
        id: 'airplane',
        option: 'Flugzeug',
        packageIds: ['byPlane'],
      },
      {
        id: 'bus',
        option: 'Bus',
        packageIds: ['byBus'],
      },
    ],
  },
  {
    id: 1,
    question: 'Basics oder Kosmetik',
    answers: [
      {
        id: '1-0',
        option: 'Basics',
        packageIds: ['basics'],
      },
      {
        id: '1-1',
        option: 'Kosmetik',
        packageIds: ['cosmetics'],
      },
    ],
  },
]
