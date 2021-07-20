import { TextField } from "@material-ui/core";
import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;

  justify-content: space-around;
`;

export const StyledForm = styled.form`
  display: flex;

  flex-direction: column;

  width: 50%;
`;

export const StyledTextField = styled(TextField)`
  margin: 20px 10px;
`;
