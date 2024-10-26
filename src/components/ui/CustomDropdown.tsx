'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown, Search } from 'lucide-react'

// Define an interface for the option type
interface DropdownOption {
  id: number | string;
  name: string;
  [key: string]: number | string; 
}

interface CustomDropdownProps {
  options: DropdownOption[];
  initialSelectedOption: DropdownOption;
  onSelectChange: (option: DropdownOption) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, initialSelectedOption, onSelectChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<DropdownOption>(initialSelectedOption || options[0])
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelect = (option: DropdownOption) => {
    setSelected(option)
    setIsOpen(false)
    setSearchTerm('')
    onSelectChange(option)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[250px] px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate">{selected ? selected.name : "Choose an option"}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div className={`absolute z-10 w-[250px] mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 max-h-60' : 'opacity-0 max-h-0'}`}>
        <div className="p-2 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              className="w-full pl-8 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search options..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ul
          className="max-h-40 overflow-auto focus:outline-none"
          tabIndex={-1}
          role="listbox"
        >
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              className={`${
                option.id === selected.id ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
              } cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 transition-colors duration-150`}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={option.id === selected.id}
            >
              <span className="block truncate">{option.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CustomDropdown