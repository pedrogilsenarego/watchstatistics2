import axios from "axios";

export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes("admin")) return true;

  return false;
};

export const apiInstance = axios.create({
  //liveURL
  baseURL: "https://us-central1-fir-auth0-9b4cb.cloudfunctions.net/api",
  //local Hosting
  //baseURL: "http://localhost:5001/fir-auth0-9b4cb/us-central1/api",
  //local Hosting
  //baseURL: "http://localhost:3001",
});
