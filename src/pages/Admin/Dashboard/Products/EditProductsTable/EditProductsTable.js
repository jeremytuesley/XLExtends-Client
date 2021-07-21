import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useTable } from "react-table";

import { EditProductForm } from "../EditProductForm";
import { GET_ALL_PRODUCTS } from "../../../../../shared/utils/api";
import { StyledTableData, StyledTableRow } from "./Styles";

const Table = ({ columns, data, onClick, selectedProduct }) => {
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
                  {cell.column.Header === "name" &&
                    selectedProduct === row.original._id && (
                      <EditProductForm product={row.original} />
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

const EditProductTable = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: getAllProductsData } = useQuery(GET_ALL_PRODUCTS);

  return (
    <div>
      {getAllProductsData?.getAllProducts && (
        <Table
          columns={[
            {
              Header: "Products",
              columns: [
                { Header: "name", accessor: "name" },
                { Header: "description", accessor: "description" },
                { Header: "Price", accessor: "price" },
                { Header: "Sale Price", accessor: "salePrice" }
              ]
            }
          ]}
          data={getAllProductsData?.getAllProducts}
          onClick={(productId) => setSelectedProduct(() => productId)}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
};

export default EditProductTable;
