import { useQuery, QueryStatus } from "@tanstack/react-query";
import fetchBreeds from "./fetchBreeds";
import { Animal } from "./APIResponsesTypes";

export default function useBreedList(animal: Animal) {
  const results = useQuery(["breeds", animal], fetchBreeds);
  return [results?.data?.breeds ?? [], results.status] as [
    string[],
    QueryStatus
  ];
}
