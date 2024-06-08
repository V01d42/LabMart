import { Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";

interface GroupSelectorProps {
  onGroupSelect: (group: number) => void;
}

const SelectGroup: React.FC<GroupSelectorProps> = ({ onGroupSelect }) => {
  const handleGroupChange = (group: number) => {
    onGroupSelect(group);
  };

  return (
    <Tabs colorScheme="teal" variant={"soft-rounded"}>
      <TabList>
        <Tab onClick={() => handleGroupChange(319)}>Store 319</Tab>
        <Tab onClick={() => handleGroupChange(324)}>Store 324</Tab>
        <Tab onClick={() => handleGroupChange(405)}>Store 405</Tab>
      </TabList>
    </Tabs>
  );
};

export default SelectGroup;
