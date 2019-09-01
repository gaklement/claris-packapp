export default function initializeTestData(database) {
  const packages = [
    { id: 'basics', name: 'Basics', includePackageIds: ['cosmetic'] },
    { id: 'cosmetic', name: 'Kosmetik' },
  ]

  const packagesRef = database.ref('packages')

  packages.forEach(packageInstance => {
    const packageRef = packagesRef.push()
    packageRef.set(packageInstance)
  })

  const items = [
    { id: 'shoes', name: 'Schuhe', packageIds: ['basics'] },
    { id: 'floss', name: 'Zahnseide', packageIds: ['cosmetics'] },
  ]

  const itemsRef = database.ref('items')

  items.forEach(item => {
    const itemRef = itemsRef.push()
    itemRef.set(item)
  })
}
