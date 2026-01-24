import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchVehicleSection = () => {
  const [selectedMaker, setSelectedMaker] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [modifications, setModifications] = useState([]);

  const carData = {
    HONDA: { City: { 2021: ["SV", "V"], 2022: ["VX", "ZX"] }, Civic: { 2021: ["V"], 2022: ["ZX"] } },
    MARUTI: { Swift: { 2021: ["LXI"], 2022: ["ZXI"] }, Alto: { 2021: ["Std"], 2022: ["VXI"] } },
    HYUNDAI: { Creta: { 2021: ["E"], 2022: ["SX"] }, i20: { 2021: ["Magna"] } },
  };

  const handleMakerChange = (e) => {
    const maker = e.target.value;
    setSelectedMaker(maker);
    setModels(maker ? Object.keys(carData[maker] || {}) : []);
    setSelectedModel(""); setSelectedYear(""); setYears([]); setModifications([]);
  };

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    setYears(model ? Object.keys(carData[selectedMaker][model]) : []);
    setSelectedYear(""); setModifications([]);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setModifications(year ? carData[selectedMaker][selectedModel][year] : []);
  };

  return (
    <div className="text-left flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Search by <span className="text-red-500">Vehicle</span></h2>
      <div className="flex flex-col gap-3 mb-4">
        <select className="border px-4 py-3 rounded" value={selectedMaker} onChange={handleMakerChange}>
          <option value="">Select Car Maker</option>
          {Object.keys(carData).map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <select className="border px-4 py-3 rounded" value={selectedModel} onChange={handleModelChange} disabled={!selectedMaker}>
          <option value="">Select Model</option>
          {models.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <select className="border px-4 py-3 rounded" value={selectedYear} onChange={handleYearChange} disabled={!selectedModel}>
          <option value="">Select Year</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>

        <select className="border px-4 py-3 rounded" disabled={!selectedYear}>
          <option value="">Select Modification</option>
          {modifications.map((mod) => <option key={mod} value={mod}>{mod}</option>)}
        </select>

        <div className="text-center mt-2"><button className="text-sm text-blue-600 underline">Search by Number Plate</button></div>
        <button className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded w-full">SEARCH PARTS</button>
      </div>
    </div>
  );
};

const SearchNumberPlateSection = () => (
  <div className="text-left flex flex-col gap-4">
    <h3 className="text-2xl font-bold text-gray-700">Search by <span className="text-red-500">Number Plate</span></h3>
    <div className="flex items-center border rounded-lg px-3 py-3 shadow-md mb-4">
      <span className="bg-gray-200 px-3 py-2 rounded-l">IND</span>
      <input type="text" maxLength={11} placeholder="DL1AA2345" className="flex-1 px-3 py-2 outline-none text-gray-700" />
      <FaSearch className="text-gray-500 text-xl cursor-pointer" />
    </div>
    <span className="text-blue-600 cursor-pointer underline">Select your car manually</span>
  </div>
);

export const Sider = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isSearchVehicleOpen, setIsSearchVehicleOpen] = useState(false);
  const [isSearchNumberOpen, setIsSearchNumberOpen] = useState(false);

  const topMenuItems = [
    { label: "Search by Vehicle", action: () => setIsSearchVehicleOpen(true) },
    { label: "Search by Number Plate", action: () => setIsSearchNumberOpen(true) },
    { label: "Car Makers", action: () => { navigate("/vehicles"); } },
    { label: "Contact Us", action: () => { navigate("/contact"); } },
    { label: "Sell Your Car", href: "https://www.spinny.com/sell-used-car/", external: true },
  ];

  const bottomMenuItems = [
    { label: "FAQ", href: "/faq" },
    { label: "Return Policy", href: "/return-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Become a Vendor", href: "/signup" },
  ];

  const handleItemClick = (item) => {
    if (item.action) item.action();
    if (item.href && !item.external) navigate(item.href);
    if (item.external) window.open(item.href, "_blank");
    if (onClose) onClose();
  };

  // Close sidebar when the user scrolls the page
  useEffect(() => {
    if (!isOpen) return;
    
    // Prevent body scroll when sidebar is open
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px'; // Prevent layout shift from scrollbar
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    };
  }, [isOpen]);

  // Close sidebar when the user scrolls the page
  useEffect(() => {
    if (!isOpen) return;
    const onScroll = () => {
      if (onClose) onClose();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={onClose} />}

      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}>
        <div className="flex items-center gap-3 px-4 py-4 border-b bg-gradient-to-r from-white to-gray-50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold">S</div>
            <div>
              <div className="text-base font-bold text-gray-800">Speralo</div>
              <div className="text-xs text-gray-500">Auto parts & accessories</div>
            </div>
          </div>
          <div className="ml-auto">
            <button onClick={onClose} className="text-gray-600 hover:text-red-500"><IoClose size={22} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
          <div className="p-4 border-b">
            <ul className="flex flex-col gap-2">
              {topMenuItems.map((item, idx) => (
                <li key={idx} className="flex items-center cursor-pointer hover:bg-slate-50 rounded-md p-2 transition-colors" onClick={() => handleItemClick(item)}>
                  <div className="flex-1"><div className="font-medium text-gray-800">{item.label}</div></div>
                  <div className="text-gray-400 text-sm">›</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Support & Policies</h4>
            <div className="flex flex-col gap-1">
              {bottomMenuItems.map((item, idx) => (
                <a key={idx} href={item.href} onClick={() => onClose && onClose()} className="flex items-center justify-between px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-slate-50 transition-colors">
                  <span>{item.label}</span>
                  <span className="text-gray-400">›</span>
                </a>
              ))}
            </div>

            <div className="mt-4 border-t pt-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-800">Need help?</div>
                  <div className="text-xs text-gray-500">Contact our support team</div>
                </div>
                <a href="/contact" className="text-sm text-sky-600 hover:underline">Contact</a>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-t bg-white flex-shrink-0">
          <button className="w-full text-left font-medium text-red-500 hover:text-red-700 py-2">Logout</button>
        </div>
      </div>

      {isSearchVehicleOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative flex flex-col gap-4">
            <button className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold" onClick={() => setIsSearchVehicleOpen(false)}>✕</button>
            <SearchVehicleSection />
          </div>
        </div>
      )}

      {isSearchNumberOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative flex flex-col gap-4">
            <button className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold" onClick={() => setIsSearchNumberOpen(false)}>✕</button>
            <SearchNumberPlateSection />
          </div>
        </div>
      )}
    </>
  );
};

export default Sider;