const data = {
  packages: [
    { id: 'adHoc', name: 'Sonstiges' },
    {
      id: 'basics',
      name: 'Basics',
      includePackageIds: ['cosmetics', 'rightBeforeLeaving'],
    },
    { id: 'beach', name: 'Strandurlaub' },
    { id: 'byBus', name: 'Mit dem Bus' },
    { id: 'byCar', name: 'Mit dem Auto' },
    { id: 'byPlane', name: 'Mit dem Flugzeug' },
    { id: 'byTrain', name: 'Mit dem Zug' },
    { id: 'children', name: 'Kinderquatsch mit Clara' },
    { id: 'cosmetics', name: 'Kosmetik' },
    { id: 'festive', name: 'Fest' },
    { id: 'stayHotel', name: 'Hotel' },
    { id: 'wedding', name: 'Hochzeit' },
    { id: 'quietTime', name: 'Ruhe' },
    { id: 'rightBeforeLeaving', name: 'Kurz vor der Abfahrt' },
    { id: 'springFall', name: 'Mittelwarmes Wetter' },
    { id: 'stayAirBnB', name: 'AirBnB' },
    { id: 'stayWithFriends', name: 'Private Übernachtung' },
    { id: 'summer', name: 'Warmes Wetter' },
    { id: 'swim', name: 'Schwimmen' },
    { id: 'winter', name: 'Kaltes Wetter' },
    { id: 'work', name: 'Arbeiten' },
  ],
  items: [
    { id: 'afterSunLotion', name: 'Après sun', packageIds: ['beach'] },
    {
      id: 'airBnBContact',
      name: 'Kontaktdaten AirBnB',
      packageIds: ['stayAirBnB'],
    },
    { id: 'bahnCard', name: 'Bahn-Card', packageIds: ['byTrain'] },
    { id: 'bandages', name: 'Pflaster', packageIds: ['cosmetics'] },
    { id: 'beachTowel', name: 'Strandhandtuch', packageIds: ['beach'] },
    { id: 'bikini', name: 'Bikini', packageIds: ['beach', 'swim'] },
    { id: 'bra', name: 'BH', packageIds: ['basics'], dayFactor: 0.25 },
    { id: 'bodyWash', name: 'Duschgel', packageIds: ['cosmetics'] },
    { id: 'book', name: 'Buch', packageIds: ['beach', 'byPlane', 'quietTime'] },
    {
      id: 'cardigan',
      name: 'Strickjacke',
      packageIds: ['basics'],
      dayFactor: 0.15,
    },
    {
      id: 'chargerPhone',
      name: 'Ladekabel fürs Handy',
      packageIds: ['rightBeforeLeaving'],
    },
    {
      id: 'chargerComputer',
      name: 'Ladekabel für den Computer',
      packageIds: ['work'],
    },
    { id: 'childrenGames', name: 'Kinderbespaßung', packageIds: ['children'] },
    {
      id: 'cocktailDress',
      name: 'Cocktailkleid',
      packageIds: ['festive', 'wedding'],
    },
    { id: 'computer', name: 'Computer', packageIds: ['work'] },
    { id: 'conditioner', name: 'Spülung', packageIds: ['cosmetics'] },
    { id: 'dress', name: 'Kleid', packageIds: ['summer'] },
    { id: 'diary', name: 'Tagebuch', packageIds: ['quietTime'] },
    {
      id: 'contactBalm',
      name: 'Kontaktlinsenflüssigkeit',
      packageIds: ['cosmetics'],
    },
    { id: 'cottonPads', name: 'Wattepads', packageIds: ['cosmetics'] },
    {
      id: 'desinfection',
      name: 'Desinfektionsspray',
      packageIds: ['cosmetics'],
    },
    { id: 'driversLicense', name: 'Führerschein', packageIds: ['byCar'] },
    { id: 'eyeCover', name: 'Schlafmaske', packageIds: ['byPlane'] },
    { id: 'faceCream', name: 'Creme', packageIds: ['cosmetics'] },
    { id: 'flipFlops', name: 'Badelatschen', packageIds: ['beach', 'swim'] },
    { id: 'floss', name: 'Zahnseide', packageIds: ['cosmetics'] },
    {
      id: 'gift',
      name: 'Geschenk',
      packageIds: ['festive', 'stayWithFriends', 'wedding'],
    },
    { id: 'gloves', name: 'Handschuhe', packageIds: ['winter'] },
    { id: 'gown', name: 'Abendkleid', packageIds: ['wedding'] },
    { id: 'hairbrush', name: 'Bürste', packageIds: ['cosmetics'] },
    { id: 'hairDecoration', name: 'Haarschmuck', packageIds: ['wedding'] },
    { id: 'invite', name: 'Einladung', packageIds: ['wedding'] },
    { id: 'jewelry', name: 'Schmuck', packageIds: ['wedding'] },
    { id: 'hairFoam', name: 'Haarschaum', packageIds: ['cosmetics'] },
    { id: 'hairNeedle', name: 'Haarspangen', packageIds: ['cosmetics'] },
    { id: 'hairspray', name: 'Haarspray', packageIds: ['cosmetics'] },
    {
      id: 'headPhones',
      name: 'Kopfhörer',
      packageIds: ['byBus', 'byPlane', 'byTrain', 'basics'],
    },
    {
      id: 'highHeels',
      name: 'Hochhackige Schuhe',
      packageIds: ['wedding'],
    },
    { id: 'keys', name: 'Schlüssel', packageIds: ['basics'] },
    { id: 'littlePurse', name: 'Handtäschchen', packageIds: ['wedding'] },
    { id: 'makeUp', name: 'Schminke', packageIds: ['rightBeforeLeaving'] },
    { id: 'makeUpRemover', name: 'Abschminkzeug', packageIds: ['cosmetics'] },
    { id: 'medicin', name: 'Medizin', packageIds: ['basics'] },
    { id: 'mirror', name: 'Spiegelchen', packageIds: ['cosmetics'] },
    { id: 'mouthWash', name: 'Mundspülung', packageIds: ['cosmetics'] },
    { id: 'nightShirt', name: 'Schlaf T-Shirt', packageIds: ['basics'] },
    { id: 'notes', name: 'Notizen/Unterlagen', packageIds: ['work'] },
    { id: 'oropax', name: 'Oropax', packageIds: ['byPlane', 'cosmetics'] },
    {
      id: 'painKillers',
      name: 'Kopfschmerztabletten',
      packageIds: ['wedding'],
    },
    {
      id: 'panties',
      name: 'Unterhosen',
      packageIds: ['basics'],
      dayFactor: 1.4,
    },
    { id: 'pants', name: 'lange Hose', packageIds: ['basics'], dayFactor: 0.4 },
    {
      id: 'pashmina',
      name: 'Tuch',
      packageIds: ['springFall'],
    },
    { id: 'pen', name: 'Stift', packageIds: ['work'] },
    { id: 'phone', name: 'Handy', packageIds: ['rightBeforeLeaving'] },
    { id: 'pillow', name: 'Kissen', packageIds: ['byBus', 'byPlane'] },
    {
      id: 'podCasts',
      name: 'Podcasts',
      packageIds: ['byBus', 'byPlane', 'byTrain'],
    },
    { id: 'ponyTail', name: 'Haargummis', packageIds: ['cosmetics'] },
    { id: 'qTips', name: 'Wattestäbchen', packageIds: ['cosmetics'] },
    {
      id: 'reservationHotel',
      name: 'Hotelreservierung',
      packageIds: ['stayHotel'],
    },
    { id: 'scarf', name: 'Schal', packageIds: ['winter'] },
    { id: 'shampoo', name: 'Shampoo', packageIds: ['cosmetics'] },
    { id: 'shoes', name: 'Schuhe', packageIds: ['basics'], dayFactor: 0.4 },
    {
      id: 'shorts',
      name: 'kurze Hose',
      packageIds: ['basics'],
      dayFactor: 0.3,
    },
    { id: 'slipPads', name: 'Slipeinlagen', packageIds: ['cosmetics'] },
    {
      id: 'snacks',
      name: 'Verpflegung für die Fahrt',
      packageIds: ['byBus', 'byCar', 'byPlane', 'byTrain,'],
    },
    {
      id: 'sunBlocker',
      name: 'Sonnencreme',
      packageIds: ['cosmetics', 'beach'],
    },
    {
      id: 'sunGlasses',
      name: 'Sonnenbrille',
      packageIds: ['summer', 'basics', 'beach'],
    },
    {
      id: 'sweater',
      name: 'Pullover',
      packageIds: ['basics'],
      dayFactor: 0.15,
    },
    {
      id: 'sweatPants',
      name: 'Jogginghose',
      packageIds: ['basics'], // should be ['springFall', 'winter']
    },
    {
      id: 'sweatPantsShort',
      name: 'kurze Jogginghose',
      packageIds: ['summer'],
    },
    { id: 'tampax', name: 'Tampons', packageIds: ['cosmetics'] },
    {
      id: 'tankTop',
      name: 'Trägeroberteil',
      packageIds: ['summer'],
      dayFactor: 0.5,
    },
    {
      id: 'ticket',
      name: 'Ticket',
      packageIds: ['byBus', 'byPlane', 'byTrain'],
    },
    {
      id: 'tights',
      name: 'Strumpfhose',
      packageIds: ['winter', 'wedding'],
    },
    { id: 'tissues', name: 'Taschentücher', packageIds: ['cosmetics'] },
    {
      id: 'toothBrush',
      name: 'Zahnbürste',
      packageIds: ['rightBeforeLeaving'],
    },
    { id: 'toothpaste', name: 'Zahnpasta', packageIds: ['cosmetics'] },
    { id: 'towel', name: 'Handtuch', packageIds: ['stayWithFriends'] },
    {
      id: 'transitJacket',
      name: 'Übergangsjacke',
      packageIds: ['springFall'],
    },
    { id: 'tShirt', name: 'T-Shirt', packageIds: ['basics'], dayFactor: 1 },
    { id: 'tweezer', name: 'Pinzette', packageIds: ['cosmetics'] },
    { id: 'wallet', name: 'Portemonnaie', packageIds: ['basics'] },
    {
      id: 'water',
      name: 'Wasser',
      packageIds: ['byBus', 'byCar', 'byTrain,'],
    },
    {
      id: 'waterSpray',
      name: 'Sprühwasser aus der Dose',
      packageIds: ['summer'],
    },
    {
      id: 'woolenHat',
      name: 'Mütze',
      packageIds: ['winter'],
    },
    {
      id: 'woolenSocks',
      name: 'Dicke Wollsocken',
      packageIds: ['winter'],
    },
  ],
}

export default data
