import envConfig from "@/src/config/envConfig";
import { delay } from "@/src/utils/delay";

export const getAllShops = async () => {
  const res = await fetch(`${envConfig.baseApi}/shops`);

  await delay(5000);

  return res.json();
};
