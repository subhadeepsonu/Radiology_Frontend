import { Skeleton } from "./ui/skeleton";

export default function Loading() {
  return <div className="h-32 w-full">
      <Skeleton className="h-full w-full" />
    </div>;
}