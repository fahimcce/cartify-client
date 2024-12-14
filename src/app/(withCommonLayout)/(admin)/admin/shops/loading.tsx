import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner color="warning" label="Please wait, loading your content.." />
    </div>
  );
}
