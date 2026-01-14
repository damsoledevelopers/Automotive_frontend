import React, { useState } from "react";
import { Link } from "react-router-dom";
import VehicleBreadcrumbs from "./VehicleBreadcrumbs";
import Article_Review from "../Article_Review";
import { getOriPartsLink } from "../../utils/oripartsBackUrl";

// 🔹 Vehicle Models - Exported for use in other components
export const marutiModels = [
    {
      id: 1,
      name: "MARUTI 1000",
      image:
        "https://boodmo.com/media/cache/vehicle_model/images/model/72b0977.webp",
      years: "10.1990 - 05.2000",
      link: "/vehicles/maruti-286/maruti_1000-12276/",
      modifications: [
        {
          generation: "1000 10.1990 - 05.2000",
          options: ["0.1L Petrol"],
        },
      ],
    },
    {
      id: 2,
      name: "MARUTI 800",
      image:
        "https://boodmo.com/media/cache/vehicle_model/images/model/237031b.webp",
      years: "12.1983 - 01.2014",
      link: "/vehicles/maruti-286/maruti_800-11226/",
      modifications: [
        {
          generation: "800 1ST GEN SS80 12.1983 - 06.1986",
          options: ["0.8L DX MT/Petrol", "0.8L STD MT/Petrol"],
        },
        {
          generation: "800 2ND GEN TYPE 2 10.1997 - 03.2005",
          options: [
            "0.8L A/C (CARB) MT/Petrol",
            "0.8L A/C (MPFI) MT/Petrol",
            "0.8L EX & DX 5-SPEED MT/Petrol",
            "0.8L STD (CARB) MT/Petrol",
            "0.8L STD (MPFI) MT/Petrol",
          ],
        },
        {
          generation: "800 2ND GEN TYPE 3 04.2005 - 01.2014",
          options: ["0.8L A/C MT/Petrol/BS3", "0.8L STD MT/Petrol/BS3"],
        },
      ],
    },
    {
      id: 3,
      name: "MARUTI A-STAR",
      image:
        "https://boodmo.com/media/cache/vehicle_model/images/model/5bd52b8.webp",
      years: "11.2008 - 11.2013",
      link: "/vehicles/maruti-286/maruti_a_star-14547/",
      modifications: [
        {
          generation: "A-STAR 11.2008 - 11.2013",
          options: [
            "1.0L AT (TYPE 2)/Petrol/BS3",
            "1.0L LXI MT (TYPE 1)/Petrol/BS3",
            "1.0L LXI MT (TYPE 2)/Petrol/66h.p./BS3",
            "1.0L VXI MT (TYPE 1)/Petrol/BS3",
            "1.0L VXI MT (TYPE 2)/Petrol/66h.p./BS3",
            "1.0L VXI MT ABS (TYPE 1)/Petrol/BS3",
            "1.0L VXI MT ABS (TYPE 2)/Petrol/66h.p./BS3",
            "1.0L ZXI MT (TYPE 1)/Petrol/BS3",
            "1.0L ZXI MT (TYPE 2)/Petrol/66h.p./BS3",
          ],
        },
      ],
    },
    {
      id: 4,
      name: "MARUTI ALTO",
      image:
        "https://boodmo.com/media/cache/vehicle_model/images/model/0ef27f7.webp",
      years: "07.2000 - 10.2012",
      link: "/vehicles/maruti-286/alto-11289/",
      modifications: [
        {
          generation: "ALTO 07.2000 - 10.2012",
          options: [
            "0.8L LX MT (TYPE 1)/Petrol/BS2",
            "0.8L LX MT (TYPE 2)/Petrol/47h.p./BS3",
            "0.8L LX MT (TYPE 2)/Petrol/39h.p./BS4",
            "0.8L LXI GREEN MT (TYPE 2)/Petrol/CNG/BS4",
            "0.8L LXI MT (TYPE 1)/Petrol/BS2",
            "0.8L LXI MT (TYPE 2)/Petrol/47h.p./BS3",
            "0.8L LXI MT (TYPE 2)/Petrol/39h.p./BS4",
            "0.8L STD MT (TYPE 1)/Petrol/BS2",
            "0.8L STD MT (TYPE 2)/Petrol/47h.p./BS3",
            "0.8L STD MT (TYPE 2)/Petrol/39h.p./BS4",
            "0.8L X-FUN MT (TYPE 2)/Petrol/BS3",
            "1.1L VX MT (TYPE 1)/Petrol/BS2",
            "1.1L VXI MT (TYPE 1)/Petrol/BS2",
          ],
        },
      ],
    },
    {
      id: 5,
      name: "MARUTI ALTO 800",
      image:
        "https://boodmo.com/media/cache/vehicle_model/images/model/20e12fb.webp",
      years: "11.2012 - 03.2023",
      link: "/vehicles/maruti-286/alto_800-12485/",
      modifications: [
        {
          generation: "ALTO 800 1ST GEN 11.2012 - 04.2016",
          options: [
            "0.8L LX MT (TYPE 1)/Petrol/CNG/BS4",
            "0.8L LX MT (TYPE 1)/Petrol/BS4",
            "0.8L LXI AIRBAG MT (TYPE 1)/Petrol/CNG/BS4",
            "0.8L LXI AIRBAG MT (TYPE 1)/Petrol/BS4",
            "0.8L LXI MT (TYPE 1)/Petrol/CNG/BS4",
            "0.8L LXI MT (TYPE 1)/Petrol/BS4",
            "0.8L LXI(O) MT (TYPE 1)/Petrol/BS4",
            "0.8L STD MT (TYPE 1)/Petrol/CNG/BS4",
            "0.8L STD MT (TYPE 1)/Petrol/BS4",
            "0.8L VXI AIRBAG MT (TYPE 1)/Petrol/BS4",
            "0.8L VXI MT (TYPE 1)/Petrol/BS4",
            "0.8L VXI(O) MT (TYPE 1)/Petrol/BS4",
          ],
        },
      ],
    },

    {
      id: 6,
      name: "MARUTI ALTO K10",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/96eebc4.webp",
      years: "08.2010 - now",
      link: "/vehicles/maruti-286/alto_k10-12484/",
      modifications: [
        {
          generation: "ALTO K10 1ST GEN 08.2010 - 09.2014",
          options: [
            "1.0L LXI MT (TYPE 1)/Petrol/BS4",
            "1.0L VXI MT (TYPE 1)/Petrol/BS4"
          ]
        },
        {
          generation: "ALTO K10 2ND GEN 10.2014 - 04.2020",
          options: [
            "1.0L LX MT (TYPE 2)/Petrol/67h.p./BS4",
            "1.0L LX(O) MT (TYPE 2)/Petrol/BS4",
            "1.0L LXI AGS (TYPE 2)/Petrol/67h.p./BS4",
            "1.0L LXI MT (TYPE 2)/Petrol/67h.p./BS4",
            "1.0L LXI MT (TYPE 2)/Petrol/CNG/67h.p./BS4",
            "1.0L LXI(O) MT (TYPE 2)/Petrol/CNG/BS4",
            "1.0L LXI(O) MT (TYPE 2)/Petrol/BS4",
            "1.0L VXI (O) MT (TYPE 2)/Petrol/BS4",
            "1.0L VXI AGS (TYPE 2)/Petrol/67h.p./BS4",
            "1.0L VXI AIRBAG MT (TYPE 2)/Petrol/67h.p./BS4",
            "1.0L VXI MT (TYPE 2)/Petrol/67h.p./BS4",
            "1.0L VXI(O) MT (TYPE 2)/Petrol/BS4"
          ]
        },
        {
          generation: "ALTO K10 3RD GEN 08.2022 - now",
          options: [
            "1.0L LXI MT (TYPE 3)/Petrol/CNG/BS6.2",
            "1.0L LXI MT (TYPE 3)/Petrol/BS6.2",
            "1.0L STD(O) MT (TYPE 3)/Petrol/BS6.2",
            "1.0L VXI AGS (TYPE 3)/Petrol/BS6.2",
            "1.0L VXI MT (TYPE 3)/Petrol/BS6.2",
            "1.0L VXI MT (TYPE 3)/Petrol/CNG/BS6.2",
            "1.0L VXI+ AGS (TYPE 3)/Petrol/BS6.2",
            "1.0L VXI+ MT (TYPE 3)/Petrol/BS6.2"
          ]
        }
      ]
    },

    {
      id: 7,
      name: "MARUTI BALENO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/f165d4d.webp",
      years: "12.1999 - now",
      link: "/vehicles/maruti-286/baleno-11921/",
      modifications: [
        {
          generation: "BALENO 1ST GEN 12.1999 - 03.2007",
          options: [
            "1.6L LXI MT (TYPE 2)/Petrol/BS2",
            "1.6L LXI MT (TYPE 3)/Petrol/BS3",
            "1.6L MT (TYPE 1)/Petrol/BS2",
            "1.6L VXI MT (TYPE 2)/Petrol/BS2",
            "1.6L VXI MT (TYPE 3)/Petrol/BS3",
          ],
        },
        {
          generation: "BALENO ALTURA 09.2000 - 03.2007",
          options: [
            "1.6L MT (TYPE 1)/Petrol/BS2",
            "1.6L MT (TYPE 2)/Petrol/BS2",
            "1.6L MT (TYPE 3)/Petrol/BS3",
          ],
        },
        {
          generation: "BALENO 2ND GEN 09.2015 - 01.2019",
          options: [
            "1.2L ALPHA CVT (TYPE 3)/Petrol/BS4",
            "1.2L ALPHA MT (TYPE 1)/Petrol/BS4",
            "1.2L ALPHA MT (TYPE 2)/Petrol/BS4",
            "1.2L ALPHA MT (TYPE 3)/Petrol/BS4",
            "1.2L DELTA CVT (TYPE 1)/Petrol/BS4",
            "1.2L DELTA CVT (TYPE 2)/Petrol/BS4",
            "1.2L DELTA CVT (TYPE 3)/Petrol/BS4",
            "1.2L DELTA MT (TYPE 1)/Petrol/BS4",
            "1.2L DELTA MT (TYPE 2)/Petrol/BS4",
            "1.2L DELTA MT (TYPE 3)/Petrol/BS4",
            "1.2L SIGMA MT (TYPE 1)/Petrol/BS4",
            "1.2L SIGMA MT (TYPE 2)/Petrol/BS4",
            "1.2L SIGMA MT (TYPE 3)/Petrol/BS4",
            "1.2L ZETA CVT (TYPE 1)/Petrol/BS4",
            "1.2L ZETA CVT (TYPE 2)/Petrol/BS4",
            "1.2L ZETA CVT (TYPE 3)/Petrol/BS4",
            "1.2L ZETA MT (TYPE 1)/Petrol/BS4",
            "1.2L ZETA MT (TYPE 2)/Petrol/BS4",
            "1.2L ZETA MT (TYPE 3)/Petrol/BS4",
            "1.3L ALPHA MT (TYPE 1)/Diesel/BS4",
            "1.3L ALPHA MT (TYPE 2)/Diesel/BS4",
            "1.3L ALPHA MT (TYPE 3)/Diesel/BS4",
            "1.3L DELTA MT (TYPE 1)/Diesel/BS4",
            "1.3L DELTA MT (TYPE 2)/Diesel/BS4",
            "1.3L DELTA MT (TYPE 3)/Diesel/BS4",
            "1.3L SIGMA MT (TYPE 1)/Diesel/BS4",
            "1.3L SIGMA MT (TYPE 2)/Diesel/BS4",
            "1.3L SIGMA MT (TYPE 3)/Diesel/BS4",
            "1.3L ZETA MT (TYPE 1)/Diesel/BS4",
            "1.3L ZETA MT (TYPE 2)/Diesel/BS4",
            "1.3L ZETA MT (TYPE 3)/Diesel/BS4",
          ],
        },
        {
          generation: "BALENO RS 03.2017 - 01.2019",
          options: ["1.0L MT/Petrol/BS4"],
        },
        {
          generation: "BALENO 2ND GEN F/L 01.2019 - 12.2021",
          options: [
            "1.2L ALPHA CVT/Petrol/BS6",
            "1.2L ALPHA MT/Petrol/BS6",
            "1.2L DELTA CVT/Petrol/BS6",
            "1.2L DELTA MT/Petrol/89h.p./BS6",
            "1.2L DELTA MT/Petrol/82h.p./BS6",
            "1.2L SIGMA MT/Petrol/BS6",
            "1.2L ZETA CVT/Petrol/BS6",
            "1.2L ZETA MT/Petrol/89h.p./BS6",
            "1.2L ZETA MT/Petrol/82h.p./BS6",
            "1.3L ALPHA MT/Diesel/BS4",
            "1.3L DELTA MT/Diesel/BS4",
            "1.3L SIGMA MT/Diesel/BS4",
            "1.3L ZETA MT/Diesel/BS4",
          ],
        },
        {
          generation: "BALENO RS F/L 01.2019 - 12.2019",
          options: ["1.0L MT/Petrol/BS4"],
        },
        {
          generation: "BALENO 3RD GEN 02.2022 - now",
          options: [
            "1.2L ALPHA AGS/Petrol/BS6",
            "1.2L ALPHA MT/Petrol/BS6",
            "1.2L DELTA AGS/Petrol/BS6",
            "1.2L DELTA MT/Petrol/BS6",
            "1.2L DELTA MT/Petrol/CNG/BS6",
            "1.2L SIGMA MT/Petrol/BS6",
            "1.2L ZETA AGS/Petrol/BS6",
            "1.2L ZETA MT/Petrol/BS6",
            "1.2L ZETA MT/Petrol/CNG/BS6",
          ],
        },
      ],
    },
    {
      id: 8,
      name: "MARUTI BREZZA",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/6ace99c.webp",
      years: "02.2016 - now",
      link: "/vehicles/maruti-286/vitara_brezza-12019/",
      modifications: [
        {
          generation: "VITARA BREZZA 1ST GEN 02.2016 - 12.2019",
          options: [
            "1.3L LDI MT/Diesel/BS4",
            "1.3L LDI(O) MT/Diesel/BS4",
            "1.3L VDI MT/Diesel/BS4",
            "1.3L VDI(O) MT/Diesel/BS4",
            "1.3L ZDI MT/Diesel/BS4",
            "1.3L ZDI+ MT/Diesel/BS4"
          ]
        },
        {
          generation: "VITARA BREZZA 1ST GEN F/L 01.2020 - 06.2022",
          options: [
            "1.5L LXI MT/Petrol/BS6",
            "1.5L VXI AT/Petrol/BS6",
            "1.5L VXI MT/Petrol/BS6",
            "1.5L ZXI AT/Petrol/BS6",
            "1.5L ZXI MT/Petrol/BS6",
            "1.5L ZXI+ AT/Petrol/BS6",
            "1.5L ZXI+ MT/Petrol/BS6"
          ]
        },
        {
          generation: "BREZZA 2ND GEN 07.2022 - now",
          options: [
            "1.5L LXI MT/Petrol/BS6.2",
            "1.5L LXI MT/Petrol/CNG/BS6.2",
            "1.5L VXI AT/Petrol/BS6.2",
            "1.5L VXI MT/Petrol/BS6.2",
            "1.5L VXI MT/Petrol/CNG/BS6.2",
            "1.5L ZXI AT/Petrol/BS6.2",
            "1.5L ZXI MT/Petrol/BS6.2",
            "1.5L ZXI MT/Petrol/CNG/BS6.2",
            "1.5L ZXI+ AT/Petrol/BS6.2",
            "1.5L ZXI+ MT/Petrol/BS6.2"
          ]
        }
      ]
    },
    {
      id: 9,
      name: "MARUTI CELERIO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/6b7ba56.webp",
      years: "12.2013 - now",
      link: "/vehicles/maruti-286/celerio-11304/",
      modifications: [
        {
          generation: "CELERIO 1ST GEN 12.2013 - 09.2017",
          options: [
            "0.8L LDI MT/Diesel/BS4",
            "0.8L VDI MT/Diesel/BS4",
            "0.8L ZDI DUAL AIRBAG MT/Diesel/BS4",
            "0.8L ZDI MT/Diesel/BS4",
            "1.0L LXI AGS/Petrol/BS4",
            "1.0L LXI MT/Petrol/BS4",
            "1.0L VXI AGS/Petrol/BS4",
            "1.0L VXI MT/Petrol/CNG/BS4",
            "1.0L VXI MT/Petrol/BS4",
            "1.0L ZXI AGS/Petrol/BS4",
            "1.0L ZXI DUAL AIRBAG MT/Petrol/BS4",
            "1.0L ZXI MT/Petrol/BS4"
          ]
        },
        {
          generation: "CELERIO 1ST GEN F/L 10.2017 - 11.2021",
          options: [
            "1.0L LXI AGS/Petrol/68h.p./BS4",
            "1.0L LXI AGS/Petrol/68h.p./BS6",
            "1.0L LXI MT/Petrol/68h.p./BS4",
            "1.0L LXI MT/Petrol/68h.p./BS6",
            "1.0L VXI AGS/Petrol/68h.p./BS4",
            "1.0L VXI AGS/Petrol/68h.p./BS6",
            "1.0L VXI MT/Petrol/CNG/68h.p./BS4",
            "1.0L VXI MT/Petrol/68h.p./BS4",
            "1.0L VXI MT/Petrol/68h.p./BS6",
            "1.0L VXI MT/Petrol/CNG/68h.p./BS6",
            "1.0L ZXI AGS/Petrol/68h.p./BS4",
            "1.0L ZXI AGS/Petrol/68h.p./BS6",
            "1.0L ZXI DUAL AIRBAG MT/Petrol/68h.p./BS4",
            "1.0L ZXI DUAL AIRBAG MT/Petrol/68h.p./BS6",
            "1.0L ZXI MT/Petrol/68h.p./BS4",
            "1.0L ZXI MT/Petrol/68h.p./BS6"
          ]
        },
        {
          generation: "CELERIO X 11.2017 - 06.2020",
          options: [
            "1.0L VXI AGS/Petrol/BS4",
            "1.0L VXI MT/Petrol/BS4",
            "1.0L VXI(O) AGS/Petrol/BS4",
            "1.0L VXI(O) MT/Petrol/BS4",
            "1.0L ZXI AGS/Petrol/BS4",
            "1.0L ZXI MT/Petrol/BS4",
            "1.0L ZXI(O) AGS/Petrol/BS4",
            "1.0L ZXI(O) MT/Petrol/BS4"
          ]
        },
        {
          generation: "CELERIO 2ND GEN 11.2021 - now",
          options: [
            "1.0L LXI MT/Petrol/BS6",
            "1.0L VXI AGS/Petrol/BS6",
            "1.0L VXI MT/Petrol/BS6",
            "1.0L VXI MT/Petrol/CNG/BS6",
            "1.0L ZXI AGS/Petrol/BS6",
            "1.0L ZXI MT/Petrol/BS6",
            "1.0L ZXI+ AGS/Petrol/BS6",
            "1.0L ZXI+ MT/Petrol/BS6"
          ]
        }
      ]
    },
    {
      id: 10,
      name: "MARUTI CIAZ",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/6d7ba40.webp",
      years: "07.2014 - now",
      link: "/vehicles/maruti-286/ciaz-11305/",
      modifications: [
        {
          generation: "CIAZ 1ST GEN 07.2014 - 07.2018",
          options: [
            "1.3L RS MT/Diesel/BS4",
            "1.3L VDI MT/Diesel/88h.p./BS4",
            "1.3L ZDI MT/Diesel/88h.p./BS4",
            "1.4L RS MT/Petrol/BS4",
            "1.4L S MT/Petrol/BS4",
            "1.4L VXI AT/Petrol/BS4",
            "1.4L VXI MT/Petrol/BS4",
            "1.4L ZXI AT/Petrol/BS4",
            "1.4L ZXI MT/Petrol/BS4"
          ]
        },
        {
          generation: "CIAZ 1ST GEN F/L 08.2018 - now",
          options: [
            "1.3L VDI MT/Diesel/BS4",
            "1.3L ZDI MT/Diesel/BS4",
            "1.5L RS MT/Petrol/BS4",
            "1.5L VDI+ MT/Diesel/BS4",
            "1.5L VXI AT/Petrol/103h.p./BS4",
            "1.5L VXI AT/Petrol/105h.p./BS6",
            "1.5L VXI MT/Petrol/103h.p./BS4",
            "1.5L VXI MT/Petrol/105h.p./BS6",
            "1.5L ZDI MT/Diesel/BS4",
            "1.5L ZDI+ MT/Diesel/BS4",
            "1.5L ZXI AT/Petrol/103h.p./BS4",
            "1.5L ZXI AT/Petrol/105h.p./BS6",
            "1.5L ZXI MT/Petrol/103h.p./BS4",
            "1.5L ZXI MT/Petrol/105h.p./BS6"
          ]
        }
      ]
    },

    {
      id: 11,
      name: "MARUTI EECO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/7950b50.webp",
      years: "01.2010 - now",
      link: "/vehicles/maruti-286/eeco-11291/",
      modifications: [
        {
          generation: "EECO 01.2010 - 10.2022",
          options: [
            "1.2L 5S AC MT/Petrol/73h.p./BS4",
            "1.2L 5S AC MT/Petrol/CNG/62h.p./BS4",
            "1.2L 5S AC MT/Petrol/CNG/62h.p./BS4",
            "1.2L 5S AC MT/Petrol/73h.p./BS6",
            "1.2L 5S STD MT/Petrol/73h.p./BS4",
            "1.2L 5S STD MT/Petrol/CNG/BS4",
            "1.2L 5S STD MT/Petrol/73h.p./BS6",
            "1.2L 7S STD MT/Petrol/73h.p./BS4",
            "1.2L 7S STD MT/Petrol/73h.p./BS6"
          ]
        },
        {
          generation: "EECO F/L 11.2022 - now",
          options: [
            "1.2L 5S AC MT/Petrol/CNG/BS6.2",
            "1.2L 5S AC MT/Petrol/BS6.2",
            "1.2L 5S STD MT/Petrol/BS6.2",
            "1.2L 7S STD MT/Petrol/BS6.2"
          ]
        }
      ]
    },

    {
      id: 12,
      name: "MARUTI ERTIGA",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/0dfb2b1.webp",
      years: "03.2012 - now",
      link: "/vehicles/maruti-286/ertiga-11292/",
      modifications: [
        {
          generation: "ERTIGA 1ST GEN 03.2012 - 08.2015",
          options: [
            "1.3L LDI MT (TYPE 1)/Diesel/BS4",
            "1.3L VDI LIMITED EDITION MT (TYPE 1)/Diesel/BS4",
            "1.3L VDI MT (TYPE 1)/Diesel/BS4",
            "1.3L ZDI MT (TYPE 1)/Diesel/BS4",
            "1.4L LXI GREEN MT (TYPE 1)/Petrol/CNG/BS4",
            "1.4L LXI MT (TYPE 1)/Petrol/BS4",
            "1.4L VXI GREEN MT (TYPE 1)/Petrol/CNG/BS4",
            "1.4L VXI LIMITED EDITION MT (TYPE 1)/Petrol/BS4",
            "1.4L VXI MT (TYPE 1)/Petrol/BS4",
            "1.4L VXI(O) GREEN MT (TYPE 1)/Petrol/CNG/BS4",
            "1.4L VXI(O) MT (TYPE 1)/Petrol/BS4",
            "1.4L ZXI MT (TYPE 1)/Petrol/BS4"
          ]
        },
        {
          generation: "ERTIGA 1ST GEN F/L 08.2015 - 08.2018",
          options: [
            "1.3L LDI MT (TYPE 2)/Diesel/BS4",
            "1.3L LDI(O) MT (TYPE 2)/Diesel/BS4",
            "1.3L VDI LIMITED MT (TYPE 2)/Diesel/BS4",
            "1.3L VDI MT (TYPE 2)/Diesel/BS4",
            "1.3L ZDI MT (TYPE 2)/Diesel/BS4",
            "1.3L ZDI+ MT (TYPE 2)/Diesel/BS4",
            "1.4L LXI MT (TYPE 2)/Petrol/BS4",
            "1.4L LXI(O) MT (TYPE 2)/Petrol/BS4",
            "1.4L VXI AT (TYPE 2)/Petrol/BS4",
            "1.4L VXI LIMITED EDITION MT (TYPE 2)/Petrol/BS4",
            "1.4L VXI MT (TYPE 2)/Petrol/BS4",
            "1.4L VXI MT (TYPE 2)/Petrol/CNG/BS4",
            "1.4L ZXI MT (TYPE 2)/Petrol/BS4",
            "1.4L ZXI+ MT (TYPE 2)/Petrol/BS4"
          ]
        },
        {
          generation: "ERTIGA 2ND GEN 08.2018 - 03.2022",
          options: [
            "1.3L LDI MT/Diesel/BS4",
            "1.3L VDI MT/Diesel/BS4",
            "1.3L ZDI MT/Diesel/BS4",
            "1.3L ZDI+ MT/Diesel/BS4",
            "1.5L LXI MT/Petrol/103h.p./BS4",
            "1.5L LXI MT/Petrol/103h.p./BS6",
            "1.5L TOUR M/Petrol/CNG/BS6",
            "1.5L TOUR M/Petrol/BS6",
            "1.5L TOUR M/Diesel/BS6",
            "1.5L VDI MT/Diesel/BS4",
            "1.5L VXI AT/Petrol/103h.p./BS4",
            "1.5L VXI AT/Petrol/103h.p./BS6",
            "1.5L VXI MT/Petrol/CNG/103h.p./BS4",
            "1.5L VXI MT/Petrol/103h.p./BS4",
            "1.5L VXI MT/Petrol/CNG/103h.p./BS6",
            "1.5L VXI MT/Petrol/103h.p./BS6",
            "1.5L ZDI MT/Diesel/BS4",
            "1.5L ZDI+ MT/Diesel/BS4",
            "1.5L ZXI AT/Petrol/103h.p./BS4",
            "1.5L ZXI AT/Petrol/103h.p./BS6",
            "1.5L ZXI MT/Petrol/103h.p./BS4",
            "1.5L ZXI MT/Petrol/103h.p./BS6",
            "1.5L ZXI+ MT/Petrol/103h.p./BS4",
            "1.5L ZXI+ MT/Petrol/103h.p./BS6"
          ]
        },
        {
          generation: "ERTIGA 2ND GEN F/L 03.2022 - now",
          options: [
            "1.5L LXI MT/Petrol/103h.p./BS6.2",
            "1.5L TOUR M MT/Petrol/CNG/88h.p./BS6.2",
            "1.5L TOUR M MT/Petrol/103h.p./BS6.2",
            "1.5L VXI AT/Petrol/103h.p./BS6.2",
            "1.5L VXI MT/Petrol/CNG/88h.p./BS6.2",
            "1.5L VXI MT/Petrol/103h.p./BS6.2",
            "1.5L ZXI AT/Petrol/103h.p./BS6.2",
            "1.5L ZXI MT/Petrol/103h.p./BS6.2",
            "1.5L ZXI MT/Petrol/CNG/88h.p./BS6.2",
            "1.5L ZXI MT/Petrol/CNG/103h.p./BS6.2",
            "1.5L ZXI+ AT/Petrol/103h.p./BS6.2",
            "1.5L ZXI+ MT/Petrol/103h.p./BS6.2"
          ]
        }
      ]
    },
    {
      id: 13,
      name: "MARUTI ESTEEM",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/f3b9153.webp",
      years: "11.1994 - 03.2008",
      link: "/vehicles/maruti-286/esteem-11306/",
      modifications: [
        {
          generation: "ESTEEM TYPE-1 11.1994 - 12.1997",
          options: [
            "1.3L AX (CARB)/Petrol",
            "1.3L LX (CARB)/Petrol",
            "1.3L VX (CARB)/Petrol"
          ]
        },
        {
          generation: "ESTEEM TYPE-2 12.1997 - 07.2004",
          options: [
            "1.3L AX (CARB)/Petrol",
            "1.3L AX (MPFI)/Petrol/BS1",
            "1.3L LX (CARB)/Petrol",
            "1.3L LX (MPFI)/Petrol/BS1",
            "1.3L LXI (MPFI)/Petrol/BS1",
            "1.3L VXI (MPFI)/Petrol/BS1",
            "1.5L D/Diesel/BS2",
            "1.5L DI/Diesel/BS2"
          ]
        },
        {
          generation: "ESTEEM TYPE-3 07.2004 - 03.2008",
          options: [
            "1.3L LX (MPFI)/Petrol/BS2",
            "1.3L LXI (MPFI)/Petrol/BS2",
            "1.3L VXI (MPFI)/Petrol/BS2",
            "1.5L D/Diesel/BS2",
            "1.5L DI/Diesel/BS2"
          ]
        }
      ]
    },
    {
      id: 14,
      name: "MARUTI FRONX",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/f2572ae.webp",
      years: "04.2023 - now",
      link: "/vehicles/maruti-286/fronx-12640/",
      modifications: [
        {
          generation: "FRONX 04.2023 - now",
          options: [
            "1.0L ALPHA AT/Petrol/BS6.2",
            "1.0L ALPHA MT/Petrol/BS6.2",
            "1.0L DELTA+ MT/Petrol/BS6.2",
            "1.0L ZETA AT/Petrol/BS6.2",
            "1.0L ZETA MT/Petrol/BS6.2",
            "1.2L DELTA AGS/Petrol/BS6.2",
            "1.2L DELTA MT/Petrol/BS6.2",
            "1.2L DELTA MT/Petrol/CNG/BS6.2",
            "1.2L DELTA+ AGS/Petrol/BS6.2",
            "1.2L DELTA+ MT/Petrol/BS6.2",
            "1.2L SIGMA MT/Petrol/BS6.2",
            "1.2L SIGMA MT/Petrol/CNG/BS6.2"
          ]
        }
      ]
    },
    {
      id: 15,
      name: "MARUTI GRAND VITARA",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/ee1bcee.webp",
      years: "06.2007 - now",
      link: "/vehicles/maruti-286/grand_vitara-11294/",
      modifications: [
        {
          generation: "GRAND VITARA 2ND GEN 06.2007 - 10.2015",
          options: [
            "2.0L AT (TYPE 1)/Petrol",
            "2.0L MT (TYPE 1)/Petrol",
            "2.4L AT/MT (TYPE 2)/Petrol"
          ]
        },
        {
          generation: "GRAND VITARA 3RD GEN 10.2022 - now",
          options: [
            "1.5L ALPHA ALL GRIP MT/Petrol/BS6.2",
            "1.5L ALPHA AT/Petrol/BS6.2",
            "1.5L ALPHA MT/Petrol/BS6.2",
            "1.5L ALPHA+ CVT/Hybrid/BS6.2",
            "1.5L DELTA AT/Petrol/BS6.2",
            "1.5L DELTA MT/Petrol/BS6.2",
            "1.5L DELTA MT/Petrol/CNG/BS6.2",
            "1.5L DELTA+ CVT/Hybrid/BS6.2",
            "1.5L SIGMA MT/Petrol/BS6.2",
            "1.5L ZETA AT/Petrol/BS6.2",
            "1.5L ZETA MT/Petrol/BS6.2",
            "1.5L ZETA MT/Petrol/CNG/BS6.2",
            "1.5L ZETA+ CVT/Hybrid/BS6.2"
          ]
        }
      ]
    },
    {
      id: 16,
      name: "MARUTI GRAND VITARA XL7",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/260978a.webp",
      years: "06.2003 - 05.2005",
      link: "/vehicles/maruti-286/xl7-12524/",
      modifications: [
        {
          generation: "XL7 1ST GEN 06.2003 - 05.2005",
          options: [
            "2.7L AT/Petrol",
            "2.7L MT/Petrol"
          ]
        }
      ]
    },
    {
      id: 17,
      name: "MARUTI GYPSY",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/12c6b28.webp",
      years: "12.1985 - 01.2019",
      link: "/vehicles/maruti-286/gypsy-11295/",
      modifications: [
        {
          generation: "GYPSY 12.1985 - 12.1999",
          options: [
            "1.0L MT (MG410)/Petrol",
            "1.0L MT (MG410W)/Petrol"
          ]
        },
        {
          generation: "GYPSY KING 06.1996 - 01.2019",
          options: [
            "1.3L 4WD MT/Petrol/82h.p.",
            "1.3L 4WD MT/Petrol/82h.p./BS2",
            "1.3L 4WD MT (BS-III)/Petrol/BS3",
            "1.3L 4WD MT (BS-IV)/Petrol/BS4"
          ]
        }
      ]
    },
    {
      id: 18,
      name: "MARUTI IGNIS",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/da1d67c.webp",
      years: "01.2017 - now",
      link: "/vehicles/maruti-286/ignis-12168/",
      modifications: [
        {
          generation: "IGNIS 1ST GEN 01.2017 - 12.2018",
          options: [
            "1.2L ALPHA AGS/Petrol/BS4",
            "1.2L ALPHA MT/Petrol/BS4",
            "1.2L ALPHA SLDA MT/Petrol/BS4",
            "1.2L DELTA AGS/Petrol/BS4",
            "1.2L DELTA MT/Petrol/BS4",
            "1.2L SIGMA MT/Petrol/BS4",
            "1.2L ZETA AGS/Petrol/BS4",
            "1.2L ZETA MT/Petrol/BS4",
            "1.3L ALPHA AGS/Diesel/BS4",
            "1.3L ALPHA MT/Diesel/BS4",
            "1.3L ALPHA SLDA MT/Diesel/BS4",
            "1.3L DELTA AGS/Diesel/BS4",
            "1.3L DELTA MT/Diesel/BS4",
            "1.3L SIGMA MT/Diesel/BS4",
            "1.3L ZETA AGS/Diesel/BS4",
            "1.3L ZETA MT/Diesel/BS4"
          ]
        },
        {
          generation: "IGNIS 1ST GEN F/L 01.2020 - now",
          options: [
            "1.2L ALPHA AGS/Petrol/BS6",
            "1.2L ALPHA MT/Petrol/BS6",
            "1.2L DELTA AGS/Petrol/BS6",
            "1.2L DELTA MT/Petrol/BS6",
            "1.2L SIGMA MT/Petrol/BS6",
            "1.2L ZETA AGS/Petrol/BS6",
            "1.2L ZETA MT/Petrol/BS6"
          ]
        }
      ]
    },

    {
      id: 19,
      name: "MARUTI INVICTO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/6c18e0f.webp",
      years: "07.2023 - now",
      link: "/vehicles/maruti-286/invicto-12672/",
      modifications: [
        {
          generation: "INVICTO 07.2023 - now",
          options: [
            "2.0L ALPHA+ 7S/Hybrid/BS6.2",
            "2.0L ZETA+ 7S/Hybrid/BS6.2",
            "2.0L ZETA+ 8S/Hybrid/BS6.2"
          ]
        }
      ]
    },
    {
      id: 20,
      name: "MARUTI JIMNY",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/5cc16a2.webp",
      years: "06.2023 - now",
      link: "/vehicles/maruti-286/jimny-12653/",
      modifications: [
        {
          generation: "JIMNY 06.2023 - now",
          options: [
            "1.5L ALPHA AT/Petrol/BS6.2",
            "1.5L ALPHA MT/Petrol/BS6.2",
            "1.5L ZETA AT/Petrol/BS6.2",
            "1.5L ZETA MT/Petrol/BS6.2"
          ]
        }
      ]
    },

    {
      id: 21,
      name: "MARUTI KIZASHI",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/80fa883.webp",
      years: "02.2011 - 12.2014",
      link: "/vehicles/maruti-286/kizashi-11296/",
      modifications: [
        {
          generation: "KIZASHI 02.2011 - 12.2014",
          options: [
            "2.4L CVT/Petrol",
            "2.4L MT/Petrol"
          ]
        }
      ]
    },

    {
      id: 22,
      name: "MARUTI OMNI",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/af17591.webp",
      years: "12.1984 - 05.2019",
      link: "/vehicles/maruti-286/omni-11297/",
      modifications: [
        {
          generation: "OMNI 1ST GEN 12.1984 - 01.1999",
          options: [
            "0.8L MT/Petrol"
          ]
        },
        {
          generation: "OMNI 2ND GEN 01.1998 - 02.2005",
          options: [
            "0.8L MT/Petrol/35h.p.",
            "0.8L MT/Petrol/35h.p."
          ]
        },
        {
          generation: "OMNI 3RD GEN 03.2005 - 05.2019",
          options: [
            "0.8L MT/Petrol",
            "0.8L MT/Petrol/LPG"
          ]
        }
      ]
    },

    {
      id: 23,
      name: "MARUTI RITZ",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/5dc9e3e.webp",
      years: "04.2009 - 02.2017",
      link: "/vehicles/maruti-286/ritz-11298/",
      modifications: [
        {
          generation: "RITZ 1ST GEN 04.2009 - 07.2012",
          options: [
            "1.2L GENUS VXI MT (TYPE 1)/Petrol/BS4",
            "1.2L LXI MT (TYPE 1)/Petrol/BS4",
            "1.2L VXI MT (TYPE 1)/Petrol/BS4",
            "1.2L VXI MT ABS (TYPE 1)/Petrol/BS4",
            "1.2L ZXI MT (TYPE 1)/Petrol/BS4",
            "1.3L GENUS VDI MT (TYPE 1)/Diesel/BS4",
            "1.3L LDI MT (TYPE 1)/Diesel/BS4",
            "1.3L VDI MT (TYPE 1)/Diesel/BS4",
            "1.3L VDI MT ABS (TYPE 1)/Diesel/BS4"
          ]
        },
        {
          generation: "RITZ 1ST GEN F/L 08.2012 - 02.2017",
          options: [
            "1.2L AT (TYPE 2)/Petrol/BS4",
            "1.2L LXI MT (TYPE 2)/Petrol/BS4",
            "1.2L VXI MT (TYPE 2)/Petrol/BS4",
            "1.2L VXI MT ABS (TYPE 2)/Petrol/BS4",
            "1.2L ZXI MT (TYPE 2)/Petrol/BS4",
            "1.3L LDI MT (TYPE 2)/Diesel/BS4",
            "1.3L VDI MT (TYPE 2)/Diesel/BS4",
            "1.3L VDI MT ABS (TYPE 2)/Diesel/BS4",
            "1.3L ZDI MT (TYPE 2)/Diesel/BS4"
          ]
        }
      ]
    },

    {
      id: 24,
      name: "MARUTI S-CROSS",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/750063f.webp",
      years: "08.2015 - 10.2022",
      link: "/vehicles/maruti-286/s_cross-11923/",
      modifications: [
        {
          generation: "S-CROSS 1ST GEN 08.2015 - 08.2017",
          options: [
            "1.3L ALPHA MT/Diesel/BS4",
            "1.3L DELTA MT/Diesel/BS4",
            "1.3L SIGMA MT/Diesel/BS4",
            "1.3L ZETA MT/Diesel/BS4",
            "1.6L ALPHA MT/Diesel/BS4",
            "1.6L DELTA MT/Diesel/BS4",
            "1.6L ZETA MT/Diesel/BS4"
          ]
        },
        {
          generation: "S-CROSS 1ST GEN F/L 08.2017 - 10.2022",
          options: [
            "1.3L ALPHA MT/Diesel/BS4",
            "1.3L DELTA MT/Diesel/BS4",
            "1.3L SIGMA MT/Diesel/BS4",
            "1.3L ZETA MT/Diesel/BS4",
            "1.5L ALPHA AT/Petrol/BS6",
            "1.5L ALPHA MT/Petrol/BS6",
            "1.5L DELTA AT/Petrol/BS6",
            "1.5L DELTA MT/Petrol/BS6",
            "1.5L SIGMA MT/Petrol/BS6",
            "1.5L ZETA AT/Petrol/BS6",
            "1.5L ZETA MT/Petrol/BS6"
          ]
        }
      ]
    },

    {
      id: 25,
      name: "MARUTI S-PRESSO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/e0acffd.webp",
      years: "09.2019 - now",
      link: "/vehicles/maruti-286/s_presso-12351/",
      modifications: [
        {
          generation: "S-PRESSO 09.2019 - now",
          options: [
            "1.0L LXI MT/Petrol/67h.p./BS6",
            "1.0L LXI MT/Petrol/CNG/67h.p./BS6",
            "1.0L LXI MT/Petrol/CNG/67h.p./BS6.2",
            "1.0L LXI MT/Petrol/67h.p./BS6.2",
            "1.0L LXI(O) MT/Petrol/BS6",
            "1.0L LXI(O) MT/Petrol/CNG/BS6",
            "1.0L STD MT/Petrol/67h.p./BS6",
            "1.0L STD MT/Petrol/67h.p./BS6.2",
            "1.0L STD(O) MT/Petrol/BS6",
            "1.0L VXI AGS/Petrol/BS6",
            "1.0L VXI MT/Petrol/67h.p./BS6",
            "1.0L VXI MT/Petrol/CNG/67h.p./BS6",
            "1.0L VXI MT/Petrol/CNG/67h.p./BS6.2",
            "1.0L VXI MT/Petrol/67h.p./BS6.2",
            "1.0L VXI(O) AGS/Petrol/67h.p./BS6",
            "1.0L VXI(O) AGS/Petrol/67h.p./BS6.2",
            "1.0L VXI(O) MT/Petrol/BS6",
            "1.0L VXI(O) MT/Petrol/CNG/BS6",
            "1.0L VXI+ AGS/Petrol/BS6",
            "1.0L VXI+ MT/Petrol/67h.p./BS6",
            "1.0L VXI+ MT/Petrol/67h.p./BS6.2",
            "1.0L VXI+(O) AGS/Petrol/BS6.2"
          ]
        }
      ]
    },

    {
      id: 26,
      name: "MARUTI SUPER CARRY",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/4839b99.webp",
      years: "09.2016 - now",
      link: "/vehicles/maruti-286/super_carry-12273/",
      modifications: [
        {
          generation: "SUPER CARRY 09.2016 - now",
          options: [
            "0.8L/Diesel/BS4",
            "1.2L/Petrol/64h.p./BS4",
            "1.2L/Petrol/CNG/64h.p./BS4",
            "1.2L/Petrol/72h.p./BS6",
            "1.2L/Petrol/CNG/72h.p./BS6",
            "1.2L/Petrol/72h.p./BS6.2",
            "1.2L/Petrol/CNG/68h.p./BS6.2"
          ]
        }
      ]
    },

    {
      id: 27,
      name: "MARUTI SWIFT",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/95b53a5.webp",
      years: "05.2005 - now",
      link: "/vehicles/maruti-286/swift-11299/",
      modifications: [
        {
          generation: "SWIFT 1ST GEN 05.2005 - 05.2011",
          options: [
            "1.2L LXI MT (TYPE 4)/Petrol/BS4",
            "1.2L VXI MT (TYPE 4)/Petrol/BS4",
            "1.2L VXI(1 MILLION EDITION) MT/Petrol/BS4",
            "1.2L VXI(O) MT (TYPE 4)/Petrol/BS4",
            "1.2L ZXI MT (TYPE 4)/Petrol/BS4",
            "1.3L GLAM EDITION MT (TYPE 3)/Petrol/BS3",
            "1.3L LDI MT (TYPE 2)/Diesel/BS3",
            "1.3L LDI MT (TYPE 3)/Diesel/BS3",
            "1.3L LDI MT (TYPE 4)/Diesel/BS4",
            "1.3L LXI MT (TYPE 1)/Petrol/BS3",
            "1.3L LXI MT (TYPE 2)/Petrol/BS3",
            "1.3L LXI MT (TYPE 3)/Petrol/BS3",
            "1.3L VDI MT (TYPE 2)/Diesel/BS3",
            "1.3L VDI MT (TYPE 3)/Diesel/BS3",
            "1.3L VDI MT (TYPE 4)/Diesel/BS4",
            "1.3L VDI(O) MT (TYPE 2)/Diesel/BS3",
            "1.3L VDI(O) MT (TYPE 3)/Diesel/BS3",
            "1.3L VDI(O) MT (TYPE 4)/Diesel/BS4",
            "1.3L VXI MT (TYPE 1)/Petrol/BS3",
            "1.3L VXI MT (TYPE 2)/Petrol/BS3",
            "1.3L VXI MT (TYPE 3)/Petrol/BS3",
            "1.3L VXI(O) MT (TYPE 1)/Petrol/BS3",
            "1.3L VXI(O) MT (TYPE 2)/Petrol/BS3",
            "1.3L VXI(O) MT (TYPE 3)/Petrol/BS3",
            "1.3L ZXI MT (TYPE 1)/Petrol/BS3",
            "1.3L ZXI MT (TYPE 2)/Petrol/BS3",
            "1.3L ZXI MT (TYPE 3)/Petrol/BS3"
          ]
        },
        {
          generation: "SWIFT 2ND GEN 06.2011 - 09.2014",
          options: [
            "1.2L LXI MT (TYPE 1)/Petrol/BS4",
            "1.2L LXI MT (TYPE 2)/Petrol/BS4",
            "1.2L VXI MT (TYPE 1)/Petrol/BS4",
            "1.2L VXI MT (TYPE 2)/Petrol/BS4",
            "1.2L ZXI MT (TYPE 1)/Petrol/BS4",
            "1.2L ZXI MT (TYPE 2)/Petrol/BS4",
            "1.3L LDI MT (TYPE 1)/Diesel/BS4",
            "1.3L LDI MT (TYPE 2)/Diesel/BS4",
            "1.3L VDI MT (TYPE 1)/Diesel/BS4",
            "1.3L VDI MT (TYPE 2)/Diesel/BS4",
            "1.3L ZDI MT (TYPE 1)/Diesel/BS4",
            "1.3L ZDI MT (TYPE 2)/Diesel/BS4"
          ]
        },
        {
          generation: "SWIFT 2ND GEN F/L 10.2014 - 12.2017",
          options: [
            "1.2L DLX MT (TYPE 4)/Petrol/BS4",
            "1.2L LXI MT (TYPE 3)/Petrol/BS4",
            "1.2L LXI MT (TYPE 4)/Petrol/BS4",
            "1.2L LXI MT (TYPE 5)/Petrol/BS4",
            "1.2L LXI(O) MT (TYPE 3)/Petrol/BS4",
            "1.2L LXI(O) MT (TYPE 4)/Petrol/BS4",
            "1.2L LXI(O) MT (TYPE 5)/Petrol/BS4",
            "1.2L VXI MT (TYPE 3)/Petrol/BS4",
            "1.2L VXI MT (TYPE 4)/Petrol/BS4",
            "1.2L VXI MT (TYPE 5)/Petrol/BS4",
            "1.2L VXI(O) MT (TYPE 3)/Petrol/BS4",
            "1.2L VXI(O) MT (TYPE 4)/Petrol/BS4",
            "1.2L VXI(O) MT (TYPE 5)/Petrol/BS4",
            "1.2L ZXI MT (TYPE 3)/Petrol/BS4",
            "1.2L ZXI MT (TYPE 4)/Petrol/BS4",
            "1.2L ZXI MT (TYPE 5)/Petrol/BS4",
            "1.3L DLX MT (TYPE 4)/Diesel/BS4",
            "1.3L LDI MT (TYPE 3)/Diesel/BS4",
            "1.3L LDI MT (TYPE 4)/Diesel/BS4",
            "1.3L LDI MT (TYPE 5)/Diesel/BS4",
            "1.3L LDI(O) MT (TYPE 3)/Diesel/BS4",
            "1.3L LDI(O) MT (TYPE 4)/Diesel/BS4",
            "1.3L LDI(O) MT (TYPE 5)/Diesel/BS4",
            "1.3L VDI MT (TYPE 3)/Diesel/BS4",
            "1.3L VDI MT (TYPE 4)/Diesel/BS4",
            "1.3L VDI MT (TYPE 5)/Diesel/BS4",
            "1.3L VDI(O) MT (TYPE 3)/Diesel/BS4",
            "1.3L VDI(O) MT (TYPE 4)/Diesel/BS4",
            "1.3L VDI(O) MT (TYPE 5)/Diesel/BS4",
            "1.3L ZDI MT (TYPE 3)/Diesel/BS4",
            "1.3L ZDI MT (TYPE 4)/Diesel/BS4",
            "1.3L ZDI MT (TYPE 5)/Diesel/BS4"
          ]
        },
        {
          generation: "SWIFT 3RD GEN 01.2018 - 02.2021",
          options: [
            "1.2L LXI MT/Petrol/82h.p./BS4",
            "1.2L LXI MT/Petrol/82h.p./BS6",
            "1.2L VXI AGS/Petrol/82h.p./BS4",
            "1.2L VXI AGS/Petrol/82h.p./BS6",
            "1.2L VXI MT/Petrol/82h.p./BS4",
            "1.2L VXI MT/Petrol/82h.p./BS6",
            "1.2L ZXI AGS/Petrol/82h.p./BS4",
            "1.2L ZXI AGS/Petrol/82h.p./BS6",
            "1.2L ZXI MT/Petrol/82h.p./BS4",
            "1.2L ZXI MT/Petrol/82h.p./BS6",
            "1.2L ZXI+ AGS/Petrol/82h.p./BS4",
            "1.2L ZXI+ AGS/Petrol/82h.p./BS6",
            "1.2L ZXI+ MT/Petrol/82h.p./BS4",
            "1.2L ZXI+ MT/Petrol/82h.p./BS6",
            "1.3L LDI MT/Diesel/BS4",
            "1.3L VDI AGS/Diesel/BS4",
            "1.3L VDI MT/Diesel/BS4",
            "1.3L ZDI AGS/Diesel/BS4",
            "1.3L ZDI MT/Diesel/BS4",
            "1.3L ZDI+ AGS/Diesel/BS4",
            "1.3L ZDI+ MT/Diesel/BS4"
          ]
        },
        {
          generation: "SWIFT 3RD GEN F/L 03.2021 - 04.2024",
          options: [
            "1.2L LXI MT/Petrol/BS6",
            "1.2L VXI AGS/Petrol/BS6",
            "1.2L VXI MT/Petrol/BS6",
            "1.2L VXI MT/Petrol/CNG/BS6",
            "1.2L ZXI AGS/Petrol/BS6",
            "1.2L ZXI MT/Petrol/BS6",
            "1.2L ZXI MT/Petrol/CNG/BS6",
            "1.2L ZXI+ AGS/Petrol/BS6",
            "1.2L ZXI+ MT/Petrol/BS6"
          ]
        },
        {
          generation: "SWIFT 4TH GEN 05.2024 - now",
          options: [
            "1.2L LXI MT/Petrol/BS6.2",
            "1.2L VXI AGS/Petrol/BS6.2",
            "1.2L VXI MT/Petrol/BS6.2",
            "1.2L VXI MT/Petrol/CNG/BS6.2",
            "1.2L VXI(O) AGS/Petrol/BS6.2",
            "1.2L VXI(O) MT/Petrol/BS6.2",
            "1.2L VXI(O) MT/Petrol/CNG/BS6.2",
            "1.2L ZXI AGS/Petrol/BS6.2",
            "1.2L ZXI MT/Petrol/BS6.2",
            "1.2L ZXI MT/Petrol/CNG/BS6.2",
            "1.2L ZXI+ AGS/Petrol/BS6.2",
            "1.2L ZXI+ MT/Petrol/BS6.2"
          ]
        }
      ]
    },

    {
      id: 28,
      name: "MARUTI SWIFT DZIRE",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/a446e5f.webp",
      years: "03.2008 - now",
      link: "/vehicles/maruti-286/swift_dzire-11290/",
      modifications: [
        {
          generation: "SWIFT DZIRE 1ST GEN 03.2008 - 03.2017",
          options: [
            "1.2L LXI MT (TYPE 2)/Petrol/BS4",
            "1.2L TOUR MT/Petrol/BS4",
            "1.2L VXI MT (TYPE 2)/Petrol/BS4",
            "1.2L ZXI MT (TYPE 2)/Petrol/BS4",
            "1.3L LDI MT (TYPE 1)/Diesel/BS3",
            "1.3L LDI MT (TYPE 2)/Diesel/BS4",
            "1.3L LXI MT (TYPE 1)/Petrol/BS3",
            "1.3L TOUR MT/Diesel/BS4",
            "1.3L VDI MT (TYPE 1)/Diesel/BS3",
            "1.3L VDI MT (TYPE 2)/Diesel/BS4",
            "1.3L VXI MT (TYPE 1)/Petrol/BS3",
            "1.3L ZDI MT (TYPE 1)/Diesel/BS3",
            "1.3L ZDI MT (TYPE 2)/Diesel/BS4",
            "1.3L ZXI MT (TYPE 1)/Petrol/BS3"
          ]
        },
        {
          generation: "SWIFT DZIRE 2ND GEN 01.2012 - 01.2015",
          options: [
            "1.2L LXI MT (TYPE 1)/Petrol/BS4",
            "1.2L LXI MT (TYPE 2)/Petrol/BS4",
            "1.2L VXI MT (TYPE 1)/Petrol/BS4",
            "1.2L VXI MT (TYPE 2)/Petrol/BS4",
            "1.2L ZXI AT (TYPE 1)/Petrol/BS4",
            "1.2L ZXI AT (TYPE 2)/Petrol/BS4",
            "1.2L ZXI MT (TYPE 1)/Petrol/BS4",
            "1.2L ZXI MT (TYPE 2)/Petrol/BS4",
            "1.3L LDI MT (TYPE 1)/Diesel/BS4",
            "1.3L LDI MT (TYPE 2)/Diesel/BS4",
            "1.3L VDI MT (TYPE 1)/Diesel/BS4",
            "1.3L VDI MT (TYPE 2)/Diesel/BS4",
            "1.3L ZDI MT (TYPE 1)/Diesel/BS4",
            "1.3L ZDI MT (TYPE 2)/Diesel/BS4"
          ]
        },
        {
          generation: "SWIFT DZIRE 2ND GEN F/L 02.2015 - 12.2022",
          options: [
            "1.2L LXI MT (TYPE 3)/Petrol/BS4",
            "1.2L LXI MT (TYPE 4)/Petrol/BS4",
            "1.2L LXI(O) MT (TYPE 3)/Petrol/BS4",
            "1.2L LXI(O) MT (TYPE 4)/Petrol/BS4",
            "1.2L TOUR MT (TYPE 4)/Petrol/CNG/BS4",
            "1.2L TOUR MT (TYPE 4)/Petrol/BS4",
            "1.2L TOUR S MT (TYPE 5)/Petrol/86h.p./BS4",
            "1.2L TOUR S MT (TYPE 5)/Petrol/CNG/86h.p./BS4",
            "1.2L TOUR S MT (TYPE 5)/Petrol/CNG/86h.p./BS6",
            "1.2L TOUR S MT (TYPE 5)/Petrol/86h.p./BS6",
            "1.2L VXI AT (TYPE 3)/Petrol/BS4",
            "1.2L VXI MT (TYPE 3)/Petrol/BS4",
            "1.2L VXI MT (TYPE 4)/Petrol/BS4",
            "1.2L VXI(O) AT (TYPE 3)/Petrol/BS4",
            "1.2L VXI(O) AT (TYPE 4)/Petrol/BS4",
            "1.2L VXI(O) MT (TYPE 3)/Petrol/BS4",
            "1.2L VXI(O) MT (TYPE 4)/Petrol/BS4",
            "1.2L ZXI AT (TYPE 3)/Petrol/BS4",
            "1.2L ZXI AT (TYPE 4)/Petrol/BS4",
            "1.2L ZXI MT (TYPE 3)/Petrol/BS4",
            "1.2L ZXI MT (TYPE 4)/Petrol/BS4",
            "1.3L LDI MT (TYPE 3)/Diesel/BS4",
            "1.3L LDI MT (TYPE 4)/Diesel/BS4",
            "1.3L LDI(O) MT (TYPE 3)/Diesel/BS4",
            "1.3L LDI(O) MT (TYPE 4)/Diesel/BS4",
            "1.3L TOUR MT (TYPE 4)/Diesel/BS4",
            "1.3L TOUR S MT (TYPE 5)/Diesel/BS4",
            "1.3L VDI MT (TYPE 3)/Diesel/BS4",
            "1.3L VDI MT (TYPE 4)/Diesel/BS4",
            "1.3L VDI(O) MT (TYPE 3)/Diesel/BS4",
            "1.3L VDI(O) MT (TYPE 4)/Diesel/BS4",
            "1.3L ZDI AGS (TYPE 3)/Diesel/BS4",
            "1.3L ZDI AGS (TYPE 4)/Diesel/BS4",
            "1.3L ZDI MT (TYPE 3)/Diesel/BS4",
            "1.3L ZDI MT (TYPE 4)/Diesel/BS4"
          ]
        },
        {
          generation: "SWIFT DZIRE 3RD GEN 02.2017 - 02.2020",
          options: [
            "1.2L LXI MT/Petrol/82h.p./BS4",
            "1.2L LXI MT/Petrol/82h.p./BS6",
            "1.2L VXI AGS/Petrol/82h.p./BS4",
            "1.2L VXI AGS/Petrol/82h.p./BS6",
            "1.2L VXI MT/Petrol/82h.p./BS4",
            "1.2L VXI MT/Petrol/82h.p./BS6",
            "1.2L ZXI AGS/Petrol/82h.p./BS4",
            "1.2L ZXI AGS/Petrol/82h.p./BS6",
            "1.2L ZXI MT/Petrol/82h.p./BS4",
            "1.2L ZXI MT/Petrol/82h.p./BS6",
            "1.2L ZXI+ AGS/Petrol/82h.p./BS4",
            "1.2L ZXI+ AGS/Petrol/82h.p./BS6",
            "1.2L ZXI+ MT/Petrol/82h.p./BS4",
            "1.2L ZXI+ MT/Petrol/82h.p./BS6",
            "1.3L LDI MT/Diesel/BS4",
            "1.3L VDI AGS/Diesel/BS4",
            "1.3L VDI MT/Diesel/BS4",
            "1.3L ZDI AGS/Diesel/BS4",
            "1.3L ZDI MT/Diesel/BS4",
            "1.3L ZDI+ AGS/Diesel/BS4",
            "1.3L ZDI+ MT/Diesel/BS4"
          ]
        },
        {
          generation: "SWIFT DZIRE 3RD GEN F/L 01.2020 - 02.2025",
          options: [
            "1.2L LXI MT/Petrol/BS6",
            "1.2L TOUR S MT/Petrol/BS6",
            "1.2L TOUR S MT/Petrol/CNG/BS6",
            "1.2L VXI AGS/Petrol/BS6",
            "1.2L VXI MT/Petrol/BS6",
            "1.2L VXI MT/Petrol/CNG/BS6",
            "1.2L ZXI AGS/Petrol/BS6",
            "1.2L ZXI MT/Petrol/BS6",
            "1.2L ZXI MT/Petrol/CNG/BS6",
            "1.2L ZXI+ AGS/Petrol/BS6",
            "1.2L ZXI+ MT/Petrol/BS6"
          ]
        },
        {
          generation: "SWIFT DZIRE 4TH GEN 11.2024 - now",
          options: [
            "1.2L LXI MT/Petrol/BS6.2",
            "1.2L TOUR S MT/Petrol/CNG/BS6.2",
            "1.2L TOUR S STD MT/Petrol/BS6.2",
            "1.2L VXI AGS/Petrol/BS6.2",
            "1.2L VXI MT/Petrol/BS6.2",
            "1.2L VXI MT/Petrol/CNG/BS6.2",
            "1.2L ZXI AGS/Petrol/BS6.2",
            "1.2L ZXI MT/Petrol/CNG/BS6.2",
            "1.2L ZXI MT/Petrol/BS6.2",
            "1.2L ZXI+ AGS/Petrol/BS6.2",
            "1.2L ZXI+ MT/Petrol/BS6.2"
          ]
        }
      ]
    },

    {
      id: 29,
      name: "MARUTI SX4",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/a112869.webp",
      years: "03.2007 - 08.2013",
      link: "/vehicles/maruti-286/sx4-11300/",
      modifications: [
        {
          generation: "SX4 1ST GEN 03.2007 - 02.2013",
          options: [
            "1.3L VDI MT (TYPE 3)/Diesel/BS4",
            "1.3L ZDI LEATHER MT (TYPE 3)/Diesel/BS4",
            "1.3L ZDI MT (TYPE 3)/Diesel/BS4",
            "1.6L VXI GREEN MT (TYPE 3)/Petrol/CNG/BS4",
            "1.6L VXI MT (TYPE 1)/Petrol/BS3",
            "1.6L VXI MT (TYPE 2)/Petrol/BS3",
            "1.6L VXI MT (TYPE 3)/Petrol/BS4",
            "1.6L ZXI AT (TYPE 3)/Petrol/BS4",
            "1.6L ZXI LEATHER AT (TYPE 3)/Petrol/BS4",
            "1.6L ZXI LEATHER MT (TYPE 1)/Petrol/BS3",
            "1.6L ZXI LEATHER MT (TYPE 2)/Petrol/BS3",
            "1.6L ZXI LEATHER MT (TYPE 3)/Petrol/BS4",
            "1.6L ZXI MT (TYPE 1)/Petrol/BS3",
            "1.6L ZXI MT (TYPE 2)/Petrol/BS3",
            "1.6L ZXI MT (TYPE 3)/Petrol/BS4"
          ]
        },
        {
          generation: "SX4 1ST GEN F/L 03.2013 - 08.2013",
          options: [
            "1.3L VDI MT (TYPE 4)/Diesel/BS4",
            "1.3L ZDI LEATHER MT (TYPE 4)/Diesel/BS4",
            "1.3L ZDI MT (TYPE 4)/Diesel/BS4",
            "1.6L VXI GREEN MT (TYPE 4)/Petrol/CNG/BS4",
            "1.6L VXI MT (TYPE 4)/Petrol/BS4",
            "1.6L ZXI AT (TYPE 4)/Petrol/BS4",
            "1.6L ZXI LEATHER AT (TYPE 4)/Petrol/BS4",
            "1.6L ZXI LEATHER MT (TYPE 4)/Petrol/BS4",
            "1.6L ZXI MT (TYPE 4)/Petrol/BS4"
          ]
        }
      ]
    },
    {
      id: 30,
      name: "MARUTI VERSA",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/4630464.webp",
      years: "01.2000 - 08.2010",
      link: "/vehicles/maruti-286/versa-11301/",
      modifications: [
        {
          generation: "VERSA 01.2000 - 08.2010",
          options: [
            "1.3L DX1 MT/Petrol",
            "1.3L DX2 MT/Petrol",
            "1.3L SDX MT/Petrol",
            "1.3L STD MT/Petrol"
          ]
        }
      ]
    },
    {
      id: 31,
      name: "MARUTI VICTORIS",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/a1709a3.webp",
      years: "09.2025 - now",
      link: "/vehicles/maruti-286/victoris-12924/",
      modifications: [
        {
          generation: "VICTORIS 1ST GEN 09.2025 - now",
          options: [
            "1.5L LXI MT/Petrol/BS6.2",
            "1.5L LXI MT/Petrol/CNG/BS6.2",
            "1.5L VXI AT/Petrol/BS6.2",
            "1.5L VXI CVT/Hybrid/BS6.2",
            "1.5L VXI MT/Petrol/BS6.2",
            "1.5L VXI MT/Petrol/CNG/BS6.2",
            "1.5L ZXI (O) AT/Petrol/BS6.2",
            "1.5L ZXI (O) CVT/Hybrid/BS6.2",
            "1.5L ZXI (O) MT/Petrol/BS6.2",
            "1.5L ZXI AT/Petrol/BS6.2",
            "1.5L ZXI CVT/Hybrid/BS6.2",
            "1.5L ZXI MT/Petrol/CNG/BS6.2",
            "1.5L ZXI MT/Petrol/BS6.2",
            "1.5L ZXI+ (O) AT/Petrol/BS6.2",
            "1.5L ZXI+ (O) MT/Petrol/BS6.2",
            "1.5L ZXI+ ALL GRIP AT/Petrol/BS6.2",
            "1.5L ZXI+ AT/Petrol/BS6.2",
            "1.5L ZXI+ CVT/Hybrid/BS6.2",
            "1.5L ZXI+ MT/Petrol/BS6.2",
            "1.5L ZXI+(O) ALL GRIP AT/Petrol/BS6.2",
            "1.5L ZXI+(O) CVT/Hybrid/BS6.2"
          ]
        }
      ]
    },
    {
      id: 32,
      name: "MARUTI WAGON R",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/f9d563d.webp",
      years: "12.1999 - now",
      link: "/vehicles/maruti-286/wagon_r-11302/",
      modifications: [
        {
          generation: "WAGON R 1ST GEN 12.1999 - 09.2003",
          options: [
            "1.1L AX AT/Petrol/BS2",
            "1.1L LX MT/Petrol/BS2",
            "1.1L LXI MT/Petrol/BS2",
            "1.1L VX MT/Petrol/BS2",
            "1.1L VXI MT/Petrol/BS2"
          ]
        },
        {
          generation: "WAGON R 1ST GEN 1ST F/L 10.2003 - 06.2006",
          options: [
            "1.1L AX AT/Petrol/67h.p./BS2",
            "1.1L AX AT/Petrol/67h.p./BS3",
            "1.1L LX MT/Petrol/67h.p./BS2",
            "1.1L LX MT/Petrol/67h.p./BS3",
            "1.1L LXI MT/Petrol/67h.p./BS2",
            "1.1L LXI MT/Petrol/67h.p./BS3",
            "1.1L PRIMEA MT/Petrol/BS3",
            "1.1L VXI MT/Petrol/67h.p./BS2",
            "1.1L VXI MT/Petrol/67h.p./BS3",
            "1.1L VXI(O) MT/Petrol/67h.p./BS2",
            "1.1L VXI(O) MT/Petrol/67h.p./BS3"
          ]
        },
        {
          generation: "WAGON R 1ST GEN 2ND F/L 07.2006 - 01.2011",
          options: [
            "1.1L AX AT/Petrol/BS3",
            "1.1L LX DUO MT/Petrol/LPG/67h.p./BS3",
            "1.1L LX DUO MT/Petrol/LPG/67h.p./BS4",
            "1.1L LX MT/Petrol/BS3",
            "1.1L LXI DUO MT/Petrol/LPG/67h.p./BS3",
            "1.1L LXI DUO MT/Petrol/LPG/67h.p./BS4",
            "1.1L LXI MT/Petrol/BS3",
            "1.1L VXI MT/Petrol/BS3",
            "1.1L VXI(O) MT/Petrol/BS3"
          ]
        },
        {
          generation: "WAGON R 2ND GEN 02.2010 - 11.2012",
          options: [
            "1.0L LX MT/Petrol/BS4",
            "1.0L LXI DUO MT/Petrol/LPG/BS4",
            "1.0L LXI GREEN MT/Petrol/CNG/BS4",
            "1.0L LXI MT/Petrol/BS4",
            "1.0L VXI MT/Petrol/BS4",
            "1.0L VXI(O) MT/Petrol/BS4"
          ]
        },
        {
          generation: "WAGON R 2ND GEN F/L 12.2012 - 12.2018",
          options: [
            "1.0L LX MT/Petrol/BS4",
            "1.0L LXI DUO MT/Petrol/LPG/BS4",
            "1.0L LXI GREEN MT/Petrol/CNG/BS4",
            "1.0L LXI MT/Petrol/BS4",
            "1.0L LXI(O) GREEN MT/Petrol/CNG/BS4",
            "1.0L LXI(O) MT/Petrol/BS4",
            "1.0L VXI AGS/Petrol/BS4",
            "1.0L VXI MT/Petrol/BS4",
            "1.0L VXI(O) AGS/Petrol/BS4",
            "1.0L VXI(O) MT/Petrol/BS4",
            "1.0L VXI+ AGS/Petrol/BS4",
            "1.0L VXI+ MT/Petrol/BS4",
            "1.0L VXI+(O) AGS/Petrol/BS4",
            "1.0L VXI+(O) MT/Petrol/BS4"
          ]
        },
        {
          generation: "WAGON R 2ND GEN STINGRAY 07.2013 - 12.2016",
          options: [
            "1.0L STINGRAY LXI MT/Petrol/BS4",
            "1.0L STINGRAY VXI AGS/Petrol/BS4",
            "1.0L STINGRAY VXI MT/Petrol/BS4",
            "1.0L STINGRAY VXI(O) AGS/Petrol/BS4",
            "1.0L STINGRAY VXI(O) MT/Petrol/BS4"
          ]
        },
        {
          generation: "WAGON R 3RD GEN 01.2019 - now",
          options: [
            "1.0L LXI MT (TYPE 1)/Petrol/67h.p./BS4",
            "1.0L LXI MT (TYPE 1)/Petrol/CNG/58h.p./BS4",
            "1.0L LXI MT (TYPE 1)/Petrol/67h.p./BS6",
            "1.0L LXI MT (TYPE 1)/Petrol/CNG/67h.p./BS6",
            "1.0L LXI MT (TYPE 2)/Petrol/BS6.2",
            "1.0L LXI MT (TYPE 2)/Petrol/CNG/BS6.2",
            "1.0L LXI(O) MT (TYPE 1)/Petrol/CNG/58h.p./BS4",
            "1.0L LXI(O) MT (TYPE 1)/Petrol/67h.p./BS4",
            "1.0L LXI(O) MT (TYPE 1)/Petrol/67h.p./BS6",
            "1.0L LXI(O) MT (TYPE 1)/Petrol/CNG/67h.p./BS6",
            "1.0L TOUR H3 MT (TYPE 2)/Petrol/BS6.2",
            "1.0L TOUR H3 MT (TYPE 2)/Petrol/CNG/BS6.2",
            "1.0L VXI AGS (TYPE 1)/Petrol/67h.p./BS4",
            "1.0L VXI AGS (TYPE 1)/Petrol/67h.p./BS6",
            "1.0L VXI AGS (TYPE 2)/Petrol/BS6.2",
            "1.0L VXI MT (TYPE 1)/Petrol/67h.p./BS4",
            "1.0L VXI MT (TYPE 1)/Petrol/67h.p./BS6",
            "1.0L VXI MT (TYPE 2)/Petrol/CNG/BS6.2",
            "1.0L VXI MT (TYPE 2)/Petrol/BS6.2",
            "1.0L VXI(O) AGS (TYPE 1)/Petrol/67h.p./BS4",
            "1.0L VXI(O) AGS (TYPE 1)/Petrol/67h.p./BS6",
            "1.0L VXI(O) MT (TYPE 1)/Petrol/67h.p./BS4",
            "1.0L VXI(O) MT (TYPE 1)/Petrol/67h.p./BS6",
            "1.2L VXI AGS (TYPE 1)/Petrol/82h.p./BS4",
            "1.2L VXI AGS (TYPE 1)/Petrol/82h.p./BS6",
            "1.2L VXI MT (TYPE 1)/Petrol/82h.p./BS4",
            "1.2L VXI MT (TYPE 1)/Petrol/82h.p./BS6",
            "1.2L VXI(O) AGS (TYPE 1)/Petrol/82h.p./BS4",
            "1.2L VXI(O) AGS (TYPE 1)/Petrol/82h.p./BS6",
            "1.2L VXI(O) MT (TYPE 1)/Petrol/82h.p./BS4",
            "1.2L VXI(O) MT (TYPE 1)/Petrol/82h.p./BS6",
            "1.2L ZXI AGS (TYPE 1)/Petrol/82h.p./BS4",
            "1.2L ZXI AGS (TYPE 1)/Petrol/82h.p./BS6",
            "1.2L ZXI AGS (TYPE 2)/Petrol/BS6.2",
            "1.2L ZXI MT (TYPE 1)/Petrol/82h.p./BS4",
            "1.2L ZXI MT (TYPE 1)/Petrol/82h.p./BS6",
            "1.2L ZXI MT (TYPE 2)/Petrol/BS6.2",
            "1.2L ZXI+ AGS (TYPE 2)/Petrol/BS6.2",
            "1.2L ZXI+ MT (TYPE 2)/Petrol/BS6.2",
            "1.2L ZXI+(O) AGS (TYPE 2)/Petrol/BS6.2",
            "1.2L ZXI+(O) MT (TYPE 2)/Petrol/BS6.2"
          ]
        }
      ]
    },
    {
      id: 33,
      name: "MARUTI XL6",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/19f8feb.webp",
      years: "08.2019 - now",
      link: "/vehicles/maruti-286/xl6-12336/",
      modifications: [
        {
          generation: "XL6 1ST GEN 08.2019 - 03.2022",
          options: [
            "1.5L ALPHA AT/Petrol/BS6",
            "1.5L ALPHA MT/Petrol/BS6",
            "1.5L ZETA AT/Petrol/BS6",
            "1.5L ZETA MT/Petrol/BS6"
          ]
        },
        {
          generation: "XL6 1ST GEN F/L 04.2022 - now",
          options: [
            "1.5L ALPHA AT/Petrol/103h.p./BS6.2",
            "1.5L ALPHA MT/Petrol/103h.p./BS6.2",
            "1.5L ALPHA+ AT/Petrol/103h.p./BS6.2",
            "1.5L ALPHA+ MT/Petrol/103h.p./BS6.2",
            "1.5L ZETA AT/Petrol/103h.p./BS6.2",
            "1.5L ZETA MT/Petrol/103h.p./BS6.2",
            "1.5L ZETA MT/Petrol/CNG/88h.p./BS6.2"
          ]
        }
      ]
    },

    {
      id: 34,
      name: "MARUTI ZEN",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/07057a2.webp",
      years: "05.1993 - 03.2006",
      link: "/vehicles/maruti-286/zen-11303/",
      modifications: [
        {
          generation: "ZEN 1ST GEN 05.1993 - 07.1996",
          options: [
            "1.0L MT/Petrol"
          ]
        },
        {
          generation: "ZEN 1ST GEN F/L 08.1996 - 12.2003",
          options: [
            "1.0L AT/Petrol",
            "1.0L CARBON MT/Petrol",
            "1.0L LX MT/Petrol",
            "1.0L LXI MT/Petrol",
            "1.0L STEEL MT/Petrol",
            "1.0L VX MT/Petrol",
            "1.0L VXI MT/Petrol",
            "1.5L MT/Diesel"
          ]
        },
        {
          generation: "ZEN CLASSIC 08.1999 - 01.2003",
          options: [
            "1.0L MT/Petrol"
          ]
        },
        {
          generation: "ZEN 2ND GEN 04.2003 - 03.2006",
          options: [
            "1.0L AT/Petrol/BS2",
            "1.0L LX MT/Petrol/BS2",
            "1.0L LXI MT/Petrol/BS2",
            "1.0L VX MT/Petrol/BS2",
            "1.0L VXI MT/Petrol/BS2",
            "1.5L MT/Diesel/BS2"
          ]
        }
      ]
    },
    {
      id: 35,
      name: "MARUTI ZEN ESTILO",
      image: "https://boodmo.com/media/cache/vehicle_model/images/model/f4d839a.webp",
      years: "07.2006 - 08.2013",
      link: "/vehicles/maruti-286/zen_estilo-11293/",
      modifications: [
        {
          generation: "ZEN ESTILO 1ST GEN 07.2006 - 08.2009",
          options: [
            "1.1L LX MT/Petrol/BS3",
            "1.1L LXI MT/Petrol/BS3",
            "1.1L VXI MT/Petrol/BS3",
            "1.1L VXI MT ABS/Petrol/BS3"
          ]
        },
        {
          generation: "ZEN ESTILO 1ST GEN F/L 09.2009 - 08.2013",
          options: [
            "1.0L LX MT/Petrol/BS4",
            "1.0L LX MT/Petrol/CNG/BS4",
            "1.0L LXI MT/Petrol/BS4",
            "1.0L LXI MT/Petrol/CNG/BS4",
            "1.0L VXI MT/Petrol/BS4",
            "1.0L VXI MT/Petrol/CNG/BS4",
            "1.0L VXI MT ABS/Petrol/BS4"
          ]
        }
      ]
    },
];

