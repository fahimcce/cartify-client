/* eslint-disable no-console */
/* eslint-disable padding-line-between-statements */
"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const CurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromCookies = Cookies.get("user")
      ? JSON.parse(Cookies.get("user") as string)
      : null;
    console.log(userFromCookies); // Ensure you're logging after cookies are available
    setUser(userFromCookies);
  }, []);

  return user;
};

export default CurrentUser;
