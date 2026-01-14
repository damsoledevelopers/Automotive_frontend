import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Brands = () => {
  const alphabets = [
    "All", "0-9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "W", "Z"
  ];

  const groups = [
    {
      letter: '0-9',
      brands: [
        { name: '3M', count: 162, href: '/brands/6399-3m/' }
      ]
    },
    {
      letter: 'A',
      brands: [
        { name: 'ABE', count: 50, href: '/brands/19-abe/' },
        { name: 'ABRO', count: 181, href: '/brands/6358-abro/' },
        { name: 'A.B.S.', count: 66, href: '/brands/10-abs/' },
        { name: 'Accurate', count: 4639, href: '/brands/6437-accurate/' },
        { name: 'AFRO', count: 319, href: '/brands/6405-afro/' },
        { name: 'Airpro', count: 125, href: '/brands/6348-airpro/' },
        { name: 'AIS', count: 60, href: '/brands/6462-ais/' },
        { name: 'AJUSA', count: 32, href: '/brands/68-ajusa/' },
        { name: 'AKSMIT', count: 60, href: '/brands/6439-aksmit/' },
        { name: 'AKT', count: 231, href: '/brands/6382-akt/' },
        { name: 'Alaska', count: 149, href: '/brands/6483-alaska/' },
        { name: 'Allied Westlake', count: 146, href: '/brands/6401-allied_westlake/' },
        { name: 'ALP', count: 366, href: '/brands/6569-alp/' },
        { name: 'ALPINE', count: 83, href: '/brands/6448-alpine/' },
        { name: 'Amkette', count: 12, href: '/brands/6444-amkette/' },
        { name: 'AMP', count: 917, href: '/brands/4214-amp/' },
        { name: 'AMSOIL', count: 65, href: '/brands/6547-amsoil/' },
        { name: 'Anchem', count: 15, href: '/brands/6344-anchem/' },
        { name: 'Anupam Industries', count: 429, href: '/brands/6423-anupam_industries/' },
        { name: 'Areon', count: 91, href: '/brands/6505-areon/' },
        { name: 'ASHIKA', count: 144, href: '/brands/153-ashika/' },
        { name: 'ASHOK LEYLAND', count: 7, href: '/brands/154-ashokleyland/' },
        { name: 'Assia', count: 164, href: '/brands/6540-assia/' },
        { name: 'Autocopter', count: 122, href: '/brands/6330-autocopter/' },
        { name: 'Autocruze', count: 25, href: '/brands/6373-autocruze/' },
        { name: 'AutoCUE', count: 8, href: '/brands/6421-autocue/' },
        { name: 'Auto Equip', count: 475, href: '/brands/6289-auto_equip/' },
        { name: 'Autofurnish', count: 897, href: '/brands/6346-autofurnish/' },
        { name: 'Auto Gold', count: 491, href: '/brands/6364-auto_gold/' },
        { name: 'Autokoi', count: 1186, href: '/brands/6457-autokoi/' },
        { name: 'Autolec', count: 112, href: '/brands/6288-autolec/' },
        { name: 'Auto Oprema', count: 1577, href: '/brands/6430-auto_oprema/' },
        { name: 'AUTOVERSE', count: 12, href: '/brands/6570-autoverse/' },
        { name: 'AUX', count: 756, href: '/brands/6496-aux/' }
      ]
    },
    {
      letter: 'B',
      brands: [
        { name: 'BANCO', count: 269, href: '/brands/6136-banco/' },
        { name: 'BANDO', count: 1641, href: '/brands/249-bando/' },
        { name: 'BASPRO', count: 20, href: '/brands/6501-baspro/' },
        { name: 'BEHR', count: 957, href: '/brands/280-behr/' },
        { name: 'Bergmann', count: 25, href: '/brands/6352-bergmann/' },
        { name: 'BLACKCAT', count: 17, href: '/brands/6342-blackcat/' },
        { name: 'BLOCK BUSTER', count: 38, href: '/brands/6492-block_buster/' },
        { name: 'BLUE PRINT', count: 70, href: '/brands/337-blueprint/' },
        { name: 'BMW', count: 154142, href: '/brands/343-bmw/' },
        { name: 'BOSCH', count: 25510, href: '/brands/362-bosch/' },
        { name: 'BRANFORD', count: 14, href: '/brands/6379-branford/' },
        { name: 'BRAVO', count: 3030, href: '/brands/6384-bravo/' },
        { name: 'BREMBO', count: 2943, href: '/brands/385-brembo/' }
      ]
    },
    {
      letter: 'C',
      brands: [
        { name: 'Care Auto Parts', count: 195, href: '/brands/6477-car_care/' },
        { name: 'Carstar', count: 270, href: '/brands/6385-carstar/' },
        { name: 'Castrol', count: 207, href: '/brands/6319-castrol/' },
        { name: 'CHAMPION', count: 2003, href: '/brands/501-champion/' },
        { name: 'Chemical Guys', count: 91, href: '/brands/6512-chemical_guys/' },
        { name: 'Chemours', count: 1, href: '/brands/6545-chemours/' },
        { name: 'CHEVROLET', count: 61359, href: '/brands/1924-opelgmchevrolet/' },
        { name: 'CI CAR INTERNATIONAL', count: 1147, href: '/brands/6456-car_international/' },
        { name: 'CIFAM', count: 7, href: '/brands/522-cifam/' },
        { name: 'Classic', count: 86, href: '/brands/6469-classic/' },
        { name: 'Clean Hub', count: 18, href: '/brands/6442-clean_hub/' },
        { name: 'Comstar', count: 41, href: '/brands/6465-comstar/' },
        { name: 'CONTITECH', count: 5028, href: '/brands/561-contitech/' },
        { name: 'Coozo', count: 6, href: '/brands/6433-coozo/' },
        { name: 'CORTECO', count: 42, href: '/brands/575-corteco/' },
        { name: 'CTE', count: 173, href: '/brands/6332-cte/' }
      ]
    },
    {
      letter: 'D',
      brands: [
        { name: 'DAYCO', count: 292, href: '/brands/612-dayco/' },
        { name: 'Decent Automobile', count: 286, href: '/brands/6403-decent_automobile/' },
        { name: 'DELPHI', count: 6902, href: '/brands/630-delphi/' },
        { name: 'Delphi-TVS Technologies Limited', count: 14, href: '/brands/6556-delphi_tvs_technologies_limited/' },
        { name: 'DENCKERMANN', count: 113, href: '/brands/634-denckermann/' },
        { name: 'DENSO', count: 2430, href: '/brands/639-denso/' },
        { name: 'Depo', count: 2276, href: '/brands/4858-depo/' },
        { name: 'Depon', count: 63, href: '/brands/6392-depon/' },
        { name: 'DKMAX', count: 734, href: '/brands/6341-dkmax/' },
        { name: 'DOOWON', count: 244, href: '/brands/6479-doowon/' },
        { name: 'DP ENGINEERING', count: 20, href: '/brands/6464-dp_engineering/' },
        { name: 'Driveline', count: 370, href: '/brands/6323-driveline/' }
      ]
    },
    {
      letter: 'E',
      brands: [
        { name: 'EDYLINN', count: 345, href: '/brands/6534-edylinn/' },
        { name: 'Elegant', count: 1989, href: '/brands/6300-elegant/' },
        { name: 'Elofic', count: 401, href: '/brands/5935-elofic/' },
        { name: 'Elpis', count: 809, href: '/brands/6420-elpis/' },
        { name: 'ELRING', count: 50, href: '/brands/770-elring/' },
        { name: 'ENEOS', count: 15, href: '/brands/6498-eneos/' },
        { name: 'EPE', count: 48, href: '/brands/6393-epe/' },
        { name: 'ERA', count: 57, href: '/brands/786-era/' },
        { name: 'ESTRA', count: 16, href: '/brands/6478-estra/' },
        { name: 'Eurocoil', count: 106, href: '/brands/6313-eurocoil/' },
        { name: 'EuroCord', count: 126, href: '/brands/6458-euro_cord/' },
        { name: 'EUROMAC', count: 1179, href: '/brands/6261-euromac/' },
        { name: 'EXCELITE', count: 221, href: '/brands/6435-excelite/' },
        { name: 'EXEDY', count: 814, href: '/brands/814-exedy/' }
      ]
    },
    {
      letter: 'F',
      brands: [
        { name: 'FAE', count: 30, href: '/brands/824-fae/' },
        { name: 'FALCON', count: 1580, href: '/brands/6507-falcon/' },
        { name: 'Febest', count: 121, href: '/brands/3107-febest/' },
        { name: 'FEBI BILSTEIN', count: 388, href: '/brands/849-febibilstein/' },
        { name: 'FENNER', count: 945, href: '/brands/2830-fenner/' },
        { name: 'FERODO', count: 2168, href: '/brands/861-ferodo/' },
        { name: 'FIAT / JEEP', count: 72777, href: '/brands/872-fiatalfalancia/' },
        { name: 'FORCE', count: 362, href: '/brands/911-force/' },
        { name: 'FORD', count: 153873, href: '/brands/912-ford/' },
        { name: 'Formula 1', count: 36, href: '/brands/6353-formula_1/' },
        { name: 'FRENKIT', count: 63, href: '/brands/944-frenkit/' },
        { name: 'FTE', count: 1795, href: '/brands/957-fte/' }
      ]
    },
    {
      letter: 'G',
      brands: [
        { name: 'GABRIEL', count: 2467, href: '/brands/968-gabriel/' },
        { name: 'Galio', count: 2050, href: '/brands/6390-galio/' },
        { name: 'GARRETT', count: 3224, href: '/brands/977-garrett/' },
        { name: 'GATES', count: 7536, href: '/brands/980-gates/' },
        { name: 'GEM PWER', count: 61, href: '/brands/6409-gem_pwer/' },
        { name: 'GEOMEX', count: 12, href: '/brands/6424-geomex/' },
        { name: 'GFX', count: 613, href: '/brands/6391-gfx/' },
        { name: 'GKN', count: 7785, href: '/brands/4315-gkn/' },
        { name: 'Glade', count: 14, href: '/brands/6543-glade/' },
        { name: 'Globex', count: 124, href: '/brands/6395-globex/' },
        { name: 'GMB', count: 1992, href: '/brands/4360-gmb/' },
        { name: 'Godrej aer', count: 30, href: '/brands/6338-godrej_aer/' },
        { name: 'GOETZE', count: 7230, href: '/brands/1030-goetze/' },
        { name: 'GOLDEN CRUISER', count: 26, href: '/brands/6324-golden_cruiser/' },
        { name: 'GOODYEAR', count: 56, href: '/brands/6537-goodyear/' },
        { name: 'GROZ', count: 775, href: '/brands/6525-groz/' },
        { name: 'GULF', count: 4, href: '/brands/6426-gulf/' },
        { name: 'GuttMann', count: 696, href: '/brands/6485-guttman/' }
      ]
    },
    {
      letter: 'H',
      brands: [
        { name: 'Hamaan', count: 26, href: '/brands/6468-hamaan/' },
        { name: 'Hanon', count: 858, href: '/brands/6481-hanon/' },
        { name: 'Hans Pries', count: 27, href: '/brands/4875-hanspries/' },
        { name: 'Helicord', count: 1375, href: '/brands/2829-helicord/' },
        { name: 'HELLA', count: 10060, href: '/brands/1166-hella/' },
        { name: 'HERTZ', count: 65, href: '/brands/6549-hertz/' },
        { name: 'Hindustan Petroleum', count: 2, href: '/brands/6427-hp/' },
        { name: 'Hi-Q', count: 101, href: '/brands/6535-hi_q/' },
        { name: 'HITACHI', count: 441, href: '/brands/1205-hitachi/' },
        { name: 'HKE', count: 74, href: '/brands/6499-hke/' },
        { name: 'HKT', count: 357, href: '/brands/5200-hkt/' },
        { name: 'HL Mando', count: 698, href: '/brands/6536-hl_mando/' },
        { name: 'Honda', count: 81995, href: '/brands/1222-hondaacura/' },
        { name: 'HP', count: 6, href: '/brands/6555-hp_new/' },
        { name: 'HP Vaahn', count: 36, href: '/brands/6564-hp_vaahn/' },
        { name: 'HUCO', count: 2255, href: '/brands/1236-huco/' },
        { name: 'HUMMER', count: 2, href: '/brands/6538-hummer/' },
        { name: 'HYOKO', count: 27, href: '/brands/6532-hyoko/' },
        { name: 'Hyundai Xteer', count: 22, href: '/brands/6561-hyundai_xteer/' }
      ]
    },
    {
      letter: 'I',
      brands: [
        { name: 'I Cord', count: 103, href: '/brands/6278-i_cord/' },
        { name: 'IDEAL', count: 80, href: '/brands/6410-ideal/' },
        { name: 'IDE Autoworks', count: 184, href: '/brands/6519-ide_autoworks/' },
        { name: 'Idemitsu', count: 39, href: '/brands/6417-idemitsu/' },
        { name: 'IGB', count: 98, href: '/brands/6360-indo_german_brakes/' },
        { name: 'IJTECH', count: 98, href: '/brands/6486-ijtech/' },
        { name: 'IMB Bearing', count: 213, href: '/brands/6476-imb_bearing/' },
        { name: 'Imperial Auto', count: 966, href: '/brands/6366-imperial_auto/' },
        { name: 'INDO LITE', count: 88, href: '/brands/6521-indo_lite/' },
        { name: 'INVOLVE', count: 67, href: '/brands/6480-involve/' },
        { name: 'I-POWER', count: 99, href: '/brands/6375-i_power/' },
        { name: 'ISUZU', count: 29796, href: '/brands/1318-isuzu/' }
      ]
    },
    {
      letter: 'J',
      brands: [
        { name: 'JAGUAR', count: 4408, href: '/brands/1334-jaguar/' },
        { name: 'JAPANPARTS', count: 31, href: '/brands/1338-japanparts/' },
        { name: 'JBL', count: 6, href: '/brands/6387-jbl/' },
        { name: 'JK Pioneer', count: 243, href: '/brands/6365-jk_pioneer/' },
        { name: 'JOPASU', count: 20, href: '/brands/6383-jopasu/' },
        { name: 'JUST BEAT', count: 92, href: '/brands/6490-just_beat/' }
      ]
    },
    {
      letter: 'K',
      brands: [
        { name: 'Kaltrol', count: 691, href: '/brands/6443-kaltrol/' },
        { name: 'KAMOKA', count: 80, href: '/brands/1390-kamoka/' },
        { name: 'KD', count: 3326, href: '/brands/6368-kd_product/' },
        { name: 'Keizo London', count: 6, href: '/brands/6562-keizo_london/' },
        { name: 'KEYCare', count: 160, href: '/brands/6406-keycare/' },
        { name: 'KK Lighting', count: 468, href: '/brands/6363-kk_lighting_india_private_limited/' },
        { name: 'Koyo', count: 25, href: '/brands/3589-koyo/' },
        { name: 'KTEK', count: 419, href: '/brands/6322-ktek/' },
        { name: 'KYB', count: 26, href: '/brands/1501-kyb/' }
      ]
    },
    {
      letter: 'L',
      brands: [
        { name: 'LAND ROVER', count: 9517, href: '/brands/1524-landrover/' },
        { name: 'Latest', count: 433, href: '/brands/6400-latest/' },
        { name: 'LEGENDS', count: 61, href: '/brands/6520-legend/' },
        { name: 'LEMFORDER', count: 1581, href: '/brands/1550-lemforder/' },
        { name: 'Liqui Moly', count: 244, href: '/brands/6335-liqui_moly/' },
        { name: 'Littelfuse', count: 62, href: '/brands/6453-littelfuse/' },
        { name: 'LPR', count: 22, href: '/brands/1600-lpr/' },
        { name: 'LUCAS - TVS', count: 1080, href: '/brands/6306-lucas_tvs/' },
        { name: 'Lumax', count: 1994, href: '/brands/2819-lumax/' },
        { name: 'Lumax Bluechem', count: 18, href: '/brands/6539-lumax_bluechem/' },
        { name: 'Lumax Techmax', count: 73, href: '/brands/6518-lumax_techmax/' }
      ]
    },
    {
      letter: 'M',
      brands: [
        { name: 'MACLITE', count: 189, href: '/brands/6367-maclite/' },
        { name: 'MAHINDRA', count: 133459, href: '/brands/1637-mahindra/' },
        { name: 'MAHLE ORIGINAL', count: 2717, href: '/brands/1641-mahleoriginal/' },
        { name: 'MANN-FILTER', count: 2329, href: '/brands/1651-mannfilter/' },
        { name: 'MANNOL', count: 91, href: '/brands/6546-mannol/' },
        { name: 'Mark Xtralife', count: 522, href: '/brands/6357-mark_xtralife/' },
        { name: 'MARUTI SUZUKI', count: 126368, href: '/brands/2456-suzukimaruti/' },
        { name: 'MASTER SPARK PLUG', count: 18, href: '/brands/6524-master_spark_plug/' },
        { name: 'MEGUIAR\'S', count: 48, href: '/brands/6552-meguiar_s/' },
        { name: 'MERCEDES-BENZ', count: 209729, href: '/brands/1720-mercedesbenz/' },
        { name: 'METZGER', count: 14, href: '/brands/1739-metzger/' },
        { name: 'MEYLE', count: 8381, href: '/brands/1741-meyle/' },
        { name: 'MGT', count: 2394, href: '/brands/6381-mgt/' },
        { name: 'MITSUBISHI', count: 5493, href: '/brands/1765-mitsubishi/' },
        { name: 'Mitsuboshi', count: 1371, href: '/brands/5216-mitsuboshi/' },
        { name: 'MJ BRAKE SYSTEM', count: 5, href: '/brands/6548-mj_brake_system/' },
        { name: 'Mobil', count: 178, href: '/brands/6318-mobil/' },
        { name: 'MOBIS (Hyundai, Kia)', count: 157432, href: '/brands/1254-hyundaikia/' },
        { name: 'MOCO', count: 29, href: '/brands/6491-moco/' },
        { name: 'MONROE', count: 4113, href: '/brands/1779-monroe/' },
        { name: 'MORRIS GARAGES', count: 3, href: '/brands/6559-morris_garages/' },
        { name: 'Motherson', count: 2159, href: '/brands/6304-motherson_auto_parts/' },
        { name: 'MotoJet', count: 889, href: '/brands/6296-motojet/' },
        { name: 'MOTUL', count: 41, href: '/brands/6321-motul/' },
        { name: 'Mr.Muscle', count: 3, href: '/brands/6544-mr_muscle/' },
        { name: 'myTVS', count: 732, href: '/brands/6445-mytvs/' }
      ]
    },
    {
      letter: 'N',
      brands: [
        { name: 'NEOLITE', count: 22, href: '/brands/6369-neolite/' },
        { name: 'NEW ERA', count: 1822, href: '/brands/6394-new_era/' },
        { name: 'NGK', count: 5318, href: '/brands/1867-ngk/' },
        { name: 'NiBK', count: 42, href: '/brands/1868-nibk/' },
        { name: 'Nissan / Renault', count: 93302, href: '/brands/1872-nissaninfiniti/' },
        { name: 'NRB', count: 103, href: '/brands/6487-nrb/' }
      ]
    },
    {
      letter: 'O',
      brands: [
        { name: 'OAE', count: 759, href: '/brands/6516-oae/' },
        { name: 'OPTIBELT', count: 3806, href: '/brands/1927-optibelt/' },
        { name: 'OSRAM', count: 603, href: '/brands/1941-osram/' },
        { name: 'OTR', count: 964, href: '/brands/6327-otr/' }
      ]
    },
    {
      letter: 'P',
      brands: [
        { name: 'Park+', count: 16, href: '/brands/6528-park/' },
        { name: 'Perfect', count: 28, href: '/brands/6386-perfect/' },
        { name: 'Petronas', count: 24, href: '/brands/6473-petronas/' },
        { name: 'PHC', count: 170, href: '/brands/3529-phc/' },
        { name: 'PHILIPS', count: 903, href: '/brands/2043-philips/' },
        { name: 'Phoenix', count: 67, href: '/brands/6438-phoenix/' },
        { name: 'Pidilite', count: 107, href: '/brands/6542-pidilite/' },
        { name: 'PIX', count: 402, href: '/brands/6484-pix_powerware/' },
        { name: 'PORTRONICS', count: 35, href: '/brands/6434-portronics/' },
        { name: 'POTAUTO', count: 827, href: '/brands/6425-potauto/' },
        { name: 'Premier Plus', count: 714, href: '/brands/6292-premier_plus/' },
        { name: 'PRIGAN', count: 274, href: '/brands/6493-prigan/' },
        { name: 'PRUVU', count: 44, href: '/brands/6553-pruvu/' },
        { name: 'PUROLATOR', count: 762, href: '/brands/2105-purolator/' }
      ]
    },
    {
      letter: 'R',
      brands: [
        { name: 'RANE', count: 1913, href: '/brands/5957-rane/' },
        { name: 'RBI', count: 45, href: '/brands/4227-rbi/' },
        { name: 'REMSA', count: 111, href: '/brands/2152-remsa/' },
        { name: 'Remsons', count: 382, href: '/brands/6467-remsons/' },
        { name: 'RIVON', count: 1171, href: '/brands/6509-rivon/' },
        { name: 'RoadCast', count: 7, href: '/brands/6554-roadcast/' },
        { name: 'ROCKFORD FOSGATE', count: 4, href: '/brands/6378-rockford_fosgate/' },
        { name: 'Roots', count: 744, href: '/brands/6356-roots/' },
        { name: 'Roulunds Braking', count: 132, href: '/brands/6359-roulunds/' },
        { name: 'ROWE', count: 66, href: '/brands/6568-rowe/' },
        { name: 'Royal', count: 1126, href: '/brands/6461-royal/' }
      ]
    },
    {
      letter: 'S',
      brands: [
        { name: 'SACHS', count: 395, href: '/brands/2232-sachs/' },
        { name: 'Sanden', count: 152, href: '/brands/3189-sanden/' },
        { name: 'SBM', count: 201, href: '/brands/6329-sbm/' },
        { name: 'Schaeffler (LuK, INA, FAG)', count: 4770, href: '/brands/1615-luk/' },
        { name: 'Servo', count: 60, href: '/brands/6331-servo/' },
        { name: 'Sheeba', count: 76, href: '/brands/6376-sheeba/' },
        { name: 'Sheen', count: 109, href: '/brands/6374-sheen/' },
        { name: 'Shell', count: 140, href: '/brands/3489-shell/' },
        { name: 'SILKEY', count: 18, href: '/brands/6402-silkey/' },
        { name: 'SIPL', count: 47, href: '/brands/6560-sipl/' },
        { name: 'SKF', count: 3830, href: '/brands/2367-skf/' },
        { name: 'SMIC Autoparts', count: 1031, href: '/brands/6466-sona_mandhira/' },
        { name: 'SMR', count: 771, href: '/brands/6452-smr/' },
        { name: 'SMSSS', count: 80, href: '/brands/6328-smsss/' },
        { name: 'SOFIMA', count: 993, href: '/brands/2383-sofima/' },
        { name: 'SONAX', count: 32, href: '/brands/6530-sonax/' },
        { name: 'SONY', count: 41, href: '/brands/6449-sony/' },
        { name: 'Spark Minda', count: 1354, href: '/brands/5931-sparkminda/' },
        { name: 'Spicer', count: 413, href: '/brands/6504-spicer/' },
        { name: 'SRF', count: 1, href: '/brands/6397-srf/' },
        { name: 'SSANGYONG', count: 3675, href: '/brands/2415-ssangyong/' },
        { name: 'STALLION', count: 11, href: '/brands/6533-stallion/' },
        { name: 'STANLEY', count: 317, href: '/brands/6470-stanley/' },
        { name: 'Starke', count: 640, href: '/brands/6343-starke/' },
        { name: 'Statiq', count: 6, href: '/brands/6557-statiq/' },
        { name: 'STICKITUP', count: 99, href: '/brands/6503-stickitup/' },
        { name: 'STP', count: 21, href: '/brands/6451-stp/' },
        { name: 'Subros', count: 776, href: '/brands/6138-subros/' },
        { name: 'Super Circle', count: 261, href: '/brands/6377-super_circle/' },
        { name: 'Superlift', count: 129, href: '/brands/6361-superlift/' },
        { name: 'Super Seals', count: 116, href: '/brands/6411-super_seals/' },
        { name: 'SWAG', count: 71, href: '/brands/2461-swag/' },
        { name: 'Swarup', count: 257, href: '/brands/6522-swarup/' }
      ]
    },
    {
      letter: 'T',
      brands: [
        { name: 'Talbros', count: 2294, href: '/brands/5941-talbros/' },
        { name: 'TATA', count: 103988, href: '/brands/2478-tatatelco/' },
        { name: 'Tata Ficosa', count: 1163, href: '/brands/6371-tata_ficosa/' },
        { name: 'Technix', count: 1738, href: '/brands/6326-technix/' },
        { name: 'TEL Turbo Energy', count: 90, href: '/brands/6156-telturboenergy/' },
        { name: 'TEXSPIN', count: 250, href: '/brands/6566-texspin/' },
        { name: 'TEXTAR', count: 3101, href: '/brands/2508-textar/' },
        { name: 'Top Drive', count: 204, href: '/brands/5156-topdrive/' },
        { name: 'Toyota / Lexus', count: 148274, href: '/brands/2545-toyotalexus/' },
        { name: 'TRAK-N-TELL', count: 6, href: '/brands/6388-trak_n_tell/' },
        { name: 'TRW', count: 918, href: '/brands/2571-trw/' },
        { name: 'Turtle Wax', count: 228, href: '/brands/6340-turtle_wax/' },
        { name: 'TVS Girling', count: 1956, href: '/brands/6294-tvs_girling/' }
      ]
    },
    {
      letter: 'U',
      brands: [
        { name: 'UCAL', count: 921, href: '/brands/6316-ucal/' },
        { name: 'UFI', count: 732, href: '/brands/2592-ufi/' },
        { name: 'UNO MINDA', count: 3560, href: '/brands/2818-unominda/' }
      ]
    },
    {
      letter: 'V',
      brands: [
        { name: 'VAG (VW, AUDI, SKODA)', count: 142078, href: '/brands/2681-vwaudiskodaseatvag/' },
        { name: 'VALEO', count: 8641, href: '/brands/2622-valeo/' },
        { name: 'Valvoline', count: 6, href: '/brands/6475-valvoline/' },
        { name: 'VEXTRON', count: 51, href: '/brands/6550-vextron/' },
        { name: 'VIR', count: 2686, href: '/brands/2821-vir/' },
        { name: 'VOLVO', count: 69980, href: '/brands/2673-volvo/' },
        { name: 'VTECH', count: 37, href: '/brands/6565-vtech/' }
      ]
    },
    {
      letter: 'W',
      brands: [
        { name: 'WALKER', count: 519, href: '/brands/2696-walker/' },
        { name: 'WAXPOL', count: 35, href: '/brands/6428-waxpol/' },
        { name: 'WIX FILTERS', count: 316, href: '/brands/2746-wixfilters/' },
        { name: 'Woscher', count: 73, href: '/brands/6339-woscher/' },
        { name: 'Woschmann', count: 1138, href: '/brands/6408-woschmann/' },
        { name: 'WURTH', count: 67, href: '/brands/6407-wurth/' }
      ]
    },
    {
      letter: 'Z',
      brands: [
        { name: 'ZF', count: 49, href: '/brands/2799-zf/' },
        { name: 'ZIP', count: 750, href: '/brands/5952-zip/' }
      ]
    }
  ];

  // Sort brands within each group alphabetically
  const sortedGroups = groups.map(group => ({
    ...group,
    brands: [...group.brands].sort((a, b) => a.name.localeCompare(b.name))
  }));

  const [filter, setFilter] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("All");

  // Get current groups based on selected letter
  const currentGroups = selectedLetter === "All" 
    ? sortedGroups 
    : sortedGroups.filter(group => group.letter === selectedLetter);

  // Flatten brands from current groups
  const allCurrentBrands = currentGroups.flatMap(group => 
    group.brands.map(brand => ({ ...brand, group: group.letter }))
  );

  // Filter brands based on search input
  const filteredBrands = allCurrentBrands.filter((brand) =>
    brand.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="px-6 py-6">
      {/* Heading + Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">
          Shop by <span className="text-red-500">Brand</span>
        </h1>
        <div>
          <input
            type="search"
            placeholder="Filter Brand"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-2 w-full md:w-64 focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>
      </div>

      {/* Alphabet Navigation */}
      <ul className="flex flex-wrap gap-2 mb-6">
        {alphabets.map((letter) => (
          <li
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className={`px-3 py-1 border rounded cursor-pointer transition ${
              selectedLetter === letter
                ? 'bg-sky-500 text-white'
                : 'hover:bg-sky-500 hover:text-white'
            }`}
          >
            {letter}
          </li>
        ))}
      </ul>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredBrands.map((brand) => (
          <Link
            key={brand.href}
            to={brand.href}
            className="p-4 rounded text-center hover:shadow-lg cursor-pointer block text-inherit hover:text-blue-600 transition-colors"
          >
            {brand.name} ({brand.count})
          </Link>
        ))}
      </div>
    </div>
  );
};