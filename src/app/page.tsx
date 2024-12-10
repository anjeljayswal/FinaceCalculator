import Link from "next/link";
import FinanceCalculator from "./dashboard/components/FinanceCalculator";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Welcome to Daily Task Tracker</h1>
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Go to Dashboard
          </button>
        </Link>
      </main>
      <div className="flex justify-center items-center h-screen bg-purple-100">
        <FinanceCalculator />
      </div>
    </>

  );
}
