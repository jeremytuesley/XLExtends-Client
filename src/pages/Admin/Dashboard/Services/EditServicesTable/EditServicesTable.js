import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useTable } from "react-table";

import { EditServiceForm } from "../EditServiceForm";
import { GET_ALL_SERVICES } from "../../../../../shared/utils/api";
import { StyledTableData, StyledTableRow } from "./Styles";

const Table = ({ columns, data, onClick, refetch, selectedService }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <StyledTableRow {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <StyledTableData
                  available={row.original.available}
                  onClick={() => {
                    onClick(row.original._id);
                  }}
                  {...cell.getCellProps()}
                >
                  {cell.render("Cell")}
                  {cell.column.Header === "Name" &&
                    selectedService === row.original._id && (
                      <EditServiceForm
                        service={row.original}
                        refetch={refetch}
                      />
                    )}
                </StyledTableData>
              ))}
            </StyledTableRow>
          );
        })}
      </tbody>
    </table>
  );
};

const EditServicesTable = () => {
  const [selectedService, setSelectedService] = useState(null);

  const { data: getAllServicesData, refetch } = useQuery(GET_ALL_SERVICES);

  return (
    <div>
      {getAllServicesData?.getAllServices && (
        <Table
          columns={[
            {
              Header: "Services",
              columns: [
                { Header: "Name", accessor: "name" },
                { Header: "Description", accessor: "description" },
                { Header: "Price", accessor: "price" },
                { Header: "Sale Price", accessor: "salePrice" }
              ]
            }
          ]}
          data={getAllServicesData?.getAllServices}
          onClick={(serviceId) => setSelectedService(() => serviceId)}
          refetch={refetch}
          selectedService={selectedService}
        />
      )}
    </div>
  );
};

export default EditServicesTable;
