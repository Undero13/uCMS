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

/**
 * example usage
 *  const photo:any = await toBase64(e.file);
    const resParam = qs.stringify({
      photo
    });
 */
const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

export {
  AxiosService,
  toBase64
};
