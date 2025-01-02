/* eslint-disable react/jsx-sort-props */
import Image from "next/image";

import loader from "../../../public/loader.gif";

export default function CLoader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image src={loader} alt="Loading..." width={150} height={150} />
    </div>
  );
}
