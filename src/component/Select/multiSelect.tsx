import { useEffect, useRef, useState } from "react";

type TDropdownData = { label: string; code: string; value?: string };

interface IMultiSelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  width?: string;
  inputStyle?: string;
  sectionStyle?: string;
  url?: string;
  dropdownValues?: TDropdownData[];
}

export const MultiSelect: React.FC<IMultiSelectProps> = ({
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
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    if (!url) return;
    const res = await fetch(url);
    const data = await res.json();

    const formatted = data
      .map((item: any) => ({
        label: item.name?.common || item.label || "",
        code: item.cca2 || item.code || "",
      }))
      .sort((a: any, b: any) => a.label.localeCompare(b.label));

    setDropdownData(formatted);
  };

  useEffect(() => {
    if (dropdownValues.length === 0) fetchData();
    else setDropdownData(dropdownValues);
  }, [url, dropdownValues]);

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const filteredData = dropdownData.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedValues.includes(item.code),
  );

  const handleOptionClick = (code: string) => {
    setSelectedValues((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
    setSearchQuery("");
  };

  const handleRemove = (code: string) => {
    setSelectedValues((prev) => prev.filter((c) => c !== code));
  };

  const handleClearAll = () => {
    setSelectedValues([]);
  };

  return (
    <div className={`flex flex-col ${props.sectionStyle}`}>
      {label && <label htmlFor={props.id}>{label}</label>}

      <div className="relative" ref={containerRef}>
        {/* Input Container */}
        <div
          className={`flex flex-wrap items-center gap-2 w-full px-3 py-2 pr-10 border rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 relative ${props.inputStyle}`}
          onClick={() => setIsOpen(true)}
        >
          {/* Selected Chips */}
          {selectedValues.map((code) => {
            const item = dropdownData.find((i) => i.code === code);
            if (!item) return null;

            return (
              <span
                key={code}
                className="flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {item.label}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(code);
                  }}
                  className="ml-1 text-blue-500 hover:text-blue-700 font-bold"
                >
                  ×
                </button>
              </span>
            );
          })}

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            placeholder={selectedValues.length === 0 ? props.placeholder : ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="flex-1 min-w-[120px] outline-none"
          />

          {/* Clear All Button (Inside Input) */}
          {selectedValues.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClearAll();
              }}
              className="absolute right-3 text-gray-400 hover:text-red-500 font-bold"
            >
              ×
            </button>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className={filteredData.length > 0 ? "absolute z-10 w-full max-h-60 overflow-y-auto mt-1 border rounded-md bg-white shadow-lg" : ''}>
            {filteredData.length > 0 ? (
              filteredData.slice(0, 10).map((item) => (
                <div
                  key={item.code}
                  onClick={() => handleOptionClick(item.code)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                >
                  {item.label}
                </div>
              ))
            ) : selectedValues.length === 0 ? (
              <div className="px-4 py-2 text-gray-500">No results found</div>
            ) : null}
          </div>
        )}
      </div>

      

      {helpText && <small className="text-gray-500">{helpText}</small>}
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};
