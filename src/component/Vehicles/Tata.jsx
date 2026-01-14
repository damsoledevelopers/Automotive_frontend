import React, { useState } from "react";
import { Link } from "react-router-dom";
import VehicleBreadcrumbs from "./VehicleBreadcrumbs";
import Article_Review from "../Article_Review";
import { getOriPartsLink } from "../../utils/oripartsBackUrl";

// 🔹 Models Data - Exported for use in other components
export const tataModels = [
    {
      id: 1,
      name: "Tata Altroz",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/8f2527e.webp",
      years: "11.2019 - now",
      link: "/vehicles/tata-429/altroz-12357/",
      modifications: [
        {
          generation: "ALTROZ 11.2019 - 05.2025",
          options: [
            "1.2L XE CUSTOM MT/Petrol/BS6",
            "1.2L XE iCNG MT/Petrol/CNG/BS6.2",
            "1.2L XE MT/Petrol/BS6",
            "1.2L XE MT (PH-2)/Petrol/BS6.2",
            "1.2L XE+ MT (PH-2)/Petrol/BS6.2",
            "1.2L XM MT/Petrol/BS6",
            "1.2L XM+ DCA (PH-2)/Petrol/BS6.2",
            "1.2L XM+ iCNG MT/Petrol/CNG/BS6.2",
            "1.2L XM+ MT (PH-2)/Petrol/BS6.2",
            "1.2L XM+ S iCNG MT/Petrol/CNG/BS6.2",
            "1.2L XT DCA/Petrol/BS6",
            "1.2L XT DCA (PH-2)/Petrol/BS6.2",
            "1.2L XT MT/Petrol/BS6",
            "1.2L XT MT (PH-2)/Petrol/BS6.2",
            "1.2L XZ DCA/Petrol/BS6",
            "1.2L XZ DCA (PH-2)/Petrol/BS6.2",
            "1.2L XZ iCNG MT/Petrol/CNG/BS6.2",
            "1.2L XZ MT/Petrol/BS6",
            "1.2L XZ MT (PH-2)/Petrol/BS6.2",
            "1.2L XZ+ DCA/Petrol/BS6",
            "1.2L XZ+ DCA (PH-2)/Petrol/BS6.2",
            "1.2L XZ+ MT/Petrol/BS6",
            "1.2L XZ+ MT (PH-2)/Petrol/BS6.2",
            "1.2L XZ+O S iCNG MT/Petrol/CNG/BS6.2",
            "1.2L XZ+S iCNG MT/Petrol/CNG/BS6.2",
            "1.5L XE MT/Diesel/BS6",
            "1.5L XE+ MT (PH-2)/Diesel/BS6.2",
            "1.5L XM MT/Diesel/BS6",
            "1.5L XM+ MT (PH-2)/Diesel/BS6.2",
            "1.5L XT MT/Diesel/BS6",
            "1.5L XT MT (PH-2)/Diesel/BS6.2",
            "1.5L XZ MT/Diesel/BS6",
            "1.5L XZ MT (PH-2)/Diesel/BS6.2",
            "1.5L XZ+ MT/Diesel/BS6",
            "1.5L XZ+ MT (PH-2)/Diesel/BS6.2"
          ],
        },
        {
          generation: "ALTROZ I-TURBO 01.2021 - 05.2025",
          options: [
            "1.2L XT MT/Petrol/BS6",
            "1.2L XZ MT/Petrol/110h.p./BS6",
            "1.2L XZ MT/Petrol/110h.p./BS6.2",
            "1.2L XZ+ MT/Petrol/110h.p./BS6",
            "1.2L XZ+ MT/Petrol/110h.p./BS6.2"
          ],
        },
        {
          generation: "ALTROZ DARK EDITION 01.2021 - now",
          options: [
            "1.2L XT DARK DCA/Petrol/BS6.2",
            "1.2L XT DARK MT/Petrol/BS6.2",
            "1.2L XZ+ DARK DCA/Petrol/86h.p./BS6.2",
            "1.2L XZ+ DARK MT/Petrol/110h.p./BS6.2",
            "1.2L XZ+ DARK MT/Petrol/86h.p./BS6",
            "1.2L XZ+ DARK MT/Petrol/86h.p./BS6.2",
            "1.5L XZ+ DARK MT/Diesel/90h.p./BS6.2",
            "1.5L XZ+ DARK MT/Diesel/88h.p./BS6"
          ],
        },
        {
          generation: "ALTROZ RACER EDITION 06.2024 - 05.2025",
          options: [
            "1.2L R1 MT/Petrol/BS6.2",
            "1.2L R2 MT/Petrol/BS6.2",
            "1.2L R3 MT/Petrol/BS6.2"
          ],
        },
        {
          generation: "ALTROZ F/L 05.2025 - now",
          options: [
            "1.2L ACCOMPLISHED +S DCA/Petrol/BS6.2",
            "1.2L ACCOMPLISHED S DCA/Petrol/BS6.2",
            "1.2L ACCOMPLISHED S iCNG MT/Petrol/CNG/BS6.2",
            "1.2L ACCOMPLISHED S MT/Petrol/BS6.2",
            "1.2L CREATIVE AMT/Petrol/BS6.2",
            "1.2L CREATIVE iCNG MT/Petrol/CNG/BS6.2",
            "1.2L CREATIVE MT/Petrol/BS6.2",
            "1.2L CREATIVE S AMT/Petrol/BS6.2",
            "1.2L CREATIVE S DCA/Petrol/BS6.2",
            "1.2L CREATIVE S iCNG MT/Petrol/CNG/BS6.2",
            "1.2L CREATIVE S MT/Petrol/BS6.2",
            "1.2L PURE AMT/Petrol/BS6.2",
            "1.2L PURE iCNG MT/Petrol/CNG/BS6.2",
            "1.2L PURE MT/Petrol/BS6.2",
            "1.2L PURE S AMT/Petrol/BS6.2",
            "1.2L PURE S iCNG MT/Petrol/CNG/BS6.2",
            "1.2L PURE S MT/Petrol/BS6.2",
            "1.2L SMART iCNG MT/Petrol/CNG/BS6.2",
            "1.2L SMART MT/Petrol/BS6.2",
            "1.5L ACCOMPLISHED S MT/Diesel/BS6.2",
            "1.5L CREATIVE S MT/Diesel/BS6.2",
            "1.5L PURE MT/Diesel/BS6.2"
          ],
        },
      ],
    },
    {
      id: 2,
      name: "TATA ARIA",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/d64f042.webp",
      years: "10.2010 - 04.2017",
      link: "/vehicles/tata-429/aria-11374/",
      modifications: [
        {
          generation: "ARIA 10.2010 - 04.2014",
          options: [
            "2.2L Diesel 138h.p. BS3",
            "2.2L Diesel 138h.p. BS4",
            "2.2L 4WD Diesel 138h.p. BS3",
            "2.2L 4WD Diesel 138h.p. BS4"
          ]
        },
        {
          generation: "ARIA LET 05.2014 - 04.2017",
          options: [
            "2.2L Diesel BS4",
            "2.2L 4WD Diesel BS4"
          ]
        }
      ]
    },
    {
      id: 3,
      name: "TATA BOLT",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/d3426fd.webp",
      years: "01.2015 - 04.2019",
      link: "/vehicles/tata-429/bolt-11382/",
      modifications: [
        {
          generation: "BOLT 01.2015 - 04.2019",
          options: [
            "1.2L Petrol 90h.p. BS4",
            "1.3L Diesel 75h.p. BS4"
          ]
        }
      ]
    },
    {
      id: 4,
      name: "TATA CURVV",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/a5c4d54.webp",
      years: "08.2024 - now",
      link: "/vehicles/tata-429/curvv-12844/",
      modifications: [
        {
          generation: "CURVV EV 08.2024 - now",
          options: [
            "45 kWh ACCOMPLISHED Electric",
            "45 kWh ACCOMPLISHED+ A Electric",
            "45 kWh ACCOMPLISHED+ S Electric",
            "45 kWh CREATIVE Electric",
            "45 kWh EMPOWERED+ S Electric",
            "45 kWh EMPOWERED+ SA Electric",
            "55 kWh ACCOMPLISHED Electric",
            "55 kWh ACCOMPLISHED+ S Electric",
            "55 kWh EMPOWERED+ Electric",
            "55 kWh EMPOWERED+ A Electric",
            "55 kWh EMPOWERED+ S Electric",
            "55 kWh EMPOWERED+ SA Electric"
          ]
        },
        {
          generation: "CURVV 09.2024 - now",
          options: [
            "1.2L ACCOMPLISHED S DCA Petrol 123h.p. BS6.2",
            "1.2L ACCOMPLISHED S DCA Petrol 118h.p. BS6.2",
            "1.2L ACCOMPLISHED S MT Petrol 123h.p. BS6.2",
            "1.2L ACCOMPLISHED S MT Petrol 118h.p. BS6.2",
            "1.2L ACCOMPLISHED+ A DCA Petrol BS6.2",
            "1.2L ACCOMPLISHED+ A MT Petrol BS6.2",
            "1.2L CREATIVE DCA Petrol BS6.2",
            "1.2L CREATIVE MT Petrol BS6.2",
            "1.2L CREATIVE S DCA Petrol BS6.2",
            "1.2L CREATIVE S MT Petrol 123h.p. BS6.2",
            "1.2L CREATIVE S MT Petrol 118h.p. BS6.2",
            "1.2L CREATIVE+ S DCA Petrol 123h.p. BS6.2",
            "1.2L CREATIVE+ S DCA Petrol 118h.p. BS6.2",
            "1.2L CREATIVE+ S MT Petrol 118h.p. BS6.2",
            "1.2L CREATIVE+ S MT Petrol 123h.p. BS6.2",
            "1.2L PURE+ DCA Petrol BS6.2",
            "1.2L PURE+ MT Petrol BS6.2",
            "1.2L PURE+ S DCA Petrol BS6.2",
            "1.2L PURE+ S MT Petrol BS6.2",
            "1.2L SMART MT Petrol BS6.2",
            "1.5L ACCOMPLISHED S DCA Diesel BS6.2",
            "1.5L ACCOMPLISHED S MT Diesel BS6.2",
            "1.5L ACCOMPLISHED+ A DCA Diesel BS6.2",
            "1.5L ACCOMPLISHED+ A MT Diesel BS6.2",
            "1.5L CREATIVE MT Diesel BS6.2",
            "1.5L CREATIVE S DCA Diesel BS6.2",
            "1.5L CREATIVE S MT Diesel BS6.2",
            "1.5L CREATIVE+ S DCA Diesel BS6.2",
            "1.5L CREATIVE+ S MT Diesel BS6.2",
            "1.5L PURE+ DCA Diesel BS6.2",
            "1.5L PURE+ MT Diesel BS6.2",
            "1.5L PURE+ S DCA Diesel BS6.2",
            "1.5L PURE+ S MT Diesel BS6.2",
            "1.5L SMART MT Diesel BS6.2"
          ]
        }
      ]
    },
    {
      id: 5,
      name: "TATA ESTATE",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/a13ea63.webp",
      years: "01.1992 - 01.2000",
      link: "/vehicles/tata-429/estate-12759/",
      modifications: [
        {
          generation: "ESTATE 01.1992 - 01.2000",
          options: [
            "1.9L STD Diesel BS1"
          ]
        }
      ]
    },
    {
      id: 6,
      name: "TATA HARRIER",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/869ef1a.webp",
      years: "01.2019 - now",
      link: "/vehicles/tata-429/harrier-12306/",
      modifications: [
        {
          generation: "HARRIER 1ST GEN 01.2019 - 12.2019",
          options: [
            "2.0L DARK EDITION XT Diesel BS4",
            "2.0L DARK EDITION XZ Diesel BS4",
            "2.0L XE Diesel BS4",
            "2.0L XM Diesel 138h.p. BS4",
            "2.0L XT Diesel BS4",
            "2.0L XZ Diesel BS4"
          ]
        },
        {
          generation: "HARRIER 1ST GEN F/L 01.2020 - 09.2023",
          options: [
            "2.0L XE Diesel BS6.2",
            "2.0L XM 4X2 Diesel BS6",
            "2.0L XMA AT 4X2 Diesel BS6",
            "2.0L XMAS Diesel BS6.2",
            "2.0L XMS (PH-2) Diesel BS6.2",
            "2.0L XT 4X2 Diesel BS6",
            "2.0L XT DARK Diesel BS6",
            "2.0L XT+ Diesel 167h.p. BS6",
            "2.0L XT+ Diesel 167h.p. BS6.2",
            "2.0L XT+ DARK Diesel BS6",
            "2.0L XTA+ Diesel BS6.2",
            "2.0L XZ Diesel BS6.2",
            "2.0L XZ 4X2 Diesel BS6",
            "2.0L XZ+ Diesel 167h.p. BS6",
            "2.0L XZ+ Diesel 167h.p. BS6.2",
            "2.0L XZ+ BLACK Diesel BS6",
            "2.0L XZ+ DARK EDITION Diesel BS6",
            "2.0L XZA Diesel BS6.2",
            "2.0L XZA AT Diesel BS6",
            "2.0L XZA+ Diesel BS6.2",
            "2.0L XZA+ AT Diesel BS6",
            "2.0L XZA+ DARK EDITION Diesel BS6",
            "2.0L XZA+ O Diesel BS6.2"
          ]
        },
        {
          generation: "HARRIER CAMO 11.2020 - 09.2021",
          options: [
            "2.0L XT CAMO Diesel BS6",
            "2.0L XT+ CAMO Diesel BS6",
            "2.0L XZ CAMO Diesel BS6",
            "2.0L XZ+ CAMO Diesel BS6",
            "2.0L XZA CAMO Diesel BS6",
            "2.0L XZA+ CAMO Diesel BS6"
          ]
        },
        {
          generation: "HARRIER DARK EDITION 07.2021 - 09.2023",
          options: [
            "2.0L XT+ Diesel BS6.2",
            "2.0L XTA+ Diesel 167h.p. BS6",
            "2.0L XTA+ Diesel 167h.p. BS6.2",
            "2.0L XZ+ Diesel 167h.p. BS6",
            "2.0L XZ+ Diesel 167h.p. BS6.2",
            "2.0L XZA+ Diesel 167h.p. BS6",
            "2.0L XZA+ Diesel 167h.p. BS6.2",
            "2.0L XZA+O Diesel BS6.2"
          ]
        },
        {
          generation: "HARRIER KAZIRANGA 02.2022 - 02.2024",
          options: [
            "2.0L XZ+ Diesel",
            "2.0L XZA+ Diesel"
          ]
        },
        {
          generation: "HARRIER JET EDITION 08.2022 - 01.2024",
          options: [
            "2.0L XZ+ Diesel",
            "2.0L XZA+ AT Diesel"
          ]
        },
        {
          generation: "HARRIER RED DARK EDITION 02.2023 - 09.2024",
          options: [
            "2.0L XZ+ Diesel",
            "2.0L XZA+ Diesel",
            "2.0L XZA+(O) Diesel"
          ]
        },
        {
          generation: "HARRIER 2ND GEN F/L 10.2023 - now",
          options: [
            "2.0L ADVENTURE Diesel BS6.2",
            "2.0L ADVENTURE+ Diesel BS6.2",
            "2.0L ADVENTURE+ AT Diesel BS6.2",
            "2.0L ADVENTURE+A Diesel BS6.2",
            "2.0L ADVENTURE+A AT Diesel BS6.2",
            "2.0L FEARLESS Diesel BS6.2",
            "2.0L FEARLESS AT Diesel BS6.2",
            "2.0L FEARLESS+ Diesel BS6.2",
            "2.0L FEARLESS+ AT Diesel BS6.2",
            "2.0L PURE(O) Diesel BS6.2",
            "2.0L SMART(O) Diesel BS6.2"
          ]
        },
        {
          generation: "HARRIER EV 06.2025 - now",
          options: [
            "65 kWh ADVENTURE Electric",
            "65 kWh ADVENTURE S Electric",
            "65 kWh FEARLESS+ Electric",
            "75 kWh EMPOWERED Electric",
            "75 kWh EMPOWERED AWD Electric",
            "75 kWh FEARLESS+ Electric"
          ]
        },
        {
          generation: "HARRIER EV STEALTH EDITION 06.2025 - now",
          options: [
            "75 kWh EMPOWERED Electric",
            "75 kWh EMPOWERED AWD Electric"
          ]
        }
      ]
    },
    {
      id: 7,
      name: "TATA HEXA",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/08ccb10.webp",
      years: "01.2017 - 04.2020",
      link: "/vehicles/tata-429/hexa-12171/",
      modifications: [
        {
          generation: "HEXA 01.2017 - 04.2020",
          options: [
            "2.2L XE MT/Diesel/BS4",
            "2.2L XM MT ABS A/B MT/Diesel/BS4",
            "2.2L XMA 4X2 AT/Diesel/BS4",
            "2.2L XMA 4X4 AT/Diesel/BS4",
            "2.2L XT 4X2 A/B MT/Diesel/BS4",
            "2.2L XT 4X4 A/B MT/Diesel/BS4",
            "2.2L XTA 4X2 A/B/Diesel/BS4"
          ]
        }
      ]
    },
    {
      id: 8,
      name: "TATA INDICA",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/19035f2.webp",
      years: "12.1998 - 08.2019",
      link: "/vehicles/tata-429/indica-12007/",
      modifications: [
        {
          generation: "INDICA 12.1998 - 05.2001",
          options: [
            "1.4L DL MT/Diesel/BS2",
            "1.4L DLE MT/Diesel/BS2",
            "1.4L DLX MT/Diesel/BS2"
          ]
        },
        {
          generation: "INDICA V2 05.2001 - 06.2013",
          options: [
            "1.4L DiCOR MT/Diesel/BS3",
            "1.4L DiCOR REFRESHED MT/Diesel/BS4",
            "1.4L MT/Diesel/53h.p./BS2",
            "1.4L MT/Petrol/BS3",
            "1.4L MT/Diesel/70h.p./BS3",
            "1.4L TURBO MT/Diesel/BS3",
            "1.4L TURBOMAX MT/Diesel/BS4"
          ]
        },
        {
          generation: "INDICA XETA 11.2006 - 08.2019",
          options: [
            "1.2L E-MAX MT/Petrol/63h.p./BS3",
            "1.2L E-MAX MT/Petrol/62h.p./BS4",
            "1.2L E-MAX MT/Petrol/56h.p./BS4",
            "1.2L MT/Petrol/65h.p./BS4",
            "1.2L MT/Petrol/65h.p./BS3",
            "1.4L MT/Petrol/BS3"
          ]
        },
        {
          generation: "INDICA VISTA 01.2008 - 12.2012",
          options: [
            "1.2L MT/Petrol/65h.p./BS3",
            "1.2L MT/Petrol/65h.p./BS4",
            "1.3L MT/Diesel/75h.p./BS3",
            "1.3L MT/Diesel/75h.p./BS4",
            "1.4L MT/Diesel/70h.p./BS3",
            "1.4L MT/Diesel/70h.p./BS3",
            "1.4L MT/Petrol/BS4"
          ]
        },
        {
          generation: "INDICA VISTA REFRESH 12.2012 - 12.2014",
          options: [
            "1.2L MT/Petrol/BS4",
            "1.3L MT/Diesel/75h.p./BS4",
            "1.3L MT/Diesel/90h.p./BS4",
            "1.4L MT/Petrol/BS4",
            "1.4L MT/Diesel/70h.p./BS3",
            "1.4L MT/Diesel/70h.p./BS4"
          ]
        },
        {
          generation: "INDICA EV2 05.2013 - 04.2018",
          options: [
            "1.4L MT/Diesel/69h.p./BS4",
            "1.4L MT/Diesel/48h.p./BS3"
          ]
        },
        {
          generation: "INDICA VISTA TECH 01.2014 - 12.2015",
          options: [
            "1.3L MT/Diesel/BS4",
            "1.4L MT/Diesel/BS3"
          ]
        }
      ]
    },
    {
      id: 9,
      name: "TATA INDIGO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/ef9202c.webp",
      years: "06.2002 - 05.2018",
      link: "/vehicles/tata-429/indigo-11376/",
      modifications: [
        {
          generation: "INDIGO 06.2002 - 12.2009",
          options: [
            "1.4L DLS MT/Petrol/BS3",
            "1.4L GLE MT/Petrol/BS3",
            "1.4L GLX MT/Petrol/BS3",
            "1.4L GSX MT/Petrol/BS3",
            "1.4L LE MT/Diesel/BS3",
            "1.4L LS MT/Diesel/70h.p./BS3",
            "1.4L LX MT/Diesel/70h.p./BS3",
            "1.4L SX MT/Diesel/BS3",
            "1.4L V MT/Diesel/BS3",
            "1.4L VE MT/Diesel/BS3",
            "1.4L VS MT/Diesel/BS3",
          ],
        },
        {
          generation: "INDIGO XL 05.2007 - 12.2011",
          options: [
            "1.4L CLASSIC MT/Petrol/BS3",
            "1.4L CLASSIC MT/Diesel/70h.p./BS3",
            "1.4L CLASSIC MT/Diesel/70h.p./BS4",
            "1.4L GRAND MT/Diesel/70h.p./BS3",
            "1.4L GRAND MT/Diesel/70h.p./BS4",
            "1.4L MT/Petrol/BS3",
            "1.4L MT/Diesel/BS3",
            "1.4L MT/Petrol/CNG/BS4",
            "1.4L SD MT/Diesel/BS4",
          ],
        },
        {
          generation: "INDIGO CS 01.2008 - 12.2012",
          options: [
            "1.2L EGLX MT/Petrol/BS4",
            "1.2L GLE MT/Petrol/65h.p./BS3",
            "1.2L GLE MT/Petrol/65h.p./BS4",
            "1.2L GLS MT/Petrol/65h.p./BS3",
            "1.2L GLS MT/Petrol/65h.p./BS4",
            "1.2L GLX MT/Petrol/65h.p./BS3",
            "1.2L GLX MT/Petrol/65h.p./BS4",
            "1.2L GV MT/Petrol/BS4",
            "1.4L ELX MT/Diesel/BS4",
            "1.4L LE MT/Diesel/70h.p./BS3",
            "1.4L LE MT/Diesel/70h.p./BS4",
            "1.4L LS MT/Diesel/70h.p./BS3",
            "1.4L LS MT/Diesel/70h.p./BS4",
            "1.4L LX MT/Diesel/70h.p./BS3",
            "1.4L LX MT/Diesel/70h.p./BS4",
            "1.4L V MT/Diesel/BS4",
          ],
        },
        {
          generation: "INDIGO MANZA 08.2009 - 12.2015",
          options: [
            "1.3L CELEBRATION MT/Diesel/BS4",
            "1.3L MT/Diesel/89h.p./BS3",
            "1.3L MT/Diesel/89h.p./BS4",
            "1.4L CELEBRATION MT/Petrol/BS4",
            "1.4L MT/Petrol/89h.p./BS3",
            "1.4L MT/Petrol/89h.p./BS4",
          ],
        },
        {
          generation: "INDIGO MANZA CLUB CLASS 10.2012 - 12.2015",
          options: ["1.3L MT/Diesel/BS4", "1.4L MT/Petrol/BS4"],
        },
        {
          generation: "INDIGO eCS 06.2013 - 05.2018",
          options: [
            "1.2L GLE MT/Petrol/BS4",
            "1.2L GLS MT/Petrol/55h.p./BS4",
            "1.2L GLS MT/Petrol/65h.p./BS4",
            "1.2L GLX MT/Petrol/55h.p./BS4",
            "1.2L GLX MT/Petrol/65h.p./BS4",
            "1.2L GVX MT/Petrol/BS4",
            "1.4L L MT/Diesel/BS4",
            "1.4L LE MT/Diesel/BS4",
            "1.4L LS MT/Diesel/70h.p./BS3",
            "1.4L LS MT/Diesel/70h.p./BS4",
            "1.4L LX MT/Diesel/70h.p./BS3",
            "1.4L LX MT/Diesel/70h.p./BS4",
            "1.4L MT/Diesel/BS3",
            "1.4L VX MT/Diesel/70h.p./BS4",
            "1.4L VX MT/Diesel/70h.p./BS3",
          ],
        },
      ],
    },
    {
      id: 10,
      name: "TATA INDIGO MARINA",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/5c53773.webp",
      years: "01.2003 - 12.2010",
      link: "/vehicles/tata-429/indigo_marina-12063/",
      modifications: [
        {
          generation: "INDIGO MARINA 01.2003 - 12.2010",
          options: [
            "1.4L DICOR MT/Diesel/BS3",
            "1.4L MPFI MT/Petrol/BS3",
            "1.4L MT/Petrol/BS3",
            "1.4L TCIC MT/Diesel/BS3",
          ],
        },
      ],
    },
    {
      id: 11,
      name: "TATA MOVUS",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/faeb9c5.webp",
      years: "05.2014 - 04.2015",
      link: "/vehicles/tata-429/movus-11384/",
      modifications: [
        {
          generation: "MOVUS 05.2014 - 04.2015",
          options: [
            "2.2L CX/Diesel/BS4",
            "2.2L EX/Diesel/BS4",
            "2.2L LX/Diesel/BS4"
          ]
        }
      ]
    },
    {
      id: 12,
      name: "TATA NANO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/cc8f11f.webp",
      years: "03.2009 - 09.2018",
      link: "/vehicles/tata-429/nano-11377/",
      modifications: [
        {
          generation: "NANO 03.2009 - 09.2018",
          options: [
            "0.6L AMT/Petrol/BS4",
            "0.6L MT/Petrol/38h.p./BS2",
            "0.6L MT/Petrol/38h.p./BS3",
            "0.6L MT/Petrol/38h.p./BS4",
            "0.6L MT/Petrol/38h.p./BS3",
            "0.6L MT/Petrol/CNG/BS4",
            "0.6L MT/Petrol/38h.p./BS4"
          ]
        },
        {
          generation: "NANO TWIST 01.2014 - 08.2018",
          options: [
            "0.6L MT/Petrol/38h.p./BS3",
            "0.6L MT/Petrol/38h.p./BS4"
          ]
        },
        {
          generation: "NANO GenX 05.2015 - 08.2018",
          options: [
            "0.6L FTG MT/Petrol/BS4",
            "0.6L OTG AMT/Petrol/BS4",
            "0.6L OTG MT/Petrol/BS4"
          ]
        }
      ]
    },
    {
      id: 13,
      name: "TATA NEXON",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/1e988ee.webp",
      years: "03.2017 - now",
      link: "/vehicles/tata-429/nexon-12240/",
      modifications: [
        {
          generation: "NEXON 1ST GEN 03.2017 - 12.2019",
          options: [
            "1.2L XE MT/Petrol/BS4",
            "1.2L XM MT/Petrol/BS4",
            "1.2L XT MT/Petrol/BS4",
            "1.2L XZ MT/Petrol/BS4",
            "1.2L XZ+ MT/Petrol/BS4",
            "1.2L XZA+ AMT/Petrol/BS4",
            "1.5L XE MT/Diesel/BS4",
            "1.5L XM MT/Diesel/BS4",
            "1.5L XT MT/Diesel/BS4",
            "1.5L XZ MT/Diesel/BS4",
            "1.5L XZ+ MT/Diesel/BS4",
            "1.5L XZA+ AMT/Diesel/BS4"
          ]
        },
        {
          generation: "NEXON 1ST GEN F/L 11.2019 - 08.2023",
          options: [
            "1.2L XE MT/Petrol/BS6",
            "1.2L XM MT/Petrol/BS6",
            "1.2L XMA AMT/Petrol/BS6",
            "1.2L XZ MT/Petrol/BS6",
            "1.2L XZ+ MT/Petrol/BS6",
            "1.2L XZA+ AMT/Petrol/BS6",
            "1.2L XZ+S MT/Petrol/BS6",
            "1.2L XZA+S AMT/Petrol/BS6",
            "1.2L XZ+ LUX MT/Petrol/BS6.2",
            "1.2L XZA+ LUX AMT/Petrol/BS6.2",
            "1.2L XZ+ LUX MT/Petrol/BS6",
            "1.5L XE MT/Diesel/BS6",
            "1.5L XM MT/Diesel/BS6",
            "1.5L XMA AMT/Diesel/BS6",
            "1.5L XZ MT/Diesel/BS6",
            "1.5L XZ+ MT/Diesel/BS6",
            "1.5L XZA+ AMT/Diesel/BS6",
            "1.5L XZ+S MT/Diesel/BS6",
            "1.5L XZA+S AMT/Diesel/BS6",
            "1.5L XZ+ LUX MT/Diesel/BS6.2",
            "1.5L XZA+ LUX AMT/Diesel/BS6.2"
          ]
        },
        {
          generation: "NEXON EV 01.2020 - 09.2023",
          options: [
            "30.2kWh XM/Electric",
            "30.2kWh XZ+ LUX/Electric",
            "30.2kWh XZ+/Electric",
            "40.5kWh XZ+ LUX MAX/Electric"
          ]
        },
        {
          generation: "NEXON DARK EDITION 07.2021 - 09.2023",
          options: [
            "1.2L XZ+ LX MT/Petrol/BS6.2",
            "1.2L XZA+ LX AMT/Petrol/BS6.2",
            "1.5L XZ+ LX MT/Diesel/BS6.2",
            "1.5L XZA+ LX AMT/Diesel/BS6.2"
          ]
        },
        {
          generation: "NEXON KAZIRANGA EDITION 02.2022 - 09.2023",
          options: [
            "1.2L XZ+ LX MT/Petrol/BS6.2",
            "1.2L XZA+ LX AMT/Petrol/BS6.2",
            "1.5L XZ+ LX MT/Diesel/BS6.2",
            "1.5L XZA+ LXS AMT/Diesel/BS6.2"
          ]
        },
        {
          generation: "NEXON JET EDITION 08.2022 - 01.2023",
          options: [
            "1.2L XZ+ (P) MT/Petrol/BS6",
            "1.5L XZ+ (P) MT/Diesel/BS6"
          ]
        },
        {
          generation: "NEXON EV JET EDITION 08.2022 - 01.2023",
          options: [
            "30.2kWh XZ+ LUX/Electric"
          ]
        },
        {
          generation: "NEXON RED DARK EDITION 02.2023 - 09.2023",
          options: [
            "1.2L XZ+ LUX MT/Petrol/BS6.2",
            "1.2L XZA+ LUX AMT/Petrol/BS6.2",
            "1.5L XZ+ LUX MT/Diesel/BS6.2",
            "1.5L XZA+ LXS AMT/Diesel/BS6.2"
          ]
        },
        {
          generation: "NEXON 2ND GEN F/L 09.2023 - now",
          options: [
            "1.2L FEARLESS+(O) MT/Petrol/BS6.2",
            "1.2L FEARLESS+ MT/Petrol/BS6.2",
            "1.2L FEARLESS MT/Petrol/BS6.2",
            "1.2L CREATIVE+(O) MT/Petrol/BS6.2",
            "1.2L CREATIVE+ MT/Petrol/BS6.2",
            "1.2L CREATIVE MT/Petrol/BS6.2",
            "1.2L PURE+(S) MT/Petrol/BS6.2",
            "1.2L PURE+ MT/Petrol/BS6.2",
            "1.2L PURE MT/Petrol/BS6.2",
            "1.2L SMART+(S) MT/Petrol/BS6.2",
            "1.2L SMART+ MT/Petrol/BS6.2",
            "1.2L SMART MT/Petrol/BS6.2",
            "1.5L FEARLESS+(O) MT/Diesel/BS6.2",
            "1.5L FEARLESS+ MT/Diesel/BS6.2",
            "1.5L FEARLESS MT/Diesel/BS6.2",
            "1.5L CREATIVE+(O) MT/Diesel/BS6.2",
            "1.5L CREATIVE+ MT/Diesel/BS6.2",
            "1.5L CREATIVE MT/Diesel/BS6.2",
            "1.5L PURE+(S) MT/Diesel/BS6.2",
            "1.5L PURE+ MT/Diesel/BS6.2",
            "1.5L PURE MT/Diesel/BS6.2",
            "1.5L SMART+(S) MT/Diesel/BS6.2",
            "1.5L SMART+ MT/Diesel/BS6.2",
            "1.5L SMART MT/Diesel/BS6.2"
          ]
        }
      ]
    },
    {
      id: 14,
      name: "TATA PUNCH",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/b48ae2b.webp",
      years: "10.2021 - now",
      link: "/vehicles/tata-429/punch-12437/",
      modifications: [
        {
          generation: "PUNCH 10.2021 - now",
          options: [
            "1.2L ACCOMPLISHED AMT/Petrol/BS6",
            "1.2L ACCOMPLISHED DZ CUSTOM AMT/Petrol/BS6.2",
            "1.2L ACCOMPLISHED DZ CUSTOM MT/Petrol/BS6.2",
            "1.2L ACCOMPLISHED iCNG MT/Petrol/CNG/BS6.2",
            "1.2L ACCOMPLISHED MT/Petrol/86h.p./BS6",
            "1.2L ACCOMPLISHED MT/Petrol/86h.p./BS6.2",
            "1.2L ADVENTURE AMT/Petrol/86h.p./BS6",
            "1.2L ADVENTURE AMT/Petrol/86h.p./BS6.2",
            "1.2L ADVENTURE CUSTOM AMT/Petrol/BS6.2",
            "1.2L ADVENTURE CUSTOM MT/Petrol/BS6.2",
            "1.2L ADVENTURE iCNG MT/Petrol/CNG/BS6.2",
            "1.2L ADVENTURE MT/Petrol/86h.p./BS6",
            "1.2L ADVENTURE MT/Petrol/86h.p./BS6.2",
            "1.2L ADVENTURE RHYTHM iCNG MT/Petrol/CNG/BS6.2",
            "1.2L CREATIVE AMT/Petrol/86h.p./BS6",
            "1.2L CREATIVE AMT/Petrol/86h.p./BS6.2",
            "1.2L CREATIVE CUSTOM MT/Petrol/BS6.2",
            "1.2L CREATIVE IRA CUSTOM AMT/Petrol/BS6.2",
            "1.2L CREATIVE IRA CUSTOM MT/Petrol/BS6.2",
            "1.2L CREATIVE IRA MT/Petrol/BS6.2",
            "1.2L CREATIVE MT/Petrol/86h.p./BS6",
            "1.2L CREATIVE MT/Petrol/86h.p./BS6.2",
            "1.2L PURE CUSTOM MT/Petrol/BS6.2",
            "1.2L PURE iCNG MT/Petrol/CNG/BS6.2",
            "1.2L PURE MT/Petrol/86h.p./BS6",
            "1.2L PURE MT/Petrol/86h.p./BS6.2"
          ]
        },
        {
          generation: "PUNCH KAZIRANGA 02.2022 - 09.2023",
          options: [
            "1.2L CREATIVE AMT/Petrol/BS6",
            "1.2L CREATIVE IRA AMT/Petrol/BS6",
            "1.2L CREATIVE IRA MT/Petrol/BS6",
            "1.2L CREATIVE MT/Petrol/BS6"
          ]
        },
        {
          generation: "PUNCH CAMO 09.2022 - 05.2023",
          options: [
            "1.2L ACCOMPLISHED CAMO AMT/Petrol/BS6",
            "1.2L ACCOMPLISHED CAMO MT/Petrol/BS6",
            "1.2L ACCOMPLISHED DAZZLE PACK CAMO AMT/Petrol/BS6",
            "1.2L ACCOMPLISHED DAZZLE PACK CAMO MT/Petrol/BS6",
            "1.2L ADVENTURE CAMO AMT/Petrol/BS6",
            "1.2L ADVENTURE CAMO MT/Petrol/BS6",
            "1.2L ADVENTURE RHYTM PACK CAMO AMT/Petrol/BS6",
            "1.2L ADVENTURE RHYTM PACK CAMO MT/Petrol/BS6"
          ]
        },
        {
          generation: "PUNCH EV 02.2024 - now",
          options: [
            "25 kWh ADVENTURE MEDIUM RANGE/Electric",
            "25 kWh ADVENTURE S MEDIUM RANGE/Electric",
            "25 kWh ADVENTURE+ MEDIUM RANGE/Electric",
            "25 kWh EMPOWERED MEDIUM RANGE/Electric",
            "25 kWh EMPOWERED S MEDIUM RANGE/Electric",
            "25 kWh EMPOWERED+ MEDIUM RANGE/Electric",
            "25 kWh EMPOWERED+ S MEDIUM RANGE/Electric",
            "25 kWh SMART + MEDIUM RANGE/Electric",
            "25 kWh SMART MEDIUM RANGE/Electric",
            "35 kwh ADVENTURE + LONG RANGE ACFC/Electric",
            "35 kwh ADVENTURE LONG RANGE ACFC/Electric",
            "35 kwh ADVENTURE S LONG RANGE ACFC/Electric",
            "35 kwh EMPOWERED LONG RANGE ACFC/Electric",
            "35 kwh EMPOWERED S LONG RANGE ACFC/Electric",
            "35 kwh EMPOWERED+ LONG RANGE ACFC/Electric",
            "35 kwh EMPOWERED+ S LONG RANGE ACFC/Electric",
            "35 kwh SMART LONG RANGE ACFC/Electric"
          ]
        }
      ]
    },
    {
      id: 2,
      name: "TATA SAFARI",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/cb2f754.webp",
      years: "06.1998 - now",
      link: "/vehicles/tata-429/safari-12066/",
      modifications: [
        {
          generation: "SAFARI 06.1998 - 04.2006",
          options: [
            "2.0L MT/Diesel/BS2",
            "2.1L MT/Petrol/BS3"
          ]
        },
        {
          generation: "SAFARI DiCOR 08.2005 - 12.2009",
          options: [
            "2.2L 4WD MT/Diesel/BS3",
            "2.2L MT/Diesel/BS3",
            "3.0L 4WD MT/Diesel/BS3",
            "3.0L MT/Diesel/BS3"
          ]
        },
        {
          generation: "SAFARI DiCOR F/L 01.2010 - 07.2017",
          options: [
            "2.2L 4WD MT/Diesel/140h.p./BS3",
            "2.2L 4WD MT/Diesel/140h.p./BS4",
            "2.2L MT/Diesel/140h.p./BS4",
            "2.2L MT/Diesel/140h.p./BS3"
          ]
        },
        {
          generation: "SAFARI STORME 03.2012 - 06.2015",
          options: [
            "2.2L 4WD MT/Diesel/BS4",
            "2.2L MT/Diesel/BS4"
          ]
        },
        {
          generation: "SAFARI STORME LET 06.2015 - 12.2019",
          options: [
            "2.2L EX MT/Diesel/BS4",
            "2.2L LX MT/Diesel/BS4",
            "2.2L MT/Diesel/BS4",
            "2.2L VX 4WD MT/Diesel/154h.p./BS4",
            "2.2L VX 4WD MT/Diesel/148h.p./BS4",
            "2.2L VX MT/Diesel/148h.p./BS4",
            "2.2L VX MT/Diesel/154h.p./BS4"
          ]
        },
        {
          generation: "SAFARI 2ND GEN 02.2021 - 10.2023",
          options: [
            "2.0L XE 7S MT (PH-2)/Diesel/BS6.2",
            "2.0L XE MT/Diesel/BS6",
            "2.0L XM MT/Diesel/BS6",
            "2.0L XMA AT/Diesel/BS6",
            "2.0L XMAS 7S AT (PH-2)/Diesel/BS6.2",
            "2.0L XMS 7S MT (PH-2)/Diesel/BS6.2",
            "2.0L XT MT/Diesel/BS6",
            "2.0L XT PLUS 7S MT/Diesel/BS6",
            "2.0L XT+ 7S MT (PH-2)/Diesel/BS6.2",
            "2.0L XZ 7S MT/Diesel/BS6",
            "2.0L XZ 7S MT (PH-2)/Diesel/BS6.2",
            "2.0L XZ PLUS 6S MT/Diesel/BS6",
            "2.0L XZ PLUS 7S MT/Diesel/BS6",
            "2.0L XZ+ 6S MT (PH-2)/Diesel/BS6.2",
            "2.0L XZ+ 7S MT (PH-2)/Diesel/BS6.2",
            "2.0L XZ+ ADVENTURE 7S MT (PH-2)/Diesel/BS6.2",
            "2.0L XZA 7S AT (PH-2)/Diesel/BS6.2",
            "2.0L XZA 7S MT/Diesel/BS6",
            "2.0L XZA PLUS 6S AT/Diesel/BS6",
            "2.0L XZA PLUS 7S AT/Diesel/BS6",
            "2.0L XZA+ 6S AT (PH-2)/Diesel/BS6.2",
            "2.0L XZA+ 7S AT (PH-2)/Diesel/BS6.2",
            "2.0L XZA+ ADVENTURE 6S AT (PH-2)/Diesel/BS6.2",
            "2.0L XZA+ ADVENTURE 7S AT (PH-2)/Diesel/BS6.2",
            "2.0L XZA+(O) 6S AT (PH-2)/Diesel/BS6.2",
            "2.0L XZA+(O) 7S AT (PH-2)/Diesel/BS6.2",
            "2.0L XZA+(O) ADVENTURE 6S AT (PH-2)/Diesel/BS6.2",
            "2.0L XZA+(O) ADVENTURE 7S  AT (PH-2)/Diesel/BS6.2"
          ]
        },
        {
          generation: "SAFARI GOLD EDITION 11.2021 - 02.2023",
          options: [
            "2.0L XZ+ 6S BLACK & GOLD MT/Diesel/BS6",
            "2.0L XZ+ 6S WHITE & GOLD MT/Diesel/BS6",
            "2.0L XZ+ 7S BLACK & GOLD MT/Diesel/BS6",
            "2.0L XZ+ 7S WHITE & GOLD MT/Diesel/BS6",
            "2.0L XZA+ 6S BLACK & GOLD AT/Diesel/BS6",
            "2.0L XZA+ 6S WHITE & GOLD AT/Diesel/BS6",
            "2.0L XZA+ 7S BLACK & GOLD AT/Diesel/BS6",
            "2.0L XZA+ 7S WHITE & GOLD AT/Diesel/BS6"
          ]
        },
        {
          generation: "SAFARI DARK EDITION 01.2022 - 09.2023",
          options: [
            "2.0L XT+ 7S MT/Diesel/BS6",
            "2.0L XT+ 7S MT (PH-2)/Diesel/BS6.2",
            "2.0L XTA+ 7S AT/Diesel/BS6",
            "2.0L XTA+ 7S AT (PH-2)/Diesel/BS6.2",
            "2.0L XZ+ 6S MT/Diesel/BS6",
            "2.0L XZ+ 6S MT (PH-2)/Diesel/BS6.2",
            "2.0L XZ+ 7S MT/Diesel/BS6",
            "2.0L XZ+ 7S MT (PH-2)/Diesel/BS6.2",
            "2.0L XZA+ 6S AT/Diesel/BS6",
            "2.0L XZA+ 6S AT (PH-2)/Diesel/BS6.2",
            "2.0L XZA+ 7S AT/Diesel/BS6",
            "2.0L XZA+ 7S AT (PH-2)/Diesel/BS6.2",
            "2.0L XZA+(O) 6S AT (PH-2)/Diesel/BS6.2",
            "2.0L XZA+(O) 7S AT (PH-2)/Diesel/BS6.2"
          ]
        },
        {
          generation: "SAFARI KAZIRANGA EDITION 02.2022 - 02.2023",
          options: [
            "2.0L XZ+ 6S MT/Diesel/BS6",
            "2.0L XZ+ 7S MT/Diesel/BS6",
            "2.0L XZA+ 6S AT/Diesel/BS6",
            "2.0L XZA+ 7S AT/Diesel/BS6"
          ]
        },
        {
          generation: "SAFARI JET EDITION 08.2022 - 02.2023",
          options: [
            "2.0L XZ+ 6S MT/Diesel/BS6",
            "2.0L XZ+ 7S MT/Diesel/BS6",
            "2.0L XZA+ 6S AT/Diesel/BS6",
            "2.0L XZA+ 7S AT/Diesel/BS6"
          ]
        },
        {
          generation: "SAFARI RED DARK EDITION 02.2023 - 09.2023",
          options: [
            "2.0L XZ+ 6S MT/Diesel/BS6.2",
            "2.0L XZ+ 7S MT/Diesel/BS6.2",
            "2.0L XZA+ 6S AT/Diesel/BS6.2",
            "2.0L XZA+ 7S AT/Diesel/BS6.2",
            "2.0L XZA+(O) 6S AT/Diesel/BS6.2",
            "2.0L XZA+(O) 7S AT/Diesel/BS6.2"
          ]
        },
        {
          generation: "SAFARI 2ND GEN F/L 10.2023 - now",
          options: [
            "2.0L ACCOMPLISHED 7S AT/Diesel/BS6.2",
            "2.0L ACCOMPLISHED 7S MT/Diesel/BS6.2",
            "2.0L ACCOMPLISHED+ 6S AT/Diesel/BS6.2",
            "2.0L ACCOMPLISHED+ 6S MT/Diesel/BS6.2",
            "2.0L ACCOMPLISHED+ 7S AT/Diesel/BS6.2",
            "2.0L ACCOMPLISHED+ 7S MT/Diesel/BS6.2",
            "2.0L ADVENTURE 7S MT/Diesel/BS6.2",
            "2.0L ADVENTURE+ 7S AT/Diesel/BS6.2",
            "2.0L ADVENTURE+ 7S MT/Diesel/BS6.2",
            "2.0L ADVENTURE+ A 7S AT/Diesel/BS6.2",
            "2.0L ADVENTURE+ A 7S MT/Diesel/BS6.2",
            "2.0L PURE 7S MT/Diesel/BS6.2",
            "2.0L PURE(O) 7S MT/Diesel/BS6.2",
            "2.0L PURE+ 7S AT/Diesel/BS6.2",
            "2.0L PURE+ 7S MT/Diesel/BS6.2",
            "2.0L PURE+ S 7S AT/Diesel/BS6.2",
            "2.0L PURE+ S 7S MT/Diesel/BS6.2",
            "2.0L SMART 7S MT/Diesel/BS6.2",
            "2.0L SMART(O) 7S MT/Diesel/BS6.2"
          ]
        },
        {
          generation: "SAFARI DARK EDITION 2ND GEN F/L 10.2023 - now",
          options: [
            "2.0L ACCOMPLISHED 7S AT/Diesel/BS6.2",
            "2.0L ACCOMPLISHED 7S MT/Diesel/BS6.2",
            "2.0L ACCOMPLISHED+ 6S AT/Diesel/BS6.2",
            "2.0L ACCOMPLISHED+ 6S MT/Diesel/BS6.2",
            "2.0L ACCOMPLISHED+ 7S AT/Diesel/BS6.2",
            "2.0L ACCOMPLISHED+ 7S MT/Diesel/BS6.2",
            "2.0L ADVENTURE + 7S MT/Diesel/BS6.2",
            "2.0L ADVENTURE+ 7S AT/Diesel/BS6.2",
            "2.0L PURE+ S 7S AT/Diesel/BS6.2",
            "2.0L PURE+ S 7S MT/Diesel/BS6.2"
          ]
        }
      ]
    },
    {
      id: 16,
      name: "TATA SIERRA",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/e24a73d.webp",
      years: "01.1995 - 01.2005",
      link: "/vehicles/tata-429/sierra-12757/",
      modifications: [
        {
          generation: "Sierra 01.1995 - 01.2005",
          options: [
            "1.9L STD/Diesel/BS1",
            "1.9L TURBO/Diesel/BS1"
          ]
        }
      ]
    },
    {
      id: 17,
      name: "TATA SUMO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/3f1ad5b.webp",
      years: "01.1994 - 10.2019",
      link: "/vehicles/tata-429/sumo-11379/",
      modifications: [
        {
          generation: "SUMO 01.1994 - 06.2019",
          options: [
            "2.0L/Diesel/BS2",
            "2.0L AMBULANCE/Diesel/BS4",
            "3.0L/Diesel/BS3",
            "3.0L AMBULANCE/Diesel/BS2",
            "3.0L SE/Diesel/BS2",
            "3.0L SE+/Diesel/BS2"
          ]
        },
        {
          generation: "SUMO SPACIO 09.2000 - 12.2011",
          options: [
            "2.0L MT/Diesel/BS2",
            "3.0L MT/Diesel/71h.p./BS2",
            "3.0L MT/Diesel/71h.p./BS3"
          ]
        },
        {
          generation: "SUMO VICTA 01.2004 - 05.2011",
          options: [
            "2.0L MT/Diesel/68h.p./BS2",
            "2.0L MT/Diesel/68h.p./BS2",
            "2.0L MT/Diesel/69h.p./BS2",
            "2.0L VICTA DI PHASE 2 MT/Diesel/BS3",
            "3.0L MT/Diesel/68h.p./BS2",
            "3.0L MT/Diesel/68h.p./BS3",
            "3.0L MT/Diesel/69h.p./BS2",
            "3.0L MT/Diesel/68h.p./BS3",
            "3.0L MT/Diesel/68h.p./BS3",
            "3.0L MT/Diesel/68h.p./BS2"
          ]
        },
        {
          generation: "SUMO GRANDE 01.2008 - 06.2014",
          options: [
            "2.0L MT/Diesel/90h.p./BS3",
            "2.0L MT/Diesel/90h.p./BS3",
            "2.2L DEFENCE MT/Diesel/BS3",
            "2.2L MT/Diesel/120h.p./BS3",
            "2.2L MT/Diesel/120h.p./BS4",
            "2.2L MT/Diesel/120h.p./BS3"
          ]
        },
        {
          generation: "SUMO GOLD 02.2012 - 10.2019",
          options: [
            "3.0L/Diesel/84h.p./BS4",
            "3.0L/Diesel/70h.p./BS3",
            "3.0L/Diesel/84h.p./BS4",
            "3.0L/Diesel/70h.p./BS3"
          ]
        }
      ]
    },
    {
      id: 18,
      name: "TATA TIAGO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/f9e09a0.webp",
      years: "04.2016 - now",
      link: "/vehicles/tata-429/tiago-12017/",
      modifications: [
        {
          generation: "TIAGO 04.2016 - 06.2020",
          options: [
            "1.0L XE MT/Diesel/69h.p./BS4",
            "1.0L XE MT/Diesel/69h.p./BS4",
            "1.0L XE(O) MT/Diesel/BS4",
            "1.0L XM MT/Diesel/69h.p./BS4",
            "1.0L XM MT/Diesel/69h.p./BS4",
            "1.0L XM(O) MT/Diesel/BS4",
            "1.0L XT MT/Diesel/BS4",
            "1.0L XT WIZZ MT/Diesel/BS4",
            "1.0L XT(O) MT/Diesel/BS4",
            "1.0L XZ MT/Diesel/BS4",
            "1.0L XZ MT (BS-IV)/Diesel/BS4",
            "1.0L XZ(O) MT/Diesel/BS4",
            "1.0L XZ+ MT/Diesel/BS4",
            "1.2L JTP MT/Petrol/BS4",
            "1.2L WIZZ MT/Petrol/BS4",
            "1.2L XE MT/Petrol/84h.p./BS4",
            "1.2L XE MT/Petrol/84h.p./BS4",
            "1.2L XE(O) MT/Petrol/BS4",
            "1.2L XM MT/Petrol/84h.p./BS4",
            "1.2L XM MT/Petrol/84h.p./BS4",
            "1.2L XM(O) MT/Petrol/BS4",
            "1.2L XT MT/Petrol/BS4",
            "1.2L XT WIZZ MT/Petrol/BS4",
            "1.2L XT(O) MT/Petrol/BS4",
            "1.2L XTA MT/Petrol/BS4",
            "1.2L XZ MT/Petrol/84h.p./BS4",
            "1.2L XZ MT/Petrol/84h.p./BS4",
            "1.2L XZ(O) MT/Petrol/BS4",
            "1.2L XZ+ MT/Petrol/BS4",
            "1.2L XZA MT/Petrol/BS4",
            "1.2L XZA+ MT/Petrol/BS4"
          ]
        },
        {
          generation: "TIAGO NRG 07.2018 - now",
          options: [
            "1.0L NRG MT/Diesel/69h.p./BS4",
            "1.0L NRG MT/Diesel/69h.p./BS4",
            "1.2L NRG AMT/Petrol/BS4",
            "1.2L NRG MT/Petrol/84h.p./BS4",
            "1.2L NRG MT/Petrol/84h.p./BS4",
            "1.2L XT (F) iCNG TWIN CYLINDER MT/Petrol/CNG/BS6.2",
            "1.2L XT FOLIAGE iCNG MT/Petrol/CNG/BS6.2",
            "1.2L XT iCNG MT/Petrol/CNG/73h.p./BS6",
            "1.2L XT iCNG MT/Petrol/CNG/73h.p./BS6.2",
            "1.2L XT iCNG TWIN CYLINDER MT/Petrol/CNG/BS6.2",
            "1.2L XZ (F) iCNG TWIN CYLINDER MT/Petrol/CNG/BS6.2",
            "1.2L XZ FOLIAGE iCNG MT/Petrol/CNG/BS6.2",
            "1.2L XZ iCNG MT/Petrol/CNG/73h.p./BS6",
            "1.2L XZ iCNG MT/Petrol/CNG/73h.p./BS6.2",
            "1.2L XZ iCNG TWIN CYLINDER MT/Petrol/CNG/BS6.2",
            "1.2L XZA (F) iCNG TWIN CYLINDER MT/Petrol/CNG/BS6.2",
            "1.2L XZA iCNG TWIN CYLINDER MT/Petrol/CNG/BS6.2"
          ]
        },
        {
          generation: "TIAGO F/L 01.2020 - now",
          options: [
            "1.2L XE iCNG MT/Petrol/CNG/BS6.2",
            "1.2L XE MT/Petrol/86h.p./BS6",
            "1.2L XE MT/Petrol/86h.p./BS6.2",
            "1.2L XM iCNG MT/Petrol/BS6",
            "1.2L XM iCNG MT/Petrol/CNG/BS6.2",
            "1.2L XMA MT/Petrol/BS6",
            "1.2L XT iCNG MT/Petrol/BS6",
            "1.2L XT iCNG MT/Petrol/CNG/BS6.2",
            "1.2L XT MT/Petrol/86h.p./BS6",
            "1.2L XT MT/Petrol/86h.p./BS6.2",
            "1.2L XT RP MT/Petrol/BS6.2",
            "1.2L XT(O) MT/Petrol/BS6.2",
            "1.2L XTA AMT/Petrol/BS6.2",
            "1.2L XZ iCNG MT/Petrol/BS6",
            "1.2L XZ MT/Petrol/BS6",
            "1.2L XZ+ iCNG MT/Petrol/BS6",
            "1.2L XZ+ iCNG MT/Petrol/CNG/BS6.2",
            "1.2L XZ+ MT/Petrol/86h.p./BS6",
            "1.2L XZ+ MT/Petrol/86h.p./BS6.2",
            "1.2L XZA MT/Petrol/BS6",
            "1.2L XZA+ AMT/Petrol/BS6.2",
            "1.2L XZA+ MT/Petrol/BS6"
          ]
        },
        {
          generation: "TIAGO EV 10.2022 - now",
          options: [
            "19.2kWh XE/Electric",
            "19.2kWh XT/Electric",
            "24 kWh XT SC/Electric",
            "24 kWh XZ+ FC/Electric",
            "24 kWh XZ+ SC/Electric",
            "24 kWh XZ+ TECH LUX FC/Electric",
            "24 kWh XZ+ TECH LUX SC/Electric"
          ]
        }
      ]
    },
    {
      id: 19,
      name: "TATA TIGOR",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/4299104.webp",
      years: "03.2017 - now",
      link: "/vehicles/tata-429/tigor-12183/",
      modifications: [
        {
          generation: "TIGOR 03.2017 - 06.2020",
          options: [
            "1.1L BUZZ MT/Diesel/BS4",
            "1.1L XE MT/Diesel/BS4",
            "1.1L XE(O) MT/Diesel/BS4",
            "1.1L XM MT/Diesel/BS4",
            "1.1L XM(O) MT/Diesel/BS4",
            "1.1L XT MT/Diesel/BS4",
            "1.1L XT(O) MT/Diesel/BS4",
            "1.1L XZ MT/Diesel/BS4",
            "1.1L XZ(O) MT/Diesel/BS4",
            "1.1L XZ+ MT/Diesel/BS4",
            "1.2L BUZZ MT/Petrol/BS4",
            "1.2L JTP SPORTS EDITION MT/Petrol/BS4",
            "1.2L XE MT/Petrol/BS4",
            "1.2L XE(O) MT/Petrol/BS4",
            "1.2L XM MT/Petrol/BS4",
            "1.2L XM(O) MT/Petrol/BS4",
            "1.2L XT MT/Petrol/BS4",
            "1.2L XT(O) MT/Petrol/BS4",
            "1.2L XTA AMT/Petrol/BS4",
            "1.2L XZ MT/Petrol/BS4",
            "1.2L XZ(O) MT/Petrol/BS4",
            "1.2L XZ+ MT/Petrol/BS4",
            "1.2L XZA AMT/Petrol/BS4"
          ]
        },
        {
          generation: "TIGOR EV 10.2019 - 08.2021",
          options: [
            "16.2 kWh XT+/Electric",
            "16.2kWh XE+/Electric",
            "16.2kWh XM+/Electric"
          ]
        },
        {
          generation: "TIGOR F/L 01.2020 - now",
          options: [
            "1.2L XE/Petrol/BS6.2",
            "1.2L XE MCE iCNG/Petrol/CNG/BS6",
            "1.2L XE MT/Petrol/BS6",
            "1.2L XM/Petrol/BS6.2",
            "1.2L XM iCNG/Petrol/CNG/BS6.2",
            "1.2L XM ICNG/Petrol/CNG/BS6",
            "1.2L XM MT/Petrol/BS6",
            "1.2L XMA/Petrol/86h.p./BS6",
            "1.2L XMA/Petrol/86h.p./BS6.2",
            "1.2L XZ/Petrol/BS6.2",
            "1.2L XZ iCNG/Petrol/CNG/BS6.2",
            "1.2L XZ MCE iCNG/Petrol/CNG/BS6",
            "1.2L XZ MT/Petrol/BS6",
            "1.2L XZ+/Petrol/BS6.2",
            "1.2L XZ+ iCNG/Petrol/CNG/86h.p./BS6",
            "1.2L XZ+ iCNG/Petrol/CNG/72h.p./BS6.2",
            "1.2L XZ+ LP/Petrol/BS6.2",
            "1.2L XZ+ LP iCNG/Petrol/CNG/86h.p./BS6",
            "1.2L XZ+ LP iCNG/Petrol/CNG/72h.p./BS6.2",
            "1.2L XZ+ MT/Petrol/BS6",
            "1.2L XZ+ PREMIUM/Petrol/BS6",
            "1.2L XZA+/Petrol/86h.p./BS6",
            "1.2L XZA+/Petrol/86h.p./BS6.2",
            "1.2L XZA+ LP/Petrol/BS6.2"
          ]
        },
        {
          generation: "XPRES-T EV 07.2021 - now",
          options: [
            "XM (165 KM)/Electric",
            "XM+ (213 KM)/Electric"
          ]
        },
        {
          generation: "TIGOR EV F/L 08.2021 - now",
          options: [
            "26 kWh XE/Electric",
            "26 kWh XM/Electric",
            "26 kWh XZ+/Electric",
            "26 kWh XZ+ DUAL TONE/Electric"
          ]
        }
      ]
    },
    {
      id: 20,
      name: "TATA XENON",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/45f263f.webp",
      years: "03.2008 - 12.2017",
      link: "/vehicles/tata-429/xenon-11381/",
      modifications: [
        {
          generation: "XENON 03.2008 - 12.2017",
          options: [
            "3.0L/Diesel/BS3",
            "3.0L 4SP TC/Diesel/BS3",
            "3.0L DiCOR/Diesel/BS3"
          ]
        },
        {
          generation: "XENON XT 01.2009 - 12.2017",
          options: [
            "2.2L/Diesel/BS3",
            "2.2L CREWCAB 4x4/Diesel/BS3"
          ]
        }
      ]
    },
    {
      id: 21,
      name: "TATA ZEST",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/a74df5c.webp",
      years: "08.2014 - 04.2019",
      link: "/vehicles/tata-429/zest-11383/",
      modifications: [
        {
          generation: "ZEST 08.2014 - 04.2019",
          options: [
            "1.2L XE MT/Petrol/89h.p./BS4",
            "1.2L XM MT/Petrol/BS4",
            "1.2L XM MT ABS/Petrol/BS4",
            "1.2L XMS MT/Petrol/BS4",
            "1.2L XMS MT ABS/Petrol/89h.p./BS4",
            "1.2L XT MT ABS/Petrol/BS4",
            "1.3L PREMIO MT/Diesel/BS4",
            "1.3L XE MT/Diesel/74h.p./BS4",
            "1.3L XM MT/Diesel/BS4",
            "1.3L XM MT ABS/Diesel/BS4",
            "1.3L XMA MT/Diesel/89h.p./BS4",
            "1.3L XMS MT ABS/Diesel/89h.p./BS4",
            "1.3L XMS MT ABS/Diesel/74h.p./BS4",
            "1.3L XT MT ABS/Diesel/BS4",
            "1.3L XTA MT/Diesel/BS4"
          ]
        }
      ]
    }, 
];

