 "use client";

import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import SectionHeadings from "@/components/helper/sectionHeadings";
import { FaqItem, faqs } from "@/lib/faqs";

const FAQ = () => {
 
  return (

    <Box className='p-4 mt-6 md:p-8 lg:p-12 bg-gray-300'>
      <SectionHeadings heading="FAQ" description="Frequently Asked Questions" />

      {faqs.map((item: FaqItem) => (
        <Accordion key={item.id} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="text-lg font-semibold ">
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;
