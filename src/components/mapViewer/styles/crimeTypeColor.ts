export interface crimeColorGroup {
  color: string,
  groupName: string,
  itemArray: string[]
}

export const crimeTypeColor: crimeColorGroup[] = [
  {
    color: 'red',
    groupName: 'Threatening your safety',
    itemArray: [
      'violent-crime',
      'criminal-damage-arson',
      'robbery',
      'burglary',
    ]
  },
  {
    color: 'orange',
    groupName: 'Anti social',
    itemArray: [
      'anti-social-behaviour',
      'possession-of-weapons',
      'public-order',
    ]
  },
  {
    color: '#FFEB3B',
    groupName: 'Steal your stuff quietly',
    itemArray: [
      'shoplifting',
      'bicycle-theft',
      'theft-from-the-person',
      'other-theft',
      'vehicle-crime',
    ]
  },
  {
    color: 'green',
    groupName: 'Other',
    itemArray: [
      'drugs',
      'other-crime',
    ]
  },
]