import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface Country {
  name: string;
  code: string;  // dial code e.g. +91
  iso: string;   // ISO 3166-1 alpha-2 e.g. IN
  flag: string;  // emoji flag
}

export const COUNTRIES: Country[] = [
  // ── Top / Popular ────────────────────────────────────────────
  { name: 'India',                 code: '+91',  iso: 'IN', flag: '🇮🇳' },
  { name: 'United States',         code: '+1',   iso: 'US', flag: '🇺🇸' },
  { name: 'United Kingdom',        code: '+44',  iso: 'GB', flag: '🇬🇧' },
  { name: 'Canada',                code: '+1',   iso: 'CA', flag: '🇨🇦' },
  { name: 'Australia',             code: '+61',  iso: 'AU', flag: '🇦🇺' },
  { name: 'United Arab Emirates',  code: '+971', iso: 'AE', flag: '🇦🇪' },
  { name: 'Singapore',             code: '+65',  iso: 'SG', flag: '🇸🇬' },
  { name: 'Germany',               code: '+49',  iso: 'DE', flag: '🇩🇪' },
  { name: 'France',                code: '+33',  iso: 'FR', flag: '🇫🇷' },
  { name: 'Netherlands',           code: '+31',  iso: 'NL', flag: '🇳🇱' },
  // ── Asia ─────────────────────────────────────────────────────
  { name: 'Afghanistan',           code: '+93',  iso: 'AF', flag: '🇦🇫' },
  { name: 'Bangladesh',            code: '+880', iso: 'BD', flag: '🇧🇩' },
  { name: 'Bhutan',                code: '+975', iso: 'BT', flag: '🇧🇹' },
  { name: 'China',                 code: '+86',  iso: 'CN', flag: '🇨🇳' },
  { name: 'Hong Kong',             code: '+852', iso: 'HK', flag: '🇭🇰' },
  { name: 'Indonesia',             code: '+62',  iso: 'ID', flag: '🇮🇩' },
  { name: 'Japan',                 code: '+81',  iso: 'JP', flag: '🇯🇵' },
  { name: 'Malaysia',              code: '+60',  iso: 'MY', flag: '🇲🇾' },
  { name: 'Maldives',              code: '+960', iso: 'MV', flag: '🇲🇻' },
  { name: 'Myanmar',               code: '+95',  iso: 'MM', flag: '🇲🇲' },
  { name: 'Nepal',                 code: '+977', iso: 'NP', flag: '🇳🇵' },
  { name: 'Pakistan',              code: '+92',  iso: 'PK', flag: '🇵🇰' },
  { name: 'Philippines',           code: '+63',  iso: 'PH', flag: '🇵🇭' },
  { name: 'South Korea',           code: '+82',  iso: 'KR', flag: '🇰🇷' },
  { name: 'Sri Lanka',             code: '+94',  iso: 'LK', flag: '🇱🇰' },
  { name: 'Taiwan',                code: '+886', iso: 'TW', flag: '🇹🇼' },
  { name: 'Thailand',              code: '+66',  iso: 'TH', flag: '🇹🇭' },
  { name: 'Vietnam',               code: '+84',  iso: 'VN', flag: '🇻🇳' },
  // ── Middle East ───────────────────────────────────────────────
  { name: 'Bahrain',               code: '+973', iso: 'BH', flag: '🇧🇭' },
  { name: 'Egypt',                 code: '+20',  iso: 'EG', flag: '🇪🇬' },
  { name: 'Iran',                  code: '+98',  iso: 'IR', flag: '🇮🇷' },
  { name: 'Iraq',                  code: '+964', iso: 'IQ', flag: '🇮🇶' },
  { name: 'Israel',                code: '+972', iso: 'IL', flag: '🇮🇱' },
  { name: 'Jordan',                code: '+962', iso: 'JO', flag: '🇯🇴' },
  { name: 'Kuwait',                code: '+965', iso: 'KW', flag: '🇰🇼' },
  { name: 'Lebanon',               code: '+961', iso: 'LB', flag: '🇱🇧' },
  { name: 'Oman',                  code: '+968', iso: 'OM', flag: '🇴🇲' },
  { name: 'Qatar',                 code: '+974', iso: 'QA', flag: '🇶🇦' },
  { name: 'Saudi Arabia',          code: '+966', iso: 'SA', flag: '🇸🇦' },
  { name: 'Turkey',                code: '+90',  iso: 'TR', flag: '🇹🇷' },
  // ── Europe ────────────────────────────────────────────────────
  { name: 'Austria',               code: '+43',  iso: 'AT', flag: '🇦🇹' },
  { name: 'Belgium',               code: '+32',  iso: 'BE', flag: '🇧🇪' },
  { name: 'Denmark',               code: '+45',  iso: 'DK', flag: '🇩🇰' },
  { name: 'Finland',               code: '+358', iso: 'FI', flag: '🇫🇮' },
  { name: 'Greece',                code: '+30',  iso: 'GR', flag: '🇬🇷' },
  { name: 'Hungary',               code: '+36',  iso: 'HU', flag: '🇭🇺' },
  { name: 'Ireland',               code: '+353', iso: 'IE', flag: '🇮🇪' },
  { name: 'Italy',                 code: '+39',  iso: 'IT', flag: '🇮🇹' },
  { name: 'Norway',                code: '+47',  iso: 'NO', flag: '🇳🇴' },
  { name: 'Poland',                code: '+48',  iso: 'PL', flag: '🇵🇱' },
  { name: 'Portugal',              code: '+351', iso: 'PT', flag: '🇵🇹' },
  { name: 'Romania',               code: '+40',  iso: 'RO', flag: '🇷🇴' },
  { name: 'Russia',                code: '+7',   iso: 'RU', flag: '🇷🇺' },
  { name: 'Spain',                 code: '+34',  iso: 'ES', flag: '🇪🇸' },
  { name: 'Sweden',                code: '+46',  iso: 'SE', flag: '🇸🇪' },
  { name: 'Switzerland',           code: '+41',  iso: 'CH', flag: '🇨🇭' },
  { name: 'Ukraine',               code: '+380', iso: 'UA', flag: '🇺🇦' },
  // ── Americas ─────────────────────────────────────────────────
  { name: 'Argentina',             code: '+54',  iso: 'AR', flag: '🇦🇷' },
  { name: 'Brazil',                code: '+55',  iso: 'BR', flag: '🇧🇷' },
  { name: 'Chile',                 code: '+56',  iso: 'CL', flag: '🇨🇱' },
  { name: 'Colombia',              code: '+57',  iso: 'CO', flag: '🇨🇴' },
  { name: 'Mexico',                code: '+52',  iso: 'MX', flag: '🇲🇽' },
  { name: 'New Zealand',           code: '+64',  iso: 'NZ', flag: '🇳🇿' },
  { name: 'Peru',                  code: '+51',  iso: 'PE', flag: '🇵🇪' },
  // ── Africa ───────────────────────────────────────────────────
  { name: 'Ethiopia',              code: '+251', iso: 'ET', flag: '🇪🇹' },
  { name: 'Ghana',                 code: '+233', iso: 'GH', flag: '🇬🇭' },
  { name: 'Kenya',                 code: '+254', iso: 'KE', flag: '🇰🇪' },
  { name: 'Nigeria',               code: '+234', iso: 'NG', flag: '🇳🇬' },
  { name: 'South Africa',          code: '+27',  iso: 'ZA', flag: '🇿🇦' },
  { name: 'Tanzania',              code: '+255', iso: 'TZ', flag: '🇹🇿' },
  { name: 'Uganda',                code: '+256', iso: 'UG', flag: '🇺🇬' },
];

