import React from "react";

interface SidebarFilterProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  availableTags: string[];
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({
  selectedTags,
  onTagToggle,
  availableTags,
}) => {
  return (
    <aside className="bg-white rounded shadow-md p-6">
      <h3 className="h3">Filter by Tags</h3>
      <ul className="space-y-3">
        {availableTags.map((tag) => (
          <li key={tag}>
            <label className="inline-flex items-center space-x-2 cursor-pointer hover:bg-accent p-1 rounded-t rounded-b-none w-full transition-colors duration-200">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => onTagToggle(tag)}
                className="accent-accent"
              />
              <span className="text-sm text-primary hover:text-white">
                {tag.toLocaleUpperCase()}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarFilter;
