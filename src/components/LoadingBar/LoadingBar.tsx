import { loadingBarLineVariants } from "./LoadingBar.variants";

export default function LoadingBar() {
  return (
    <div
      className="relative h-0.5 w-full overflow-hidden bg-[#d9d9d9]"
      role="progressbar"
      aria-label="Loading">
      <span className={loadingBarLineVariants()} />
    </div>
  );
}
