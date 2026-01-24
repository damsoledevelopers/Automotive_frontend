import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getVehicleImageUrl } from "../../data/vehicleData";
import VehicleBreadcrumbs from "./VehicleBreadcrumbs";
import { categories } from "../SearchByCategory";

import { marutiModels } from "./Maruti";
import { hyundaiModels } from "./Hyundai";
import { tataModels } from "./Tata";
import { mahindraModels } from "./Mahindra";
import { chevroletModels } from "./Chevrolet";
import { hondaModels } from "./Honda";
import { skodaModels } from "./Skoda";
import { vwModels } from "./Vw";
import { toyotaModels } from "./Toyota";
import { nissanModels } from "./Nissan";
import { renaultModels } from "./Renault";
import { fordModels } from "./Ford";
import { fiatModels } from "./Fiat";
import { kiaModels } from "./Kia";
import { ashokLaylandModels } from "./AshokLayland";
import { audiModels } from "./Audi";

/* ===================== DATA MAP ===================== */

const allVehicleModels = {
  MARUTI: marutiModels,
  HYUNDAI: hyundaiModels,
  TATA: tataModels,
  MAHINDRA: mahindraModels,
  CHEVROLET: chevroletModels,
  HONDA: hondaModels,
  SKODA: skodaModels,
  VW: vwModels,
  TOYOTA: toyotaModels,
  NISSAN: nissanModels,
  RENAULT: renaultModels,
  FORD: fordModels,
  FIAT: fiatModels,
  KIA: kiaModels,
  "ASHOK LEYLAND": ashokLaylandModels,
  AUDI: audiModels,
};

/* ===================== HELPERS ===================== */

const parseModification = (option = "") => {
  const parts = option.split("/");
  const modification = parts[0]?.trim() || "";
  const engineType = parts[1]?.trim() || "Petrol";
  const power = parts[2]?.match(/(\d+)\s*h\.?p/i)?.[1] || "";
  const emission = parts[3]?.trim() || "";

  const engineMatch = modification.match(/(\d+\.?\d*)\s*L/i);
  const engine = engineMatch ? `${engineMatch[1]} L` : "";

  return {
    modification,
    engine,
    engineType,
    power: power ? `${power} hp` : "",
    emission,
  };
};

const getBodyType = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("alto") || n.includes("swift") || n.includes("i10")) return "Hatchback";
  if (n.includes("xuv") || n.includes("scorpio") || n.includes("suv")) return "SUV";
  if (n.includes("ertiga") || n.includes("innova")) return "Van";
  return "Saloon";
};

/* ===================== COMPONENT ===================== */

const ModelDetail = () => {
  const { maker, modelId } = useParams();
  const navigate = useNavigate();

  const makerName = maker?.toUpperCase().replace(/-/g, " ");
  const normalizedMaker =
    makerName === "ASHOK LAYLAND" ? "ASHOK LEYLAND" : makerName;

  const models = allVehicleModels[normalizedMaker] || [];

  const model =
    models.find((m) => String(m.id) === modelId) ||
    models.find(
      (m) =>
        m.name.toLowerCase().replace(/\s+/g, "-") === modelId?.toLowerCase()
    );

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="px-4 py-3">
        <VehicleBreadcrumbs modelName={model.name} />
      </div>

      {/* Header */}
      <div className="px-4 py-4">
        <h1 className="text-2xl font-bold text-blue-600">
          {model.name.toUpperCase()}
        </h1>
        <p className="text-gray-600 text-sm">{model.years}</p>
      </div>

      {/* Image + Info */}
      <div className="px-4 flex flex-col md:flex-row gap-6">
        <img
          src={model.image || getVehicleImageUrl(normalizedMaker, model.name)}
          alt={model.name}
          className="w-full md:w-1/3 bg-gray-50 rounded p-4"
        />

        <div className="space-y-2 text-sm">
          <div>
            <strong>Engine:</strong>{" "}
            {parseModification(model.modifications?.[0]?.options?.[0]).engine ||
              "-"}
          </div>
          <div>
            <strong>Engine Type:</strong> Petrol
          </div>
          <div>
            <strong>Body Type:</strong> {getBodyType(model.name)}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-10">
        <div className="relative sm:w-64">
          <input
            type="text"
            placeholder="Filter Category"
            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* 🔍 Bigger Icon (FIXED) */}
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            key={category.title}
            to={category.href}
            className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg"
          >
            <img
              src={category.img}
              alt={category.title}
              className="w-16 h-16 object-contain mb-2"
            />
            <span className="text-xs font-semibold text-gray-700">
              {category.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

/* ===================== EXPORT (IMPORTANT) ===================== */

export default ModelDetail;
