// @flow
/* eslint-disable spaced-comment,block-spacing,one-var,operator-linebreak,no-duplicate-imports,no-whitespace-before-property,standard/computed-property-even-spacing */
/**
 * Created by gordianknot on 2/27/2018.
 */

//FIXME: following code not tested yet

import {PLANETS_SETTING} from '../src/types'
import type {TSpliters, TStorageRecs} from '../src/types'
import LZString from 'lz-string'
import _ from 'lodash'

const Compress = window.$Compress = LZString.compress                // eslint-disable-line
const Compress64 = window.$Compress64 = LZString.compressToBase64        // eslint-disable-line
const Decompress = window.$Decompress = LZString.decompress              // eslint-disable-line
const Decompress64 = window.$Decompress64 = LZString.decompressFromBase64    // eslint-disable-line

type TAstroData = {
   Sun: string,
   Earth: string,
   Moon: string,
   Venus: string,
   Mercury: string,
   Mars: string,
   Jupiter: string,
   Saturn: string,
   Uranus: string,
   Pluto: string,
   Neptune: string,
   North: string,
   South: string,
   Ceres: string,
   Juno: string,
   Pallas: string,
   Vesta: string,
   Chiron: string,
   Observer: string,
   sunrise: string,
   sunset: string
}
type THD_Setting = { Sun: number, Earth: number, Moon: number, Venus: number, Mercury: number, Jupiter: number, Saturn: number, Uranus: number, Neptune: number, North: number, South: number, Ceres: number, Juno: number, Pallas: number, Vesta: number, Chiron: number }
type THD_Data = {
   personality: TAstroData,
   design: TAstroData
}
type TUserData = { name: string, date: string, city: string, setting: Object, hd: THD_Data }


//$flowNOTE: suppress
const HD_Setting = function (Sun, Earth, Moon, Venus, Mercury, Mars, Jupiter, Saturn, Uranus, Pluto, Neptune, North, South, Ceres,
                             Juno,
                             Pallas, Vesta, Chiron): THD_Setting {
   return {
      Sun    : Sun,
      Earth  : Earth,
      Moon   : Moon,
      Venus  : Venus,
      Mercury: Mercury,
      Mars   : Mars,
      Jupiter: Jupiter,
      Saturn : Saturn,
      Uranus : Uranus,
      Pluto  : Pluto,
      Neptune: Neptune,
      North  : North,
      South  : South,
      Ceres  : Ceres,
      Juno   : Juno,
      Pallas : Pallas,
      Vesta  : Vesta,
      Chiron : Chiron
   }
}
const UserData   = function (name: string, date: string, gender: boolean, city: string, hd_data: THD_Data,
                             setting: THD_Setting): TUserData {
   return {name: name, date: date, gender: gender, city: city, hd: hd_data, setting: setting}
}

