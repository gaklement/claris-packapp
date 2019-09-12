const data = {
  packages: [
    { id: 'adHoc', name: 'adHoc' },
    { id: 'test', name: 'test' },
    { id: 'basics', name: 'Basics', includePackageIds: ['cosmetics'] },
    { id: 'beach', name: 'Strandurlaub' },
    { id: 'byBus', name: 'Busreise' },
    { id: 'byPlane', name: 'Flugzeugreise' },
    { id: 'byTrain', name: 'Zugreise' },
    { id: 'cosmetics', name: 'Kosmetik' },
    { id: 'hiking', name: 'Wandern' },
    { id: 'wedding', name: 'Hochzeit' },
    { id: 'quietTime', name: 'Ruhe' },
  ],
  items: [
    { id: 'afterSunLotion', name: 'Après sun', packageIds: ['beach'] },
    { id: 'bahnCard', name: 'Bahn-Card', packageIds: ['byTrain'] },
    { id: 'bandages', name: 'Pflaster', packageIds: ['cosmetics'] },
    { id: 'beachTowel', name: 'Strandhandtuch', packageIds: ['beach'] },
    { id: 'bikini', name: 'Bikini', packageIds: ['beach'] },
    { id: 'bra', name: 'BH', packageIds: ['basics'] },
    { id: 'bodyWash', name: 'Duschgel', packageIds: ['cosmetics'] },
    { id: 'book', name: 'Buch', packageIds: ['beach', 'byPlane', 'quietTime'] },
    { id: 'cardigan', name: 'Strickjacke', packageIds: ['basics'] },
    { id: 'cocktailDress', name: 'Cocktailkleid', packageIds: ['wedding'] },
    { id: 'conditioner', name: 'Spülung', packageIds: ['cosmetics'] },
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
    { id: 'eyeCover', name: 'Schlafmaske', packageIds: ['byPlane'] },
    { id: 'faceCream', name: 'Creme', packageIds: ['cosmetics'] },
    { id: 'flipFlops', name: 'Badelatschen', packageIds: ['beach'] },
    { id: 'floss', name: 'Zahnseide', packageIds: ['cosmetics'] },
    { id: 'gift', name: 'Geschenk', packageIds: ['wedding'] },
    { id: 'gown', name: 'Abendkleid', packageIds: ['wedding'] },
    { id: 'hairbrush', name: 'Bürste', packageIds: ['cosmetics'] },
    { id: 'hairDecoration', name: 'Haarschmuck', packageIds: ['wedding'] },
    { id: 'jewelry', name: 'Schmuck', packageIds: ['wedding'] },
    { id: 'hairFoam', name: 'Haarschaum', packageIds: ['cosmetics'] },
    { id: 'hairNeedle', name: 'Haarspangen', packageIds: ['cosmetics'] },
    { id: 'hairspray', name: 'Haarspray', packageIds: ['cosmetics'] },
    { id: 'hikingShoes', name: 'Wanderschuhe', packageIds: ['hiking'] },
    { id: 'keys', name: 'Schlüssel', packageIds: ['basics'] },
    { id: 'littlePurse', name: 'Handtäschchen', packageIds: ['wedding'] },
    { id: 'makeUp', name: 'Schminke', packageIds: ['basics'] },
    { id: 'makeUpRemover', name: 'Abschminkzeug', packageIds: ['cosmetics'] },
    { id: 'mirror', name: 'Spiegelchen', packageIds: ['cosmetics'] },
    { id: 'mouthWash', name: 'Mundspülung', packageIds: ['cosmetics'] },
    { id: 'nightShirt', name: 'Schlaf T-Shirt', packageIds: ['basics'] },
    { id: 'oropax', name: 'Oropax', packageIds: ['byPlane', 'cosmetics'] },
    { id: 'pants', name: 'lange Hose', packageIds: ['basics'] },
    { id: 'pen', name: 'Stift', packageIds: ['quietTime'] },
    { id: 'phone', name: 'Handy', packageIds: ['basics'] },
    { id: 'pillow', name: 'Kissen', packageIds: ['byBus', 'byPlane'] },
    { id: 'ponyTail', name: 'Haargummis', packageIds: ['cosmetics'] },
    { id: 'qTips', name: 'Wattestäbchen', packageIds: ['cosmetics'] },
    { id: 'shampoo', name: 'Shampoo', packageIds: ['cosmetics'] },
    { id: 'shoes', name: 'Schuhe', packageIds: ['basics'] },
    { id: 'shorts', name: 'kurze Hose', packageIds: ['basics'] },
    { id: 'slipPads', name: 'Slipeinlagen', packageIds: ['cosmetics'] },
    {
      id: 'sunBlocker',
      name: 'Sonnencreme',
      packageIds: ['cosmetics', 'beach'],
    },
    { id: 'sunGlasses', name: 'Sonnenbrille', packageIds: ['basics', 'beach'] },
    { id: 'sweater', name: 'Pullover', packageIds: ['basics'] },
    { id: 'tampax', name: 'Tampons', packageIds: ['cosmetics'] },
    { id: 'tankTop', name: 'Trägeroberteil', packageIds: ['basics'] },
    {
      id: 'ticket',
      name: 'Ticket',
      packageIds: ['byBus', 'byPlane', 'byTrain'],
    },
    { id: 'tissues', name: 'Taschentücher', packageIds: ['cosmetics'] },
    { id: 'toothBrush', name: 'Zahnbürste', packageIds: ['cosmetics'] },
    { id: 'toothpaste', name: 'Zahnpasta', packageIds: ['cosmetics'] },
    { id: 'tShirt', name: 'T-Shirt', packageIds: ['basics'] },
    { id: 'tweezer', name: 'Pinzette', packageIds: ['cosmetics'] },
    { id: 'wallet', name: 'Portemonnaie', packageIds: ['basics'] },
  ],
}

export default data
