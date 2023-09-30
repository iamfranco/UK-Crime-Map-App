export interface StreetCrime {
  category: string,
  location_type: string,
  location: {
    latitude: string,
    longitude: string,
    street: {
      id: number,
      name: string
    }
  },
  context: string,
  outcome_status: {
    category: string,
    date: string
  } | null,
  persistent_id: string,
  id: number,
  location_subtype: string,
  month: string
}

export const makeRandomStreetCrime = () => ({
  category: 'category_' + Math.random(),
  location_type: 'ocation_type_' + Math.random(),
  location: {
    latitude: 'latitude_' + Math.random(),
    longitude: 'longitude_' + Math.random(),
    street: {
      id: Math.random(),
      name: 'street_name_' + Math.random()
    }
  },
  context: 'context_' + Math.random(),
  outcome_status: {
    category: 'outcome_status_category_' + Math.random(),
    date: 'outcome_status_date_' + Math.random()
  },
  persistent_id: 'persistent_id_' + Math.random(),
  id: Math.random(),
  location_subtype: 'location_subtype_' + Math.random(),
  month: 'month_' + Math.random()
})