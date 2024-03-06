import React from 'react';
import FilterMenu from './FilterMenu';

function SideFilterMenu() {
  return (
    <aside className="flex flex-col shrink-0 w-69 mt-22.5 max-xl:hidden">
      <FilterMenu />
    </aside>
  );
}

export default SideFilterMenu;
