/* eslint-disable react/self-closing-comp */

import LandingPage from "@/src/components/modules/Home/LandingPage";
import RunningTicker from "@/src/components/modules/Home/RunningTicker";
export default function Page() {
  return (
    <div>
      <LandingPage></LandingPage>
      <RunningTicker></RunningTicker>
    </div>
  );
}
