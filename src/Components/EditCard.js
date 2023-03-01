import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateCard } from "../utils/api/index";
import CardForm from "./CardForm";

function EditCard({ deck, setDeck }) {
    const { deckId, cardId } = useParams();
    const history = useHistory();

    const initialCardState = {
        id: "",
        front: "",
        back: "",
        deckId: "",
    };

    const [card, setCard] = useState(0);

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        let response = "";
        if (cardId) {
            console.log("updating card ...");
            response = await updateCard({ ...card }, abortController.signal);
            history.push(`/decks/${deckId}`);
            history.go(0);
            setCard(initialCardState);
        }
        return response;
    }

    return <CardForm card={card} deck={deck} setDeck={setDeck} handleSubmit={handleSubmit} />;
}

export default EditCard;