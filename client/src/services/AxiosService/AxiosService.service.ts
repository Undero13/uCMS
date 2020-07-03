import axios from "axios";
import environment from "@/environment";
import CookieService from "../CookieService/CookieService.service";

const AxiosService = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `${CookieService.getJWToken()}`,
  },
});

export default AxiosService;