const HD_Data         = function (personality: TAstroData, design: TAstroData): THD_Data {
   return {personality: personality, design: design}
}
// eslint-disable-next-line no alert
const MAJOR_CITY_DATA =
         {
            'Argentina'           : ['Rawson', 'Neuquen', 'Santa Rosa', 'San Carlos de Bariloche', 'Salta', 'Tucumán', 'Formosa',
                                     'Santa Fe',
                                     'Rosario',
                                     'Puerto Deseado', 'Rio Gallegos', 'Comodoro Rivadavia', 'Mendoza', 'Bahia Blanca',
                                     'Mar del Plata',
                                     'Córdoba', 'Posadas',
                                     'Buenos Aires', 'TucumÃ¡n', 'CÃ³rdoba'],
            'Australia'           : ['Portland', 'Bendigo', 'Wangaratta', 'Windorah', 'Mount Isa', 'Rockhampton', 'Cairns',
                                     'Gold Coast',
                                     'Devonport', 'Darwin',
                                     'Alice Springs', 'Canberra', 'Newcastle', 'Adelaide', 'Townsville', 'Brisbane', 'Hobart',
                                     'Perth',
                                     'Melbourne',
                                     'Sydney'],
            'Austria'             : ['Bregenz', 'Eisenstadt', 'Wiener Neustadt', 'Graz', 'Klagenfurt', 'Linz', 'Passau',
                                     'Salzburg',
                                     'Innsbruck',
                                     'Vienna'],
            'Belgium'             : ['Mons', 'Hasselt', 'Arlon', 'Gent', 'Liege', 'Brugge', 'Namur', 'Charleroi', 'Antwerpen',
                                     'Brussels'],
            'Brazil'              : ['Campo Grande', 'Florianopolis', 'Feira de Santana', 'Boa Vista', 'Macapá', 'Belem',
                                     'Brasilia',
                                     'Porto Alegre', 'Curitiba',
                                     'Fortaleza', 'Salvador', 'Goiania', 'Recife', 'Rio de Janeiro', 'Sao Paulo', 'CÃ¡ceres',
                                     'JacundÃ¡',
                                     'VitÃ³ria',
                                     'SÃ£o LuÃ\xads', 'MacapÃ¡'],
            'Canada'              : ['Fort Good Hope', 'Whitehorse', 'Ottawa', 'Fort Severn', 'Thunder Bay', 'Québec', 'Halifax',
                                     'St. John’s',
                                     'Nain',
                                     'Charlottetown', 'Edmonton', 'Montréal', 'Vancouver', 'Toronto', 'DÃ©line',
                                     'Trois-RiviÃ¨res',
                                     'Sept-ÃŽles', 'QuÃ©bec',
                                     'St. Johnâ€™s', 'MontrÃ©al'],
            'Chile'               : ['Ovalle', 'Chillan', 'Rancagua', 'Osorno', 'Ancud', 'Talca', 'Curico', 'Coihaique', 'Arica',
                                     'Copiapo',
                                     'La Serena',
                                     'Los Angeles', 'Punta Arenas', 'Iquique', 'Antofagasta', 'Valparaiso', 'Valdivia',
                                     'Concepcion',
                                     'Puerto Montt',
                                     'Santiago'],
            'China'               : ['Dongguan', 'Xian', 'Taiyuan', 'Wuhan', 'Changsha', 'Kunming', 'Zhengzhou', 'Shenyeng',
                                     'Jinan', 'Tianjin',
                                     'Nanchang',
                                     'Nanjing', 'Hangzhou', 'Changchun', 'Baotou', 'Harbin', 'Urumqi', 'Chengdu', 'Beijing',
                                     'Shanghai'],
            'Colombia'            : ['San Martin', 'Puerto Carreno', 'Bello', 'Monteria', 'Bucaramanga', 'Ibague', 'Popayan',
                                     'Santa Marta',
                                     'Cucuta',
                                     'Villavicencio', 'Tumaco', 'Manizales', 'Pasto', 'Barranquilla', 'Cartagena', 'Mitu',
                                     'Leticia',
                                     'Medellin', 'Cali',
                                     'Bogota'],
            'Denmark'             : ['Vejle', 'Hillerod', 'Soro', 'Viborg', 'Roskilde', 'Svendborg', 'Odense', 'Esbjerg',
                                     'Frederikshavn',
                                     'Aalborg', 'Århus',
                                     'København', 'Ã…rhus', 'KÃ¸benhavn'],
            'Egypt'               : ['Sohag', 'Berenice', 'Bur Safaga', 'El Tur', 'El Arish', 'El Giza', 'Siwa', 'El Minya',
                                     'Kom Ombo',
                                     'El Kharga', 'Hurghada',
                                     'Suez', 'Bur Said', 'El Faiyum', 'Aswan', 'Asyut', 'Luxor', 'Alexandria', 'Cairo',
                                     'DamanhÃ»r'],
            'France'              : ['Metz', 'Pointe-a-Pitre', 'Basse-terre', 'St.-Benoit', 'Dzaoudzi', 'Rennes', 'Nice',
                                     'Toulouse', 'Limoges',
                                     'Lille',
                                     'Strasbourg', 'Kourou', 'La Rochelle', 'Bordeaux', 'Marseille', 'Le Havre', 'St.-Denis',
                                     'Lyon', 'Cayenne',
                                     'Paris'],
            'Germany'             : ['Ingolstadt', 'Cottbus', 'Potsdam', 'Magdeburg', 'Leipzig', 'Stralsund', 'Rostock',
                                     'Stuttgart', 'Bremen',
                                     'Nürnberg',
                                     'Cologne', 'Dresden', 'Frankfurt', 'Hamburg', 'Munich', 'Berlin', 'MÃ¼nster', 'DÃ¼sseldorf',
                                     'OsnabrÃ¼ck',
                                     'NÃ¼rnberg'],
            'India'               : ['Varanasi', 'Asansol', 'Bhilai', 'Bhopal', 'Madurai', 'Coimbatore', 'Delhi', 'Hyderabad',
                                     'Pune', 'Nagpur',
                                     'Jaipur',
                                     'Kanpur', 'Patna', 'Chennai', 'Ahmedabad', 'Surat', 'New Delhi', 'Bangalore', 'Mumbai',
                                     'Kolkata'],
            'Indonesia'           : ['Raba', 'Jayapura', 'Banda Aceh', 'Balikpapan', 'Surakarta', 'Tanjungpandan', 'Malang',
                                     'Kupang',
                                     'Parepare', 'Gorontalo',
                                     'Padang', 'Tarakan', 'Semarang', 'Palembang', 'Bandjarmasin', 'Ujungpandang', 'Medan',
                                     'Bandung',
                                     'Surabaya',
                                     'Jakarta'],
            'Iran'                : ['Bandar-e Bushehr', 'Abadan', 'Ardabil', 'Qom', 'Qazvin', 'Kermanshah', 'Rasht', 'Birjand',
                                     'Sabzewar',
                                     'Zabol', 'Zahedan',
                                     'Yazd', 'Ahvaz', 'Bandar-e-Abbas', 'Hamadan', 'Tabriz', 'Isfahan', 'Shiraz', 'Mashhad',
                                     'Tehran'],
            'Ireland'             : ['Ros Comain', 'Muineachan', 'Shannon', 'Waterford', 'Tralee', 'Donegal', 'Drogheda',
                                     'Dundalk', 'Galway',
                                     'Kilkenny',
                                     'Killarney', 'Sligo', 'Cork', 'Limerick', 'Dublin'],
            'Israel'              : ['Ramla', 'Beer Sheva', 'Haifa', 'Nazareth', 'Jerusalem', 'Tel Aviv-Yafo'],
            'Italy'               : ['Pescara', "L'Aquila", 'Civitavecchia', 'Ancona', 'Perugia', 'Bergamo', 'Trieste', 'Bolzano',
                                     'Trento',
                                     'Verona', 'Sassari',
                                     'Turin', 'Genoa', 'Florence', 'Catania', 'Venice', 'Palermo', 'Naples', 'Milan', 'Rome'],
            'Japan'               : ['Hachinohe', 'Fukushima', 'Morioka', 'Niigata', 'Fukuoka', 'Miyazaki', 'Naha', 'Kochi',
                                     'Nagoya', 'Nagano',
                                     'Kushiro',
                                     'Hakodate', 'Kyoto', 'Sendai', 'Sakata', 'Nagasaki', 'Hiroshima', 'Sapporo', 'Osaka',
                                     'Tokyo'],
            'Malaysia'            : ['Chukai', 'Kuala Terengganu', 'Lahad Datu', 'Bintulu', 'Miri', 'Johor Bahru', 'Kelang',
                                     'Taiping',
                                     'Ipoh', 'Kota Baharu',
                                     'Malacca', 'Kuantan', 'Tawau', 'Sandakan', 'Kota Kinabalu', 'Sibu', 'George Town', 'Kuching',
                                     'Putrajaya',
                                     'Kuala Lumpur'],
            'Mexico'              : ['Nuevo Laredo', 'Colima', 'Campeche', 'Oaxaca', 'Leon', 'Tijuana', 'Chihuahua', 'Mazatlan',
                                     'Tampico',
                                     'Acapulco', 'Veracruz',
                                     'Tuxtla Gutierrez', 'Cancun', 'Merida', 'Guadalajara', 'Puebla', 'Monterrey', 'Mexico City',
                                     'MazatlÃ¡n',
                                     'Ciudad JuÃ¡rez'],
            'Netherlands'         : ['Assen', 'Arnhem', 'Maastricht', 'Zwolle', 'Middelburg', "'s-Hertogenbosch", 'Eindhoven',
                                     'Leeuwarden', 'Groningen',
                                     'Utrecht', 'Haarlem', 'Rotterdam', 'The Hague', 'Amsterdam'],
            'Nigeria'             : ['Mubi', 'Numan', 'Ilorin', 'Minna', 'Zaria', 'Jos', 'Yola', 'Benin City', 'Maiduguri',
                                     'Port Harcourt',
                                     'Makurdi', 'Ibadan',
                                     'Ogbomosho', 'Warri', 'Kaduna', 'Enugu', 'Sokoto', 'Abuja', 'Kano', 'Lagos'],
            'Norway'              : ['Alta', 'Vadsø', 'Molde', 'Lillehammer', 'Kirkenes', 'Kristiansand', 'Hammerfest', 'Tromsø',
                                     'Trondheim',
                                     'Bergen', 'Oslo',
                                     'BÃ¦rum', 'TÃ¸nsberg', 'GjÃ¸vik', 'RÃ¸rvik', 'Ã…lesund', 'SvolvÃ¦r', 'BodÃ¸', 'VadsÃ¸',
                                     'TromsÃ¸'],
            'Pakistan'            : ['Nawabshah', 'Bannu', 'Dera Ismail Khan', 'Chaman', 'Turbat', 'Faisalabad', 'Rawalpindi',
                                     'Bahawalpur',
                                     'Mirput Khas',
                                     'Sukkur', 'Saidu', 'Gujranwala', 'Quetta', 'Larkana', 'Islamabad', 'Multan', 'Hyderabad',
                                     'Peshawar',
                                     'Lahore',
                                     'Karachi'],
            'Philippines'         : ['Legazpi', 'Tuguegarao', 'Vigan', 'Bacolod', 'Roxas', 'Puerto Princesa', 'Naga', 'Angeles',
                                     'Batangas', 'Cotabato',
                                     'Calbayog', 'Cagayan de Oro', 'Zamboanga', 'Laoag', 'Baguio City', 'General Santos', 'Cebu',
                                     'Iloilo',
                                     'Davao',
                                     'Manila'],
            'Poland'              : ['Elk', 'Gdynia', 'Wroclaw', 'Szczecin', 'Zielona Gora', 'Poznan', 'Grudziadz', 'Bydgoszcz',
                                     'Katowice',
                                     'Gliwice', 'Kielce',
                                     'Bialystok', 'Lublin', 'Rzeszow', 'Lódz', 'Gdansk', 'Kraków', 'Warsaw', 'LÃ³dz', 'KrakÃ³w'],
            'Russia'              : ['Samara', 'Kazan', 'Surgut', 'Barnaul', 'Novosibirsk', 'Bratsk', 'Irkutsk', 'Krasnoyarsk',
                                     'Dickson',
                                     'Chita', 'Vladivostok',
                                     'Nizhneyansk', 'Yakutsk', 'Tiksi', 'Magadan', 'Perm', 'Palana', 'Petropavlovsk Kamchatskiy',
                                     'St. Petersburg',
                                     'Moscow'],
            'Saudi Arabia'        : ['Az Zahran', 'Buraydah', 'Hail', 'Arar', 'Rafha', 'Al Kharj', 'Ad Damman', 'Hafar al Batin',
                                     'Al Jubayl', 'Al Qunfudhah',
                                     'Al Hufuf', 'Al Wajh', 'Abha', 'Jizan', 'As Sulayyil', 'Medina', 'Tabuk', 'Jeddah', 'Makkah',
                                     'Riyadh'],
            'Singapore'           : ['Singapore'],
            'South Africa'        : ['Polokwane', 'Thohoyandou', 'Musina', 'Vryheid', 'Pietermaritzburg', 'Umtata',
                                     'Graaff Reinet',
                                     'Bhisho', 'Springbok',
                                     'Upington', 'Worcester', 'George', 'Welkom', 'East London', 'Bloemfontein', 'Pretoria',
                                     'Port Elizabeth', 'Durban',
                                     'Johannesburg', 'Cape Town'],
            'South Korea'         : ['Yeosu', 'Andong', 'Jeju', 'Gangneung', 'Sokcho', 'Jeonju', 'Gunsan', 'Mokpo', "Puch'on",
                                     'Songnam',
                                     'Goyang', 'Suwon',
                                     'Pohang', 'Ulsan', 'Daegu', 'Incheon', 'Daejeon', 'Gwangju', 'Busan', 'Seoul'],
            'Spain'               : ['Ceuta', 'La Coruña', 'Ourense', 'Pamplona', 'Valladolid', 'Melilla', 'Palma', 'Zaragoza',
                                     'Santa Cruz de Tenerife',
                                     'Cordoba', 'Vigo', 'Bilbao', 'Las Palmas', 'Seville', 'Valencia', 'Barcelona', 'Madrid',
                                     'JaÃ©n',
                                     'San SebastiÃ¡n',
                                     'La CoruÃ±a'],
            'Sweden'              : ['Malmö', 'Stockholm', 'BorlÃ¤nge', 'VÃ¤sterÃ¥s', 'BollnÃ¤s', 'GÃ¤vle', 'VÃ¤xjÃ¶', 'Ã–rebro',
                                     'NorrkÃ¶ping',
                                     'SkellefteÃ¥',
                                     'TrollhÃ¤ttan', 'BorÃ¥s', 'JÃ¶nkÃ¶ping', 'Ã–rnskÃ¶ldsvik', 'LinkÃ¶ping', 'Ã–stersund',
                                     'UmeÃ¥',
                                     'GÃ¶teborg', 'LuleÃ¥',
                                     'MalmÃ¶'],
            'Switzerland'         : ['Schaffhausen', 'Schwyz', 'Frauenfeld', 'Altdorf', 'Zug', 'Fribourg', 'Liestal', 'Solothurn',
                                     'Sarnen', 'Appenzell', 'Chur',
                                     'Biel', 'Luzern', 'Lugano', 'Lausanne', 'Basel', 'Bern', 'Zürich', 'Geneva', 'ZÃ¼rich'],
            'Taiwan'              : ['Yilan', 'Zhubei', 'Douliou', 'Zhongli', 'Keelung', 'Nantou', 'Puzi', 'Changhua', 'Chiayi',
                                     'Hsinchu',
                                     'Miaoli', 'Pingtung',
                                     'Hualien', 'New Taipei', 'Tainan', 'Taitung', 'Magong', 'Taichung', 'Kaohsiung', 'Taipei'],
            'Thailand'            : ['Chaiyaphum', 'Bua Yai', 'Surin', 'Loei', 'Nong Khai', 'Sakhon Nakhon', 'Udon Thani',
                                     'Nakhon Phanom',
                                     'Narathiwat',
                                     'Khon Kaen', 'Phuket', 'Nakhon Si Thammarat', 'Songkhla', 'Hat Yai', 'Nakhon Sawan',
                                     'Ubon Ratchathani',
                                     'Surat Thani',
                                     'Chiang Mai', 'Nakhon Ratchasima', 'Bangkok'],
            'Turkey'              : ['Kilis', 'Kirikkale', 'Kars', 'Mardin', 'Batman', 'Van', 'Adapazari', 'Trabzon', 'Sanliurfa',
                                     'Eskisehir',
                                     'Antalya',
                                     'Kayseri', 'Gaziantep', 'Izmir', 'Bursa', 'Samsun', 'Konya', 'Adana', 'Ankara', 'Istanbul'],
            'United Arab Emirates': ['Umm al Qaywayn', 'Sharjah', 'Jabal Ali', 'Ras al Khaymah', 'Al Fujayrah', 'Al Ayn',
                                     'Abu Dhabi', 'Dubai'],
            'United Kingdom'      : ['Inverness', 'Oxford', 'Luton', 'Portsmouth', 'Peterborough', 'Nottingham', 'Stoke', 'Dover',
                                     'Edinburgh', 'Newcastle',
                                     'Liverpool', 'Cardiff', 'Wick', 'Leeds', 'Lerwick', 'Manchester', 'Birmingham', 'Belfast',
                                     'Glasgow', 'London']
         }


