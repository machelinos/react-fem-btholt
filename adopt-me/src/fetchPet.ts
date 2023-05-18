import { QueryFunction, QueryKey } from "@tanstack/react-query";
import { PetAPIResponse } from "./APIResponsesTypes";

const fetchPet: QueryFunction<PetAPIResponse, QueryKey> = async ({
  queryKey,
}) => {
  const id = queryKey[1];

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiRes.ok) throw new Error(`details/${id} fetch not ok`);

  return apiRes.json();
};

export default fetchPet;
