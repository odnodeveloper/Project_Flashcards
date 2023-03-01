import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard } from "../utils/api/index";
import CardForm from "./CardForm";


function AddCard({ deck }) {
    const { deckId } = useParams();
    const history = useHistory();

    const initialCardState = {
        back: "",
        deckId: "",
    };

    const [card, setCard] = useState(initialCardState);

    function handleChange({ target }) {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        console.log("creating card ...");
        const response = await createCard(
            deckId,
            { ...card },
            abortController.signal
        );
        history.go(0);
        setCard(initialCardState);
        return response;
    }

    async function handleDone() {
        history.push(`/decks/${deckId}`);
    }

    return <CardForm card={card} setCard={setCard} deck={deck} handleSubmit={handleSubmit} />;
}

export default AddCard;