export default [
  {
    id: 'travelLength',
    question: 'Wie viele Nächte bist du weg?',
    answers: [], // it will break in allAnswerOptions in Wizard.js if removed
  },
  {
    id: 'transport',
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
    id: 'accommodation',
    question: 'Wo übernachtest du?',
    answers: [
      {
        id: 'private',
        option: 'Bei jemandem',
        packageIds: ['stayWithFriends'],
      },
      {
        id: 'hotel',
        option: 'Hotel',
        packageIds: ['stayHotel'],
      },
      {
        id: 'airBnB',
        option: 'AirBnB',
        packageIds: ['stayAirBnB'],
      },
      {
        id: 'else',
        option: 'Sonstiges',
        packageIds: [],
      },
    ],
  },
  {
    id: 'season',
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
  {
    id: 'beachOrNo',
    question: 'Fährst du an den Strand?',
    answers: [
      {
        id: 'beachYes',
        option: 'Ja',
        packageIds: ['beach'],
      },
      {
        id: 'beachNo',
        option: 'Nein',
        packageIds: [],
      },
    ],
  },
]
