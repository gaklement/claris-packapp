const data = {
  packages: [
    { id: 'basics', name: 'Basics', includePackageIds: ['cosmetic'] },
    { id: 'cosmetic', name: 'Kosmetik' },
    { id: 'wedding', name: 'Hochzeit' },
    { id: 'hiking', name: 'Wandern' },
  ],
  items: [
    { id: 'shoes', name: 'Schuhe', packageIds: ['basics'] },
    { id: 'floss', name: 'Zahnseide', packageIds: ['cosmetics'] },
    { id: 'gown', name: 'Abendkleid', packageIds: ['wedding'] },
    { id: 'hikingShoes', name: 'Wanderschuhe', packageIds: ['hiking'] },
  ],
}

export default data
