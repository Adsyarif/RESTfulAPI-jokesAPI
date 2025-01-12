import { Joke } from "../models/jokes";
import { RequestHandler } from "express";
import jokesData from "../data/jokes-data";

let jokes: Joke[] = jokesData;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

export const getRandomJokes: RequestHandler = (_, res) => {
  const jokeIndex = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[jokeIndex];
  res.status(200).json(randomJoke);
};

export const getSpecificJoke: RequestHandler = (req, res) => {
  const jokeId = (req.params as { id: string }).id;
  // const jokeIndex = jokes.findIndex(
  //   (joke: Joke) => joke.id.toLocaleString() === jokeId
  // ); // ambil index jokes
  const joke = jokes.find((joke: Joke) => joke.id.toLocaleString() === jokeId); //ambil joke
  // const joke = jokes.filter(
  //   (joke: Joke) => joke.id.toLocaleString() === jokeId
  // ); // ambil list of jokes
  // console.log(joke);

  if (!joke) {
    throw new Error("There is no joke!");
  }

  res.status(200).json(joke);
};

export const filterJokes: RequestHandler = (req, res) => {
  const jokeType = (req.query as { type: string }).type;

  const filteredJokes = jokes.filter(
    (joke: Joke) => joke.jokeType === jokeType
  );

  res.status(200).json(filteredJokes);
};

export const addNewJoke: RequestHandler = (req, res) => {
  const reqJoke = req.body as { jokeText: string; jokeType: string };
  const indexOfLastJokes = jokes.length - 1;

  const newId = +jokes[indexOfLastJokes].id + 1;
  const newJoke = { id: newId, ...reqJoke };

  jokes.push(newJoke);

  res.status(200).json(newJoke);
};

export const replaceJokes: RequestHandler = (req, res) => {
  const jokeId = (req.params as { id: string }).id;
  const jokesEdit = req.body as { jokeText: string; jokeType: string };

  const jokesIndex = jokes.findIndex(
    (joke: Joke) => joke.id.toLocaleString() === jokeId
  );

  if (!jokesIndex) {
    throw new Error("There is no joke!");
  }

  jokes[jokesIndex] = {
    id: +jokeId,
    ...jokesEdit,
  };

  res.status(200).json(jokes[jokesIndex]);
};

export const editJokes: RequestHandler = (req, res) => {
  const jokeId = (req.params as { id: string }).id;
  const jokesEdit = req.body;

  const jokesIndex = jokes.findIndex(
    (joke: Joke) => joke.id.toLocaleString() === jokeId
  );

  if (jokesIndex === -1) {
    throw new Error("There is no joke!");
  }

  if (jokesEdit.jokeText) {
    jokes[jokesIndex].jokeText = jokesEdit.jokeText;
    res.status(200).json(jokes[jokesIndex]);
  }
  if (jokesEdit.jokeType) {
    jokes[jokesIndex].jokeType = jokesEdit.jokeType;
    res.status(200).json(jokes[jokesIndex]);
  }
};

export const deleteJoke: RequestHandler = (req, res) => {
  const jokeId = (req.params as { id: string }).id;

  const selectedJoke = jokes.filter(
    (joke: Joke) => joke.id.toLocaleString() !== jokeId
  );

  jokes = selectedJoke;

  const filterJoke = selectedJoke.findIndex(
    (joke) => joke.id.toLocaleString() === jokeId
  );
  if (filterJoke === -1) {
    res.status(404).json("There is no more Joke");
  }

  res.status(200).json("OK");
};

export const deleteAllJokes: RequestHandler = (req, res) => {
  if (req.query.userKey === masterKey) {
    if (jokes) {
      jokes = [];
      res.status(200).json("OK");
    } else {
      throw new Error("No more jokes!");
    }
  } else {
    res.status(400).json("You are not authorize for deletee all jokje");
  }
};
