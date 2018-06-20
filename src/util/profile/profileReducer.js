const initialState = {
  address: localStorage.getItem('address'),
  profilePic: localStorage.getItem('profilePic'),
  names: null,
  location: null,
  email: null,
  site: null,
  // Learner
  position: null,
  specialisation: null,
  certificates: null,
  courses: null,
  reviews: null,
  // Organisations
  shortDescription: null,
  fullDescription: null,
  // Academy
  students: null,
  // Business
  employees: null,
};


const profileReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LEARNER_PROFILE':
    return Object.assign({}, state, {
      profilePic: action.payload.profilePic,
      names: action.payload.names,
      location: action.payload.location,
      email: action.payload.email,
      site: action.payload.site,
      position: action.payload.position,
      specialisation: action.payload.specialisation,
      certificates: action.payload.certificates,
      courses: action.payload.courses,
      reviews: action.payload.reviews,
    });
  case 'ACADEMY_PROFILE':
    return Object.assign({}, state, {
      profilePic: action.payload.profilePic,
      names: action.payload.names,
      location: action.payload.location,
      email: action.payload.email,
      site: action.payload.site,
      shortDescription: action.payload.shortDescription,
      fullDescription: action.payload.fullDescription,
      students: action.payload.students,
    });
  case 'BUSINESS_PROFILE':
    return Object.assign({}, state, {
      profilePic: action.payload.profilePic,
      names: action.payload.names,
      location: action.payload.location,
      email: action.payload.email,
      site: action.payload.site,
      shortDescription: action.payload.shortDescription,
      fullDescription: action.payload.fullDescription,
      employees: action.payload.employees,
    });
  default:
    return state;
  }
};


export default profileReducer;