const TOP_ISO = ['IN', 'US', 'GB', 'CA', 'AU', 'AE', 'SG', 'DE', 'FR', 'NL'];

interface Props {
  value: string;    // selected dial code e.g. "+91"
  onChange: (code: string) => void;
  error?: boolean;
}

export function CountryCodeSelector({ value, onChange, error }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = COUNTRIES.find((c) => c.code === value && (value === '+1' ? c.iso === 'US' : true))
    ?? COUNTRIES[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Focus search on open
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 60);
  }, [open]);

  const q = search.toLowerCase().trim();
  const filtered = q
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.code.includes(q) ||
          c.iso.toLowerCase().includes(q)
      )
    : COUNTRIES;

  const topPicks = filtered.filter((c) => TOP_ISO.includes(c.iso));
  const rest = filtered.filter((c) => !TOP_ISO.includes(c.iso));

  const handleSelect = (c: Country) => {
    onChange(c.code);
    setOpen(false);
    setSearch('');
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`
          flex items-center gap-1.5 h-10 px-3 rounded-l-lg border-r-0
          bg-gray-50 dark:bg-gray-800/80
          border ${error ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}
          hover:border-cyan-400 dark:hover:border-cyan-500
          focus:outline-none focus:ring-2 focus:ring-cyan-400/40
          transition-all duration-200 min-w-[88px] cursor-pointer
          ${open ? 'border-cyan-400 dark:border-cyan-500 ring-2 ring-cyan-400/30' : ''}
        `}
      >
        <span className="text-lg leading-none select-none">{selected.flag}</span>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
          {selected.code}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 mt-1.5 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Search */}
            <div className="p-2.5 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country or code..."
                  className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="max-h-60 overflow-y-auto overscroll-contain">
              {filtered.length === 0 && (
                <div className="py-8 text-center text-sm text-gray-400">No results found</div>
              )}

              {!q && topPicks.length > 0 && (
                <>
                  <div className="px-3 pt-2 pb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Popular</span>
                  </div>
                  {topPicks.map((c) => (
                    <CountryRow key={`top-${c.iso}`} country={c} selected={selected} onSelect={handleSelect} />
                  ))}
                  <div className="mx-3 my-1 border-t border-gray-100 dark:border-gray-800" />
                  <div className="px-3 pt-1 pb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">All Countries</span>
                  </div>
                  {rest.map((c) => (
                    <CountryRow key={c.iso} country={c} selected={selected} onSelect={handleSelect} />
                  ))}
                </>
              )}

              {q && filtered.map((c) => (
                <CountryRow key={c.iso} country={c} selected={selected} onSelect={handleSelect} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CountryRow({
  country,
  selected,
  onSelect,
}: {
  country: Country;
  selected: Country;
  onSelect: (c: Country) => void;
}) {
  const isActive = country.iso === selected.iso;
  return (
    <button
      type="button"
      onClick={() => onSelect(country)}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 text-left
        hover:bg-cyan-50 dark:hover:bg-cyan-500/10 transition-colors duration-100
        ${isActive ? 'bg-cyan-50 dark:bg-cyan-500/15' : ''}
      `}
    >
      <span className="text-lg leading-none select-none">{country.flag}</span>
      <span className="flex-1 text-sm text-gray-700 dark:text-gray-200 truncate">{country.name}</span>
      <span className={`text-sm font-semibold tabular-nums ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        {country.code}
      </span>
      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />}
    </button>
  );
}
