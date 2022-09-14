import * as Dialog from '@radix-ui/react-dialog';
import { MagnifyingGlassPlus } from "phosphor-react";

export const CreateAdBanner = () => {
  return (
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
        <Dialog.Trigger
          type="button"
          className="hover:bg-violet-600 flex items-center gap-3 transition-colors ease-linear py-3 px-4 rounded bg-violet-500 text-white text-base"
        >
          <MagnifyingGlassPlus size={24} /> Publish ad
        </Dialog.Trigger>
      </div>
    </div>
  );
};
