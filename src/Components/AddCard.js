import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";


function AddCard({ deck, setDeck }) {
    const { deckId } = useParams();
    const history = useHistory();

    const initialCardState = {
        back: "",
        deckId: "",
    };

    const [card, setCard] = useState(initialCardState);

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const deckResponse = await readDeck(
                    deckId,
                    abortController.signal
                );
                setDeck(deckResponse);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckId, setDeck]);

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        console.log("creating card ...");
        const response = await createCard(
            deckId,
            { ...card },
            abortController.signal
        );
        setCard(initialCardState);
        handleDone();
        return response;
    }


    async function handleDone() {
        history.push(`/decks/${deckId}`);
    }

    return <CardForm card={card} setCard={setCard} deck={deck} handleSubmit={handleSubmit} />;
}

export default AddCard;