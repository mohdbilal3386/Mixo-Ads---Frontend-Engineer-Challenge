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
        <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                {/* Campaign Selector */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Campaign</label>
                    <select
                        value={selectedCampaign}
                        onChange={(e) => setSelectedCampaign(e.target.value)}
                        className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-colors"
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
                    <label className="block text-sm font-medium text-gray-700 mb-3">Search Campaigns</label>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name..."
                        className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-colors"
                    />
                </div>

                {/* Apply Button */}
                <div>
                    <button
                        onClick={handleApply}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        Apply Filters
                    </button>
                </div>

                {/* Clear Button */}
                <div>
                    <button
                        onClick={handleClear}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        </section>
    );
}
