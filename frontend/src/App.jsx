import { useEffect, useState } from "react";
import VillageMap from "./components/VillageMap";

function App() {
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/villages");
        const data = await res.json();

        // adapt if your apiResponse wrapper is different
        setVillages(data?.data?.villages || []);
      } catch (err) {
        console.error("Failed to fetch villages", err);
        setError("Unable to load village data");
      } finally {
        setLoading(false);
      }
    };

    fetchVillages();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        Loading village map...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      {/* Top Header */}
      <header className="bg-gradient-to-tr from-green-400 to-emerald-600 h-14 flex items-center px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-800">
          SC Village Amenities Dashboard
        </h1>
      </header>

      {/* Map */}
      <div className="h-[calc(100vh-56px)]">
        <VillageMap villages={villages} />
      </div>
    </div>
  );
}

export default App;
