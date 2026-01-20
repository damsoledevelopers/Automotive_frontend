import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import './App.css';
import { CartProvider } from './contexts/CartContext';
import { VehicleProvider } from './contexts/VehicleContext';
import { JobProvider } from './contexts/JobContext';
import { EscrowProvider } from './contexts/EscrowContext';

import Header from './component/Header';
import Footer from "./component/Footer";
import BottomNavigation from './component/BottomNavigation';
import { AuthProvider, USER_ROLES } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuperAdminDashboard from './component/dashboards/admin/SuperAdminDashboard';
import VendorDashboard from './component/dashboards/vendor/VendorDashboard';
import MechanicsDashboard from './component/dashboards/mechanics/MechanicsDashboard';
import GarageDashboard from './component/dashboards/garage/GarageDashboard';
import ShippingDashboard from './component/dashboards/shipping/ShippingDashboard';
import DiagnosticForm from './features/diagnostics/DiagnosticForm';
import ChatbotSupport from './features/support/ChatbotSupport';

import Cart from './component/Cart';
import ShippingAddress from './component/checkout/ShippingAddress';
import Review from './component/checkout/Review';
import Payment from './component/checkout/Payment';
import OrderConfirmation from './component/checkout/OrderConfirmation';
import { BoodmoUi } from './component/BoodmoUi';
import CurrentOffers from './component/CurrentOffers';
import SearchSection from "./component/SearchSection";
import BrandTrustAndCarMakers from './component/BrandTrustAndCarMakers';
import { Garage } from './component/Garage';
import { MyProfile } from './component/MyProfile';
import { MyOrder } from './component/MyOrder';
import { MyWishlist } from './component/MyWishlist';
import { Document } from './component/Document';
import { Company_GST } from './component/Company_GST';
import { Addresses } from "./component/Addresses";
import Contact from "./component/Contact";
import Article_review from "./component/Article_Review";
import Wallet from "./component/Wallet";
import Membership from "./component/Membership";
import LuckyDraw from "./component/LuckyDraw";
import Location from "./component/Location";
import Notifications from "./component/Notifications";
import Login from "./component/Login";
import ForgotPassword from "./component/Forgot_Password";
import Signup from "./component/Signup";
import VendorPage from "./component/VendorPage";
import SearchByCategory from "./component/SearchByCategory";
import ChooseWorkshop from "./component/ChooseWorkshop";
import ChooseMechanics from "./component/ChooseMechanics";
import WhyChooseAftermarket from "./component/WhyChooseAftermarket";
import PartSearchResults from "./component/PartSearchResults";
import VehicleSearchResults from "./component/VehicleSearchResults";
import ProductDetail from "./component/ProductDetail";
import OEMCatalogue from "./component/catalogue/OEMCatalogue";
import ServiceBooking from "./component/service/ServiceBooking";
import JobDetails from "./component/service/JobDetails";
import VehicleJobCard from "./component/service/VehicleJobCard";
import SpareloPage from "./component/SpareloPage";
import CatalogPage from "./component/catalogue/CataloguePage";
import VehicleMaker from "./component/Vehicles/VehicleMaker";
import MaintenanceServiceParts from "./component/catalogue/MaintenanceServiceParts";
import Filters from "./component/catalogue/Filters";
import Windscreen_Cleaning_System from "./component/catalogue/Windscreen_Cleaning_System";
import Car_Accessories from "./component/catalogue/Car_Accessories";
import Lighting from "./component/catalogue/Lighting";
import { Control_Cables } from "./component/catalogue/Control_Cables";
import Break_System from "./component/catalogue/Break_System";
import { Bearing } from "./component/catalogue/Bearing";
import { Clutch_System } from "./component/catalogue/Clutch_System";
import { Electric_Components } from "./component/catalogue/Electric_Components";
import Engine from "./component/catalogue/Engine";
import Engine_Cooling_System from "./component/catalogue/Engine_Cooling_System";
import Exhaust_System from "./component/catalogue/Exhaust_System";
import AirConditioning from "./component/catalogue/AirConditioning";
import Fuelsupply_System from "./component/catalogue/Fuelsupply_System";
import Gasket_SealingRings from "./component/catalogue/Gasket_SealingRings";
import Ignition_Glowplug from "./component/catalogue/Ignition_Glowplug";
import Interior_Comfort from "./component/catalogue/Interior_Comfort";
import Body from "./component/catalogue/Body";
import Oil_Fluids from "./component/catalogue/Oil_Fluids";
import Pipes_Hoses from "./component/catalogue/Pipes_Hoses";
import RepairKits from "./component/catalogue/RepairKits";
import Sensors_ControlUnits from "./component/catalogue/Sensors_ControlUnits";
import Steering from "./component/catalogue/Steering";
import Suspention_Arms from "./component/catalogue/Suspention_Arms";
import TowbarParts from "./component/catalogue/TowbarParts";
import Transmission from "./component/catalogue/Transmission";
import Trims from "./component/catalogue/Trims";
import Tyres_Alloys from "./component/catalogue/Tyres_Alloys";
import Universal from "./component/catalogue/Universal";
import Wheels from "./component/catalogue/Wheels";
import Belts_Chains_Rollers from "./component/catalogue/Belts_Chains_Rollers";
import Belt from "./component/catalogue/Belt";
import TimingBelt from "./component/catalogue/TimingBelt";
import TimingBeltDetail from "./component/catalogue/TimingBeltDetail";
import TimingBeltKit from "./component/catalogue/TimingBeltKit";
import VBelt from "./component/catalogue/VBelt";
import BrakeParts from "./component/catalogue/BrakeParts";
import SubCategoryPage from "./component/catalogue/SubCategoryPage";
import ClutchParts from "./component/catalogue/ClutchParts";
import EngineOilParts from "./component/catalogue/EngineOilParts";
import FilterParts from "./component/catalogue/FilterParts";
import GlowPlugParts from "./component/catalogue/GlowPlugParts";
import HornParts from "./component/catalogue/HornParts";
import LightParts from "./component/catalogue/LightParts";
import { Brands } from "./component/brand/Brands";
import BrandDetail from "./component/brand/BrandDetail";
import VehiclePage from "./component/Vehicles/VehiclePage";
import { Maruti } from "./component/Vehicles/Maruti";
import { Hyundai } from "./component/Vehicles/Hyundai";
import { Mahindra } from "./component/Vehicles/Mahindra";
import { Tata } from "./component/Vehicles/Tata";
import { Chevrolet } from "./component/Vehicles/Chevrolet";
import { Honda } from "./component/Vehicles/Honda";
import { Skoda } from "./component/Vehicles/Skoda";
import { Vw } from "./component/Vehicles/Vw";
import { Toyota } from "./component/Vehicles/Toyota";
import { Nissan } from "./component/Vehicles/Nissan";
import { Renault } from "./component/Vehicles/Renault";
import { Ford } from "./component/Vehicles/Ford";
import { Fiat } from "./component/Vehicles/Fiat";
import { Kia } from "./component/Vehicles/Kia";
import { AshokLayland } from "./component/Vehicles/AshokLayland";
import { Audi } from "./component/Vehicles/Audi";
import ModelDetail from "./component/Vehicles/ModelDetail";
import FAQ from "./features/support/FAQ";
import ReturnPolicy from "./features/support/ReturnPolicy";

