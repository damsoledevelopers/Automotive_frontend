import React, { useState } from "react";
import { Link } from "react-router-dom";
import VehicleBreadcrumbs from "./VehicleBreadcrumbs";
import mahindra1logo from "../../assets/img/vehicle-img/mahindra1-logo.png";
import mahiBanner from "../../assets/img/vehicle-img/mahibanner.jpg";
import Article_Review from "../Article_Review";
import { getOriPartsLink } from "../../utils/oripartsBackUrl";

// 🔹 Models Data - Exported for use in other components
export const mahindraModels = [
    {
      id: 1,
      name: "MAHINDRA ALFA",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/db55347.webp",
      years: "03.2017 - now",
      link: "/vehicles/mahindra-278/alfa-11951/",
      modifications: [
        {
          generation: "ALFA LOAD 03.2017 - now",
          options: [
            "0.4L ALFA LOAD/Diesel/BS4",
            "0.4L ALFA LOAD/Petrol/CNG/BS6",
            "0.6L ALFA LOAD/Diesel/BS6",
          ],
        },
        {
          generation: "ALFA PASSENGER 03.2017 - now",
          options: [
            "0.4L/Diesel/BS4",
            "0.4L ALFA PASSANGER/Petrol/CNG/BS6",
            "0.6L ALFA PASSANGER /Diesel/BS6",
          ],
        },
        {
          generation: "ALFA E MINI 09.2017 - now",
          options: [
            "5.67 kWh CARGO/Electric",
            "5.67 kWh MINI/Electric",
          ],
        },
      ],
    },
    {
      id: 2,
      name: "MAHINDRA ALTURAS G4",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/703bf62.webp",
      years: "07.2018 - 12.2022",
      link: "/vehicles/mahindra-278/alturas_g4-12299/",
      modifications: [
        {
          generation: "ALTURAS G4 07.2018 - 12.2022",
          options: [
            "2.2L 4WD AT/Diesel/178.4h.p./BS4",
            "2.2L 4WD AT/Diesel/178.4h.p./BS6",
            "2.2L AT/Diesel/178.4h.p./BS4",
            "2.2L AT/Diesel/178.4h.p./BS6",
            "2.2L HIGH AT/Diesel/BS6",
          ],
        },
      ],
    },
    {
      id: 3,
      name: "MAHINDRA BE 6",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/10dc578.webp",
      years: "11.2024 - now",
      link: "/vehicles/mahindra-278/be_6-12883/",
      modifications: [
        {
          generation: "BE 6 EV 11.2024 - now",
          options: [
            "59 Kwh PACK ONE/Electric",
            "59 KWh PACK ONE ABOVE/Electric",
            "59 Kwh PACK THREE SELECT/Electric",
            "59 Kwh PACK TWO/Electric",
            "79 Kwh PACK THREE/Electric",
            "79 Kwh PACK THREE BATMAN EDITION/Electric",
          ],
        },
      ],
    },
    {
      id: 4,
      name: "MAHINDRA BOLERO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/21a34a3.webp",
      years: "03.2003 - now",
      link: "/vehicles/mahindra-278/bolero-11275/",
      modifications: [
        {
          generation: "BOLERO INVADER 03.2003 - 01.2010",
          options: [
            "2.5L DI 2WD/4WD MT/Diesel/BS2",
            "2.5L GLX MT/Diesel/BS2",
          ],
        },
        {
          generation: "BOLERO 1ST GEN 05.2004 - 09.2012",
          options: [
            "2.5L AC MT/Diesel/BS3",
            "2.5L DI 2WD/4WD MT/Diesel/BS2",
            "2.5L DI DX MT/Diesel/BS3",
            "2.5L DIZ PHII MT/Diesel/BS3",
            "2.5L DX (BS-II) MT/Diesel/BS3",
            "2.5L GLX MT/Diesel/BS3",
            "2.5L LX GLX SPORTZ 2WD/4WD MT/Diesel/BS3",
            "2.5L LX GLX SPORTZ VFD 2WD/4WD MT/Diesel/BS3",
            "2.5L LX SLE MT/Diesel/BS3",
            "2.5L MDI TC MT/Diesel/BS3",
            "2.5L MT/Diesel/BS2",
            "2.5L PLUS MT/Diesel/BS3",
            "2.5L XL MT/Diesel/BS3",
            "2.5L XLS MT/Diesel/BS3",
          ],
        },
        {
          generation: "BOLERO CAMPER 01.2005 - 03.2013",
          options: [
            "2.5L DX MT/Diesel/BS3",
            "2.5L MT/Diesel/62h.p./BS2",
            "2.5L MT/Diesel/62h.p./BS3",
          ],
        },
        {
          generation: "BOLERO 2ND GEN 09.2011 - 03.2020",
          options: [
            "1.5L POWER+ LX MT/Diesel/BS4",
            "1.5L POWER+ SLE MT/Diesel/BS4",
            "1.5L POWER+ SLX MT/Diesel/BS4",
            "1.5L POWER+ ZLX MT/Diesel/BS4",
            "2.5L AMBULANCE MT/Diesel/BS4",
            "2.5L EX MT/Diesel/BS4",
            "2.5L LX MT/Diesel/BS4",
            "2.5L MT/Diesel/BS4",
            "2.5L PLUS MT/Diesel/BS4",
            "2.5L SLE MT/Diesel/BS4",
            "2.5L SLX MT/Diesel/BS4",
            "2.5L VLX VX MT/Diesel/BS4",
            "2.5L ZLX MT/Diesel/BS4",
          ],
        },
        {
          generation: "BOLERO 2ND GEN F/L 04.2019 - 05.2022",
          options: [
            "1.5L B2 MT/Diesel/BS6",
            "1.5L B4 MT/Diesel/BS6",
            "1.5L B6 MT/Diesel/BS6",
            "1.5L B6(O) MT/Diesel/BS6",
          ],
        },
        {
          generation: "BOLERO CAMPER F/L 10.2019 - now",
          options: [
            "2.5L 2WD MT/Diesel/BS6",
            "2.5L 4WD MT/Diesel/BS6",
            "2.5L GOLD VX & ZX MT/Diesel/BS6",
          ],
        },
        {
          generation: "BOLERO NEO 07.2021 - now",
          options: [
            "1.5L N10 MT/Diesel/BS6",
            "1.5L N10(O) MT/Diesel/BS6",
            "1.5L N4 MT/Diesel/BS6",
            "1.5L N8 MT/Diesel/BS6",
          ],
        },
        {
          generation: "BOLERO NEO + 09.2023 - now",
          options: [
            "2.2L P10 MT/Diesel/BS6.2",
            "2.2L P4 AMBULANCE MT/Diesel/BS6.2",
            "2.2L P4 MT/Diesel/BS6.2",
          ],
        },
        {
          generation: "BOLERO 3RD GEN F/L 10.2025 - now",
          options: [
            "1.5L B4 MT/Diesel/BS6.2",
            "1.5L B6 MT/Diesel/BS6.2",
            "1.5L B6(O) MT/Diesel/BS6.2",
            "1.5L B8 MT/Diesel/BS6.2",
          ],
        },
      ],
    },
    {
      id: 5,
      name: "MAHINDRA BOLERO PIK-UP",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/1852e57.webp",
      years: "09.2010 - now",
      link: "/vehicles/mahindra-278/bolero_pickup-12256/",
      modifications: [
        {
          generation: "BOLERO PIK-UP 1ST GEN 09.2010 - 01.2019",
          options: [
            "2.5L MT/Diesel/BS4",
            "2.5L MT/Petrol/CNG/BS4",
          ],
        },
        {
          generation: "BOLERO PIK-UP 2ND GEN 01.2019 - now",
          options: [
            "2.5L PIK UP MT/Petrol/CNG/BS6",
            "2.5L PIKUP CITY 4WD MT/Diesel/BS6",
            "2.5L PIKUP FB EXTRA LONG 1.25T & 1.5T MT/Diesel/BS6",
            "2.5L PIKUP FB EXTRA LONG 1.25T,1.3T & 1.5T MT/Diesel/BS6",
            "2.5L PIKUP FB EXTRA LONG 1.7T MT/Diesel/BS6",
            "2.5L PIKUP FB EXTRA LONG MT/Diesel/70h.p./BS6",
            "2.5L PIKUP FB EXTRA LONG MT/Diesel/63h.p./BS6",
            "2.5L PIKUP FB EXTRA LONG MT/Diesel/75h.p./BS6",
            "2.5L PIKUP FB EXTRA STRONG 1.3T & 1.5T MT/Diesel/BS6",
            "2.5L PIKUP FB EXTRA STRONG MT/Diesel/BS6",
            "2.5L PIKUP NFB 4WD MT/Diesel/BS6",
          ],
        },
      ],
    },
    {
      id: 6,
      name: "MAHINDRA COMMANDER",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/mahindra-naya-commander-web_555ed136dc0eb.webp",
      years: "11.2000 - 12.2005",
      link: "/vehicles/mahindra-278/commander-11276/",
      modifications: [
        {
          generation: "COMMANDER 11.2000 - 12.2005",
          options: [
            "2.5L/Diesel/58h.p./BS1",
            "2.5L/Diesel/63h.p./BS2",
            "2.5L 4X4/Diesel/50h.p./BS1",
            "2.5L 4X4/Diesel/58h.p./BS1",
            "2.5L 4X4/Diesel/63h.p./BS2",
          ],
        },
      ],
    },
    {
      id: 7,
      name: "MAHINDRA E2O",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/773c62f.webp",
      years: "03.2013 - 11.2016",
      link: "/vehicles/mahindra-278/e2o-12231/",
      modifications: [
        {
          generation: "E2O 03.2013 - 11.2016",
          options: [
            "10.1 kWh E2O/Electric",
          ],
        },
      ],
    },
    {
      id: 8,
      name: "MAHINDRA eVERITO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/198e125.webp",
      years: "06.2016 - 09.2023",
      link: "/vehicles/mahindra-278/evarito-12292/",
      modifications: [
        {
          generation: "eVERITO 06.2016 - 09.2023",
          options: [
            "13.91 kWh C2/Electric",
            "13.91 kWh C4/Electric",
            "13.91 kWh C6/Electric",
            "14.4 kWh D2/Electric",
            "14.4 kWh D4/Electric",
            "14.4 kWh D6/Electric",
            "18.55 kWh D2/Electric",
            "18.55 kWh D4/Electric",
            "18.55 kWh D6/Electric",
          ],
        },
      ],
    },
    {
      id: 9,
      name: "MAHINDRA GENIO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/6c149b6.webp",
      years: "01.2011 - 01.2016",
      link: "/vehicles/mahindra-278/genio-11908/",
      modifications: [
        {
          generation: "GENIO SC 01.2011 - 01.2016",
          options: ["2.5L Diesel BS3"],
        },
        {
          generation: "GENIO DC 07.2011 - 01.2016",
          options: ["2.5L Diesel BS3", "2.5L VX Diesel BS4"],
        },
      ],
    },
    {
      id: 10,
      name: "MAHINDRA GIO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/geoTruck_56e933c492404.webp",
      years: "11.2009 - 09.2015",
      link: "/vehicles/mahindra-278/gio-11976/",
      modifications: [
        {
          generation: "GIO 11.2009 - 09.2015",
          options: ["0.5L Diesel BS3"],
        },
      ],
    },
    {
      id: 11,
      name: "MAHINDRA IMPERIO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/b24427a.webp",
      years: "01.2016 - 03.2020",
      link: "/vehicles/mahindra-278/imperio-12141/",
      modifications: [
        {
          generation: "IMPERIO DC 01.2016 - 03.2020",
          options: ["2.5L Diesel BS4", "2.5L VX Diesel BS4"],
        },
        {
          generation: "IMPERIO SC 01.2016 - 03.2020",
          options: ["2.5L Diesel BS4", "2.5L VX Diesel BS4"],
        },
      ],
    },
    {
      id: 12,
      name: "MAHINDRA JEETO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/0d7500f.webp",
      years: "06.2015 - now",
      link: "/vehicles/mahindra-278/jeeto-11954/",
      modifications: [
        {
          generation: "JEETO 06.2015 - now",
          options: [
            "0.6L JEETO Petrol CNG BS4",
            "0.6L JEETO PLUS Diesel BS4",
            "0.6L JEETO PLUS Petrol CNG BS6",
            "0.6L JEETO PLUS Petrol BS6",
            "0.6L L6-11 Diesel 11h.p. BS3",
            "0.6L L6-11 Diesel 11h.p. BS4",
            "0.6L L6-16 Diesel 16h.p. BS3",
            "0.6L L6-16 Diesel 16h.p. BS4",
            "0.6L L6-16 Diesel 16h.p. BS6",
            "0.6L L6-20 Petrol CNG BS6",
            "0.6L L7-11 Diesel 11h.p. BS3",
            "0.6L L7-11 Diesel 11h.p. BS4",
            "0.6L L7-16 Diesel 16h.p. BS3",
            "0.6L L7-16 Diesel 16h.p. BS4",
            "0.6L S6-11 Diesel 11h.p. BS3",
            "0.6L S6-11 Diesel 11h.p. BS4",
            "0.6L S6-16 Diesel 16h.p. BS3",
            "0.6L S6-16 Diesel 16h.p. BS4",
            "0.6L X6-11 Diesel BS4",
            "0.6L X7-11 Diesel 11h.p. BS3",
            "0.6L X7-11 Diesel 11h.p. BS4",
            "0.6L X7-16 Diesel 16h.p. BS3",
            "0.6L X7-16 Diesel 16h.p. BS4",
            "0.6L X7-20 Petrol CNG BS6",
            "0.6L Z7-16 Diesel BS6",
            "0.6L Z7-20 Petrol CNG BS6",
            "0.7L S6-16 Diesel BS6",
          ],
        },
        {
          generation: "JEETO MINI VAN 07.2017 - 07.2019",
          options: ["0.6L Diesel BS4"],
        },
      ],
    },
    {
      id: 13,
      name: "MAHINDRA KUV 100",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/52c85cb.webp",
      years: "01.2016 - now",
      link: "/vehicles/mahindra-278/kuv100-12021/",
      modifications: [
        {
          generation: "KUV 100 1ST GEN 01.2016 - 10.2017",
          options: [
            "1.2L K2 6S Petrol BS4",
            "1.2L K2 6S Diesel BS4",
            "1.2L K2+ 6S Diesel BS4",
            "1.2L K2+ 6S Petrol BS4",
            "1.2L K4 5S Diesel BS4",
            "1.2L K4 5S Petrol BS4",
            "1.2L K4 6S Diesel BS4",
            "1.2L K4 6S Petrol BS4",
            "1.2L K4+ 5S Diesel BS4",
            "1.2L K4+ 5S Petrol BS4",
            "1.2L K4+ 6S Diesel BS4",
            "1.2L K4+ 6S Petrol BS4",
            "1.2L K6 5S Diesel BS4",
            "1.2L K6 5S Petrol BS4",
            "1.2L K6 6S Petrol BS4",
            "1.2L K6 6S Diesel BS4",
            "1.2L K6+ 5S Diesel BS4",
            "1.2L K6+ 5S Petrol BS4",
            "1.2L K6+ 6S Diesel BS4",
            "1.2L K6+ 6S Petrol BS4",
            "1.2L K8 5S Diesel BS4",
            "1.2L K8 5S Petrol BS4",
            "1.2L K8 6S Diesel BS4",
            "1.2L K8 6S Petrol BS4",
          ],
        },
        {
          generation: "KUV 100 1ST GEN F/L 10.2017 - now",
          options: [
            "1.2L K2 5S TRIP Diesel BS4",
            "1.2L K2 5S TRIP Petrol CNG BS4",
            "1.2L K2 6S Diesel BS4",
            "1.2L K2 6S Petrol BS4",
            "1.2L K2 6S TRIP Petrol CNG BS4",
            "1.2L K2 6S TRIP Petrol BS4",
            "1.2L K2 6S TRIP Diesel BS4",
            "1.2L K2+ 6S Diesel BS4",
            "1.2L K2+ 6S Petrol 82h.p. BS4",
            "1.2L K2+ 6S Petrol 82h.p. BS6",
            "1.2L K4+ 5S Diesel BS4",
            "1.2L K4+ 5S Petrol 82h.p. BS4",
            "1.2L K4+ 5S Petrol 82h.p. BS6",
            "1.2L K4+ 6S Petrol 82h.p. BS4",
            "1.2L K4+ 6S Diesel BS4",
            "1.2L K4+ 6S Petrol 82h.p. BS6",
            "1.2L K6+ 5S Diesel BS4",
            "1.2L K6+ 5S Petrol 82h.p. BS4",
            "1.2L K6+ 5S Petrol 82h.p. BS6",
            "1.2L K6+ 6S Petrol 82h.p. BS4",
            "1.2L K6+ 6S Diesel BS4",
            "1.2L K6+ 6S Petrol 82h.p. BS6",
            "1.2L K8 5S Diesel BS4",
            "1.2L K8 5S Petrol 82h.p. BS4",
            "1.2L K8 5S Petrol 82h.p. BS6",
            "1.2L K8 6S Diesel BS4",
            "1.2L K8 6S Petrol 82h.p. BS4",
            "1.2L K8 6S Petrol 82h.p. BS6",
            "1.2L TRIP 6S Petrol BS6",
          ],
        },
      ],
    },
    {
      id: 14,
      name: "MAHINDRA MAJOR",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/19ac048.webp",
      years: "01.1986 - 12.2000",
      link: "/vehicles/mahindra-278/cl500-12529/",
      modifications: [
        {
          generation: "CL 500 MDI 01.1986 - 12.2000",
          options: [
            "2.5L MT/Diesel/BS1"
          ]
        },
        {
          generation: "CL 550 MDI 01.1986 - 12.2000",
          options: [
            "2.5L MT/Diesel/BS1"
          ]
        }
      ]
    },
    {
      id: 15,
      name: "MAHINDRA MARAZZO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/ab81c71.webp",
      years: "09.2018 - 10.2024",
      link: "/vehicles/mahindra-278/marazzo-12296/",
      modifications: [
        {
          generation: "MARAZZO 09.2018 - 10.2024",
          options: [
            "1.5L M2/Diesel/121h.p./BS4",
            "1.5L M2/Diesel/121h.p./BS6",
            "1.5L M4/Diesel/BS4",
            "1.5L M4+/Diesel/BS6",
            "1.5L M6/Diesel/BS4",
            "1.5L M6+/Diesel/BS6",
            "1.5L M8/Diesel/BS4"
          ]
        }
      ]
    },
    {
      id: 16,
      name: "MAHINDRA MARSHAL",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/mahindra-marshal-di-web_555dd4b151837.webp",
      years: "01.1996 - 12.2008",
      link: "/vehicles/mahindra-278/marshal-11277/",
      modifications: [
        {
          generation: "MARSHAL 01.1996 - 12.2008",
          options: [
            "2.5L/Diesel/BS1"
          ]
        }
      ]
    },
    {
      id: 17,
      name: "MAHINDRA MAXI TRUCK",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/a60d5d7.webp",
      years: "07.2012 - now",
      link: "/vehicles/mahindra-278/maxi_truck-12254/",
      modifications: [
        {
          generation: "MAXI TRUCK 07.2012 - now",
          options: [
            "2.5L/Petrol/CNG",
            "2.5L/Diesel",
            "2.5L BMT PLUS/Petrol/CNG/BS6",
            "2.5L BMT PLUS (MS/PS/CBC)/Diesel/BS6",
            "2.5L BMT PLUS DI TURBO/Diesel",
            "2.5L BMT PLUS UPCR/Diesel/BS4"
          ]
        }
      ]
    },
    {
      id: 18,
      name: "MAHINDRA MAXX",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/1b9b533.webp",
      years: "05.2004 - now",
      link: "/vehicles/mahindra-278/maxx-11278/",
      modifications: [
        {
          generation: "MAXX PICK UP 05.2004 - 06.2013",
          options: [
            "2.5L/Diesel/63h.p.",
            "2.5L/Diesel/63h.p.",
            "2.5L/Diesel/63h.p.",
            "2.5L/Diesel/63h.p.",
            "2.5L/Diesel/63h.p.",
            "2.5L SC/DC/Diesel"
          ]
        },
        {
          generation: "MAXX 03.2005 - 09.2011",
          options: [
            "2.5L FESTARA/Diesel/62h.p./BS2",
            "2.5L FESTARA/Diesel/62h.p./BS3"
          ]
        },
        {
          generation: "MAXX PIKUP HEAVY DUTY 08.2022 - now",
          options: [
            "2.5L 1.3T LX/Diesel/BS6",
            "2.5L 1.3T VXI/Diesel/BS6",
            "2.5L 1.7T EXTRA LX LONG/Diesel/BS6",
            "2.5L 1.7T LX/Diesel/BS6",
            "2.5L 1.7T LX CBC/Diesel/BS6.2",
            "2.5L 1.7T VXI/Diesel/BS6",
            "2.5L 1.7T VXI EXTRA LONG/Diesel/BS6",
            "2.5L 2.0T LX CBC/Diesel/BS6.2",
            "2.5L 2.0T LX EXTRA LONG/Diesel/BS6",
            "2.5L 2.0T VXI EXTRA LONG /Diesel/BS6"
          ]
        },
        {
          generation: "MAXX PIKUP CITY 08.2022 - now",
          options: [
            "2.5L 1.3T LX/Diesel/BS6",
            "2.5L 1.3T LX CBC/Diesel/BS6.2",
            "2.5L 1.3T VXI/Diesel/BS6",
            "2.5L 1.4T LX/Diesel/BS6",
            "2.5L 1.4T LX CBC/Diesel/BS6.2",
            "2.5L 1.4T VXI/Diesel/BS6",
            "2.5L 1.5T LX/Diesel/BS6",
            "2.5L 1.5T LX CBC/Diesel/BS6.2",
            "2.5L 1.5T VXI/Diesel/BS6",
            "2.5L CNG/Petrol/CNG/BS6.2"
          ]
        }
      ]
    },
    {
      id: 19,
      name: "MAHINDRA MAXXIMO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/96bf257.webp",
      years: "04.2011 - 10.2015",
      link: "/vehicles/mahindra-278/maxximo-11960/",
      modifications: [
        {
          generation: "MAXXIMO MINI VAN 04.2011 - 10.2015",
          options: [
            "0.9L/Diesel"
          ]
        },
        {
          generation: "MAXXIMO PLUS 03.2013 - 10.2015",
          options: [
            "0.9L/Diesel",
            "0.9L/Petrol/CNG"
          ]
        }
      ]
    },
    {
      id: 20,
      name: "MAHINDRA NUVOSPORT",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/6037cb3.webp",
      years: "04.2016 - 06.2018",
      link: "/vehicles/mahindra-278/nuvosport-12139/",
      modifications: [
        {
          generation: "NUVOSPORT 04.2016 - 06.2018",
          options: [
            "1.5L N4/Diesel/BS4",
            "1.5L N4+/Diesel/BS4",
            "1.5L N6/Diesel/BS4",
            "1.5L N6 AMT/Diesel/BS4",
            "1.5L N8/Diesel/BS4",
            "1.5L N8 AMT/Diesel/BS4"
          ]
        }
      ]
    },
    {
      id: 21,
      name: "MAHINDRA QUANTO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/a957080.webp",
      years: "10.2012 - 03.2016",
      link: "/vehicles/mahindra-278/quanto-11285/",
      modifications: [
        {
          generation: "QUANTO 10.2012 - 03.2016",
          options: [
            "1.5L C2/Diesel/BS4",
            "1.5L C4/Diesel/BS4",
            "1.5L C6/Diesel/BS4",
            "1.5L C8/Diesel/BS4"
          ]
        }
      ]
    },
    {
      id: 22,
      name: "MAHINDRA REXTON",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/rrweb_569e09437f5a2.webp",
      years: "06.2012 - 12.2018",
      link: "/vehicles/mahindra-278/rexton-11956/",
      modifications: [
        {
          generation: "REXTON 06.2012 - 12.2018",
          options: [
            "2.7L RX5/Diesel/BS4",
            "2.7L RX6/Diesel/BS4",
            "2.7L RX7/Diesel/BS4"
          ]
        }
      ]
    },
    {
      id: 23,
      name: "MAHINDRA SAVARI",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/6e3f572.webp",
      years: "10.2008 - now",
      link: "/vehicles/mahindra-278/savari-11279/",
      modifications: [
        {
          generation: "SAVARI 10.2008 - now",
          options: ["2.5L/Diesel"]
        }
      ]
    },
    {
      id: 24,
      name: "MAHINDRA SCORPIO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/6121de7.webp",
      years: "06.2002 - now",
      link: "/vehicles/mahindra-278/scorpio-11280/",
      modifications: [
        {
          generation: "SCORPIO 1ST GEN 06.2002 - 03.2006",
          options: [
            "2.2L 2WD MT/Petrol/BS1",
            "2.6L 2WD MT/Diesel/117h.p./BS1"
          ]
        },
        {
          generation: "SCORPIO 1ST GEN F/L 04.2006 - 03.2008",
          options: [
            "2.2L VLX 2WD MT/Diesel/BS2",
            "2.5L 2WD MT/Diesel/BS2",
            "2.6L SLX 2WD MT/Diesel/BS2"
          ]
        },
        {
          generation: "SCORPIO 2ND GEN 04.2008 - 09.2014",
          options: [
            "2.2L LX 2WD MT/Diesel/BS3",
            "2.2L SLE 2WD MT/Diesel/BS3",
            "2.2L VLX 2WD MT/Diesel/BS3",
            "2.5L EX 2WD MT/Diesel/BS3"
          ]
        },
        {
          generation: "SCORPIO 3RD GEN 09.2014 - 11.2017",
          options: [
            "2.0L S10 2WD MT/Diesel/BS4",
            "2.2L S10 2WD AT/Diesel/BS4",
            "2.2L S10 2WD MT/Diesel/BS4",
            "2.2L S4/S4+ 2WD MT/Diesel/BS4",
            "2.2L S6/S6+ 2WD MT/Diesel/BS4",
            "2.2L S8 2WD MT/Diesel/BS4",
            "2.5L S2 2WD MT/Diesel/BS4"
          ]
        },
        {
          generation: "SCORPIO 3RD GEN F/L 12.2017 - now",
          options: [
            "2.2L CLASSIC S 2WD MT/Diesel/BS6",
            "2.2L CLASSIC S11 2WD MT/Diesel/BS6",
            "2.2L CLASSIC S5 2WD MT/Diesel/BS6",
            "2.2L S11 2WD MT/Diesel/140h.p./BS4",
            "2.2L S11 2WD MT/Diesel/140h.p./BS6",
            "2.2L S3+ 2WD MT/Diesel/BS6",
            "2.2L S5 2WD MT/Diesel/120h.p./BS4",
            "2.2L S5 2WD MT/Diesel/140h.p./BS6",
            "2.2L S7 2WD MT/Diesel/120h.p./BS4",
            "2.2L S7 2WD MT/Diesel/140h.p./BS4",
            "2.2L S7 2WD MT/Diesel/140h.p./BS6",
            "2.2L S9 2WD MT/Diesel/140h.p./BS4",
            "2.2L S9 2WD MT/Diesel/140h.p./BS6",
            "2.5L S3 2WD MT/Diesel/BS4"
          ]
        },
        {
          generation: "SCORPIO-N 06.2022 - now",
          options: [
            "2.0L Z2 2WD MT/Petrol/BS6.2",
            "2.0L Z4 2WD AT/Petrol/200h.p./BS6",
            "2.0L Z4 2WD AT/Petrol/200h.p./BS6.2",
            "2.0L Z4 2WD MT/Petrol/200h.p./BS6",
            "2.0L Z4 2WD MT/Petrol/200h.p./BS6.2",
            "2.0L Z8 2WD AT/Petrol/BS6.2",
            "2.0L Z8 2WD MT/Petrol/BS6.2",
            "2.0L Z8L 6S 2WD AT/Petrol/BS6.2",
            "2.0L Z8L 6S 2WD MT/Petrol/BS6.2",
            "2.0L Z8L 7S 2WD AT/Petrol/BS6.2",
            "2.0L Z8L 7S 2WD MT/Petrol/BS6.2",
            "2.0L Z8S 2WD AT/Petrol/BS6.2",
            "2.0L Z8S 2WD MT/Petrol/BS6.2",
            "2.0L Z8T 2WD AT/Petrol/BS6.2",
            "2.0L Z8T 2WD MT/Petrol/BS6.2",
            "2.2L Z2 2WD MT/Diesel/BS6.2",
            "2.2L Z4 2WD AT/Diesel/132h.p./BS6",
            "2.2L Z4 2WD AT/Diesel/172h.p./BS6.2",
            "2.2L Z4 2WD MT/Diesel/BS6.2",
            "2.2L Z4 4WD MT/Diesel/172h.p./BS6",
            "2.2L Z4 4WD MT/Diesel/172h.p./BS6.2",
            "2.2L Z6 2WD AT/Diesel/BS6",
            "2.2L Z6 2WD MT/Diesel/BS6.2",
            "2.2L Z8 2WD AT/Diesel/BS6.2",
            "2.2L Z8 2WD MT/Diesel/BS6.2",
            "2.2L Z8 4WD AT/Diesel/BS6.2",
            "2.2L Z8 4WD MT/Diesel/BS6.2",
            "2.2L Z8L 6S 2WD AT/Diesel/172h.p./BS6",
            "2.2L Z8L 6S 2WD AT/Diesel/172h.p./BS6.2",
            "2.2L Z8L 6S 2WD MT/Diesel/172h.p./BS6",
            "2.2L Z8L 6S 2WD MT/Diesel/172h.p./BS6.2",
            "2.2L Z8L 7S 2WD AT/Diesel/172h.p./BS6",
            "2.2L Z8L 7S 2WD AT/Diesel/172h.p./BS6.2",
            "2.2L Z8L 7S 2WD MT/Diesel/172h.p./BS6",
            "2.2L Z8L 7S 2WD MT/Diesel/172h.p./BS6.2",
            "2.2L Z8L 7S 4WD AT/Diesel/172h.p./BS6",
            "2.2L Z8L 7S 4WD AT/Diesel/172h.p./BS6.2",
            "2.2L Z8L 7S 4WD MT/Diesel/172h.p./BS6",
            "2.2L Z8L 7S 4WD MT/Diesel/172h.p./BS6.2",
            "2.2L Z8S 2WD AT/Diesel/BS6.2",
            "2.2L Z8S 2WD MT/Diesel/BS6.2",
            "2.2L Z8T 2WD AT/Diesel/BS6.2",
            "2.2L Z8T 2WD MT/Diesel/BS6.2",
            "2.2L Z8T 4WD AT/Diesel/BS6.2",
            "2.2L Z8T 4WD MT/Diesel/BS6.2"
          ]
        },
        {
          generation: "SCORPIO-N CARBON EDITION 02.2025 - now",
          options: [
            "2.0L Z8L 2WD AT/Petrol/BS6.2",
            "2.0L Z8L 2WD MT/Petrol/BS6.2",
            "2.0L Z8T 2WD AT/Petrol/BS6.2",
            "2.0L Z8T 2WD MT/Petrol/BS6.2",
            "2.2L Z8L 2WD AT/Diesel/BS6.2",
            "2.2L Z8L 2WD MT/Diesel/BS6.2",
            "2.2L Z8L 4WD AT/Diesel/BS6.2",
            "2.2L Z8L 4WD MT/Diesel/BS6.2",
            "2.2L Z8T 2WD AT/Diesel/BS6.2",
            "2.2L Z8T 2WD MT/Diesel/BS6.2",
            "2.2L Z8T 4WD AT/Diesel/BS6.2",
            "2.2L Z8T 4WD MT/Diesel/BS6.2"
          ]
        }
      ]
    },
    {
      id: 25,
      name: "MAHINDRA SCORPIO GETAWAY",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/a353376.webp",
      years: "06.2007 - 12.2018",
      link: "/vehicles/mahindra-278/scorpio_getaway-12128/",
      modifications: [
        {
          generation: "SCORPIO GETAWAY VER 1 06.2007 - 09.2008",
          options: ["2.6L Diesel BS3"]
        },
        {
          generation: "SCORPIO GETAWAY VER 2 09.2008 - 04.2014",
          options: ["2.6L Diesel BS3"]
        },
        {
          generation: "SCORPIO GETAWAY SC 04.2014 - 12.2018",
          options: ["2.2L Diesel BS4"]
        }
      ]
    }, {
      id: 26,
      name: "MAHINDRA SUPRO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/68c5c36.webp",
      years: "10.2015 - now",
      link: "/vehicles/mahindra-278/supro-12145/",
      modifications: [
        {
          generation: "SUPRO 10.2015 - now",
          options: [
            "0.9L CARGO VAN Diesel BS4",
            "0.9L LX Diesel BS6",
            "0.9L LX AMBULANCE Diesel 26h.p. BS4",
            "0.9L LX AMBULANCE Diesel 26h.p. BS6",
            "0.9L LX MT ABS Diesel BS4",
            "0.9L LX MT NON-ABS Diesel BS4",
            "0.9L SUPRO MINIVAN Diesel 26h.p. BS4",
            "0.9L SUPRO MINIVAN Petrol CNG BS4",
            "0.9L SUPRO MINIVAN Diesel 26h.p. BS6",
            "0.9L SUPRO MINIVAN SHT Diesel BS6",
            "0.9L SUPRO MINIVAN SHT VX NA Diesel BS6",
            "0.9L SUPRO MINIVAN VX NA Diesel BS6",
            "0.9L VX Diesel BS6",
            "0.9L VX 5S Diesel BS4",
            "0.9L VX MT ABS Diesel BS4",
            "0.9L VX MT NON-ABS Diesel BS4",
            "0.9L ZX Diesel 26h.p. BS4",
            "0.9L ZX Diesel 26h.p. BS6",
            "0.9L ZX 5S Diesel BS4",
            "0.9L ZX AMBULANCE Diesel 26h.p. BS4",
            "0.9L ZX AMBULANCE Diesel 26h.p. BS6",
            "14.4 kWh eSUPRO CARGO Electric BS4",
            "14.4 kWh eSUPRO PASSENGER Electric BS4"
          ]
        }
      ]
    },
    {
      id: 27,
      name: "MAHINDRA SUPRO TRUCK",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/9761f0b.webp",
      years: "10.2015 - now",
      link: "/vehicles/mahindra-278/supro_mini_truck-12147/",
      modifications: [
        {
          generation: "SUPRO TRUCK 10.2015 - now",
          options: [
            "0.9L MAXITRUCK HIGH DECK T2/Diesel/BS6",
            "0.9L MAXITRUCK T2/Diesel/26h.p./BS4",
            "0.9L MAXITRUCK T2/Diesel/26h.p./BS6",
            "0.9L MAXITRUCK T2 - (CBC)/Diesel/BS4",
            "0.9L MAXITRUCK T2 - (RFS)/Diesel/BS4",
            "0.9L MAXITRUCK T2 - (RFS) (CBC)/Diesel/BS4",
            "0.9L MAXITRUCK T4/Diesel/26h.p./BS4",
            "0.9L MAXITRUCK T4/Diesel/26h.p./BS6",
            "0.9L MAXITRUCK T4-(RFS)/Diesel/BS4",
            "0.9L MAXITRUCK T6/Diesel/26h.p./BS4",
            "0.9L MAXITRUCK T6/Diesel/26h.p./BS6",
            "0.9L MAXITRUCK T6 - (RFS)/Diesel/BS4",
            "0.9L MINITRUCK - (RFS)/Diesel/BS4",
            "0.9L MINITRUCK - (RFS)/Petrol/CNG/BS4",
            "0.9L MINITRUCK - (RFS) (CBC)/Diesel/BS4",
            "0.9L PROFITTRUCK EXCEL/Diesel/BS6",
            "0.9L PROFITTRUCK EXCEL/Petrol/CNG/BS6",
            "0.9L PROFITTRUCK MAXI HIGH DECK LX/Diesel/BS6",
            "0.9L PROFITTRUCK MAXI LX/Diesel/BS6",
            "0.9L PROFITTRUCK MAXI VX/Diesel/BS6",
            "0.9L PROFITTRUCK MAXI ZX/Diesel/BS6",
            "0.9L PROFITTRUCK MINI LX/Diesel/BS6",
            "0.9L PROFITTRUCK MINI VX NA/Diesel/BS6",
            "0.9L SUPRO DUO/Petrol/CNG/BS6",
            "0.9L SUPRO MINITRUCK/Diesel/26h.p./BS4",
            "0.9L SUPRO MINITRUCK/Petrol/CNG/26h.p./BS4",
            "0.9L SUPRO MINITRUCK/Diesel/45h.p./BS6",
            "0.9L SUPRO MINITRUCK/Petrol/CNG/45h.p./BS6",
          ],
        },
      ],
    },
    {
      id: 28,
      name: "MAHINDRA THAR",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/103cfae.webp",
      years: "10.2010 - now",
      link: "/vehicles/mahindra-278/thar-11281/",
      modifications: [
        {
          generation: "THAR 1ST GEN 10.2010 - 07.2015",
          options: [
            "2.5L CRDe MT/Diesel/BS3",
            "2.5L MT/Diesel/BS3",
          ],
        },
        {
          generation: "THAR 1ST GEN F/L 07.2015 - 08.2020",
          options: [
            "2.5L DI 4WD MT/Diesel/BS4",
            "2.5L DI MT/Diesel/BS4",
            "2.5L MT/Diesel/BS4",
          ],
        },
        {
          generation: "THAR 2ND GEN 08.2020 - 09.2025",
          options: [
            "1.5L AX 4S HT RWD MT/Diesel/BS6.2",
            "1.5L LX 4S HT MT/Diesel/BS6.2",
            "2.0L AX 4S CT 4WD MT/Petrol/BS6",
            "2.0L AX 4S CT(O) 4WD MT/Petrol/BS6.2",
            "2.0L AX 6S ST 4WD MT/Petrol/BS6",
            "2.0L AX 6S ST(O) 4WD MT/Petrol/BS6",
            "2.0L LX 4S CT 4WD AT/Petrol/BS6",
            "2.0L LX 4S HT 4WD AT/Petrol/BS6",
            "2.0L LX 4S HT 4WD MT/Petrol/BS6",
            "2.0L LX 4S HT RWD AT/Petrol/BS6.2",
            "2.2L AX 4S CT 4WD MT/Diesel/BS6",
            "2.2L AX 4S HT 4WD MT/Diesel/BS6",
            "2.2L AX 6S ST 4WD MT/Diesel/BS6",
            "2.2L LX 4S CT 4WD AT/Diesel/BS6",
            "2.2L LX 4S CT 4WD MT/Diesel/BS6",
            "2.2L LX 4S HT 4WD AT/Diesel/BS6",
            "2.2L LX 4S HT 4WD MT/Diesel/BS6",
          ],
        },
        {
          generation: "THAR EARTH EDITION 02.2024 - now",
          options: [
            "2.0L LX HT 4WD AT/Petrol/BS6.2",
            "2.0L LX HT 4WD MT/Petrol/BS6.2",
            "2.2L LX HT 4WD AT/Diesel/BS6.2",
            "2.2L LX HT 4WD MT/Diesel/BS6.2",
          ],
        },
        {
          generation: "THAR ROXX 08.2024 - now",
          options: [
            "2.0L AX3L RWD AT/Petrol/BS6.2",
            "2.0L AX5L RWD AT/Petrol/BS6.2",
            "2.0L AX7L RWD AT/Petrol/BS6.2",
            "2.0L AX7L RWD MT/Petrol/BS6.2",
            "2.0L MX1 RWD MT/Petrol/BS6.2",
            "2.0L MX3 RWD AT/Petrol/BS6.2",
            "2.0L MX5 RWD AT/Petrol/BS6.2",
            "2.0L MX5 RWD MT/Petrol/BS6.2",
            "2.2L AX3L RWD AT/Diesel/BS6.2",
            "2.2L AX5L 4WD AT/Diesel/BS6.2",
            "2.2L AX5L RWD AT/Diesel/BS6.2",
            "2.2L AX7L 4WD AT/Diesel/BS6.2",
            "2.2L AX7L 4WD MT/Diesel/BS6.2",
            "2.2L AX7L RWD AT/Diesel/BS6.2",
            "2.2L AX7L RWD MT/Diesel/BS6.2",
            "2.2L MX1 RWD MT/Diesel/BS6.2",
            "2.2L MX3 4WD MT/Diesel/BS6.2",
            "2.2L MX3 RWD AT/Diesel/BS6.2",
            "2.2L MX3 RWD MT/Diesel/BS6.2",
            "2.2L MX5 4WD AT/Diesel/BS6.2",
            "2.2L MX5 4WD MT/Diesel/BS6.2",
            "2.2L MX5 RWD AT/Diesel/BS6.2",
            "2.2L MX5 RWD MT/Diesel/BS6.2",
          ],
        },
        {
          generation: "THAR 2ND GEN F/L 10.2025 - now",
          options: [
            "1.5L AXT 4S HT RWD MT/Diesel/BS6.2",
            "1.5L LXT 4S HT RWD MT/Diesel/BS6.2",
            "2.0L LXT 4S HT 4WD AT/Petrol/BS6.2",
            "2.0L LXT 4S HT 4WD MT/Petrol/BS6.2",
            "2.0L LXT 4S HT RWD AT/Petrol/BS6.2",
            "2.2L LXT 4S HT 4WD AT/Diesel/BS6.2",
            "2.2L LXT 4S HT 4WD MT/Diesel/BS6.2",
          ],
        },
      ],
    },
    {
      id: 29,
      name: "MAHINDRA TREO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/fcc4e0b.webp",
      years: "10.2020 - now",
      link: "/vehicles/mahindra-278/treo-12668/",
      modifications: [
        {
          generation: "TREO 10.2020 - now",
          options: [
            "3.69 kWh YAARI HARD TOP/Electric",
            "3.69 kWh YAARI SOFT TOP/Electric",
            "7.37 kWh HARD TOP/Electric",
            "7.37 kWh SOFT TOP/Electric",
          ],
        },
      ],
    },
    {
      id: 30,
      name: "MAHINDRA TUV 300",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/687dc61.webp",
      years: "09.2015 - 07.2021",
      link: "/vehicles/mahindra-278/tuv300-11929/",
      modifications: [
        {
          generation: "TUV 300 09.2015 - 06.2020",
          options: [
            "1.5L T10/Diesel/100h.p./BS4",
            "1.5L T10 AMT/Diesel/BS4",
            "1.5L T10(O)/Diesel/BS4",
            "1.5L T4/Diesel/BS4",
            "1.5L T4+/Diesel/100h.p./BS4",
            "1.5L T6/Diesel/BS4",
            "1.5L T6+/Diesel/100h.p./BS4",
            "1.5L T6+ AMT/Diesel/BS4",
            "1.5L T8/Diesel/100h.p./BS4",
            "1.5L T8 AMT/Diesel/BS4",
          ],
        },
        {
          generation: "TUV 300 LWB 06.2018 - 07.2021",
          options: [
            "2.2L P4/Diesel/BS4",
            "2.2L P6/Diesel/BS4",
            "2.2L P8/Diesel/BS4",
          ],
        },
      ],
    },
    {
      id: 31,
      name: "MAHINDRA VERITO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/mahindra_verito_563cb1ff56de8.webp",
      years: "01.2011 - 08.2018",
      link: "/vehicles/mahindra-278/verito-11282/",
      modifications: [
        {
          generation: "VERITO 01.2011 - 05.2012",
          options: [
            "1.4L G2/Petrol",
            "1.4L G4/Petrol",
            "1.4L G6/Petrol",
            "1.5L D2/Diesel",
            "1.5L D4/Diesel",
            "1.5L D6/Diesel",
          ],
        },
        {
          generation: "VERITO F/L 06.2012 - 08.2018",
          options: [
            "1.5L D4/Diesel/BS4",
            "1.5L D6/Diesel/BS4",
          ],
        },
        {
          generation: "VERITO EXECUTIVE 01.2013 - 08.2018",
          options: [
            "1.5L EXE/Diesel",
          ],
        },
        {
          generation: "VERITO VIBE 06.2013 - 09.2016",
          options: [
            "1.5L D2/Diesel/BS4",
            "1.5L D4/Diesel/BS4",
            "1.5L D6/Diesel/BS4",
          ],
        },
      ],
    },
    {
      id: 32,
      name: "MAHINDRA XEV 9e",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/0dab071.webp",
      years: "11.2024 - now",
      link: "/vehicles/mahindra-278/xev_9e-12884/",
      modifications: [
        {
          generation: "XEV 9e 11.2024 - now",
          options: [
            "59 Kwh PACK ONE/Electric",
            "59 Kwh PACK THREE SELECT/Electric",
            "59 Kwh PACK TWO/Electric",
            "79 Kwh PACK THREE/Electric",
            "79 KWh PACK TWO/Electric",
          ],
        },
      ],
    },
    {
      id: 33,
      name: "MAHINDRA XUV 300",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/f07a5b1.webp",
      years: "02.2019 - 03.2024",
      link: "/vehicles/mahindra-278/xuv_300-12315/",
      modifications: [
        {
          generation: "XUV300 02.2019 - 03.2024",
          options: [
            "1.2L W2/Petrol/BS6",
            "1.2L W4/Petrol/110h.p./BS4",
            "1.2L W4/Petrol/110h.p./BS6",
            "1.2L W4 TGDI/Petrol/BS6",
            "1.2L W6/Petrol/110h.p./BS4",
            "1.2L W6/Petrol/110h.p./BS6",
            "1.2L W6 AMT/Petrol/BS6",
            "1.2L W6 TGDI/Petrol/BS6",
            "1.2L W8/Petrol/110h.p./BS4",
            "1.2L W8/Petrol/110h.p./BS6",
            "1.2L W8 TGDI/Petrol/BS6",
            "1.2L W8(O)/Petrol/110h.p./BS4",
            "1.2L W8(O)/Petrol/110h.p./BS6",
            "1.2L W8(O) AMT/Petrol/BS6",
            "1.2L W8(O) TGDI/Petrol/BS6",
            "1.5L W4/Diesel/115h.p./BS4",
            "1.5L W4/Diesel/115h.p./BS6",
            "1.5L W6/Diesel/115h.p./BS4",
            "1.5L W6/Diesel/115h.p./BS6",
            "1.5L W6 AMT/Diesel/115h.p./BS4",
            "1.5L W6 AMT/Diesel/115h.p./BS6",
            "1.5L W8/Diesel/115h.p./BS4",
            "1.5L W8/Diesel/115h.p./BS6",
            "1.5L W8 AMT/Diesel/115h.p./BS4",
            "1.5L W8 AMT/Diesel/115h.p./BS6",
            "1.5L W8(O)/Diesel/115h.p./BS4",
            "1.5L W8(O)/Diesel/115h.p./BS6",
            "1.5L W8(O) AMT/Diesel/115h.p./BS4",
            "1.5L W8(O) AMT/Diesel/115h.p./BS6",
          ],
        },
      ],
    },
    {
      id: 34,
      name: "MAHINDRA XUV 3XO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/7fb874a.webp",
      years: "04.2024 - now",
      link: "/vehicles/mahindra-278/xuv_3xo-12814/",
      modifications: [
        {
          generation: "XUV 3XO 04.2024 - now",
          options: [
            "1.2L AX5/Petrol/BS6.2",
            "1.2L AX5 AT/Petrol/BS6.2",
            "1.2L AX5L/Petrol/BS6.2",
            "1.2L AX5L AT/Petrol/BS6.2",
            "1.2L AX7/Petrol/BS6.2",
            "1.2L AX7 AT/Petrol/BS6.2",
            "1.2L AX7L/Petrol/BS6.2",
            "1.2L AX7L AT/Petrol/BS6.2",
            "1.2L MX1/Petrol/BS6.2",
            "1.2L MX2 PRO/Petrol/BS6.2",
            "1.2L MX2 PRO AT/Petrol/BS6.2",
            "1.2L MX3/Petrol/BS6.2",
            "1.2L MX3 AT/Petrol/BS6.2",
            "1.2L MX3 PRO/Petrol/BS6.2",
            "1.2L MX3 PRO AT/Petrol/BS6.2",
            "1.5L AX5/Diesel/BS6.2",
            "1.5L AX5 AT/Diesel/BS6.2",
            "1.5L AX7/Diesel/BS6.2",
            "1.5L AX7 AT/Diesel/BS6.2",
            "1.5L AX7L/Diesel/BS6.2",
            "1.5L MX2/Diesel/BS6.2",
            "1.5L MX2 PRO/Diesel/BS6.2",
            "1.5L MX3/Diesel/BS6.2",
            "1.5L MX3 AT/Diesel/BS6.2",
            "1.5L MX3 PRO/Diesel/BS6.2",
          ],
        },
      ],
    },
    {
      id: 35,
      name: "MAHINDRA XUV 400",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/b38a5af.webp",
      years: "01.2023 - now",
      link: "/vehicles/mahindra-278/xuv_400-12622/",
      modifications: [
        {
          generation: "XUV 400 EV 01.2023 - now",
          options: [
            "34.5 kWh EC/Electric",
            "39.4 kWh EL/Electric",
          ],
        },
      ],
    },
    {
      id: 36,
      name: "MAHINDRA XUV 500",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/f0ceb0b.webp",
      years: "10.2011 - 11.2022",
      link: "/vehicles/mahindra-278/xuv500-11283/",
      modifications: [
        {
          generation: "XUV500 1ST GEN 10.2011 - 07.2015",
          options: [
            "2.2L W4 MT/Diesel/BS4",
            "2.2L W6 MT/Diesel/BS4",
            "2.2L W8 AWD MT/Diesel/BS4",
            "2.2L W8 MT/Diesel/BS4",
            "2.2L W8 XCLUSIVE MT/Diesel/BS4"
          ]
        },
        {
          generation: "XUV500 2ND GEN 07.2015 - 06.2018",
          options: [
            "2.2L G AT/Petrol/BS4",
            "2.2L W10 AT/Diesel/BS4",
            "2.2L W10 AWD AT/Diesel/BS4",
            "2.2L W10 AWD MT/Diesel/BS4",
            "2.2L W10 MT/Diesel/BS4",
            "2.2L W4 MT/Diesel/BS4",
            "2.2L W6 AT/Diesel/BS4",
            "2.2L W6 MT/Diesel/BS4",
            "2.2L W8 AT/Diesel/BS4",
            "2.2L W8 AWD AT/Diesel/BS4",
            "2.2L W8 AWD MT/Diesel/BS4",
            "2.2L W8 MT/Diesel/BS4",
            "2.2L W9 AT/Diesel/BS4",
            "2.2L W9 MT/Diesel/BS4"
          ]
        },
        {
          generation: "XUV500 2ND GEN F/L 07.2018 - 11.2022",
          options: [
            "2.2L G AT/Petrol/BS4",
            "2.2L W11 AT/Diesel/155h.p./BS4",
            "2.2L W11 AT/Diesel/155h.p./BS6",
            "2.2L W11 AWD AT/Diesel/BS4",
            "2.2L W11 AWD MT/Diesel/BS4",
            "2.2L W11 MT/Diesel/155h.p./BS4",
            "2.2L W11 MT/Diesel/155h.p./BS6",
            "2.2L W3 MT/Diesel/BS4",
            "2.2L W5 MT/Diesel/155h.p./BS4",
            "2.2L W5 MT/Diesel/155h.p./BS6",
            "2.2L W7 AT/Diesel/155h.p./BS4",
            "2.2L W7 AT/Diesel/155h.p./BS6",
            "2.2L W7 MT/Diesel/155h.p./BS4",
            "2.2L W7 MT/Diesel/155h.p./BS6",
            "2.2L W9 AT/Diesel/155h.p./BS4",
            "2.2L W9 AT/Diesel/155h.p./BS6",
            "2.2L W9 MT/Diesel/BS4",
            "2.2L W9 MT (BS-VI)/Diesel/BS6"
          ]
        }
      ]
    },
    {
      id: 37,
      name: "Mahindra XUV700",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/79827e7.webp",
      years: "08.2021 - now",
      link: "/vehicles/mahindra-278/xuv_700-12428/",
      modifications: [
        {
          generation: "XUV700 08.2021 - now",
          options: [
            "2.0L AX3 5S/Petrol/BS6",
            "2.0L AX3 AT 5S/Petrol/BS6",
            "2.0L AX5 5S/Petrol/BS6",
            "2.0L AX5 AT 5S/Petrol/BS6",
            "2.0L AX7 6S/Petrol/BS6.2",
            "2.0L AX7 7S/Petrol/197h.p./BS6",
            "2.0L AX7 7S/Petrol/197h.p./BS6.2",
            "2.0L AX7 AT 6S/Petrol/BS6.2",
            "2.0L AX7 AT 7S/Petrol/197h.p./BS6",
            "2.0L AX7 AT 7S/Petrol/197h.p./BS6.2",
            "2.0L AX7 C AT 7S/Petrol/BS6",
            "2.0L AX7 L AT 6S/Petrol/BS6.2",
            "2.0L AX7 L AT 7S/Petrol/197h.p./BS6",
            "2.0L AX7 L AT 7S/Petrol/197h.p./BS6.2",
            "2.0L AX7 L AT 7S BLAZE/Petrol/BS6.2",
            "2.0L AX7 T 7S/Petrol/BS6",
            "2.0L AX7 T AT 7S/Petrol/BS6",
            "2.0L MX 5S/Petrol/BS6",
            "2.0L MX AT 5S/Petrol/BS6",
            "2.2L AX3 5S/Diesel/BS6",
            "2.2L AX3 AT 5S/Diesel/BS6",
            "2.2L AX5 5S/Diesel/BS6",
            "2.2L AX5 AT 5S/Diesel/BS6",
            "2.2L AX7 6S/Diesel/BS6.2",
            "2.2L AX7 7S/Diesel/152h.p./BS6",
            "2.2L AX7 7S/Diesel/182h.p./BS6.2",
            "2.2L AX7 AT 6S/Diesel/BS6.2",
            "2.2L AX7 AT 7S/Diesel/182h.p./BS6",
            "2.2L AX7 AT 7S/Diesel/182h.p./BS6.2",
            "2.2L AX7 AT AWD 7S/Diesel/BS6.2",
            "2.2L AX7 C AT 7S/Diesel/BS6",
            "2.2L AX7 L 6S/Diesel/BS6.2",
            "2.2L AX7 L 7S/Diesel/152h.p./BS6",
            "2.2L AX7 L 7S/Diesel/182h.p./BS6.2",
            "2.2L AX7 L 7S BLAZE/Diesel/BS6.2",
            "2.2L AX7 L AT 6S/Diesel/BS6.2",
            "2.2L AX7 L AT 7S/Diesel/182h.p./BS6",
            "2.2L AX7 L AT 7S/Diesel/182h.p./BS6.2",
            "2.2L AX7 L AT 7S BLAZE/Diesel/BS6.2",
            "2.2L AX7 L AT AWD 7S/Diesel/BS6.2",
            "2.2L AX7 T 7S/Diesel/BS6",
            "2.2L AX7 T AT 7S/Diesel/BS6",
            "2.2L MX 5S/Diesel/BS6"
          ],
        },
      ],
    },
    {
      id: 38,
      name: "Mahindra Xylo",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/0139c37.webp",
      years: "01.2009 - 05.2020",
      link: "/vehicles/mahindra-278/xylo-11284/",
      modifications: [
        {
          generation: "XYLO 1ST GEN 01.2009 - 02.2012",
          options: [
            "2.5L D2 MT/Diesel/BS3",
            "2.5L E2 MT/Diesel/BS3",
            "2.5L E4 MT/Diesel/BS3",
            "2.5L E6 MT/Diesel/BS3",
            "2.5L E8 MT/Diesel/BS3"
          ],
        },
        {
          generation: "XYLO 2ND GEN 02.2012 - 07.2014",
          options: [
            "2.2L E9 MT/Diesel/BS4",
            "2.2L H4/E4 MT/Diesel/BS4",
            "2.2L H8/E8 MT/Diesel/BS4",
            "2.2L MT/Diesel/BS4",
            "2.5L D2 MT/Diesel/BS4",
            "2.5L D2 MT REFRESH/Diesel/BS4",
            "2.5L D4 MT/Diesel/112h.p./BS4",
            "2.5L E4 MT/Diesel/BS4",
            "2.5L E8 MT/Diesel/BS4"
          ],
        },
        {
          generation: "XYLO 3RD GEN 07.2014 - 05.2020",
          options: [
            "2.2L H4 MT/Diesel/BS4",
            "2.2L H8 MT/Diesel/BS4",
            "2.2L H9 MT/Diesel/BS4",
            "2.5L D2 MT/Diesel/BS4",
            "2.5L D4 MT/Diesel/BS4"
          ],
        },
      ],
    },
    {
      id: 39,
      name: "Mahindra Zor",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/e4fa93a.webp",
      years: "10.2020 - now",
      link: "/vehicles/mahindra-278/zor-12670/",
      modifications: [
        {
          generation: "ZOR 10.2020 - now",
          options: [
            "12kW GRAND PU/Electric",
            "7.37 kWh GRAND DV/Electric"
          ],
        },
      ],
    },









];

