import NavBar from "../components/navbar";
import ShipTable from "../components/shipTable";

export default function Data() {
  return (
    <main className="flex min-h-screen bg-zinc-700 flex-col items-center">
      <NavBar />
      <ShipTable />
    </main>
  );
}
