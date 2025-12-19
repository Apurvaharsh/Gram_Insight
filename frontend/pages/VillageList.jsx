import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const VillageList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(true);

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
          status: v.status, // "pending" | "approved"
        }));

        setVillages(normalized);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredVillages = villages.filter((v) =>
    [v.name, v.district, v.block]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-orange-600 bg-white ring-orange-500/30 ring-1";
      case "approved":
        return "text-primary-600 bg-white ring-primary-600/30 ring-1";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  const getPriorityColor = (score) => {
    if (score >= 80) return "text-red-600";
    if (score >= 50) return "text-orange-500";
    return "text-primary-600";
  };

  const getPriorityLabel = (score) => {
    if (score >= 80) return "Critical";
    if (score >= 50) return "High";
    return "Normal";
  };

  const getPriorityBarColor = (score) => {
    if (score >= 80) return "bg-red-500";
    if (score >= 50) return "bg-orange-500";
    return "bg-primary-500";
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-500">
        Loading villages...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Village Directory
          </h2>
          <p className="text-sm font-medium text-slate-500">
            Manage development status and prioritize resources.
          </p>
        </div>

        <Link
          to="/villages/new"
          className="flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-600/20 hover:bg-primary-700 transition-all"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add New Village
        </Link>
      </div>

      {/* Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-3.5 text-slate-400">
            search
          </span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm font-medium focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            placeholder="Search by name, district, block..."
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full">
            <thead className="border-b bg-slate-50">
              <tr>
                {[
                  "Village",
                  "District",
                  "Block",
                  "Population",
                  "Priority",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-xs font-bold uppercase text-slate-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredVillages.map((v) => (
                <tr
                  key={v.id}
                  className="group hover:bg-primary-50/30 transition"
                >
                  {/* Village */}
                  <td className="px-6 py-4">
                    <Link
                      to={`/villages/${v.id}`}
                      className="flex items-center gap-3"
                    >
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                        {v.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-primary-700">
                          {v.name}
                        </div>
                        <div className="text-xs text-slate-400">ID: {v.id}</div>
                      </div>
                    </Link>
                  </td>

                  {/* District */}
                  <td className="px-6 py-4">{v.district}</td>

                  {/* Block */}
                  <td className="px-6 py-4">{v.block}</td>

                  {/* Population */}
                  <td className="px-6 py-4">
                    <div className="font-bold">
                      {v.population.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">
                      SC: {v.scPopulationPct}%
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-4">
                    <div className="w-32 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span
                          className={`font-bold ${getPriorityColor(
                            v.priorityScore
                          )}`}
                        >
                          {getPriorityLabel(v.priorityScore)}
                        </span>
                        <span className="text-slate-400">
                          {v.priorityScore}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full">
                        <div
                          className={`h-full rounded-full ${getPriorityBarColor(
                            v.priorityScore
                          )}`}
                          style={{ width: `${v.priorityScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${getStatusColor(
                        v.status
                      )}`}
                    >
                      <span
                        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                          v.status === "approved"
                            ? "bg-primary-500"
                            : "bg-orange-500"
                        }`}
                      />
                      {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                      <Link
                        to={`/villages/${v.id}`}
                        className="h-8 w-8 flex items-center justify-center rounded-full text-slate-400 hover:text-primary-600 hover:bg-white hover:shadow"
                      >
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredVillages.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No villages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
