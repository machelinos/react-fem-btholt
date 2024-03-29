import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { lazy, useContext, useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import { Pet, PetAPIResponse } from "./APIResponsesTypes";

const Modal = lazy(() => import("./Modal"));

const Details = () => {
  const navigate = useNavigate();
  const [, setAdoptedPet] =
    useContext<[Pet, (adoptedPet: Pet) => void]>(AdoptedPetContext);
  const { id } = useParams();
  const results = useQuery<PetAPIResponse>(["details", id], fetchPet);
  const [showModal, setShowModal] = useState(false);

  if (!id) {
    throw new Error("No ID provided to Details");
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results?.data?.pets[0];

  if (!pet) {
    throw new Error("pet not found");
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>

        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}
