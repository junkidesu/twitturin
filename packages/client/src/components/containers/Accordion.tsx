import { useState } from "react";
import styled from "styled-components";
import { icons } from "../../assets";
import Label from "../core/text/Label";
import Box from "./Box";

const AccordionWrapper = styled(Box)`
  border: 3px solid ${({ theme }) => theme.colors.grey3};
  border-radius: 1em;
`;

const HeadingWrapper = styled(Box)`
  justify-content: space-between;
  align-items: center;
`;

const Accordion = ({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading?: string | React.ReactNode;
}) => {
  const [visible, setVisible] = useState(true);

  return (
    <AccordionWrapper $pad="l" $gap="2em">
      <HeadingWrapper $horizontal $gap="1em">
        <Label $bold>{heading || "Accordion"}</Label>
        {visible ? (
          <icons.ChevronUpIcon onClick={() => setVisible(!visible)} />
        ) : (
          <icons.ChevronDownIcon onClick={() => setVisible(!visible)} />
        )}
      </HeadingWrapper>

      {visible && children}
    </AccordionWrapper>
  );
};

export default Accordion;
