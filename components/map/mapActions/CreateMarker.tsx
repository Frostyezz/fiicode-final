import React, { SyntheticEvent } from "react";

import { MapContext } from "../../../contexts/mapContext";
import { UserContext } from "../../../contexts/userContext";

import { Input, Button, Select, useToast } from "@chakra-ui/react";

import axios from "axios";
import { mutate } from "swr";

const CreateMarker = () => {
  const { currentPos, changeCurrentPos, map } = React.useContext(MapContext);
  const { user } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    try {
      await axios.post(`/api/map/${map.map._id}`, {
        position: [parseFloat(form.lat.value), parseFloat(form.lng.value)],
        radius: parseFloat(form.radius.value),
        //@ts-ignore
        title: form.title.value,
        status: form.status.value,
        child: form.child.value,
      });
      //@ts-ignore
      document.getElementById("createMarker").reset();
      changeCurrentPos([null, null]);
      mutate(
        `/api/map/${user._id}`,
        fetch(`/api/map/${user._id}`).then((res) => res.json())
      );
      toast({
        title: "You succesfully added a marker!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occured!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <form id="createMarker" onSubmit={onSubmit} className="flex flex-col">
      <h1>Click on the map to select the position:</h1>
      <div className="flex flex-row mb-3">
        <Input
          placeholder="Longitude"
          isRequired
          value={currentPos[0] !== null ? currentPos[0] : ""}
          name="lat"
          type="number"
        />
        <Input
          placeholder="Latitude"
          className="mx-2"
          isRequired
          name="lng"
          type="number"
          value={currentPos[1] !== null ? currentPos[1] : ""}
        />
        <Input
          placeholder="Area radius (m)"
          isRequired
          name="radius"
          type="number"
          min={1}
        />
      </div>
      <Input
        placeholder="What does the marker represent?"
        isRequired
        name="title"
        type="text"
      />
      <Select
        className="my-3"
        name="status"
        placeholder="Is the area safe for your kid?"
        isRequired
      >
        <option value="Safe">Yes</option>
        <option value="Dangerous">No</option>
      </Select>
      <Select
        className="mb-3"
        name="child"
        placeholder="This marker applies to..."
        isRequired
      >
        {map?.family.children.map((child: any) => (
          <option key={child.id} value={child.id}>
            {child.name}
          </option>
        ))}
      </Select>
      <Button isLoading={loading} colorScheme="blue" type="submit">
        Create Marker
      </Button>
    </form>
  );
};

export default CreateMarker;
