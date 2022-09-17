import { useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { PublishAdModal } from "./components/PublishAdModal";
import { GameCard } from "./components/GameCard";
import { PublishAdBanner } from "./components/PublishAdBanner";
import { Loading } from "./components/Loading";
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
          <Loading />
        </div>
      )}

      <Dialog.Root>
        <PublishAdBanner />

        <PublishAdModal games={games} />
      </Dialog.Root>
    </div>
  );
};

export default App;
