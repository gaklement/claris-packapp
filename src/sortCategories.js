function sortCategories(itemsGroupedByCategory) {
  let sortedThings = {}
  sortPriorities.forEach(priority => {
    for (const [category, items] of Object.entries(itemsGroupedByCategory)) {
      if (category === priority) {
        sortedThings = { ...sortedThings, ...{ [category]: items } }
      }
    }
  })
  return sortedThings
}

export default sortCategories

export const sortPriorities = [
  'adHoc',
  'basics',
  'cosmetics',
  'beach',
  'summer',
  'swim',
  'springFall',
  'winter',
  'festive',
  'wedding',
  'quietTime',
  'children',
  'stayHotel',
  'stayAirBnB',
  'stayWithFriends',
  'work',
  'byBus',
  'byCar',
  'byPlane',
  'byTrain',
  'rightBeforeLeaving',
]
