import React, { useState, useEffect } from "react";

interface Country {
  name: string;
  timezone: string;
  flag: string;
}

const countries: Country[] = [
  { name: "Argentina", timezone: "America/Argentina/Buenos_Aires", flag: "🇦🇷" },
  { name: "Australia (Melbourne)", timezone: "Australia/Melbourne", flag: "🇦🇺" },
  { name: "Australia (Sydney)", timezone: "Australia/Sydney", flag: "🇦🇺" },
  { name: "Austria", timezone: "Europe/Vienna", flag: "🇦🇹" },
  { name: "Belgium", timezone: "Europe/Brussels", flag: "🇧🇪" },
  { name: "Brazil", timezone: "America/Sao_Paulo", flag: "🇧🇷" },
  { name: "Canada (Toronto)", timezone: "America/Toronto", flag: "🇨🇦" },
  { name: "Canada (Vancouver)", timezone: "America/Vancouver", flag: "🇨🇦" },
  { name: "Chile", timezone: "America/Santiago", flag: "🇨🇱" },
  { name: "China", timezone: "Asia/Shanghai", flag: "🇨🇳" },
  { name: "Colombia", timezone: "America/Bogota", flag: "🇨🇴" },
  { name: "Czech Republic", timezone: "Europe/Prague", flag: "🇨🇿" },
  { name: "Denmark", timezone: "Europe/Copenhagen", flag: "🇩🇰" },
  { name: "Egypt", timezone: "Africa/Cairo", flag: "🇪🇬" },
  { name: "Finland", timezone: "Europe/Helsinki", flag: "🇫🇮" },
  { name: "Fiji", timezone: "Pacific/Fiji", flag: "🇫🇯" },
  { name: "France", timezone: "Europe/Paris", flag: "🇫🇷" },
  { name: "Germany", timezone: "Europe/Berlin", flag: "🇩🇪" },
  { name: "Greece", timezone: "Europe/Athens", flag: "🇬🇷" },
  { name: "Hawaii", timezone: "Pacific/Honolulu", flag: "🇺🇸" },
  { name: "Hungary", timezone: "Europe/Budapest", flag: "🇭🇺" },
  { name: "India", timezone: "Asia/Kolkata", flag: "🇮🇳" },
  { name: "Ireland", timezone: "Europe/Dublin", flag: "🇮🇪" },
  { name: "Italy", timezone: "Europe/Rome", flag: "🇮🇹" },
  { name: "Japan", timezone: "Asia/Tokyo", flag: "🇯🇵" },
  { name: "Kenya", timezone: "Africa/Nairobi", flag: "🇰🇪" },
  { name: "Malaysia", timezone: "Asia/Kuala_Lumpur", flag: "🇲🇾" },
  { name: "Mexico", timezone: "America/Mexico_City", flag: "🇲🇽" },
  { name: "Morocco", timezone: "Africa/Casablanca", flag: "🇲🇦" },
  { name: "Netherlands", timezone: "Europe/Amsterdam", flag: "🇳🇱" },
  { name: "New Zealand", timezone: "Pacific/Auckland", flag: "🇳🇿" },
  { name: "Nigeria", timezone: "Africa/Lagos", flag: "🇳🇬" },
  { name: "Norway", timezone: "Europe/Oslo", flag: "🇳🇴" },
  { name: "Peru", timezone: "America/Lima", flag: "🇵🇪" },
  { name: "Poland", timezone: "Europe/Warsaw", flag: "🇵🇱" },
  { name: "Portugal", timezone: "Europe/Lisbon", flag: "🇵🇹" },
  { name: "Russia (Moscow)", timezone: "Europe/Moscow", flag: "🇷🇺" },
  { name: "Singapore", timezone: "Asia/Singapore", flag: "🇸🇬" },
  { name: "South Africa", timezone: "Africa/Johannesburg", flag: "🇿🇦" },
  { name: "South Korea", timezone: "Asia/Seoul", flag: "🇰🇷" },
  { name: "Spain", timezone: "Europe/Madrid", flag: "🇪🇸" },
  { name: "Sweden", timezone: "Europe/Stockholm", flag: "🇸🇪" },
  { name: "Switzerland", timezone: "Europe/Zurich", flag: "🇨🇭" },
  { name: "Turkey", timezone: "Europe/Istanbul", flag: "🇹🇷" },
  { name: "Ukraine", timezone: "Europe/Kiev", flag: "🇺🇦" },
  { name: "United Kingdom", timezone: "Europe/London", flag: "🇬🇧" },
  { name: "United States (Los Angeles)", timezone: "America/Los_Angeles", flag: "🇺🇸" },
  { name: "United States (New York)", timezone: "America/New_York", flag: "🇺🇸" },
  { name: "Uruguay", timezone: "America/Montevideo", flag: "🇺🇾" },
  { name: "Venezuela", timezone: "America/Caracas", flag: "🇻🇪" },
  { name: "Vietnam", timezone: "Asia/Ho_Chi_Minh", flag: "🇻🇳" },
];

