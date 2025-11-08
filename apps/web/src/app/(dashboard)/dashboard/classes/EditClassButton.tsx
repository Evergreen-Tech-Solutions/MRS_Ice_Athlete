"use client";

import { useState, useTransition } from "react";
import { updateClass } from "./actions";

type EditClassButtonProps = {
  cls: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    description: string | null;
    cover_url: string | null;
    skill_level: string | null;
    price_cents: number;
    currency: string;
    capacity: number;
    is_published: boolean;
  };
};

export default function EditClassButton({ cls }: EditClassButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateClass(formData);
      setOpen(false);
    });
  }

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-2 py-1 rounded-xl text-[9px] border border-amber-400/70 text-amber-200 hover:bg-amber-400/15 transition-colors"
      >
        Edit
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => !isPending && setOpen(false)}
        >
          <div
            className="relative max-w-xl w-full mx-4 rounded-3xl bg-neutral-950 border border-amber-500/40 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => !isPending && setOpen(false)}
              className="absolute right-4 top-3 text-xs text-amber-300 hover:text-amber-200"
              disabled={isPending}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-1 text-amber-300">
              Edit class
            </h2>
            <p className="text-[10px] text-white/60 mb-3">
              Update details for{" "}
              <span className="font-semibold">{cls.title}</span>
            </p>

            <form action={handleSubmit} className="grid gap-3 text-xs">
              <input type="hidden" name="id" value={cls.id} />

              <div>
                <label className="block mb-1 text-white/60">Title *</label>
                <input
                  name="title"
                  defaultValue={cls.title}
                  required
                  className="w-full rounded-xl bg-black/60 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                />
              </div>

              <div>
                <label className="block mb-1 text-white/60">Slug *</label>
                <input
                  name="slug"
                  defaultValue={cls.slug}
                  required
                  className="w-full rounded-xl bg-black/60 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                />
              </div>

              <div>
                <label className="block mb-1 text-white/60">Summary *</label>
                <textarea
                  name="summary"
                  defaultValue={cls.summary}
                  required
                  rows={2}
                  className="w-full rounded-xl bg-black/60 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                />
              </div>

              <div>
                <label className="block mb-1 text-white/60">
                  Description *
                </label>
                <textarea
                  name="description"
                  defaultValue={cls.description ?? cls.summary}
                  required
                  rows={4}
                  className="w-full rounded-xl bg-black/60 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                />
              </div>

              <div>
                <label className="block mb-1 text-white/60">
                  Cover image URL
                </label>
                <input
                  name="cover_url"
                  defaultValue={cls.cover_url ?? ""}
                  className="w-full rounded-xl bg-black/60 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block mb-1 text-white/60">Level</label>
                  <select
                    name="skill_level"
                    defaultValue={cls.skill_level ?? ""}
                    className="w-full rounded-xl bg-black/60 border border-white/15 px-2 py-2 text-[10px] text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                  >
                    <option value="">Any</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Pro">Pro</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-white/60">Price</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    min={0}
                    defaultValue={
                      cls.price_cents > 0
                        ? (cls.price_cents / 100).toFixed(2)
                        : ""
                    }
                    className="w-full rounded-xl bg-black/60 border border-white/15 px-2 py-2 text-[10px] text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-white/60">Currency</label>
                  <input
                    name="currency"
                    defaultValue={cls.currency}
                    className="w-full rounded-xl bg-black/60 border border-white/15 px-2 py-2 text-[10px] text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-white/60">
                  Base capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  required
                  min={1}
                  defaultValue={cls.capacity}
                  className="w-full rounded-xl bg-black/60 border border-white/15 px-3 py-2 text-[10px] text-white focus:outline-none focus:ring-2 focus:ring-amber-400/70"
                />
              </div>

              <div className="flex items-center gap-2 mt-1">
                <input
                  id={`edit-published-${cls.id}`}
                  name="is_published"
                  type="checkbox"
                  defaultChecked={cls.is_published}
                  className="h-3 w-3 rounded border-white/40 bg-black/70 accent-amber-400"
                />
                <label
                  htmlFor={`edit-published-${cls.id}`}
                  className="text-[10px] text-white/70"
                >
                  Published
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => !isPending && setOpen(false)}
                  className="px-3 py-1.5 rounded-2xl text-[10px] border border-white/25 text-white/70 hover:bg-white/5"
                  disabled={isPending}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-1.5 rounded-2xl text-[10px] font-semibold bg-amber-400/95 text-black hover:bg-amber-300 shadow-md shadow-amber-500/30 disabled:opacity-60"
                >
                  {isPending ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
