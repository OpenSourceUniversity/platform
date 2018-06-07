const INITIAL_STATE = {
  isFetching: false,
  error: null,
  course: {
        "id": "d6681a6f-ac93-4c6f-8f0e-08690d4ff8aa",
        "title": "Marketing in a Digital World",
        "description": "This course examines how digital tools, such as the Internet, smartphones, and 3D printing, are revolutionizing the world of marketing by shifting the balance of power from firms to consumers. Marketing in a Digital World is one of the most popular courses on Coursera with over 150,000 Learners and is rated by Class Central as one of the Top 50 MOOCs of All Time (https://www.class-central.com/report/top-moocs/).\n\nThis course is part of the iMBA offered by the University of Illinois, a flexible, fully-accredited online MBA at an incredibly competitive price. For more information, please see the Resource page in this course and onlinemba.illinois.edu.",
        "external_link": "https://www.coursera.org/learn/marketing-digital",
        "provider": {
            "id": "187a5f00-6477-4e79-b420-ef6bba5cbb97",
            "name": "Coursera"
        },
        "tutor": "Aric Rindfleisch",
        "categories": [
            {
                "id": "8c3bc2fc-efe4-4e35-8a39-234c4ebbffae",
                "name": "Business"
            }
        ],
        "skills": [
            {
                "id": "96a58812-910f-4510-b7f2-8476472c17a9",
                "name": "usa"
            },
            {
                "id": "274e8aa0-eb10-4d34-9a5d-27940c260e84",
                "name": "north america"
            }
        ]
    },
};

export default function courseReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'FETCH_COURSE_REQUEST':
    return Object.assign({}, state, {
      isFetching: true,
    });
  case 'FETCH_COURSE_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      course: action.result,
    });
  case 'FETCH_COURSE_FAILURE':
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error.message,
    });
  case 'RESET_FETCHED_COURSE':
    return Object.assign({}, state, {
      isFetching: false,
      course: 'null',
      error: null,
    });
  default:
    return state;
  }
}
