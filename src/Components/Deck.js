import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

function Deck({ deck, setDeck }) {
    const history = useHistory();
    const { deckId } = useParams();
    const { cards } = deck; // const cards = deck.cards;

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
    }, []);

    async function handleDeleteDeck(deck) {
        if (
            window.confirm(
                `Delete this deck? You will not be able to recover it`
            )
        ) {
            const abortController = new AbortController();
            try {
                history.push("/");
                return await deleteDeck(deck.id, abortController.signal);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
    }

    async function handleDeleteCard(card) {
        if (
            window.confirm(
                `Delete this card? You will not be able to recover it`
            )
        ) {
            const abortController = new AbortController();
            try {
                history.go(0);
                return await deleteCard(card.id, abortController.signal);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
    }

    async function handleEditDeck() {
        history.push(`/decks/${deckId}/edit`);
    }

    async function handleStudy() {
        history.push(`/decks/${deckId}/study`);
    }

    async function handleEditCard() {
        history.push(`/decks/${deckId}/cards/new`);
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">{deck.name}</li>
            </ol>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">{deck.name}</h2>
                    <p>{deck.description}</p>
                    <button
                        onClick={() => handleEditDeck()}
                        className="btn btn-secondary mx-1"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleStudy()}
                        className="btn btn-primary mx-1"
                    >
                        Study
                    </button>
                    <Link to={`/decks/${deckId}/cards/new`}>
                        <button
                            className="btn btn-primary mx-1"
                        >
                            Add Cards
                        </button></Link>
                    <button
                        onClick={() => handleDeleteDeck(deck)}
                        className="btn btn-danger mx-1"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <h1>Cards</h1>
            {cards.map((card) => {
                return (
                    <div className="card-deck" key={card.id}>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">{card.front}</div>
                                    <div className="col">{card.back}</div>
                                </div>
                                <div className="container row">
                                    <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                                        <button
                                            className="btn btn-secondary mx-1"
                                        >
                                            Edit
                                        </button></Link>
                                    <button
                                        onClick={() =>
                                            handleDeleteCard(card)
                                        }
                                        className="btn btn-danger mx-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );

}

export default Deck;