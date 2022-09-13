import { MagnifyingGlassPlus } from "phosphor-react";

import { GameCard } from "./components/GameCard";

import logo from "./assets/logo.svg";
import "./styles/global.css";

const App = () => {
  return (
    <div className="flex my-20 flex-col max-w-[1345px] mx-auto items-center">
      <img src={logo} alt="NLW eSports Logo" />
      <h1 className="text-6xl text-white font-black mt-20">
        Your{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        ir here
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        <GameCard
          imageSource="/game-1.png"
          gameName="League of Legends"
          adsCount={4}
        />
        <GameCard
          imageSource="/game-2.png"
          gameName="League of Legends"
          adsCount={5}
        />
        <GameCard
          imageSource="/game-3.png"
          gameName="League of Legends"
          adsCount={2}
        />
        <GameCard
          imageSource="/game-4.png"
          gameName="League of Legends"
          adsCount={6}
        />
        <GameCard
          imageSource="/game-5.png"
          gameName="League of Legends"
          adsCount={7}
        />
        <GameCard
          imageSource="/game-6.png"
          gameName="League of Legends"
          adsCount={3}
        />
      </div>
      <div className="pt-1 bg-nlw-gradient mt-8 overflow-hidden self-stretch rounded-lg">
        <div className="bg-[#2a2634] px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white block font-black">
              You didn't find your duo?
            </strong>
            <span className="text-base text-zinc-400 block">
              Post an ad to find new players
            </span>
          </div>
          <button
            type="button"
            className="hover:bg-violet-600 flex items-center gap-3 transition-colors ease-linear py-3 px-4 rounded bg-violet-500 text-white text-base"
          >
            <MagnifyingGlassPlus size={24} /> Publish ad
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
