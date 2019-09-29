import sortCategories from './sortCategories'

const itemsGroupedByCategory = {
  rightBeforeLeaving: [],
  basics: [],
  stayHotel: [],
  adHoc: [],
}
describe('sortCategories', () => {
  it('should return the sorted list of categories', () => {
    expect(sortCategories(itemsGroupedByCategory)).toEqual({
      adHoc: [],
      basics: [],
      stayHotel: [],
      rightBeforeLeaving: [],
    })
  })
})
