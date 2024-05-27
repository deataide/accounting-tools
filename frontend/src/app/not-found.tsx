import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen font-bold">
      <h2 className="text-3xl">Not Found</h2>
      <Link className="bg-primary p-4 text-light" href="/">
        Go Back to Home
      </Link>
    </div>
  );
}
