import { FormEvent, useState, useCallback, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import { toast } from "react-toastify";

import { Loading } from "./Loading";
import { Input } from "./Form/Input";
import { Game } from "../types/Game";
import { api } from "../service/api";

interface CreateAdModalProps {
  games: Game[];
}

export const CreateAdModal = ({ games }: CreateAdModalProps) => {
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateAd = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const modalData = Object.fromEntries(formData);

    if (
      !modalData?.game ||
      !modalData?.name ||
      weekDays?.length == 0 ||
      !modalData?.hourStart ||
      !modalData?.hourEnd
    ) {
      return toast.warn("Fill all required fields");
    }

    try {
      setIsLoading(true);

      await api.post(`games/${modalData?.game}/ads`, {
        name: modalData?.name,
        yearsPlaying: Number(modalData?.yearsPlaying),
        discord: modalData?.discord,
        weekDays: weekDays?.map(Number),
        hourStart: modalData?.hourStart,
        hourEnd: modalData?.hourEnd,
        useVoiceChannel,
      });

      toast.success("Ad created successfully");
    } catch (error) {
      toast.error("And error occurred during the ad creation");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[550px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl text-left font-black">
          Publish and ad
        </Dialog.Title>

        {isLoading ? (
          <div className="mt-20 flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold">
                Which game?*
              </label>
              <select
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                id="game"
                name="game"
              >
                <option disabled defaultValue="" value="">
                  Select the game you wanna play
                </option>
                {games?.map((game) => (
                  <option key={game?.id} value={game?.id}>
                    {game?.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Your name (or nickname)*</label>
              <Input
                name="name"
                id="name"
                placeholder="How do they call you in the game?"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">
                  How many years have you been playing?
                </label>
                <Input
                  name="yearsPlaying"
                  id="yearsPlaying"
                  type="number"
                  placeholder="It's OK if it's ZERO"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">
                  What is your Discord <br />
                  user?
                </label>
                <Input
                  name="discord"
                  id="discord"
                  type="text"
                  placeholder="User#0000"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="week-days">When do you usually play?*</label>
                <ToggleGroup.Root
                  value={weekDays}
                  onValueChange={setWeekDays}
                  className="grid grid-cols-4 gap-2"
                  type="multiple"
                >
                  <ToggleGroup.Item
                    value="0"
                    title="Sunday"
                    className={`w-8 h-8 rounded ${
                      weekDays?.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="1"
                    title="Monday"
                    className={`w-8 h-8 rounded ${
                      weekDays?.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    M
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="2"
                    title="Tuesday"
                    className={`w-8 h-8 rounded ${
                      weekDays?.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="3"
                    title="Wednesday"
                    className={`w-8 h-8 rounded ${
                      weekDays?.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    W
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="4"
                    title="Thursday"
                    className={`w-8 h-8 rounded ${
                      weekDays?.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="5"
                    title="Friday"
                    className={`w-8 h-8 rounded ${
                      weekDays?.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    F
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="6"
                    title="Saturday"
                    className={`w-8 h-8 rounded ${
                      weekDays?.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Which time of day?*</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    name="hourStart"
                    id="hourStart"
                    type="time"
                    placeholder="From"
                  />
                  <Input
                    name="hourEnd"
                    id="hourEnd"
                    type="time"
                    placeholder="To"
                  />
                </div>
              </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
              <Checkbox.Root
                className="w-6 h-6 p-1 rounded bg-zinc-900"
                onCheckedChange={(checked) => {
                  setUseVoiceChannel(!!checked);
                }}
                checked={useVoiceChannel}
              >
                <Checkbox.Indicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              I usually connect to voice chat
            </label>

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
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
};
