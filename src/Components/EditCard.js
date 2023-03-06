import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../utils/api/index";
import CardForm from "./CardForm";

function EditCard({ deck, setDeck }) {
    const { deckId, cardId } = useParams();
    const history = useHistory();
    const [card, setCard] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                if (cardId) {
                    const cardResponse = await readCard(
                        cardId,
                        abortController.signal
                    );
                    setCard(cardResponse);
                }
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
    }, [cardId, deckId, setDeck]);

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        let response = "";
        if (cardId) {
            console.log("updating card ...");
            response = await updateCard({ ...card }, abortController.signal);
            history.push(`/decks/${deckId}`);
            history.go(0);
        }
        return response;
    }

    console.log(deck);
    console.log(deck.cards);
    console.log(typeof cardId);

    return <CardForm card={card} setCard={setCard} deck={deck} setDeck={setDeck} handleSubmit={handleSubmit} />;
}

export default EditCard;