export enum Routes {
  BASE_FRONTEND_URL = "http://localhost:4200",
  BASE_BACKEND_URL = "http://localhost:8080/api/shop",
  SHOPPING_URL = `${BASE_FRONTEND_URL}/shopping`,
  ORDER_URL = `${BASE_FRONTEND_URL}/order`,
  LOGIN_URL = `${BASE_FRONTEND_URL}/login`,
  NOT_EXISTING_URL = `${BASE_FRONTEND_URL}/this-url-should-not-exist`,
  GET_PERSON_BY_ID_URL = `${BASE_BACKEND_URL}/person/1`,
  POST_PERSON_URL = `${BASE_BACKEND_URL}/person`
}