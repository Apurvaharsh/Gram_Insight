import { createContext, useContext, useEffect, useState } from "react";

const VillageContext = createContext();

export const VillageProvider = ({ children }) => {
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/villages")
      .then((res) => res.json())
      .then((response) => {
        const normalized = (response?.data?.villages || []).map((v) => ({
          id: v._id,
          name: v.villageName,
          district: v.district,
          block: v.block,
          population: v.population,
          scPopulation: v.scPopulation,
          scPopulationPct: Math.round((v.scPopulation / v.population) * 100),
          priorityScore: v.priorityScore,
          status: v.status,
        }));

        setVillages(normalized);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load villages");
        setLoading(false);
      });
  }, []);

  return (
    <VillageContext.Provider
      value={{
        villages,
        setVillages,
        loading,
        error,
      }}
    >
      {children}
    </VillageContext.Provider>
  );
};

export const useVillages = () => {
  const context = useContext(VillageContext);
  if (!context) {
    throw new Error("useVillages must be used inside VillageProvider");
  }
  return context;
};