// Pages from pages folder
import About from "./component/pages/About";
import APISolution from "./component/pages/APISolution";
import BuyersPolicy from "./component/pages/BuyersPolicy";
import Careers from "./component/pages/Careers";
import DamagedParts from "./component/pages/DamagedParts";
import Disclaimer from "./component/pages/Disclaimer";
import DiscoveryPoints from "./component/pages/DiscoveryPoints";
import InvestorRelations from "./component/pages/InvestorRelations";
import Offers from "./component/pages/Offers";
import PrivacyPolicy from "./component/pages/PrivacyPolicy";
import SellersPolicy from "./component/pages/SellersPolicy";
import Sitemap from "./component/pages/Sitemap";
import Sitemap2 from "./component/pages/Sitemap2";
import Suppliers from "./component/pages/Suppliers";
import TermsOfUse from "./component/pages/TermsOfUse";
import Support from "./component/pages/Support";
import Articles from "./component/pages/Articles";




// Component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Component to conditionally render Header/Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = [
    "/login",
    "/signup",
    "/forgot-password",
    "/admin/dashboard",
    "/vendor/dashboard",
    "/mechanics/dashboard",
    "/garage/dashboard",
    "/shipping/dashboard",
    "/wallet",
    "/membership",
    "/notifications"
  ].includes(location.pathname) || location.pathname.startsWith("/admin/") ||
    location.pathname.startsWith("/vendor/") || location.pathname.startsWith("/mechanics/") ||
    location.pathname.startsWith("/garage/") || location.pathname.startsWith("/shipping/");
  const hideFooter = hideHeaderFooter || location.pathname.startsWith("/checkout") || location.pathname === "/cart";
  return (
    <>
      {!hideHeaderFooter && <Header />}
      <div className={!hideHeaderFooter ? "pt-[100px] sm:pt-[110px] md:pt-[110px]" : ""}>
        {children}
      </div>
      <ToastContainer />
      {!hideHeaderFooter && <BottomNavigation />}
      {!hideFooter && <Footer />}
      {!hideHeaderFooter && <ChatbotSupport />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <VehicleProvider>
        <JobProvider>
          <EscrowProvider>
            <CartProvider>
              <Router
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
                <ScrollToTop />
                <Layout>
                  <Routes>
                    {/* Home Page */}
                    <Route
                      path="/"
                      element={
                        <>

                          <BoodmoUi />
                          <SearchSection />
                          <SearchByCategory />
                          <ChooseWorkshop />
                          <ChooseMechanics />
                          {/* <SearchSection /> */}

                         
                          {/* <WhyChooseAftermarket /> */}
                          <BrandTrustAndCarMakers />
                          <CurrentOffers />
                          <Article_review
                            items={[{ label: "Articles and Reviews", href: "/pages/article/" }]}
                          />
                          {/* <SpareloPage /> */}
                        </>
                      }
                    />

                    {/* Authentication Pages */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Dashboard Routes - Protected */}
                    <Route
                      path="/admin/dashboard/*"
                      element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.SUPER_ADMIN]}>
                          <SuperAdminDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/vendor/dashboard/*"
                      element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.VENDOR]}>
                          <VendorDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/mechanics/dashboard/*"
                      element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.MECHANICS]}>
                          <MechanicsDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/garage/dashboard/*"
                      element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.GARAGE]}>
                          <GarageDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/shipping/dashboard/*"
                      element={
                        <ProtectedRoute allowedRoles={[USER_ROLES.SHIPPING]}>
                          <ShippingDashboard />
                        </ProtectedRoute>
                      }
                    />

                    {/* Other Pages */}
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/vendor" element={<VendorPage />} />
                    <Route path="/brands" element={<Brands />} />
                    <Route path="/brands/:brandSlug" element={<BrandDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/membership" element={<Membership />} />
                    <Route path="/lucky-draw" element={<LuckyDraw />} />
                    <Route path="/location" element={<Location />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/checkout/address" element={<ShippingAddress />} />
                    <Route path="/checkout/review" element={<Review />} />
                    <Route path="/checkout/payment" element={<Payment />} />
                    <Route path="/checkout/confirmation" element={<OrderConfirmation />} />
                    <Route path="/category" element={<SearchByCategory />} />
                    <Route path="/garage" element={<Garage />} />
                    <Route path="/document" element={<Document />} />
                    <Route path="/myprofile" element={<MyProfile />} />
                    <Route path="/myorder" element={<MyOrder />} />
                    <Route path="/mywishlist" element={<MyWishlist />} />
                    <Route path="/company_gst" element={<Company_GST />} />
                    <Route path="/addresses" element={<Addresses />} />
                    <Route path="/diagnostic" element={<DiagnosticForm />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/addresses" element={<Addresses />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/return-policy" element={<ReturnPolicy />} />

                    {/* Pages from pages folder */}
                    <Route path="/about" element={<About />} />
                    <Route path="/api-solution" element={<APISolution />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/buyers-policy" element={<BuyersPolicy />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/damaged-parts" element={<DamagedParts />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />
                    <Route path="/discovery-points" element={<DiscoveryPoints />} />
                    <Route path="/investor-relations" element={<InvestorRelations />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/sellers-policy" element={<SellersPolicy />} />
                    <Route path="/sitemap" element={<Sitemap />} />
                    <Route path="/sitemap2" element={<Sitemap2 />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/terms-of-use" element={<TermsOfUse />} />

                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/catalog/maintenance_service_parts/" element={<MaintenanceServiceParts />} />
                    <Route path="/catalog/4032-belts/" element={<Belt />} />
                    <Route path="/catalog/4390-timing_belt/" element={<TimingBelt />} />
                    <Route path="/catalog/4033-time_belt/" element={<TimingBelt />} />
                    <Route path="/catalog/timing-belt/:itemId" element={<TimingBeltDetail />} />
                    <Route path="/catalog/4393-timing_belt_kit/" element={<TimingBeltKit />} />
                    <Route path="/catalog/3720-v_belt/" element={<VBelt />} />
                    <Route path="/catalog/3713-brakes/" element={<BrakeParts />} />
                    <Route path="/catalog/4027-clutch/" element={<ClutchParts />} />
                    <Route path="/catalog/5193-engine_oil/" element={<EngineOilParts />} />
                    <Route path="/catalog/3625-filters/" element={<FilterParts />} />
                    <Route path="/catalog/4385-glow_plug/" element={<GlowPlugParts />} />
                    <Route path="/catalog/4064-horns/" element={<HornParts />} />
                    <Route path="/catalog/4028-light/" element={<LightParts />} />
                    <Route path="/catalog/filters/" element={<Filters />} />
                    <Route path="/catalog/windscreen_cleaning_system/" element={<Windscreen_Cleaning_System />} />
                    <Route path="/catalog/car_accessories/" element={<Car_Accessories />} />
                    <Route path="/catalog/lighting/" element={<Lighting />} />
                    <Route path="/catalog/control_cables/" element={<Control_Cables />} />
                    <Route path="/catalog/brakes/" element={<Break_System />} />
                    <Route path="/catalog/bearings/" element={<Bearing />} />
                    <Route path="/catalog/clutch/" element={<Clutch_System />} />
                    <Route path="/catalog/electric_components/" element={<Electric_Components />} />
                    <Route path="/catalog/engine/" element={<Engine />} />
                    <Route path="/catalog/cooling_system/" element={<Engine_Cooling_System />} />
                    <Route path="/catalog/exhaust/" element={<Exhaust_System />} />
                    <Route path="/catalog/air_conditioning/" element={<AirConditioning />} />
                    <Route path="/catalog/fuelsystem/" element={<Fuelsupply_System />} />
                    <Route path="/catalog/Gasket_SealingRings/" element={<Gasket_SealingRings />} />
                    <Route path="/catalog/ignition_glowplug/" element={<Ignition_Glowplug />} />
                    <Route path="/catalog/interior_comfort/" element={<Interior_Comfort />} />
                    <Route path="/catalog/body/" element={<Body />} />
                    <Route path="/catalog/oilsfluids/" element={<Oil_Fluids />} />
                    <Route path="/catalog/pipes_hoses/" element={<Pipes_Hoses />} />
                    <Route path="/catalog/repair_kits/" element={<RepairKits />} />
                    <Route path="/catalog/sensors_control_units/" element={<Sensors_ControlUnits />} />
                    <Route path="/catalog/steering/" element={<Steering />} />
                    <Route path="/catalog/suspension/" element={<Suspention_Arms />} />
                    <Route path="/catalog/towbar/" element={<TowbarParts />} />
                    <Route path="/catalog/transmission/" element={<Transmission />} />
                    <Route path="/catalog/trims/" element={<Trims />} />
                    <Route path="/catalog/tyres_and_alloys/" element={<Tyres_Alloys />} />
                    <Route path="/catalog/universal/" element={<Universal />} />
                    <Route path="/catalog/wheels/" element={<Wheels />} />
                    <Route path="/catalog/drive_belts/" element={<Belts_Chains_Rollers />} />


                    <Route path="/vehicles/vehiclepage" element={<VehiclePage />} />
                    <Route path="/vehicles/maruti" element={<Maruti />} />
                    <Route path="/vehicles/hyundai" element={<Hyundai />} />
                    <Route path="/vehicles/mahindra" element={<Mahindra />} />
                    <Route path="/vehicles/tata" element={<Tata />} />
                    <Route path="/vehicles/chevrolet" element={<Chevrolet />} />
                    <Route path="/vehicles/honda" element={<Honda />} />
                    <Route path="/vehicles/skoda" element={<Skoda />} />
                    <Route path="/vehicles/vw" element={<Vw />} />
                    <Route path="/vehicles/toyota" element={<Toyota />} />
                    <Route path="/vehicles/nissan" element={<Nissan />} />
                    <Route path="/vehicles/renault" element={<Renault />} />
                    <Route path="/vehicles/ford" element={<Ford />} />
                    <Route path="/vehicles/fiat" element={<Fiat />} />
                    <Route path="/vehicles/kia" element={<Kia />} />
                    <Route path="/vehicles/ashok-layland" element={<AshokLayland />} />
                    <Route path="/vehicles/audi" element={<Audi />} />
                    <Route path="/vehicles/:maker/:modelId" element={<ModelDetail />} />

                    {/* Redirect landing after Oriparts back_url_pn */}
                    <Route path="/search/:pn" element={<PartSearchResults />} />

                    {/* Product detail page for back_url_id - Must come before catch-all */}
                    {/* These routes must be more specific to match before the catch-all */}
                    <Route path="/catalog/part-p-:itemId" element={<ProductDetail />} />
                    <Route path="/catalog/part-p-:itemId/" element={<ProductDetail />} />

                    {/* Catch-all route for catalog sub-categories (e.g., /catalog/4079-accessory_kit_disc_brake_pads/) */}
                    {/* This handles all other catalog routes that don't match specific patterns above */}
                    {/* Note: SubCategoryPage will redirect "part-p-*" routes to ProductDetail */}
                    <Route path="/catalog/:categorySlug" element={<SubCategoryPage />} />
                    <Route path="/catalog/:categorySlug/" element={<SubCategoryPage />} />

                    {/* Vehicle-based search landing */}
                    <Route path="/vehicle-search" element={<VehicleSearchResults />} />
                    <Route path="/oem-catalogue" element={<OEMCatalogue />} />
                    <Route path="/vehicles" element={<VehicleMaker />} />

                    {/* Service Booking */}
                    <Route path="/service/booking" element={<ServiceBooking />} />
                    <Route path="/service/job/:jobId" element={<JobDetails />} />
                    <Route path="/service/job/:jobId/jobcard" element={<VehicleJobCard />} />
                  </Routes>
                </Layout>
              </Router>
            </CartProvider>
          </EscrowProvider>
        </JobProvider>
      </VehicleProvider>
    </AuthProvider>
  );
}

export default App; 
