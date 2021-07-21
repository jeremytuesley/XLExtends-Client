import { AppBar, Tab, Tabs } from "@material-ui/core";
import { useState } from "react";

import { CreateNewServiceForm } from "./CreateNewServiceForm";
import { EditServicesTable } from "./EditServicesTable";

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
          <Tab label="Edit Services" />
          <Tab label="Crate New Service" />
        </Tabs>
      </AppBar>
      <TabPanel index={0} value={selectedTabIndex}>
        <EditServicesTable />
      </TabPanel>
      <TabPanel index={1} value={selectedTabIndex}>
        <CreateNewServiceForm />
      </TabPanel>
    </div>
  );
};

export default Services;
