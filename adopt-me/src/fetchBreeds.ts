import { QueryFunction } from "@tanstack/react-query";
import { Animal, BreedsAPIResponse } from "./APIResponsesTypes";

const fetchBreeds: QueryFunction<
  BreedsAPIResponse,
  ["breeds", Animal]
> = async ({ queryKey }) => {
  const animal = queryKey[1];
  if (!animal) return [];

  const resApi = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );

  if (!resApi.ok) throw new Error("fetching breeds failed");

  return resApi.json();
};

export default fetchBreeds;