export const Mahindra = () => {
  const link = getOriPartsLink(4, "MAHINDRA");

  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Use exported models
  const models = mahindraModels;

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
    <section className="min-h-screen py-6">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8">
        <VehicleBreadcrumbs />

        {/* <h1 className="text-3xl px-2 font-bold text-gray-800 uppercase mb-6">
          Mahindra
        </h1> */}
        <img
          src={mahindra1logo}
          alt="Mahindra"
          className="h-16 sm:h-20 w-auto object-contain transition"
        />
        <div className="flex justify-center items-center w-full">
          <img
            // src={mahiBanner}
            src="https://boodmo.com/media/images/articles/2eb10ea.webp"
            alt="Mahindra Vehicle Banner"
            className="py-4 sm:py-6 w-full max-w-5xl rounded-lg shadow-md object-cover transition-all duration-500 hover:scale-[1.02]"
          />
        </div>

        {/* OEM Catalogue Button */}
        <a
          href={link}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-block border border-gray-600 mb-2 text-black text-xs sm:text-sm rounded-md px-3 py-2 sm:px-4 sm:py-2 transition-all duration-300 hover:bg-red-400"
        >
          View OEM Catalogue
        </a>
      </div>

      {/* Brand Info Section */}
      <section className="max-w-7xl mx-auto brand-info__desc mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-200">
          <p>
            Mahindra is a leading automobile manufacturer known for its
            reliability and innovation. Established in YEAR, it continues to
            produce a diverse range of models suitable for Indian conditions.
          </p>
          <p>
            The company is recognized for its strong after-sales network and
            commitment to customer satisfaction.
          </p>
          <p>
            Spare parts for Mahindra cars are available at{" "}
            <a
              href="https://boodmo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              sparelo
            </a>
            .
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
                to={`/vehicles/mahindra/${model.id}`}
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


      {/* ---------mahindra parts and accessories------------- */}
      <section className="max-w-7xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200">
            MAHINDRA Parts and{" "}
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
