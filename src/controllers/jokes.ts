import { Joke } from "../models/jokes";
import { RequestHandler } from "express";
import jokesData from "../data/jokes-data";

const jokes: Joke[] = jokesData;

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
    throw Error("There is no joke!");
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
