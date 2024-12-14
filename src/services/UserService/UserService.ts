import envConfig from "@/src/config/envConfig";
import { delay } from "@/src/utils/delay";

export const getAllUsers = async () => {
  const res = await fetch(`${envConfig.baseApi}/user`);

  await delay(5000);

  return res.json();
};
