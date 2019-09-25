export default [
  {
    id: 'travelLengthQuestion',
    question: 'Wie viele Nächte bist du weg?',
    answers: [], // it will break in allAnswerOptions in Wizard.js if removed
  },
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
      {
        id: 'car',
        option: 'Auto',
        packageIds: ['byCar'],
      },
    ],
  },
  {
    id: 1,
    question: 'Wie warm ist es da, wo du hinfährst?',
    answers: [
      {
        id: 'weatherWarm',
        option: 'Warm',
        packageIds: ['summer'],
      },
      {
        id: 'weatherMedium',
        option: 'Mittelwarm',
        packageIds: ['springFall'],
      },
      {
        id: 'weatherCold',
        option: 'Kalt',
        packageIds: ['winter'],
      },
    ],
  },
]
