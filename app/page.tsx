import Header from "../components/Header";
import HackathonList from "../components/HackathonList";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import { ThemeProvider } from "../components/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 space-y-4">
            <SearchBar />
            <Filters />
          </div>
          <HackathonList />
        </main>
      </div>
    </ThemeProvider>
  );
}
