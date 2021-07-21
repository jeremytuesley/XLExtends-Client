import { AppBar, Tab, Tabs } from "@material-ui/core";
import { useState } from "react";

import { CreateNewProductForm } from "./CreateNewProductForm";
import { EditProductsTable } from "./EditProductsTable";

const TabPanel = ({ children, index, value, ...tabPanelProps }) => (
  <div {...tabPanelProps}>{value === index && children}</div>
);

const Products = () => {
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
          <Tab label="Edit Products" />
          <Tab label="Crate New Product" />
        </Tabs>
      </AppBar>
      <TabPanel index={0} value={selectedTabIndex}>
        <EditProductsTable />
      </TabPanel>
      <TabPanel index={1} value={selectedTabIndex}>
        <CreateNewProductForm />
      </TabPanel>
    </div>
  );
};

export default Products;