export const Maruti = () => {
  const link = getOriPartsLink(7, "MARUTI");

  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Use exported models
  const models = marutiModels;

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
  // 🔹 Filter models by name
  const filteredModels = models.filter((m) =>
    m.name.toLowerCase().includes(filter.toLowerCase())
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

        <h1 className="text-2xl sm:text-3xl md:text-4xl px-2 font-bold text-gray-800 dark:text-white uppercase mb-4 sm:mb-6">
          MARUTI
        </h1>

        {/* OEM Catalogue Button */}
        <a
          href={link}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="border border-gray-600 mb-2 inline-block text-black dark:text-white text-xs sm:text-sm rounded-md px-3 py-2 sm:px-4 sm:py-2 transition-all duration-300 hover:bg-red-500 hover:text-white"
        >
          View OEM Catalogue
        </a>
      </div>

      {/* Brand Info Section */}
      <div className="max-w-7xl mx-auto heading-filters flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 border-b border-gray-200 pb-3 px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">
          Choose Your{" "}
          <span className="h2-section__name text-red-500 font-bold">Model</span>
        </div>

        <div className="heading-filters__action w-full sm:w-auto">
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter Model"
            className="w-full sm:w-64 md:w-72 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-400 focus:border-red-400 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 transition duration-200"
          />
        </div>
      </div>

      {/* Vehicle Model Grid */}
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
                to={`/vehicles/maruti/${model.id}`}
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

                {/* Handle grouped modifications */}
                {Array.isArray(model.modifications) &&
                  typeof model.modifications[0] === "object"
                  ? model.modifications.map((group, i) => (
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
                  ))
                  : model.modifications.map((opt, j) => (
                    <option key={j} value={opt}>
                      {opt}
                    </option>
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


      {/* ---------maruti parts and accssories------------- */}
      <section className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-6">
          {/* Heading (Desktop) */}
          <h2 className="text-4xl font-semibold text-gray-800 dark:text-gray-200 hidden md:block">
            MARUTI Parts and{" "}
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
                     px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 
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
                className="flex flex-col items-center rounded-xl p-3 sm:p-4 transition-transform transform hover:scale-105"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex items-center justify-center mb-3">
                  {part.img ? (
                    <img
                      src={part.img}
                      alt={displayName}
                      className="w-full h-full object-contain"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div
                      className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg"
                      aria-hidden
                    />
                  )}
                </div>
                <span className="mt-1 text-sm text-gray-700 dark:text-gray-200 text-center font-medium break-words">
                  {displayName}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="seo-text my-10 px-4 sm:px-8 lg:px-16">
  <div
    className={`seo-text__body transition-all duration-500 overflow-hidden max-h-[500px]`}
  >
    <div className="space-y-6 text-gray-800 dark:text-gray-200">
      <p>
        If you are looking for Maruti spare parts, visit the{" "}
        <a
          href="https://boodmo.com/"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          sparelo
        </a>{" "}
        app or website and access India’s largest online marketplace for car spare parts! We
        house an unmatched range of spares and accessories for the most popular vehicles in
        India.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Popularity of Maruti in India</h2>
      <p>
        Maruti is produced by Maruti Suzuki India Ltd, a subsidiary of Suzuki Motor Corporation
        of Japan. The manufacturer has been dealing with motor vehicles from 1983 when they
        kick-started production of Maruti 800. Today it leads the local car market, offering a
        lot of stylish models like Alto, Baleno, Ciaz, Ertiga, Grand Vitara, Gypsy, Swift, and
        others designed for all kinds of Indian consumers. Even base trims of any model are full
        of benefits and keep drivers and passengers comfortable.
      </p>
      <p>
        Maruti's upcoming cars are a real event in India being widely discussed and finding a
        ready sale. Among them there are various types of bodies including hatchback, wagon,
        off-roader, sedan, and others.
      </p>
      <p>
        <a
          // href="http://www.marutisuzuki.com/"
          target="_blank"
          rel="nofollow noreferrer"
          className="text-blue-600 hover:underline"
        >
          marutisuzuki.com
        </a>
      </p>
      <p>
        <a
          // href="https://boodmo.com/pages/static/disclaimer/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Disclaimer
        </a>
      </p>

      <h2 className="text-2xl font-semibold mt-6">Why should you need spare parts?</h2>
      <p>
        sparelo, India’s largest online marketplace for car spare parts, delivers an unmatched
        catalogue of components and accessories to ensure your vehicle’s reliability and
        longevity. Car owners should replace worn-out parts—whether it’s a set of wheels, the
        engine, a bumper, or interior components. You can also upgrade your car: make seats more
        supportive, add height adjustments, replace mirrors, and more. And here again—you can
        count on us!
      </p>

      <h3 className="text-xl font-semibold mt-6">Benefits from our Marketplace</h3>
      <p>
        You can search directly by part number, or use sparelo’s unique algorithm to find the
        correct part for your car’s make, model, and year. Browse relevant categories and enjoy
        quick pan-India delivery. Our key advantages include:
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>
          An unmatched catalogue of car spare parts at affordable prices with a
          customer-friendly return policy.
        </li>
        <li>Global supplier network delivering top-quality products to Indian customers.</li>
        <li>
          A user-friendly interface that makes finding and buying the right spare part easy.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-6">Spare Parts</h3>
      <p>
        Maruti markets many cars in India every year and leads in sales. Their cars are great
        but require occasional repair or customization. On sparelo, you’ll find parts such as:
      </p>
      <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        <li>Air filter</li>
        <li>Oil filter</li>
        <li>Spark plug</li>
        <li>Coolant</li>
        <li>Clutch plate</li>
        <li>Brake pad</li>
        <li>Front window glass machine</li>
        <li>Outside rear view mirror (right)</li>
        <li>Body outer panel assembly</li>
        <li>Rear door</li>
        <li>Windshield molding</li>
        <li>Front bumper</li>
        <li>Front grille</li>
      </ul>
      <p>
        The goods are categorized into Maruti car accessories, maintenance service parts, body,
        brake system, clutch system, electrical components, engine, fuel supply system,
        lighting, and more.
      </p>
      <p>
        Of course, you can visit Maruti Suzuki service stations across India, but it’s much
        easier to shop online at sparelo — offering the best prices and conditions for Maruti car
        parts.
      </p>
    </div>
  </div>

  <div className="seo-text__action text-center mt-6">
    <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition">
      View More
    </button>
  </div>
</section>


      <Article_Review />
    </section>
  );
};
