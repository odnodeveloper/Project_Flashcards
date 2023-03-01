import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck } from "../utils/api/index";


function CardForm({ card, setCard, deck, handleSubmit }) {
    const { deckId, cardId } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                if (card.id) {
                    const cardResponse = await readCard(
                        card.id,
                        abortController.signal
                    );
                    setCard(cardResponse);
                }
                const deckResponse = await readDeck(
                    deckId,
                    abortController.signal
                );
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckId]);


    function handleChange({ target }) {
        console.log(target.name, target.value);
        setCard({
            ...card,
            [target.name]: target.value,
        });
    }


    async function handleCancel() {
        history.push(`/decks/${deckId}`);
    }

    console.log(card, 123);

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active"></li>
                <li className="breadcrumb-item active">{cardId ? "Edit Card" : `${deck.name}: Add Card`}</li>
            </ol>
            <form onSubmit={handleSubmit}>
                <h2>{cardId ? "Edit Card" : `${deck.name}: Add Card`}</h2>
                <div className="form-group">
                    <label>Front</label>
                    <textarea
                        id="front"
                        name="front"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={card.front}
                    />
                </div>
                <div className="form-group">
                    <label>Back</label>
                    <textarea
                        id="back"
                        name="back"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={card.back}
                    />
                </div>
                <button
                    className="btn btn-secondary mx-1"
                    onClick={() => handleCancel()}
                >
                    Cancel
                </button>
                <button className="btn btn-primary mx-1" type="submit">
                    Save
                </button>
            </form>
        </div>
    );

};

export default CardForm;