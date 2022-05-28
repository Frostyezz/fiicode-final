import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

import axios from "axios";
import useSWR from "swr";

import { MapContext } from "../../contexts/mapContext";
import { UserContext } from "../../contexts/userContext";

import CreateMarker from "./mapActions/CreateMarker";

const MapActions = () => {
  const { user } = React.useContext(UserContext);
  const { populateMap } = React.useContext(MapContext);

  const fetcher = async (url: string) =>
    await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(`/api/map/${user?._id}`, fetcher, {
    refreshInterval: 30000,
  });

  React.useEffect(() => {
    if (data) {
      populateMap(data);
    }
    if (error) console.log(error);
  }, [data, error]);
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Create markers
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <CreateMarker />
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default MapActions;
