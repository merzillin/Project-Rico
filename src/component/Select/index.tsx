import { useEffect, useState } from "react";

type TDropdownData = { label: string; code: string; value?: string };
interface ISelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  width?: string;
  inputStyle?: string;
  sectionStyle?: string;
  url?: string;
  dropdownValues?: TDropdownData[];
}

export const Select: React.FC<ISelectProps> = ({
  label,
  error,
  helpText,
  url = "",
  dropdownValues = [],
  ...props
}) => {
  const [dropdownData, setDropdownData] = useState<TDropdownData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const fetchCountries = async () => {
    if (!url) return;
    const res = await fetch(url);
    const data = await res.json();

    const formatted = data
      .map((country: any) => ({
        label: country.name.common,
        code: country.cca2,
      }))
      .sort((a: any, b: any) => a.label.localeCompare(b.label));

    setDropdownData(formatted);
  };

  useEffect(() => {
    if (dropdownValues.length === 0) fetchCountries();
    else setDropdownData(dropdownValues);
  }, [url]);

  const filteredData = dropdownData.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setSearchQuery("");
    setIsOpen(false);
  };

  return (
    <div className={`flex flex-col ${props.sectionStyle}`}>
      {label && <label htmlFor={props.id}>{label}</label>}

      <div className="relative">
        <input
          type="text"
          placeholder={props.placeholder}
          value={
            searchQuery ||
            dropdownData.find((item) => item.code === selectedValue)?.label ||
            ""
          }
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
        {selectedValue && !searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSelectedValue("");
              setSearchQuery("");
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
          >
            ✕
          </button>
        )}

        {isOpen && (
          <div
            className="absolute z-10 w-full max-h-60 overflow-y-auto mt-1 border rounded-md bg-white shadow-lg"
            style={{ top: "100%" }}
          >
            {[...filteredData].slice(0, 11).map((item) => (
              <div
                key={item.code}
                onClick={() => handleOptionClick(item.code)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              >
                {item.label}
              </div>
            ))}

            {filteredData.length === 0 && (
              <div className="px-4 py-2 text-gray-500">No results found</div>
            )}
          </div>
        )}
      </div>

      <input type="hidden" name={props.name} value={selectedValue} />

      {helpText && <small className="text-gray-500">{helpText}</small>}
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};
