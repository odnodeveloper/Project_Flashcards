import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Components/Home";
import CreateDeck from "../Components/CreateDeck";
import Deck from "../Components/Deck";
import Study from "../Components/Study";
import EditDeck from "../Components/EditDeck";
import EditCard from "../Components/EditCard";
import AddCard from "../Components/AddCard";


function Layout() {

    const initialState = {
        cards: [],
        name: "",
        description: "",
    };

    const [deck, setDeck] = useState(initialState);


    return (
        <div>
            <Header />
            <div className="container">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/decks/new">
                        <CreateDeck deck={deck} setDeck={setDeck} />
                    </Route>
                    <Route exact path="/decks/:deckId">
                        <Deck deck={deck} setDeck={setDeck} />
                    </Route>
                    <Route path="/decks/:deckId/study">
                        <Study deck={deck} setDeck={setDeck} />
                    </Route>
                    <Route path="/decks/:deckId/edit">
                        <EditDeck deck={deck} setDeck={setDeck} />
                    </Route>
                    <Route path="/decks/:deckId/cards/new">
                        <AddCard deck={deck} setDeck={setDeck} />
                    </Route>
                    <Route path="/decks/:deckId/cards/:cardId/edit">
                        <EditCard deck={deck} setDeck={setDeck} />
                    </Route>
                    <NotFound />
                </Switch>
            </div>
        </div>
    );
}

export default Layout;
