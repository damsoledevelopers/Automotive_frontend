import React, { useState } from "react";
import { Link } from "react-router-dom";
import VehicleBreadcrumbs from "./VehicleBreadcrumbs";
import Article_Review from "../Article_Review";
import { getOriPartsLink } from "../../utils/oripartsBackUrl";

// 🔹 Vehicle Models - Exported for use in other components
export const hyundaiModels = [
    {
      id: 1,
      name: "HYUNDAI ACCENT",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/0d99d61.webp",
      years: "01.1999 - 12.2012",
      link: "/vehicles/hyundai-212/accent-11250/",
      modifications: [
        {
          generation: "ACCENT/ VIVA 01.1999 - 12.2012",
          options: [
            "1.5L GLE MT/Petrol",
            "1.5L GLE MT/Diesel",
            "1.5L GLS MT/Petrol",
            "1.5L GLX MT/Petrol",
            "1.5L GVS MT/Petrol",
            "1.5L MT/Petrol/94h.p.",
            "1.5L MT/Petrol/94h.p.",
            "1.5L VIVA MT/Diesel",
            "1.6L MT/Petrol"
          ],
        },
      ],
    },

    {
      id: 2,
      name: "HYUNDAI ALCAZAR",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/1961952.webp",
      years: "06.2021 - now",
      link: "/vehicles/hyundai-212/alcazar-12423/",
      modifications: [
        {
          generation: "ALCAZAR 1ST GEN 06.2021 - 08.2023",
          options: [
            "1.5L PLATINUM MT 7S/Diesel/BS6",
            "1.5L PLATINUM(O) AT 7S/Diesel/BS6",
            "1.5L PRESTIGE MT 7S/Diesel/BS6",
            "1.5L SIGNATURE(O) AT 6S/Diesel/BS6",
            "1.5L SIGNATURE(O) AT 7S/Diesel/BS6",
            "2.0L PLATINUM MT 7S/Petrol/BS6",
            "2.0L PLATINUM(O) AT 6S/Petrol/BS6",
            "2.0L PRESTIGE MT 6S/Petrol/BS6",
            "2.0L PRESTIGE MT 7S/Petrol/BS6",
            "2.0L PRESTIGE(O) AT 6S/Petrol/BS6",
            "2.0L SIGNATURE MT 6S/Petrol/BS6",
            "2.0L SIGNATURE(O) AT 6S/Petrol/BS6",
            "2.0L SIGNATURE(O) AT 7S/Petrol/BS6",
          ],
        },
        {
          generation: "ALCAZAR 1ST GEN F/L 03.2023 - 08.2024",
          options: [
            "1.5L PLATINUM MT 7S/Diesel/BS6",
            "1.5L PLATINUM MT 7S/Petrol/BS6",
            "1.5L PLATINUM(O) DCT 7S/Petrol/BS6",
            "1.5L PRESTIGE EXECUTIVE MT 7S/Diesel/BS6",
            "1.5L PRESTIGE MT 7S/Petrol/BS6",
            "1.5L PRESTIGE MT 7S/Diesel/BS6",
            "1.5L PRESTIGE(O) AT 7S/Diesel/BS6",
            "1.5L SIGNATURE MT 6S/Diesel/BS6",
            "1.5L SIGNATURE(O) AT 6S/Diesel/BS6",
            "1.5L SIGNATURE(O) AT 7S/Diesel/BS6",
            "1.5L SIGNATURE(O) DCT 6S/Petrol/BS6",
            "1.5L SIGNATURE(O) DCT 7S/Petrol/BS6",
          ],
        },
        {
          generation: "ALCAZAR ADVENTURE EDITION 08.2023 - 08.2024",
          options: [
            "1.5L PLATINUM MT/Petrol/BS6",
            "1.5L PLATINUM MT/Diesel/BS6",
            "1.5L SIGNATURE(O) AT/Diesel/BS6",
            "1.5L SIGNATURE(O) DCT/Petrol/BS6",
          ],
        },
        {
          generation: "ALCAZAR 2ND GEN 09.2024 - now",
          options: [
            "1.5L EXECUTIVE MT 7S/Diesel/BS6.2",
            "1.5L EXECUTIVE MT 7S/Petrol/BS6.2",
            "1.5L PLATINUM AT 6S/Diesel/BS6.2",
            "1.5L PLATINUM AT 7S/Diesel/BS6.2",
            "1.5L PLATINUM DCT 6S/Petrol/BS6.2",
            "1.5L PLATINUM DCT 7S/Petrol/BS6.2",
            "1.5L PLATINUM MT 7S/Diesel/BS6.2",
            "1.5L PLATINUM MT 7S/Petrol/BS6.2",
            "1.5L PRESTIGE MT 7S/Petrol/BS6.2",
            "1.5L PRESTIGE MT 7S/Diesel/BS6.2",
            "1.5L SIGNATURE AT 6S/Diesel/BS6.2",
            "1.5L SIGNATURE AT 7S/Diesel/BS6.2",
            "1.5L SIGNATURE DCT 6S/Petrol/BS6.2",
            "1.5L SIGNATURE DCT 7S/Petrol/BS6.2",
          ],
        },
      ],
    },

    {
      id: 3,
      name: "HYUNDAI AURA",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/45556f7.webp",
      years: "01.2020 - now",
      link: "/vehicles/hyundai-212/aura-12375/",
      modifications: [
        {
          generation: "AURA 1ST GEN 01.2020 - 01.2023",
          options: [
            "1.0L SX+ MT/Petrol/BS6",
            "1.2L E MT/Petrol/BS6",
            "1.2L S AMT/Petrol/BS6",
            "1.2L S AMT/Diesel/BS6",
            "1.2L S MT/Petrol/BS6",
            "1.2L S MT/Petrol/CNG/BS6",
            "1.2L S MT/Diesel/BS6",
            "1.2L SX MT/Petrol/CNG/BS6",
            "1.2L SX MT/Petrol/BS6",
            "1.2L SX(O) MT/Diesel/BS6",
            "1.2L SX(O) MT/Petrol/BS6",
            "1.2L SX+ AMT/Petrol/BS6",
            "1.2L SX+ AMT/Diesel/BS6",
          ],
        },
        {
          generation: "AURA 1ST GEN F/L 01.2023 - now",
          options: [
            "1.2L CORPORATE AMT/Petrol/BS6.2",
            "1.2L CORPORATE MT/Petrol/BS6.2",
            "1.2L CORPORATE MT/Petrol/CNG/BS6.2",
            "1.2L E MT/Petrol/CNG/BS6.2",
            "1.2L E MT/Petrol/BS6.2",
            "1.2L S MT/Petrol/CNG/BS6.2",
            "1.2L S MT/Petrol/BS6.2",
            "1.2L SX MT/Petrol/CNG/BS6.2",
            "1.2L SX MT/Petrol/BS6.2",
            "1.2L SX(O) MT/Petrol/BS6.2",
            "1.2L SX+ AMT/Petrol/BS6.2",
          ],
        },
      ],
    },
    {
      id: 4,
      name: "HYUNDAI CRETA",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/27ab151.webp",
      years: "06.2015 - now",
      link: "/vehicles/hyundai-212/creta-11253/",
      modifications: [
        {
          generation: "CRETA 1ST GEN 06.2015 - 05.2018",
          options: [
            "1.4L E MT/Diesel/BS4",
            "1.4L S MT/Diesel/BS4",
            "1.4L S+ MT/Diesel/BS4",
            "1.6L E MT/Petrol/BS4",
            "1.6L E+ MT/Petrol/BS4",
            "1.6L S+ MT/Diesel/BS4",
            "1.6L SX MT/Diesel/BS4",
            "1.6L SX(O) MT/Diesel/BS4",
            "1.6L SX+ AT/Petrol/BS4",
            "1.6L SX+ AT/Diesel/BS4",
            "1.6L SX+ DUAL TONE MT/Diesel/BS4",
            "1.6L SX+ DUAL TONE MT/Petrol/BS4",
            "1.6L SX+ MT/Petrol/BS4",
            "1.6L SX+ MT/Diesel/BS4",
          ],
        },
        {
          generation: "CRETA 1ST GEN F/L 05.2018 - 03.2020",
          options: [
            "1.4L E+ MT/Diesel/BS4",
            "1.4L EX MT/Diesel/BS4",
            "1.4L S MT/Diesel/BS4",
            "1.6L E+ MT/Petrol/BS4",
            "1.6L E+ MT/Diesel/BS4",
            "1.6L EX MT/Petrol/BS4",
            "1.6L EX MT/Diesel/BS4",
            "1.6L SX AT/Diesel/BS4",
            "1.6L SX AT/Petrol/BS4",
            "1.6L SX DUAL TONE MT/Petrol/BS4",
            "1.6L SX DUAL TONE MT/Diesel/BS4",
            "1.6L SX MT/Diesel/BS4",
            "1.6L SX MT/Petrol/BS4",
            "1.6L SX(O) EXECUTIVE MT/Diesel/BS4",
            "1.6L SX(O) EXECUTIVE MT/Petrol/BS4",
            "1.6L SX(O) MT/Diesel/BS4",
            "1.6L SX(O) MT/Petrol/BS4",
          ],
        },
        {
          generation: "CRETA 2ND GEN 03.2020 - 01.2024",
          options: [
            "1.4L S+ DCT/Petrol/BS6",
            "1.4L SX DCT/Petrol/BS6",
            "1.4L SX(O) DCT/Petrol/BS6",
            "1.5L E MT/Diesel/BS6",
            "1.5L E MT/Petrol/BS6",
            "1.5L EX MT/Diesel/BS6",
            "1.5L EX MT/Petrol/BS6",
            "1.5L S MT/Petrol/BS6",
            "1.5L S MT/Diesel/BS6",
            "1.5L S+ KNIGHT EDITION MT/Diesel/BS6",
            "1.5L S+ KNIGHT EDITION MT/Petrol/BS6",
            "1.5L SX AT/Diesel/BS6",
            "1.5L SX AT/Petrol/BS6",
            "1.5L SX EXECUTIVE MT/Diesel/BS6",
            "1.5L SX EXECUTIVE MT/Petrol/BS6",
            "1.5L SX MT/Petrol/BS6",
            "1.5L SX MT/Diesel/BS6",
            "1.5L SX(O) AT/Diesel/BS6",
            "1.5L SX(O) AT/Petrol/BS6",
            "1.5L SX(O) KNIGHT EDITION AT/Petrol/BS6",
            "1.5L SX(O) MT/Diesel/BS6",
          ],
        },
        {
          generation: "CRETA ADVENTURE EDITION 08.2023 - 01.2024",
          options: [
            "1.5L IVT/Petrol/BS6.2",
            "1.5L MT/Petrol/BS6.2",
          ],
        },
        {
          generation: "CRETA 2ND GEN F/L 01.2024 - now",
          options: [
            "1.5L E MT/Petrol/BS6.2",
            "1.5L E MT/Diesel/BS6.2",
            "1.5L E(O) IVT/Petrol/BS6.2",
            "1.5L EX MT/Diesel/BS6.2",
            "1.5L EX MT/Petrol/BS6.2",
            "1.5L EX(O) AT/Diesel/BS6.2",
            "1.5L EX(O) MT/Diesel/BS6.2",
            "1.5L EX(O) MT/Petrol/BS6.2",
            "1.5L S MT/Diesel/BS6.2",
            "1.5L S MT/Petrol/BS6.2",
            "1.5L S(O) AT/Diesel/BS6.2",
            "1.5L S(O) IVT/Petrol/BS6.2",
            "1.5L S(O) KNIGHT EDITION  IVT/Petrol/BS6.2",
            "1.5L S(O) KNIGHT EDITION MT/Diesel/BS6.2",
            "1.5L S(O) KNIGHT EDITION MT/Petrol/BS6.2",
            "1.5L S(O) MT/Petrol/BS6.2",
            "1.5L S(O) MT/Diesel/BS6.2",
            "1.5L SX MT/Petrol/BS6.2",
            "1.5L SX PREMIUM MT/Diesel/BS6.2",
            "1.5L SX TECH IVT/Petrol/BS6.2",
            "1.5L SX TECH MT/Petrol/BS6.2",
            "1.5L SX TECH MT/Diesel/BS6.2",
            "1.5L SX(O) AT/Diesel/BS6.2",
            "1.5L SX(O) DCT/Petrol/BS6.2",
            "1.5L SX(O) IVT/Petrol/BS6.2",
            "1.5L SX(O) KNIGHT EDITION AT/Diesel/BS6.2",
            "1.5L SX(O) KNIGHT EDITION IVT/Petrol/BS6.2",
            "1.5L SX(O) MT/Petrol/BS6.2",
            "1.5L SX(O) MT/Diesel/BS6.2",
          ],
        },
        {
          generation: "CRETA N LINE 01.2024 - now",
          options: [
            "1.5L N10 DCT/Petrol/BS6.2",
            "1.5L N10 MT/Petrol/BS6.2",
            "1.5L N8 DCT/Petrol/BS6.2",
            "1.5L N8 MT/Petrol/BS6.2",
          ],
        },
        {
          generation: "CRETA EV 01.2025 - now",
          options: [
            "42 kWh EXECUTIVE/Electric/BS6.2",
            "42 kWh PREMIUM/Electric/BS6.2",
            "42 kWh SMART/Electric/BS6.2",
            "42 kWh SMART(O)/Electric/BS6.2",
            "51.4 kWh EXCELLENCE LR/Electric/BS6.2",
            "51.4 kWh EXCELLENCE LR (HC)/Electric/BS6.2",
            "51.4 kWh SMART(O)/Electric/BS6.2",
            "51.4 kWh SMART(O) LR BOV/Electric/BS6.2",
          ],
        },
      ],
    },
    {
  id: 5,
  name: "HYUNDAI ELANTRA",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/7f2f08c.webp",
  years: "04.2004 - 03.2022",
  link: "/vehicles/hyundai-212/elantra-11246/",
  modifications: [
    {
      generation: "ELANTRA 3RD GEN 04.2004 - 02.2007",
      options: [
        "1.8L GLS MT/Petrol/BS3",
        "1.8L GT DECONTENT MT/Petrol/BS3",
        "1.8L GT MT/Petrol/BS3",
        "2.0L CRDI MT/Diesel/BS3",
        "2.0L GT MT/Diesel/BS3"
      ],
    },
    {
      generation: "FLUIDIC ELANTRA 5TH GEN 08.2012 - 03.2015",
      options: [
        "1.6L S BASE MT/Diesel/BS4",
        "1.6L S MT/Diesel/BS4",
        "1.6L SX AT/Diesel/BS4",
        "1.6L SX MT/Diesel/BS4",
        "1.8L S MT/Petrol/BS4",
        "1.8L SX AT/Petrol/BS4",
        "1.8L SX MT/Petrol/BS4"
      ],
    },
    {
      generation: "FLUIDIC ELANTRA 5TH GEN F/L 04.2015 - 07.2016",
      options: [
        "1.6L S MT/Diesel/BS4",
        "1.6L SX AT/Diesel/BS4",
        "1.6L SX MT/Diesel/BS4",
        "1.8L S MT/Petrol/BS4",
        "1.8L SX AT/Petrol/BS4",
        "1.8L SX MT/Petrol/BS4"
      ],
    },
    {
      generation: "ELANTRA 6TH GEN 08.2016 - 10.2019",
      options: [
        "1.6L S MT/Diesel/BS4",
        "1.6L SX MT/Diesel/BS4",
        "1.6L SX(O) AT/Diesel/BS4",
        "1.6L SX(O) MT/Diesel/BS4",
        "2.0L S MT/Petrol/BS4",
        "2.0L SX AT/Petrol/BS4",
        "2.0L SX MT/Petrol/BS4",
        "2.0L SX(O) AT/Petrol/BS4",
        "2.0L SX(O) MT/Petrol/BS4"
      ],
    },
    {
      generation: "ELANTRA 6TH GEN F/L 10.2019 - 03.2022",
      options: [
        "1.5L SX MT/Diesel/BS6",
        "1.5L SX(O) AT/Diesel/BS6",
        "2.0L SX AT/Petrol/BS6",
        "2.0L SX MT/Petrol/BS6",
        "2.0L SX(O) AT/Petrol/BS6"
      ],
    },
  ],
},

    {
  id: 6,
  name: "HYUNDAI EON",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/1641c1e.webp",
  years: "01.2011 - 09.2019",
  link: "/vehicles/hyundai-212/eon-11245/",
  modifications: [
    {
      generation: "EON 01.2011 - 09.2019",
      options: [
        "0.8L D-LITE MT/Petrol/BS4",
        "0.8L D-LITE+ MT/Petrol/BS4",
        "0.8L ERA+ MT/Petrol/LPG/BS4",
        "0.8L ERA+ MT/Petrol/BS4",
        "0.8L ERA+ SE MT/Petrol/BS4",
        "0.8L MAGNA+ MT/Petrol/BS4",
        "0.8L MAGNA+(O) MT/Petrol/BS4",
        "0.8L SPORTZ MT/Petrol/BS4",
        "1.0L MAGNA MT/Petrol/BS4",
        "1.0L MAGNA+ MT/Petrol/BS4",
        "1.0L MAGNA+(O) MT/Petrol/BS4"
      ],
    },
  ],
},
{
  id: 7,
  name: "HYUNDAI EXTER",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/cbb2943.webp",
  years: "07.2023 - now",
  link: "/vehicles/hyundai-212/exter-12674/",
  modifications: [
    {
      generation: "EXTER 07.2023 - now",
      options: [
        "1.2L EX MT/Petrol/BS6.2",
        "1.2L EX(O) MT/Petrol/BS6.2",
        "1.2L S AMT/Petrol/BS6.2",
        "1.2L S MT/Petrol/BS6.2",
        "1.2L S MT/Petrol/CNG/BS6.2",
        "1.2L S(O) MT/Petrol/BS6.2",
        "1.2L SX AMT/Petrol/BS6.2",
        "1.2L SX KNIGHT MT/Petrol/BS6.2",
        "1.2L SX MT/Petrol/CNG/BS6.2",
        "1.2L SX MT/Petrol/BS6.2",
        "1.2L SX(O) AMT/Petrol/BS6.2",
        "1.2L SX(O) CONNECT AMT/Petrol/BS6.2",
        "1.2L SX(O) CONNECT MT/Petrol/BS6.2",
        "1.2L SX(O) MT/Petrol/BS6.2"
      ],
    },
  ],
},
{
  id: 8,
  name: "HYUNDAI GETZ",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/3e93d2c.webp",
  years: "01.2004 - 05.2010",
  link: "/vehicles/hyundai-212/getz-11252/",
  modifications: [
    {
      generation: "GETZ 1ST GEN 01.2004 - 02.2008",
      options: [
        "1.1L MT/Petrol/BS2",
        "1.3L GL MT/Petrol/82h.p./BS3",
        "1.3L GL MT/Petrol/82h.p./BS2",
        "1.3L GLE MT/Petrol/82h.p./BS2",
        "1.3L GLE MT/Petrol/82h.p./BS3",
        "1.3L GLS MT/Petrol/82h.p./BS2",
        "1.3L GLS MT/Petrol/82h.p./BS3",
        "1.3L GTS MT/Petrol/BS3",
        "1.3L GVS MT/Petrol/82h.p./BS3",
        "1.3L GVS MT/Petrol/82h.p./BS2",
        "1.3L MT/Petrol",
        "1.3L PRIME GLS MT/Petrol/82h.p./BS2",
        "1.3L PRIME GLS MT/Petrol/82h.p./BS3",
        "1.3L PRIME GVS MT/Petrol/82h.p./BS2",
        "1.3L PRIME GVS MT/Petrol/82h.p./BS3"
      ],
    },
    {
      generation: "GETZ 1ST GEN F/L 02.2007 - 05.2010",
      options: [
        "1.1L GL MT/Petrol/BS3",
        "1.1L GLE MT/Petrol/BS3",
        "1.1L GLS MT/Petrol/BS3",
        "1.1L GLX MT/Petrol/BS3",
        "1.1L PRIME GLE MT/Petrol/BS3",
        "1.1L PRIME GVS MT/Petrol/BS3",
        "1.3L GL MT/Petrol/BS3",
        "1.3L GLE MT/Petrol/BS3",
        "1.3L GLS ABS MT/Petrol/BS3",
        "1.3L GLS MT/Petrol/BS3",
        "1.3L GLX ABS MT/Petrol/BS3",
        "1.3L GLX MT/Petrol/BS3",
        "1.3L PRIME GLS MT/Petrol/BS3",
        "1.5L GL MT/Diesel/BS3",
        "1.5L GLE MT/Diesel/BS3",
        "1.5L GLS MT/Diesel/BS3",
        "1.5L GVS MT/Diesel/BS3",
        "1.5L PRIME GLE MT/Diesel/BS3",
        "1.5L PRIME GVS MT/Diesel/BS3"
      ],
    },
  ],
},
{
  id: 9,
  name: "HYUNDAI GRAND I10",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/c45e74f.webp",
  years: "08.2013 - now",
  link: "/vehicles/hyundai-212/grand_i_10-12483/",
  modifications: [
    {
      generation: "GRAND I10 08.2013 - 11.2016",
      options: [
        "1.0L MAGNA BLUEDRIVE MT/Petrol/LPG/BS4",
        "1.1L ASTA MT/Diesel/BS4",
        "1.1L ERA MT/Diesel/BS4",
        "1.1L MAGNA MT/Diesel/BS4",
        "1.1L SPORTZ MT/Diesel/BS4",
        "1.2L ANNIVERSARY EDITION MT/Petrol/BS4",
        "1.2L ASTA AT/Petrol/BS4",
        "1.2L ASTA MT/Petrol/BS4",
        "1.2L ERA MT/Petrol/BS4",
        "1.2L MAGNA MT/Petrol/BS4",
        "1.2L SPORTZ (O) MT/Petrol/BS4",
        "1.2L SPORTZ AT/Petrol/BS4",
        "1.2L SPORTZ MT/Petrol/BS4"
      ]
    },
    {
      generation: "GRAND I10 F/L 12.2016 - 11.2019",
      options: [
        "1.1L PRIME T MT/Diesel/BS4",
        "1.1L PRIME T+ MT/Diesel/BS4",
        "1.2L ASTA MT/Petrol/BS4",
        "1.2L ASTA MT/Diesel/BS4",
        "1.2L ASTA(O) AT/Petrol/BS4",
        "1.2L ERA MT/Diesel/BS4",
        "1.2L ERA MT/Petrol/BS4",
        "1.2L MAGNA AT/Petrol/BS4",
        "1.2L MAGNA MT/Petrol/BS4",
        "1.2L MAGNA MT/Diesel/BS4",
        "1.2L SPORTZ AT/Petrol/BS4",
        "1.2L SPORTZ DUAL TONE MT/Petrol/BS4",
        "1.2L SPORTZ MT/Petrol/BS4",
        "1.2L SPORTZ MT/Diesel/BS4",
        "1.2L SPORTZ(O) MT/Diesel/BS4",
        "1.2L SPORTZ(O) MT/Petrol/BS4"
      ]
    },
    {
      generation: "GRAND I10 NIOS 08.2019 - 12.2022",
      options: [
        "1.0L SPORTZ MT/Petrol/BS6",
        "1.2L ASTA AMT/Petrol/BS6",
        "1.2L ASTA MT/Diesel/BS6",
        "1.2L ASTA MT/Petrol/BS6",
        "1.2L CORPORATE AMT/Petrol/BS6",
        "1.2L CORPORATE MT/Petrol/BS6",
        "1.2L ERA MT/Petrol/BS6",
        "1.2L MAGNA AMT/Petrol/BS6",
        "1.2L MAGNA MT/Petrol/BS6",
        "1.2L MAGNA MT/Diesel/BS6",
        "1.2L MAGNA MT/Petrol/CNG/BS6",
        "1.2L SPORTZ AMT/Diesel/BS6",
        "1.2L SPORTZ AMT/Petrol/BS6",
        "1.2L SPORTZ DUAL TONE MT/Petrol/BS6",
        "1.2L SPORTZ MT/Diesel/BS6",
        "1.2L SPORTZ MT/Petrol/BS6",
        "1.2L SPORTZ MT/Petrol/CNG/BS6"
      ]
    },
    {
      generation: "GRAND I10 NIOS F/L 01.2023 - now",
      options: [
        "1.2L ASTA AT/Petrol/BS6.2",
        "1.2L ASTA MT/Petrol/BS6.2",
        "1.2L CORPORATE MT/Petrol/BS6.2",
        "1.2L ERA MT/Petrol/BS6.2",
        "1.2L MAGNA AT/Petrol/BS6.2",
        "1.2L MAGNA MT/Petrol/BS6.2",
        "1.2L MAGNA MT/Petrol/CNG/BS6.2",
        "1.2L SPORTZ (O) MT/Petrol/BS6.2",
        "1.2L SPORTZ AT/Petrol/BS6.2",
        "1.2L SPORTZ DUAL TONE MT/Petrol/BS6.2",
        "1.2L SPORTZ MT/Petrol/CNG/BS6.2",
        "1.2L SPORTZ MT/Petrol/BS6.2"
      ]
    }
  ]
},
{
  id: 10,
  name: "HYUNDAI I10",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/2a43da5.webp",
  years: "09.2007 - 08.2013",
  link: "/vehicles/hyundai-212/i10-11247/",
  modifications: [
    {
      generation: "I10 1ST GEN 09.2007 - 10.2010",
      options: [
        "1.1L D-LITE MT/Petrol/67h.p./BS4",
        "1.1L D-LITE MT/Petrol/67h.p./BS3",
        "1.1L ERA MT/Petrol/67h.p./BS3",
        "1.1L ERA MT/Petrol/67h.p./BS4",
        "1.1L MAGNA MT/Petrol/67h.p./BS3",
        "1.1L MAGNA MT/Petrol/67h.p./BS4",
        "1.2L ASTA (O) AT/Petrol/80h.p./BS4",
        "1.2L ASTA (O) AT/Petrol/80h.p./BS3",
        "1.2L ASTA MT/Petrol/BS3",
        "1.2L MAGNA AT/Petrol/80h.p./BS3",
        "1.2L MAGNA AT/Petrol/80h.p./BS4",
        "1.2L MAGNA MT/Petrol/80h.p./BS4",
        "1.2L MAGNA MT/Petrol/80h.p./BS3",
        "1.2L SPORTZ AT/Petrol/80h.p./BS4",
        "1.2L SPORTZ AT/Petrol/80h.p./BS3",
        "1.2L SPORTZ MT/Petrol/80h.p./BS4",
        "1.2L SPORTZ MT/Petrol/80h.p./BS3"
      ]
    },
    {
      generation: "I10 1ST GEN F/L 08.2010 - 08.2013",
      options: [
        "1.1L D-LITE MT/Petrol/69h.p./BS4",
        "1.1L D-LITE MT/Petrol/69h.p./BS3",
        "1.1L ERA MT/Petrol/69h.p./BS3",
        "1.1L ERA MT/Petrol/LPG/BS4",
        "1.1L ERA MT/Petrol/69h.p./BS4",
        "1.1L MAGNA MT/Petrol/LPG/BS4",
        "1.1L MAGNA MT/Petrol/69h.p./BS4",
        "1.1L MAGNA MT/Petrol/69h.p./BS3",
        "1.1L SPORTZ BLUEDRIVE MT/Petrol/LPG/BS4",
        "1.1L SPORTZ MT/Petrol/BS3",
        "1.2L ASTA AT/Petrol/80h.p./BS4",
        "1.2L ASTA AT/Petrol/80h.p./BS3",
        "1.2L ASTA MT/Petrol/80h.p./BS4",
        "1.2L ASTA MT/Petrol/80h.p./BS3",
        "1.2L MAGNA MT/Petrol/80h.p./BS3",
        "1.2L MAGNA MT/Petrol/80h.p./BS4",
        "1.2L SPORTZ AT/Petrol/50h.p./BS4",
        "1.2L SPORTZ AT/Petrol/50h.p./BS3",
        "1.2L SPORTZ MT/Petrol/80h.p./BS3",
        "1.2L SPORTZ MT/Petrol/80h.p./BS4"
      ]
    }
  ]
},

{
  id: 11,
  name: "HYUNDAI I20",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/45ca701.webp",
  years: "09.2008 - now",
  link: "/vehicles/hyundai-212/i20-11248/",
  modifications: [
    {
      generation: "I20 1ST GEN 09.2008 - 02.2012",
      options: [
        "1.2L ASTA MT/Petrol/80h.p./BS3",
        "1.2L ASTA MT/Petrol/80h.p./BS4",
        "1.2L ASTA(O) MT/Petrol/80h.p./BS3",
        "1.2L ASTA(O) MT/Petrol/80h.p./BS4",
        "1.2L ERA MT/Petrol/80h.p./BS3",
        "1.2L ERA MT/Petrol/80h.p./BS4",
        "1.2L MAGNA MT/Petrol/80h.p./BS3",
        "1.2L MAGNA MT/Petrol/80h.p./BS4",
        "1.2L SPORTZ MT/Petrol/80h.p./BS3",
        "1.2L SPORTZ MT/Petrol/80h.p./BS4",
        "1.2L SPORTZ(O) MT/Petrol/BS4",
        "1.4L ASTA AT/Petrol/100h.p./BS3",
        "1.4L ASTA AT/Petrol/100h.p./BS4",
        "1.4L ASTA MT/Diesel/90h.p./BS3",
        "1.4L ASTA MT/Diesel/90h.p./BS4",
        "1.4L ASTA(O) AT/Petrol/BS4",
        "1.4L ASTA(O) MT/Diesel/90h.p./BS3",
        "1.4L ASTA(O) MT/Diesel/90h.p./BS4",
        "1.4L ERA MT/Diesel/90h.p./BS3",
        "1.4L ERA MT/Diesel/90h.p./BS4",
        "1.4L MAGNA MT/Diesel/90h.p./BS3",
        "1.4L MAGNA MT/Diesel/90h.p./BS4",
        "1.4L SPORTZ MT/Diesel/90h.p./BS3",
        "1.4L SPORTZ MT/Diesel/90h.p./BS4"
      ]
    },
    {
      generation: "I20 1ST GEN F/L 03.2012 - 07.2014",
      options: [
        "1.2L ASTA MT/Petrol/BS4",
        "1.2L ASTA(O) MT/Petrol/BS4",
        "1.2L ERA MT/Petrol/BS4",
        "1.2L MAGNA MT/Petrol/BS4",
        "1.2L MAGNA(O) MT/Petrol/BS4",
        "1.2L SPORTZ MT/Petrol/BS4",
        "1.4L ASTA MT/Diesel/BS4",
        "1.4L ERA MT/Diesel/BS4",
        "1.4L MAGNA MT/Diesel/BS4",
        "1.4L MAGNA(O) MT/Diesel/BS4",
        "1.4L SPORTZ AT/Petrol/BS4",
        "1.4L SPORTZ MT/Diesel/BS4"
      ]
    },
    {
      generation: "I20 2ND GEN ELITE 08.2014 - 01.2018",
      options: [
        "1.2L ASTA DUAL TONE MT/Petrol/BS4",
        "1.2L ASTA MT/Petrol/83h.p./BS4",
        "1.2L ASTA(O) MT/Petrol/83h.p./BS4",
        "1.2L ERA MT/Petrol/BS4",
        "1.2L MAGNA EXECUTIVE MT/Petrol/BS4",
        "1.2L MAGNA MT/Petrol/BS4",
        "1.2L SPORTZ MT/Petrol/BS4",
        "1.2L SPORTZ(O) MT/Petrol/BS4",
        "1.4L ASTA DUAL TONE MT/Diesel/BS4",
        "1.4L ASTA MT/Diesel/90h.p./BS4",
        "1.4L ASTA(O) MT/Diesel/90h.p./BS4",
        "1.4L ERA MT/Diesel/BS4",
        "1.4L MAGNA AT/Petrol/BS4",
        "1.4L MAGNA EXECUTIVE MT/Diesel/BS4",
        "1.4L MAGNA MT/Diesel/BS4",
        "1.4L SPORTZ MT/Diesel/BS4",
        "1.4L SPORTZ(O) MT/Diesel/BS4"
      ]
    },
    {
      generation: "I20 2ND GEN ACTIVE 03.2015 - 02.2020",
      options: [
        "1.2L BASE MT/Petrol/83h.p./BS4",
        "1.2L S MT/Petrol/83h.p./BS4",
        "1.2L SX MT/Petrol/83h.p./BS4",
        "1.4L BASE MT/Diesel/90h.p./BS4",
        "1.4L S MT/Diesel/90h.p./BS4",
        "1.4L SX MT/Diesel/90h.p./BS4"
      ]
    },
    {
      generation: "I20 2ND GEN F/L ELITE 02.2018 - 10.2020",
      options: [
        "1.2L ASTA CVT/Petrol/BS4",
        "1.2L ASTA DUAL TONE MT/Petrol/BS4",
        "1.2L ASTA MT/Petrol/BS4",
        "1.2L ASTA(O) CVT/Petrol/BS4",
        "1.2L ASTA(O) MT/Petrol/83h.p./BS4",
        "1.2L ASTA(O) MT/Petrol/83h.p./BS6",
        "1.2L ERA MT/Petrol/83h.p./BS4",
        "1.2L MAGNA+ MT/Petrol/83h.p./BS6",
        "1.2L SPORTZ+ DUAL TONE MT/Petrol/83h.p./BS6",
        "1.4L ASTA(O) MT/Diesel/90h.p./BS4",
        "1.4L SPORTZ MT/Diesel/BS4"
      ]
    },
    {
      generation: "I20 3RD GEN 11.2020 - 08.2023",
      options: [
        "1.0L ASTA DCT/Petrol/BS6",
        "1.0L ASTA IMT/Petrol/BS6",
        "1.0L ASTA(O) DCT/Petrol/BS6",
        "1.2L ASTA IVT/Petrol/BS6",
        "1.2L SPORTZ MT/Petrol/BS6",
        "1.5L SPORTZ MT/Diesel/BS6"
      ]
    },
    {
      generation: "I20 N LINE 1ST GEN 09.2021 - 08.2023",
      options: [
        "1.0L N6 IMT/Petrol/BS6",
        "1.0L N8 DCT/Petrol/BS6",
        "1.0L N8 IMT/Petrol/BS6"
      ]
    },
    {
      generation: "I20 3RD GEN F/L 09.2023 - now",
      options: [
        "1.2L ASTA MT/Petrol/BS6.2",
        "1.2L ASTA(O) IVT/Petrol/BS6.2",
        "1.2L SPORTZ MT/Petrol/BS6.2",
        "1.2L SPORTZ(O) MT/Petrol/BS6.2"
      ]
    },
    {
      generation: "I20 N LINE 1ST GEN F/L 09.2023 - now",
      options: [
        "1.0L N6 DCT/Petrol/BS6.2",
        "1.0L N6 MT/Petrol/BS6.2",
        "1.0L N8 DCT/Petrol/BS6.2",
        "1.0L N8 MT/Petrol/BS6.2"
      ]
    }
  ]
},
{
  id: 12,
  name: "HYUNDAI IONIQ 5",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/356ed74.webp",
  years: "01.2023 - now",
  link: "/vehicles/hyundai-212/ioniq_5_electric-12655/",
  modifications: [
    {
      generation: "IONIQ 5 01.2023 - now",
      options: [
        "72.6 kWh/Electric/BS6.2"
      ],
    },
  ],
},
{
  id: 13,
  name: "HYUNDAI KONA",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/83f9fec.png",
  years: "06.2019 - 06.2024",
  link: "/vehicles/hyundai-212/kona-12459/",
  modifications: [
    {
      generation: "KONA EV 06.2019 - 06.2024",
      options: [
        "39.2 kWh PREMIUM/Electric/BS6"
      ],
    },
  ],
},
{
  id: 14,
  name: "HYUNDAI SANTA FE",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/d4d9ce8.webp",
  years: "06.2009 - 09.2017",
  link: "/vehicles/hyundai-212/santa_fe-11935/",
  modifications: [
    {
      generation: "SANTA FE (CM) 2ND GEN 06.2009 - 09.2013",
      options: [
        "2.2L/Diesel/197h.p./BS3",
        "2.2L/Diesel/197h.p./BS3",
        "2.2L 4X4/Diesel/BS3",
        "2.2L 4X4 AT/Diesel/199.73h.p./BS3",
        "2.2L 4X4 AT/Diesel/199.73h.p./BS3"
      ],
    },
    {
      generation: "SANTA FE (DM) 3RD GEN 01.2013 - 09.2017",
      options: [
        "2.2L 4X2 AT/Diesel/BS4",
        "2.2L 4X2 MT/Diesel/BS4",
        "2.2L 4X4 AT/Diesel/BS4"
      ],
    },
  ],
},
{
  id: 15,
  name: "HYUNDAI SANTRO",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/c725b69.webp",
  years: "09.1998 - 05.2022",
  link: "/vehicles/hyundai-212/santro-11244/",
  modifications: [
    {
      generation: "SANTRO 1ST GEN 09.1998 - 04.2003",
      options: [
        "1.0L DX MT/Petrol/54h.p./BS1",
        "1.0L DX MT/Petrol/54h.p./BS2",
        "1.0L DX2 MT/Petrol/54h.p./BS1",
        "1.0L DX2 MT/Petrol/54h.p./BS2",
        "1.0L GS MT/Petrol",
        "1.0L LE MT/Petrol",
        "1.0L LP MT/Petrol",
        "1.0L LS MT/Petrol",
        "1.0L STD MT/Petrol/54h.p./BS1",
        "1.0L STD MT/Petrol/54h.p./BS2",
        "1.0L ZIP DRIVE MT/Petrol",
        "1.1L AT/Petrol",
        "1.1L GS MT/Petrol",
        "1.1L LE MT/Petrol",
        "1.1L LP MT/Petrol",
        "1.1L LS MT/Petrol",
        "1.1L ZIP PLUS MT/Petrol"
      ],
    },
    {
      generation: "SANTRO XING 2ND GEN 05.2003 - 01.2015",
      options: [
        "1.1L GL MT/Petrol/CNG/BS3",
        "1.1L GL MT/Petrol/61h.p./BS3",
        "1.1L GL MT/Petrol/LPG/BS3",
        "1.1L GL MT/Petrol/61h.p./BS4",
        "1.1L GL(O) MT/Petrol/LPG/BS3",
        "1.1L GL(O) MT/Petrol/61h.p./BS3",
        "1.1L GL(O) MT/Petrol/61h.p./BS4",
        "1.1L GL+ MT/Petrol/BS4",
        "1.1L GLS MT/Petrol/LPG/BS3",
        "1.1L GLS MT/Petrol/61h.p./BS3",
        "1.1L GLS MT/Petrol/61h.p./BS4",
        "1.1L GLS(O) MT/Petrol/61h.p./BS3",
        "1.1L GLS(O) MT/Petrol/LPG/BS3",
        "1.1L GLS(O) MT/Petrol/61h.p./BS4",
        "1.1L STD MT/Petrol/61h.p./BS3",
        "1.1L STD MT/Petrol/61h.p./BS4",
        "1.1L X MT/Petrol/62h.p./BS2",
        "1.1L X MT/Petrol/62h.p./BS3",
        "1.1L X(O) MT/Petrol/62h.p./BS2",
        "1.1L X(O) MT/Petrol/62h.p./BS3",
        "1.1L XE MT/Petrol/62h.p./BS2",
        "1.1L XE MT/Petrol/62h.p./BS3",
        "1.1L XE(O) MT/Petrol/62h.p./BS2",
        "1.1L XE(O) MT/Petrol/62h.p./BS3",
        "1.1L XG AT/Petrol/62h.p./BS2",
        "1.1L XG AT/Petrol/62h.p./BS3",
        "1.1L XG AT/Petrol/CNG/BS3",
        "1.1L XG MT/Petrol/62h.p./BS2",
        "1.1L XG MT/Petrol/62h.p./BS3",
        "1.1L XG(O) AT/Petrol/62h.p./BS2",
        "1.1L XG(O) AT/Petrol/62h.p./BS3",
        "1.1L XG(O) AT/Petrol/CNG/BS3",
        "1.1L XG(O) MT/Petrol/62h.p./BS2",
        "1.1L XG(O) MT/Petrol/62h.p./BS3",
        "1.1L XK MT/Petrol/BS3",
        "1.1L XK MT/Petrol/CNG/BS3",
        "1.1L XK(O) MT/Petrol/BS3",
        "1.1L XK(O) MT/Petrol/CNG/BS3",
        "1.1L XL MT/Petrol/BS3",
        "1.1L XL MT/Petrol/CNG/BS3",
        "1.1L XL(O) MT/Petrol/BS3",
        "1.1L XL(O) MT/Petrol/CNG/BS3",
        "1.1L XO MT/Petrol/BS3",
        "1.1L XO MT/Petrol/CNG/BS3",
        "1.1L XO(O) MT/Petrol/BS3",
        "1.1L XO(O) MT/Petrol/CNG/BS3",
        "1.1L XP MT/Petrol/62h.p./BS2",
        "1.1L XP MT/Petrol/62h.p./BS3",
        "1.1L XP(O) MT/Petrol/62h.p./BS2",
        "1.1L XP(O) MT/Petrol/62h.p./BS3",
        "1.1L XS MT/Petrol/62h.p./BS2",
        "1.1L XS MT/Petrol/62h.p./BS3",
        "1.1L XS(O) MT/Petrol/62h.p./BS2",
        "1.1L XS(O) MT/Petrol/62h.p./BS3"
      ],
    },
    {
      generation: "SANTRO 3RD GEN 10.2018 - 05.2022",
      options: [
        "1.1L ASTA MT/Petrol/BS4",
        "1.1L ERA MT/Petrol/BS4",
        "1.1L MAGNA AMT/Petrol/BS4",
        "1.1L MAGNA MT/Petrol/CNG/BS4",
        "1.1L MAGNA MT/Petrol/BS4",
        "1.1L SPORTZ AMT/Petrol/BS4",
        "1.1L SPORTZ MT/Petrol/BS4",
        "1.1L SPORTZ MT/Petrol/CNG/BS4"
      ],
    },
  ],
},
{
  id: 16,
  name: "HYUNDAI SONATA",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/3cb1fab.webp",
  years: "07.2001 - 02.2015",
  link: "/vehicles/hyundai-212/sonata-11922/",
  modifications: [
    {
      generation: "SONATA (EF-B) GOLD 4TH GEN 07.2001 - 12.2007",
      options: [
        "2.0L GOLD GLS MT/Petrol",
        "2.0L GOLD S20 MT/Petrol",
        "2.7L V6 AT/Petrol"
      ]
    },
    {
      generation: "SONATA (NF) EMBERA/TRANSFORM 5TH GEN 05.2005 - 08.2011",
      options: [
        "2.0L EMBERA AT/Diesel/BS4",
        "2.0L EMBERA MT/Diesel/BS4",
        "2.0L TRANSFORM AT/Diesel/148h.p./BS3",
        "2.0L TRANSFORM AT/Diesel/148h.p./BS4",
        "2.0L TRANSFORM MT/Diesel/148h.p./BS4",
        "2.0L TRANSFORM MT/Diesel/148h.p./BS3",
        "2.4L EMBERA AT/Petrol/162h.p./BS3",
        "2.4L EMBERA MT/Petrol/162h.p./BS3",
        "2.4L TRANSFORM MT/Petrol/173h.p./BS4",
        "2.4L TRANSFORM MT/Petrol/173h.p./BS3"
      ]
    },
    {
      generation: "SONATA (YF) FLUIDIC 6TH GEN 02.2012 - 02.2015",
      options: [
        "2.4L AT/Petrol/BS4",
        "2.4L MT/Petrol/BS4"
      ]
    }
  ]
},
{
  id: 17,
  name: "HYUNDAI TERRACAN",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/6b7a1da.webp",
  years: "01.2003 - 09.2005",
  link: "/vehicles/hyundai-212/terracan-11937/",
  modifications: [
    {
      generation: "TERRACAN (HP) 01.2003 - 09.2005",
      options: [
        "2.9L MT 4WD/Diesel"
      ]
    }
  ]
},
{
  id: 18,
  name: "HYUNDAI TUCSON",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/bc2f1fb.webp",
  years: "04.2004 - now",
  link: "/vehicles/hyundai-212/tucson-11249/",
  modifications: [
    {
      generation: "TUCSON 1ST GEN 04.2004 - 04.2007",
      options: [
        "2.0L MT/Diesel/BS2",
        "2.0L TURBO MT/Diesel/BS2"
      ]
    },
    {
      generation: "TUCSON 3RD GEN 10.2016 - 06.2020",
      options: [
        "2.0L GL 2WD AT/Diesel/BS4",
        "2.0L GL AT/Petrol/BS4",
        "2.0L GL(O) 2WD AT/Diesel/BS4",
        "2.0L GL(O) AT/Petrol/BS4",
        "2.0L GLS 2WD AT/Diesel/BS4",
        "2.0L GLS 4WD AT/Diesel/BS4",
        "2.0L GLS AT/Petrol/BS4"
      ]
    },
    {
      generation: "TUCSON 3RD GEN F/L 07.2020 - 07.2022",
      options: [
        "2.0L GL(O) AT/Petrol/BS6",
        "2.0L GL(O) AT/Diesel/BS6",
        "2.0L GLS 2WD AT/Diesel/BS6",
        "2.0L GLS 4WD AT/Diesel/BS6",
        "2.0L GLS AT/Petrol/BS6"
      ]
    },
    {
      generation: "TUCSON 4TH GEN 08.2022 - now",
      options: [
        "2.0L PLATINUM AT/Petrol/BS6",
        "2.0L PLATINUM AT/Diesel/BS6",
        "2.0L SIGNATURE 4WD AT/Diesel/BS6",
        "2.0L SIGNATURE AT/Diesel/BS6",
        "2.0L SIGNATURE AT/Petrol/BS6"
      ]
    }
  ]
},
{
  id: 19,
  name: "HYUNDAI VENUE",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/18c4cb8.webp",
  years: "05.2019 - now",
  link: "/vehicles/hyundai-212/venue-12325/",
  modifications: [
    {
      generation: "VENUE 1ST GEN 05.2019 - 06.2022",
      options: [
        "1.0L S DCT/Petrol/BS4",
        "1.0L S IMT/Petrol/BS6",
        "1.0L S MT/Petrol/120h.p./BS4",
        "1.0L S MT/Petrol/120h.p./BS6",
        "1.0L S(O) DCT/Petrol/BS6",
        "1.0L SX DUAL TONE IMT/Petrol/BS6",
        "1.0L SX DUAL TONE MT/Petrol/120h.p./BS4",
        "1.0L SX DUAL TONE MT/Petrol/120h.p./BS6",
        "1.0L SX IMT/Petrol/BS6",
        "1.0L SX MT/Petrol/BS4",
        "1.0L SX(O) DUAL TONE IMT/Petrol/BS6",
        "1.0L SX(O) DUAL TONE MT/Petrol/120h.p./BS4",
        "1.0L SX(O) DUAL TONE MT/Petrol/120h.p./BS6",
        "1.0L SX(O) IMT/Petrol/BS6",
        "1.0L SX(O) MT/Petrol/120h.p./BS4",
        "1.0L SX(O) MT/Petrol/120h.p./BS6",
        "1.0L SX+ DCT/Petrol/120h.p./BS4",
        "1.0L SX+ DCT/Petrol/120h.p./BS6",
        "1.0L SX+ DUAL TONE DCT/Petrol/120h.p./BS4",
        "1.0L SX+ DUAL TONE DCT/Petrol/120h.p./BS6",
        "1.2L E MT/Petrol/83h.p./BS4",
        "1.2L E MT/Petrol/83h.p./BS6",
        "1.2L S MT/Petrol/83h.p./BS4",
        "1.2L S MT/Petrol/83h.p./BS6",
        "1.2L S+ MT/Petrol/BS6",
        "1.4L E MT/Diesel/BS4",
        "1.4L S MT/Diesel/BS4",
        "1.4L SX DUAL TONE MT/Diesel/BS4",
        "1.4L SX MT/Diesel/BS4",
        "1.4L SX(O) DUAL TONE MT/Diesel/BS4",
        "1.4L SX(O) MT/Diesel/BS4",
        "1.5L E MT/Diesel/BS6",
        "1.5L S MT/Diesel/BS6",
        "1.5L SX DUAL TONE MT/Diesel/BS6",
        "1.5L SX MT/Diesel/BS6",
        "1.5L SX(O) EXECUTIVE MT/Diesel/BS6",
        "1.5L SX(O) MT/Diesel/BS6"
      ]
    },
    {
      generation: "VENUE 1ST GEN F/L 06.2022 - now",
      options: [
        "1.0L EXECUTIVE MT/Petrol/BS6",
        "1.0L S(O) DCT/Petrol/BS6",
        "1.0L S(O) IMT/Petrol/BS6",
        "1.0L S(O) MT/Petrol/BS6",
        "1.0L SX(O) DCT/Petrol/BS6",
        "1.0L SX(O) DUAL TONE DCT/Petrol/BS6",
        "1.0L SX(O) DUAL TONE IMT/Petrol/BS6",
        "1.0L SX(O) IMT/Petrol/BS6",
        "1.0L SX(O) MT/Petrol/BS6",
        "1.2L E MT/Petrol/BS6",
        "1.2L E(O) MT/Petrol/BS6",
        "1.2L E+ MT/Petrol/BS6",
        "1.2L S MT/Petrol/BS6",
        "1.2L S(O) MT/Petrol/BS6",
        "1.2L S(O)+ MT/Petrol/BS6",
        "1.2L S+ MT/Petrol/BS6",
        "1.2L SX DUAL TONE MT/Petrol/BS6",
        "1.2L SX EXECUTIVE MT/Petrol/BS6",
        "1.2L SX MT/Petrol/BS6",
        "1.5L S+ MT/Diesel/BS6",
        "1.5L SX DUAL TONE MT/Diesel/BS6",
        "1.5L SX MT/Diesel/BS6",
        "1.5L SX(O) DUAL TONE MT/Diesel/BS6",
        "1.5L SX(O) MT/Diesel/BS6"
      ]
    },
    {
      generation: "VENUE ADVENTURE EDITION 06.2022 - now",
      options: [
        "1.0L SX(O) DCT/Petrol/BS6",
        "1.0L SX(O) DUAL TONE DCT/Petrol/BS6",
        "1.0L SX(O) MT/Petrol/BS6",
        "1.2L S(O)+ MT/Petrol/BS6",
        "1.2L SX DUAL TONE MT/Petrol/BS6",
        "1.2L SX MT/Petrol/BS6"
      ]
    },
    {
      generation: "VENUE N LINE 09.2022 - now",
      options: [
        "1.0L N6 DCT/Petrol/BS6",
        "1.0L N6 DUAL TONE DCT/Petrol/BS6",
        "1.0L N6 DUAL TONE MT/Petrol/BS6",
        "1.0L N6 MT/Petrol/BS6",
        "1.0L N8 DCT/Petrol/BS6",
        "1.0L N8 DUAL TONE DCT/Petrol/BS6",
        "1.0L N8 DUAL TONE MT/Petrol/BS6",
        "1.0L N8 MT/Petrol/BS6"
      ]
    },
    {
      generation: "VENUE KNIGHT EDITION 08.2023 - now",
      options: [
        "1.0L SX(O) DCT/Petrol/BS6",
        "1.0L SX(O) DUAL TONE DCT/Petrol/BS6",
        "1.0L SX(O) DUAL TONE MT/Petrol/BS6",
        "1.0L SX(O) MT/Petrol/BS6",
        "1.2L S(O) MT/Petrol/BS6",
        "1.2L SX DUAL TONE MT/Petrol/BS6",
        "1.2L SX MT/Petrol/BS6"
      ]
    }
  ]
},
{
  id: 20,
  name: "HYUNDAI VERNA",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/52ce872.webp",
  years: "09.2006 - now",
  link: "/vehicles/hyundai-212/verna-11243/",
  modifications: [
    {
      generation: "VERNA 3RD GEN 09.2006 - 03.2010",
      options: [
        "1.5L ABS MT/Diesel/BS3",
        "1.5L MT/Diesel/BS3",
        "1.5L SX ABS MT/Diesel/BS3",
        "1.5L SX AT/Diesel/BS3",
        "1.5L SX MT/Diesel/BS3",
        "1.6L I ABS MT/Petrol/BS3",
        "1.6L XI MT/Petrol/BS3",
        "1.6L XXI ABS MT/Petrol/BS3",
        "1.6L XXI MT/Petrol/BS3"
      ]
    },
    {
      generation: "VERNA 3RD GEN F/L 04.2010 - 04.2011",
      options: [
        "1.5L (O) MT/Diesel/BS4",
        "1.5L MT/Diesel/BS4",
        "1.5L SX AT/Diesel/BS4",
        "1.5L SX MT/Diesel/BS4",
        "1.6L (O) MT/Petrol/BS4",
        "1.6L MT/Petrol/BS4",
        "1.6L SX MT/Petrol/BS4"
      ]
    },
    {
      generation: "VERNA 4TH GEN FLUIDIC 05.2011 - 11.2014",
      options: [
        "1.4L CX MT/Diesel/BS4",
        "1.4L CX MT/Petrol/BS4",
        "1.4L EX MT/Diesel/BS4",
        "1.6L EX AT/Diesel/BS4",
        "1.6L EX MT/Diesel/BS4",
        "1.6L EX MT/Petrol/BS4",
        "1.6L S AT/Petrol/BS4",
        "1.6L S MT/Petrol/BS4",
        "1.6L SX AT/Petrol/BS4",
        "1.6L SX AT/Diesel/BS4",
        "1.6L SX MT/Diesel/BS4",
        "1.6L SX MT/Petrol/BS4",
        "1.6L SX(O) AT/Petrol/BS4",
        "1.6L SX(O) AT/Diesel/BS4",
        "1.6L SX(O) MT/Petrol/BS4",
        "1.6L SX(O) MT/Diesel/BS4"
      ]
    },
    {
      generation: "VERNA 4TH GEN F/L FLUIDIC 12.2014 - 07.2017",
      options: [
        "1.4L MT/Diesel/BS4",
        "1.4L VTVT MT/Petrol/BS4",
        "1.6L EX MT/Diesel/BS4",
        "1.6L S AT/Petrol/BS4",
        "1.6L S AT/Diesel/BS4",
        "1.6L S MT/Diesel/BS4",
        "1.6L S MT/Petrol/BS4",
        "1.6L S(O) MT/Diesel/BS4",
        "1.6L S(O) MT/Petrol/BS4",
        "1.6L SX AT/Diesel/BS4",
        "1.6L SX AT/Petrol/BS4",
        "1.6L SX MT/Diesel/BS4",
        "1.6L SX MT/Petrol/BS4",
        "1.6L SX(O) AT/Diesel/BS4",
        "1.6L SX(O) MT/Diesel/BS4",
        "1.6L SX(O) MT/Petrol/BS4"
      ]
    },
    {
      generation: "VERNA 5TH GEN 08.2017 - 05.2020",
      options: [
        "1.4L E MT/Petrol/BS4",
        "1.4L E MT/Diesel/BS4",
        "1.4L EX MT/Diesel/BS4",
        "1.4L EX MT/Petrol/BS4",
        "1.6L E MT/Diesel/BS4",
        "1.6L E MT/Petrol/BS4",
        "1.6L EX AT/Petrol/BS4",
        "1.6L EX AT/Diesel/BS4",
        "1.6L EX MT/Diesel/BS4",
        "1.6L EX MT/Petrol/BS4",
        "1.6L SX AT/Diesel/BS4",
        "1.6L SX MT/Diesel/BS4",
        "1.6L SX MT/Petrol/BS4",
        "1.6L SX(O) AT/Petrol/BS4",
        "1.6L SX(O) AT/Diesel/BS4",
        "1.6L SX(O) MT/Diesel/BS4",
        "1.6L SX(O) MT/Petrol/BS4",
        "1.6L SX+ AT/Petrol/BS4"
      ]
    },
    {
      generation: "VERNA 5TH GEN F/L 06.2020 - 02.2023",
      options: [
        "1.0L SX(O) DCT/Petrol/BS6",
        "1.5L E MT/Petrol/BS6",
        "1.5L S+ MT/Petrol/BS6",
        "1.5L S+ MT/Diesel/BS6",
        "1.5L SX AT/Diesel/BS6",
        "1.5L SX IVT/Petrol/BS6",
        "1.5L SX MT/Diesel/BS6",
        "1.5L SX MT/Petrol/BS6",
        "1.5L SX(O) AT/Diesel/BS6",
        "1.5L SX(O) IVT/Petrol/BS6",
        "1.5L SX(O) MT/Petrol/BS6",
        "1.5L SX(O) MT/Diesel/BS6"
      ]
    },
    {
      generation: "VERNA 6TH GEN 03.2023 - now",
      options: [
        "1.5L EX MT/Petrol/BS6.2",
        "1.5L S MT/Petrol/BS6.2",
        "1.5L SX AT/Petrol/BS6.2",
        "1.5L SX MT/Petrol/BS6.2",
        "1.5L SX TURBO DCT/Petrol/BS6.2",
        "1.5L SX TURBO MT/Petrol/BS6.2",
        "1.5L SX(O) AT/Petrol/BS6.2",
        "1.5L SX(O) MT/Petrol/BS6.2",
        "1.5L SX(O) TURBO DCT/Petrol/BS6.2",
        "1.5L SX(O) TURBO MT/Petrol/BS6.2"
      ]
    }
  ]
},

{
  id: 21,
  name: "HYUNDAI XCENT",
  image: "https://boodmo.com/media/cache/vehicle_model/images/model/23d37ff.webp",
  years: "08.2013 - 10.2020",
  link: "/vehicles/hyundai-212/xcent-11251/",
  modifications: [
    {
      generation: "XCENT 08.2013 - 11.2016",
      options: [
        "1.0L MT/Petrol/LPG/BS4",
        "1.1L E MT/Diesel/BS4",
        "1.1L PRIME T MT/Diesel/BS4",
        "1.1L PRIME T PLUS MT/Diesel/BS4",
        "1.1L S MT/Diesel/BS4",
        "1.1L S(O) MT/Diesel/BS4",
        "1.1L SX MT/Diesel/BS4",
        "1.1L SX(O) MT/Diesel/BS4",
        "1.2L E MT/Petrol/BS4",
        "1.2L PRIME T MT/Petrol/CNG/BS4",
        "1.2L PRIME T PLUS MT/Petrol/CNG/BS4",
        "1.2L S AT/Petrol/BS4",
        "1.2L S MT/Petrol/BS4",
        "1.2L S(O) MT/Petrol/BS4",
        "1.2L SX MT/Petrol/BS4",
        "1.2L SX(O) AT/Petrol/BS4",
        "1.2L SX(O) MT/Petrol/BS4"
      ]
    },
    {
      generation: "XCENT F/L 12.2016 - 10.2020",
      options: [
        "1.2L E MT/Petrol/BS4",
        "1.2L E MT/Diesel/BS4",
        "1.2L E+ MT/Petrol/BS4",
        "1.2L E+ MT/Diesel/BS4",
        "1.2L PRIME T+ MT/Diesel/BS4",
        "1.2L PRIME T+ MT/Petrol/CNG/BS4",
        "1.2L S AT/Petrol/BS4",
        "1.2L S MT/Petrol/BS4",
        "1.2L S MT/Diesel/BS4",
        "1.2L SX MT/Petrol/BS4",
        "1.2L SX MT/Diesel/BS4",
        "1.2L SX(O) MT/Petrol/BS4",
        "1.2L SX(O) MT/Diesel/BS4"
      ]
    }
  ]
},
];