export const Tata = () => {
  const link = getOriPartsLink(3, "TATA");

  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Use exported models
  const models = tataModels;

  const categories = [
    { name: "Air Conditioning", img: "https://boodmo.com/media/cache/catalog_image/images/categories/db9dad4.jpg", link: "/catalog/air_conditioning/" },
    { name: "Bearings", img: "https://boodmo.com/media/cache/catalog_image/images/categories/40e95ca.jpg", link: "/catalog/bearings/" },
    { name: "Belts Chains And Rollers", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ddbeb81.jpg", link: "/catalog/drive_belts/" },
    { name: "Body", img: "https://boodmo.com/media/cache/catalog_image/images/categories/40e6a4c.jpg", link: "/catalog/body/" },
    { name: "Brake System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/5301830.jpg", link: "/catalog/brakes/" },
    { name: "Car Accessories", img: "https://boodmo.com/media/cache/catalog_image/images/categories/ab143a7.webp", link: "/catalog/car_accessories/" },
    { name: "Clutch System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e8cb288.jpg", link: "/catalog/clutch/" },
    { name: "Control Cables", img: "https://boodmo.com/media/cache/catalog_image/images/categories/7455b44.jpg", link: "/catalog/control_cables/" },
    { name: "Electrical Components", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d5b3ac7.jpg", link: "/catalog/electric_components/" },
    { name: "Engine", img: "https://boodmo.com/media/cache/catalog_image/images/categories/8fea232.jpg", link: "/catalog/engine/" },
    { name: "Engine Cooling System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e215fcc.jpg", link: "/catalog/cooling_system/" },
    { name: "Exhaust System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/d1e33d6.jpg", link: "/catalog/exhaust/" },
    { name: "Filters", img: "https://boodmo.com/media/cache/catalog_image/images/categories/a16bbf6.jpg", link: "/catalog/filters/" },
    { name: "Fuel Supply System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/49ed220.jpg", link: "/catalog/fuelsystem/" },
    { name: "Gaskets & Seals", img: "https://boodmo.com/media/cache/catalog_image/images/categories/14b8753.jpg", link: "/catalog/Gasket_SealingRings/" },
    { name: "Interior and Comfort", img: "https://boodmo.com/media/cache/catalog_image/images/categories/05a2b84.jpg", link: "/catalog/interior_comfort/" },
    { name: "Lighting", img: "https://boodmo.com/media/cache/catalog_image/images/categories/53380d3.webp", link: "/catalog/lighting/" },
    { name: "Maintenance Service Parts", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e8cb288.jpg", link: "/catalog/maintenance_service_parts/" },
    { name: "Oils and Fluids", img: "https://boodmo.com/media/cache/catalog_image/images/categories/4614ecf.webp", link: "/catalog/oilsfluids/" },
    { name: "Pipes & Hoses", img: "https://boodmo.com/media/cache/catalog_image/images/categories/e0b2a63.jpg", link: "/catalog/pipes_hoses/" },
    { name: "Sensors Relays and Control Units", img: "https://boodmo.com/media/cache/catalog_image/images/categories/2676bd2.jpg", link: "/catalog/sensors_control_units/" },
    { name: "Steering", img: "https://boodmo.com/media/cache/catalog_image/images/categories/72fb97b.jpg", link: "/catalog/steering/" },
    { name: "Suspension and Arms", img: "https://boodmo.com/media/cache/catalog_image/images/categories/f26073e.jpg", link: "/catalog/suspension/" },
    { name: "Towbar Parts", img: "https://boodmo.com/media/cache/catalog_image/images/categories/98b48d2.jpg", link: "/catalog/towbar/" },
    { name: "Transmission", img: "https://boodmo.com/media/cache/catalog_image/images/categories/21ce121.jpg", link: "/catalog/transmission/" },
    { name: "Trims", img: "https://boodmo.com/media/cache/catalog_image/images/categories/beccd06.jpg", link: "/catalog/trims/" },
    { name: "Universal", img: "https://boodmo.com/media/cache/catalog_image/images/categories/af8d099.jpg", link: "/catalog/universal/" },
    { name: "Wheels", img: "https://boodmo.com/media/cache/catalog_image/images/categories/430177a.jpg", link: "/catalog/wheels/" },
    { name: "Windscreen Cleaning System", img: "https://boodmo.com/media/cache/catalog_image/images/categories/1053d82.jpg", link: "/catalog/windscreen_cleaning_system/" },
  ];
  // 🔹 Filtering Logic
  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(filter.toLowerCase())
  );

  // 🔹 Filter parts/categories by title or name using the categoryFilter state
  const filteredParts = categories.filter((c) =>
    (c.title || c.name || "").toLowerCase().includes(categoryFilter.toLowerCase())
  );


  return (
    <section className="min-h-screen py-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8">
        <VehicleBreadcrumbs />

        <h1 className="text-2xl sm:text-3xl md:text-4xl px-2 font-bold text-gray-800 uppercase mb-4 sm:mb-6">
          TATA
        </h1>

        {/* OEM Catalogue Button */}
        <a
          href={link}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-block border border-1 border-gray-600 mb-2 text-black text-xs sm:text-sm rounded-md px-3 py-2 sm:px-4 sm:py-2 transition-all duration-300 hover:bg-red-400"
        >
          View OEM Catalogue
        </a>
      </div>

      {/* Brand Info Section */}
      <section className="max-w-7xl mx-auto brand-info__desc mb-6 sm:mb-8 md:mb-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-200 text-justify">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Tata Motors -{" "}
            <span className="text-red-500">Connecting Aspirations</span>
          </h3>

          <p>
            The journey of Tata is one from the bottom to the sky, beginning in 1945
            with <strong>Jamshedji Tata</strong>, the legendary house founder. The
            brand is now one of India’s most popular international brands, having
            acquired renowned labels such as <strong>Land Rover</strong> and{" "}
            <strong>Jaguar</strong>, while also holding the crown for the world’s
            cheapest passenger car – <strong>Nano</strong>.
          </p>

          <p>
            Boodmo houses a wide range of Tata car spare parts from both OEM and
            aftermarket labels. Select your car make to begin comparing parts and
            choosing the best value for your vehicle.
          </p>

          <p>
            Visit the official website:{" "}
            <a
              href="https://www.tatamotors.com/"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="text-blue-500 hover:underline break-all"
            >
              https://www.tatamotors.com/
            </a>
          </p>
        </div>
      </section>


      {/* Model Filter Section */}
      <div className="max-w-7xl mx-auto heading-filters flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 border-b border-gray-200 pb-3 px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <div className="h2-section text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Choose Your{" "}
          <span className="h2-section__name text-red-500 font-bold">
            Model
          </span>
        </div>

        {/* Search Input */}
        <div className="heading-filters__action w-full sm:w-auto">
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter Model"
            className="form-control form-control--search w-full sm:w-64 md:w-72 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 transition duration-200"
          />
        </div>
      </div>

      {/* Models Grid */}
      <ul className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
        {filteredModels.map((model) => (
          <li
            key={model.id}
            className="bg-white dark:bg-gray-800 rounded-md shadow-md hover:shadow-red-500/30 transform hover:-translate-y-1 transition duration-110 overflow-hidden"
          >
            {/* Image */}
            <div className="bg-white dark:bg-gray-700 flex items-center justify-center h-32 sm:h-40">
              <img
                src={model.image}
                alt={model.name}
                className="object-contain h-full w-full p-4 sm:p-6"
              />
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 space-y-2">
              <Link
                to={`/vehicles/tata/${model.id}`}
                className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white transition block hover:text-red-500"
              >
                {model.name}
              </Link>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {model.years}
              </p>

              {/* Dropdown */}
              <select className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-xs sm:text-sm rounded-md px-2 sm:px-3 py-1.5 sm:py-2 outline-none transition">
                <option className="font-semibold" value="">
                  SELECT YOUR CAR
                </option>

                {model.modifications.map((group, i) => (
                  <optgroup
                    key={i}
                    label={group.generation}
                    className="font-semibold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700"
                  >
                    {group.options.map((opt, j) => (
                      <option key={j} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </li>
        ))}

        {/* No Models Found */}
        {filteredModels.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
            No models found.
          </p>
        )}
      </ul>


      {/* ---------tata parts and accssories------------- */}
      <section className="max-w-7xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200">
            TATA Parts and{" "}
            <span className="text-red-600 dark:text-pink-400">Accessories</span>
          </h2>

          {/* Search Filter */}
          <div className="w-full md:w-1/3">
            <input
              type="search"
              placeholder="Filter Category ..."
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 
                          bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                          px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 
                          transition duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
          {filteredParts.map((part, index) => {
            const displayName = part.title || part.name || "Category";
            const href = part.href || part.link || "#";
            const itemKey = `${displayName.replace(/\s+/g, "_")}-${index}`;
            return (
              <a
                key={itemKey}
                href={href}
                title={displayName}
                aria-label={displayName}
                className="flex flex-col items-center rounded-lg sm:rounded-xl p-3 sm:p-4 transition-transform transform hover:scale-105"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex items-center justify-center mb-2 sm:mb-3">
                  {part.img ? (
                    <img
                      src={part.img}
                      alt={displayName}
                      className="w-full h-full object-contain"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div
                      className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg"
                      aria-hidden
                    />
                  )}
                </div>
                <span className="mt-1 text-xs sm:text-sm text-gray-700 dark:text-gray-200 text-center font-medium break-words">
                  {displayName}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <Article_Review />
    </section>
  );
};