//TODO: further test                              :
//TODO: add type                                  :
//TODO: run jest-localstorage for testing the rest:
class LocalDataBase {
   prefix: string
   prefixit: (string) => string
   compressed: boolean
   keys: () => string[]
   clear: () => void
   values: () => string[]
   items: () => Object
   fields: string[]
   
   constructor(prefix: string      = 'vocabulary',
               compressed: boolean = true) {
      this.prefix     = prefix
      this.compressed = compressed
      this.fields     = ['keys', 'values', 'items', 'clear']
      let self        = this
      let prefixit    = this.prefixit = (k) => `${prefix}-${k}`
      this.keys   = function () {
         return _.keys(localStorage).filter((x) => x.substr(0, self.prefix.length) === self.prefix).map((key) => key.substr(self.prefix.length + 1))
      }
      this.values = function () {
         let dec: (string) => string = self.compressed ? Decompress : (x) => {return x}
         let ret                     = []
         for (let key in localStorage) {
            if (key.substr(0, self.prefix.length) === self.prefix) {
               ret.push(dec(localStorage[key]))
            }
         }
         return ret
      }
      this.items  = function () {
         let dec: (string) => string = self.compressed ? Decompress : (x) => x
         let ret                     = {}
         for (let key in localStorage) {
            if (key.substr(0, self.prefix.length) === self.prefix) {
               ret [key.substr(self.prefix.length + 1)] = dec(localStorage[key])
            }
         }
         return ret
      }
      this.clear = function(){
         let realkeys = _.keys(localStorage).filter((x) => x.substr(0, self.prefix.length) === self.prefix)
         for (let key of realkeys){
            localStorage.removeItem(key)
         }
      }
      
      let ret = new Proxy(this, {
         get (target, key) {
            if (self.fields.indexOf(key) !== -1) return self[key]
            console.log('get:', key)
            let raw_value = localStorage.getItem(prefixit(key))
            let dec: (string) => string = compressed ? Decompress : (x) => x
            if (raw_value !== null) return JSON.parse(dec(raw_value))
            return raw_value
         },
         set (target, key, value) {
            let com: (string) => string = (x) => JSON.stringify(x)
            if (compressed) com = (x) =>Compress(JSON.stringify(x))
            localStorage.setItem(prefixit(key), com(value))
            return true // preventing falsish error
         },
         deleteProperty (oTarget, key) {
            localStorage.removeItem(prefixit(key))
         },
         enumerate (oTarget, sKey) {
            return _.keys(localStorage).filter((x) => x.substr(0, prefix.length) === prefix)
         },
         has (target, key){
            return localStorage.getItem(prefixit(key)) !== null
         }
      })
      return ret
   }
}

//TODO: cahced like wrapper, for caching function call returns
//NOTE: usage =>    wrapper(setting, function(param){})
type TCacheSetting = {
   debounce?: boolean,
   cache?: boolean,
   __debounce_time?: number,
   perior?: number,
   return_type?: Function
}
const DAY                            = 60000 * 60 * 24
const default_setting: TCacheSetting = {
   debounce       : false,
   cache          : true,
   __debounce_time: 1000,
   periord        : 30 * DAY,
   return_type    : String,
}

const _DB = new LocalDataBase('CacheQuery', false)
function cachedQuery(realfn: Function, setting: TCacheSetting = default_setting) {
   let cache
   setting = _.extend(_.clone(default_setting), setting)
   function wrapper(...args: any[]) {
      // if (!args in )
      let key = String(args)           //$flowNOTE:
      if (key in _DB) return _DB[key]
      console.warn('wrapper, this:', this)
      realfn = realfn.bind(this)
      let ret = realfn(...args)        //$flowNOTE:
      _DB[key] = ret
      return ret
   }
   if (setting.debounce) return _.debounce(wrapper, setting.__debounce_time)
   return wrapper
}

export {
   LocalDataBase, PLANETS_SETTING, MAJOR_CITY_DATA, cachedQuery
}