export const Hyundai = () => {
  const link = getOriPartsLink(8, "HYUNDAI");

  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Use exported models
  const models = hyundaiModels;

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

  // ✅ Filter logic
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

        <h1 className="text-2xl sm:text-3xl md:text-4xl px-2 font-bold text-gray-800 uppercase mb-4 sm:mb-6">
          HYUNDAI
        </h1>
      </div>

      {/* Brand Info Section */}
      <section className="max-w-7xl mx-auto brand-info__desc mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-200">
          <p>
            Hyundai Motor India Limited is the second largest car manufacturer
            in India and is a wholly owned subsidiary of Hyundai Motor Company
            based out of Seoul, South Korea. It has more than 10 popular models
            across various segments. It is also well known for its after sales
            service support network through its dedicated chain of 445 dealers
            and more than 1000 service points across India.
          </p>
          <p>
            Founded in 1996 and headquartered in Tamil Nadu, India, it has
            quickly risen to become one of the major players in the automotive
            segment in India, and is the largest car exporter from India.
          </p>
          <p>
            Hyundai car spare parts are available at{" "}
            <a
              href="https://boodmo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              sparelo
            </a>
            . With the launch of the ‘Hyundai Care’ mobile app for vehicle
            servicing, Hyundai has taken the service experience to a whole new
            level by providing real-time service appointments and calculators
            that help car owners customize their automotive service.
          </p>
          <p>
            The letter ‘H’ in Hyundai’s logo, which is oval-shaped, represents
            the company’s wish to expand throughout the world. The slanting and
            fluid form of “H” represents the bond that the customer and
            manufacturer share — hands in unison.
          </p>
          <p>
            The word <strong>Hyundai</strong> originates from a Korean word
            which translates to “modernity.” This is reflected in Hyundai’s
            tagline —{" "}
            <em>New Thinking, New Possibilities.</em>
          </p>
        </div>
      </section>
      {/* OEM Catalogue Button */}
      <a
        href={link}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="inline-block border border-gray-600 mb-2 text-black text-xs sm:text-sm rounded-md px-3 py-2 sm:px-4 sm:py-2 transition-all duration-300 hover:bg-red-400"
      >
        View OEM Catalogue
      </a>

      {/* Model Filter Section */}
      <div className="max-w-7xl mx-auto heading-filters flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 border-b border-gray-200 pb-3 px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <div className="h2-section text-xl sm:text-2xl md:text-3xl py-2 sm:py-4 font-semibold text-gray-800">
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

      {/* Model Grid */}
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
                to={`/vehicles/hyundai/${model.id}`}
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

        {/* No models found */}
        {filteredModels.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
            No models found.
          </p>
        )}
      </ul>

        {/* ---------hyundai parts and accessories------------- */}
      <section className="max-w-7xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200">
            HYUNDAI Parts and{" "}
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
