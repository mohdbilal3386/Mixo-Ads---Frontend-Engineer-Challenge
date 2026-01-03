"use client";

import { useState } from "react";

interface FiltersProps {
    onFilterChange: (filters: { campaignId?: string; search?: string }) => void;
    campaigns: { id: string; name: string }[];
}

export default function Filters({ onFilterChange, campaigns }: FiltersProps) {
    const [selectedCampaign, setSelectedCampaign] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    const handleApply = () => {
        onFilterChange({ campaignId: selectedCampaign, search });
    };

    const handleClear = () => {
        setSelectedCampaign("");
        setSearch("");
        onFilterChange({});
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* Campaign Selector */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Campaign</label>
                    <select
                        value={selectedCampaign}
                        onChange={(e) => setSelectedCampaign(e.target.value)}
                        className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        <option value="">All Campaigns</option>
                        {campaigns.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Search Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search Campaigns</label>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name..."
                        className="w-full border border-gray-300 text-black rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                </div>

                {/* Apply Button */}
                <div>
                    <button
                        onClick={handleApply}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        Apply Filters
                    </button>
                </div>

                {/* Clear Button */}
                <div>
                    <button
                        onClick={handleClear}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
}
