import envConfig from "../config/envConfig";
import { delay } from "../utils/delay";

export const getAllProducts = async () => {
  const res = await fetch(`${envConfig.baseApi}/products`);

  await delay(5000);

  return res.json();
};
