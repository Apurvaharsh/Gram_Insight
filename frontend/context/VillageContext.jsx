import { createContext, useContext, useEffect, useState } from "react";
import { villageAPI } from "../utils/api";

const VillageContext = createContext();

export const VillageProvider = ({ children }) => {
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const response = await villageAPI.getAll();
        if (response?.success) {
          const normalized = (response?.data?.villages || []).map((v) => ({
            id: v._id,
            _id: v._id,
            name: v.villageName,
            villageName: v.villageName,
            district: v.district,
            block: v.block,
            population: v.population,
            scPopulation: v.scPopulation,
            scPopulationPct: v.population ? Math.round((v.scPopulation / v.population) * 100) : 0,
            priorityScore: v.priorityScore || 0,
            status: v.status || "pending",
            amenities: v.amenities || {},
            createdAt: v.createdAt,
            createdBy: v.createdBy,
            location: v.location,
          }));

          setVillages(normalized);
        } else {
          setError("Failed to load villages");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load villages");
      } finally {
        setLoading(false);
      }
    };

    fetchVillages();
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
