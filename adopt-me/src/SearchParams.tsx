import { useContext, useState } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";
import { Animal } from "./APIResponsesTypes";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const [animal, setAnimal] = useState("" as Animal);

  const [breedList] = useBreedList(animal);

  const result = useQuery(["search", requestParams], fetchSearch);
  const pets = result?.data?.pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal: formData.get("animal")?.toString() || "",
            location: formData.get("location")?.toString() || "",
            breed: formData.get("breed")?.toString() || "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            className="search-input"
            type="text"
            id="location"
            name="location"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            className="search-input"
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            className="search-input grayed-out-disabled"
            id="breed"
            disabled={!breedList.length}
            name="breed"
          >
            <option />
            {breedList.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500">
          Submit
        </button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
