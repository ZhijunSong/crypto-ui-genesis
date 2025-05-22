
import React from "react";
import { Link } from "react-router-dom";

type Tab = {
  label: string;
  path: string;
};

type NavTabsProps = {
  tabs: Tab[];
  activeTab: string;
};

const NavTabs: React.FC<NavTabsProps> = ({ tabs, activeTab }) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap border-b border-gmgn-gray-800">
      <div className="flex">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`nav-tab ${activeTab === tab.path ? "active" : ""}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavTabs;
