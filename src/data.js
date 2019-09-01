const data = {
  packages: [
    { id: 'basics', name: 'Basics', includePackageIds: ['cosmetic'] },
    { id: 'cosmetic', name: 'Kosmetik' },
  ],
  items: [
    { id: 'shoes', name: 'Schuhe', packageIds: ['basics'] },
    { id: 'floss', name: 'Zahnseide', packageIds: ['cosmetics'] },
  ],
}

export default data
