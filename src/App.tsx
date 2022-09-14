import { FormEvent, useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { GameController, Spinner } from "phosphor-react";

import { GameCard } from "./components/GameCard";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { Input } from "./components/Form/Input";
import { Game } from "./types/Game";
import { api } from "./service/api";

import logo from "./assets/logo.svg";
import "./styles/global.css";

const App = () => {
  const [games, setGames] = useState<Game[]>([]);

  const getAllGames = useCallback(async () => {
    const { data } = await api.get("games");

    setGames(data);
  }, []);

  const handlePublishAd = useCallback(async (e: FormEvent) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <div className="flex my-20 flex-col max-w-[1345px] mx-auto items-center px-6">
      <img src={logo} alt="NLW eSports Logo" />
      <h1 className="text-6xl text-white font-black mt-20">
        Your{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        ir here
      </h1>
      {games?.length > 0 ? (
        <div className="grid grid-cols-6 gap-6 mt-16">
          {games?.map((game: Game) => (
            <GameCard
              key={game?.id}
              gameName={game?.title}
              imageSource={game?.bannerUrl}
              adsCount={game?._count?.ads}
            />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex items-center justify-center">
          <Spinner className="animate-spin text-white" size={34} />
        </div>
      )}

      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl text-left font-black">
              Publish and ad
            </Dialog.Title>

            <form
              onSubmit={handlePublishAd}
              className="mt-8 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Which game?
                </label>
                <Input id="game" placeholder="Select the game you wanna play" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Your name (or nickname)</label>
                <Input
                  id="name"
                  placeholder="How do they call you in the game?"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="years-playing">
                    How many years have you been playing?
                  </label>
                  <Input
                    id="years-playing"
                    type="number"
                    placeholder="It's OK if it's ZERO"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">What is your Discord user?</label>
                  <Input id="discord" type="text" placeholder="User#0000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="week-days">When do you usually play?</label>

                  <div className="grid grid-cols-4 gap-2">
                    <button
                      title="Sunday"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      S
                    </button>
                    <button
                      title="Monday"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      M
                    </button>
                    <button
                      title="Tuesday"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      T
                    </button>
                    <button
                      title="Wednesday"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      W
                    </button>
                    <button
                      title="Thursday"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      T
                    </button>
                    <button
                      title="Friday"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      F
                    </button>
                    <button
                      title="Saturday"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      S
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hours-start">Which time of day?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="hours-start" type="time" placeholder="From" />
                    <Input id="hour-end" type="time" placeholder="To" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" />I usually connect to voice chat
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close
                  type="button"
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                >
                  Cancel
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                  <GameController className="w-6 h-6" />
                  Find duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default App;
