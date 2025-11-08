"use client";

import { useTransition } from "react";
import { deleteClass } from "./actions";

type DeleteClassButtonProps = {
  id: string;
  title: string;
};

export default function DeleteClassButton({
  id,
  title,
}: DeleteClassButtonProps) {
  const [isPending, startTransition] = useTransition();

  async function handleAction(formData: FormData) {
    const confirmed = confirm(
      `Delete "${title}"?\nThis will remove it from the public classes list.`
    );
    if (!confirmed) return;
    await deleteClass(formData);
  }

  return (
    <form
      action={(formData) => {
        startTransition(() => handleAction(formData));
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="px-2 py-1 rounded-xl text-[9px] border border-red-500/60 text-red-300 hover:bg-red-500/15 transition-colors disabled:opacity-40"
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}
