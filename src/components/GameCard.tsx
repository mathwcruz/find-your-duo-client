interface GameCardProps {
  gameName: string;
  adsCount: number;
  imageSource: string;
}

export const GameCard = ({
  imageSource,
  gameName,
  adsCount,
}: GameCardProps) => {
  return (
    <a className="relative rounded-lg overflow-hidden" href="#">
      <img src={imageSource} alt="" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="text-base block font-bold text-white">
          {gameName}
        </strong>
        <span className="text-zinc-300 block text-sm">
          {String(adsCount)} {adsCount === 1 ? "ad" : "ads"}
        </span>
      </div>
    </a>
  );
};
