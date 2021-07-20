import { TextField } from "@material-ui/core";
import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;

  justify-content: space-around;

  margin: 20px 0 0 0;
`;

export const StyledForm = styled.form`
  display: flex;

  flex-direction: column;

  padding: 0px 10px;

  width: 50%;
`;

export const StyledTextField = styled(TextField)`
  margin: 0 0 20px 0;
`;
