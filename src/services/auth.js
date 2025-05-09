const USER_KEY = "movie_app_user";

export function setUserSession(username) {
  localStorage.setItem(USER_KEY, username);
}

export function getCurrentUser() {
  return localStorage.getItem(USER_KEY);
}

export function logout() {
  localStorage.removeItem(USER_KEY);
}
