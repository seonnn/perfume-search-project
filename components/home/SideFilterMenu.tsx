import React from 'react';
import FilterMenu, { FilterMenuProps } from './FilterMenu';

function SideFilterMenu({ noteList, brandList }: FilterMenuProps) {
  return (
    <aside className="flex flex-col shrink-0 w-69 mt-22.5 max-xl:hidden">
      <FilterMenu noteList={noteList} brandList={brandList} />
    </aside>
  );
}

export default SideFilterMenu;
