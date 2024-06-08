import React from 'react';
import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { useStore } from './StoreidStatus';

const SelectGroup: React.FC = () => {
  const { selectedStoreId, setSelectedStoreId } = useStore();

  const handleTabChange = (index: number) => {
    const storeIds = [319, 324, 405];
    setSelectedStoreId(storeIds[index]);
  };

  const getTabIndex = () => {
    const storeIds = [319, 324, 405];
    return storeIds.indexOf(selectedStoreId);
  };

  return (
    <Tabs index={getTabIndex()} onChange={handleTabChange}>
      <TabList>
        <Tab>319</Tab>
        <Tab>324</Tab>
        <Tab>405</Tab>
      </TabList>
    </Tabs>
  );
};

export default SelectGroup;
