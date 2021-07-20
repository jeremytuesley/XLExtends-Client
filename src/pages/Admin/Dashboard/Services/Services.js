import { AppBar, Tab, Tabs } from "@material-ui/core";
import { useState } from "react";

import { CreateNewServiceForm } from "./CreateNewServiceForm";

const TabPanel = ({ children, index, value, ...tabPanelProps }) => (
  <div {...tabPanelProps}>{value === index && children}</div>
);

const Services = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div>
      <AppBar position="relative">
        <Tabs
          onChange={(_, newSelectedTabIndex) =>
            setSelectedTabIndex(() => newSelectedTabIndex)
          }
          value={selectedTabIndex}
        >
          <Tab label="Crate New Service" />
          <Tab label="Edit Services" />
        </Tabs>
      </AppBar>
      <TabPanel index={0} value={selectedTabIndex}>
        <CreateNewServiceForm />
      </TabPanel>
    </div>
  );
};

export default Services;
