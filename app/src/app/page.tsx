import SearchForm from "./components/searchForm";
import NavBar from "./components/navbar";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center bg-[url(https://images.unsplash.com/photo-1518527989017-5baca7a58d3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3474&q=80)] 
    bg-no-repeat bg-cover"
    >
      <NavBar />
      <SearchForm />
    </main>
  );
}