const Timezones: React.FC = () => {
  const [selectedCountries, setSelectedCountries] = useState<Country[]>(() => {
    const saved = localStorage.getItem('selectedCountries');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addCountry = (country: Country) => {
    if (!selectedCountries.find(c => c.timezone === country.timezone)) {
      const newSelectedCountries = [...selectedCountries, country];
      setSelectedCountries(newSelectedCountries);
      localStorage.setItem('selectedCountries', JSON.stringify(newSelectedCountries));
    }
  };

  const removeCountry = (timezone: string) => {
    const newSelectedCountries = selectedCountries.filter(c => c.timezone !== timezone);
    setSelectedCountries(newSelectedCountries);
    localStorage.setItem('selectedCountries', JSON.stringify(newSelectedCountries));
  };

  const getTimeInTimezone = (timezone: string) => {
    try {
      return currentTime.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return "Invalid timezone";
    }
  };

  const getDateInTimezone = (timezone: string) => {
    try {
      return currentTime.toLocaleDateString('en-US', {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return "Invalid timezone";
    }
  };

  const getHourInTimezone = (timezone: string) => {
    try {
      return currentTime.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit'
      });
    } catch {
      return '0';
    }
  };

  const getTimelinePosition = (hour: number) => {
    return (hour / 24) * 100;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">World Timezones</h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Track time across multiple countries and timezones.
        </p>
      </div>

      {/* Country Selector */}
      <div className="mb-8">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 border border-border">
          <h2 className="text-xl font-bold mb-4">Add Country</h2>
          <select
            onChange={(e) => {
              const country = countries.find(c => c.timezone === e.target.value);
              if (country) addCountry(country);
            }}
            className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            defaultValue=""
          >
            <option value="" disabled>Select a country...</option>
            {countries.map((country) => (
              <option key={country.timezone} value={country.timezone}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Countries */}
      {selectedCountries.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {selectedCountries.map((country) => (
            <div key={country.timezone} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 border border-border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <span className="text-2xl">{country.flag}</span>
                    {country.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{country.timezone}</p>
                </div>
                <button
                  onClick={() => removeCountry(country.timezone)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  ✕
                </button>
              </div>

              {/* Current Time */}
              <div className="mb-4">
                <div className="text-3xl font-mono font-bold text-primary">
                  {getTimeInTimezone(country.timezone)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {getDateInTimezone(country.timezone)}
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Day Timeline</h4>
                <div className="relative h-8 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                  {/* Working hours background (9 AM to 5 PM) */}
                  <div 
                    className="absolute top-0 h-full bg-green-200 dark:bg-green-800"
                    style={{
                      left: `${(9 / 24) * 100}%`,
                      width: `${((17 - 9) / 24) * 100}%`
                    }}
                  />
                  <div className="absolute inset-0 flex">
                    {Array.from({ length: 24 }, (_, i) => (
                      <div
                        key={i}
                        className="flex-1 border-r border-zinc-200 dark:border-zinc-700 last:border-r-0"
                      >
                        {[0, 9, 17, 23].includes(i) && (
                          <div className="text-xs text-muted-foreground text-center mt-1">
                            {i.toString().padStart(2, '0')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div
                    className="absolute top-0 h-full w-1 bg-primary rounded-full transition-all duration-1000"
                    style={{
                      left: `${getTimelinePosition(parseInt(getHourInTimezone(country.timezone)))}%`
                    }}
                  />
                </div>
              </div>

              {/* Time Period */}
              <div className="text-sm">
                <span className="font-semibold">Current Period: </span>
                <span className="text-muted-foreground">
                  {(() => {
                    const hour = parseInt(getHourInTimezone(country.timezone));
                    if (hour >= 6 && hour < 12) return "Morning";
                    if (hour >= 12 && hour < 17) return "Afternoon";
                    if (hour >= 17 && hour < 21) return "Evening";
                    return "Night";
                  })()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {selectedCountries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌍</div>
          <h3 className="text-xl font-semibold mb-2">No countries selected</h3>
          <p className="text-muted-foreground">
            Use the dropdown above to add countries and track their current time.
          </p>
        </div>
      )}
    </div>
  );
};

export default Timezones; 