import styled from "styled-components";
import Box from "./Box";
import Label from "../core/text/Label";
import { icons } from "../../assets";
import React, { useState } from "react";
import storageService from "../../services/storageService";

const ContentWrapper = styled(Box)`
  display: none;

  @media (max-width: 650px) {
    display: block;
    position: fixed;
    bottom: 0px;
    width: 100%;
    padding: 1em;
    /* z-index: 10000; */
  }
`;

const SnackBarWrapper = styled(Box)`
  padding: 1em;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.primary};
  background-color: #f5c6ff;
  border-radius: 1em;
`;

const SnackBar = ({
  header,
  children,
}: {
  header: string;
  children?: string | React.ReactNode;
}) => {
  const [visible, setVisible] = useState<boolean>(
    storageService.getDownloadSuggested() !== "true"
  );

  if (!visible) return null;

  const onClose = () => {
    storageService.setDownloadSuggested();
    setVisible(false);
  };

  return (
    <ContentWrapper>
      <SnackBarWrapper $horizontal>
        <Box $gap="0.5em">
          <Box $horizontal $gap="1em">
            <icons.InfoIcon />
            <Box>
              <Label $bold>{header}</Label>
              <Box onClick={onClose}>{children}</Box>
            </Box>
          </Box>
        </Box>

        <icons.CloseIcon onClick={onClose} />
      </SnackBarWrapper>
    </ContentWrapper>
  );
};

export default SnackBar;
