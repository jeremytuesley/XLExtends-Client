import styled from "styled-components";

export const StyledTableData = styled.td`
  color: ${(props) => !props.available && "red"};

  cursor: pointer;
`;

export const StyledTableRow = styled.tr`
  &:hover {
    background: lightGrey;
  }
`;
