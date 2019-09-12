import data from '../data'

export default function initializeTestData(database) {
  const rootRef = database.ref()
  rootRef.set({}, () => {
    const packages = data.packages

    const packagesRef = database.ref('packages')

    packages.forEach(packageInstance => {
      const packageRef = packagesRef.push()
      packageRef.set(packageInstance)
    })

    const items = data.items

    const itemsRef = database.ref('items')

    items.forEach(item => {
      const itemRef = itemsRef.push()
      itemRef.set(item)
    })
  })
}
