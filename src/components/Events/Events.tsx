"use client";
import { CircleX } from "lucide-react";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { EventType } from "~/lib/types";
import { formatDate } from "~/lib/utils";
import { useTranslations } from "next-intl";
import ThumbnailCarousel from "../ThumbnailCarousel/ThumbnailCarousel";

function Events({ events }: { events: EventType[] }) {
  const t = useTranslations("gallery");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(
    null
  );

  const thumbnails = events.map((event) => ({
    id: event.id,
    image: event.image,
    title: event.title,
    alt: event.title,
  }));

  const openDialog = (index: number) => {
    setSelectedEventIndex(index);
    dialogRef.current && dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current && dialogRef.current.close();
    setSelectedEventIndex(null);
  };

  const selectedEvent =
    selectedEventIndex !== null ? events[selectedEventIndex] : null;

  return (
    <section className="content-container bg-white rounded p-8">
      <h1 className="font-bold text-3xl md:text-5xl mb-4">{t("heading")}</h1>
      <hr/>
      <div className="flex flex-wrap gap-8 justify-around mt-2">
        {events.map((event, index) => (
          <div
            key={event.id}
            onClick={() => openDialog(index)}
            className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
          >
            <Image
              src={event.image}
              width={250}
              height={250}
              alt={event.title}
              className="rounded object-contain"
            />
            <div className="bg-white p-4 sm:p-6">
              <time
                dateTime="2022-10-10"
                className="block text-xs text-gray-500"
              >
                {" "}
                {formatDate(event.date)}
              </time>
              <a href="#">
                <h3 className="mt-0.5 text-lg text-gray-900">{event.title}</h3>
              </a>
            </div>
          </div>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="w-[80%] h-[100%] p-2 md:p-15 bg-gray-100 rounded-xl  eventdialog overflow-hidden"
        onClick={closeDialog}
      >
        {selectedEvent && (
          <div className="w-full h-full mt-12 md:mt-1" onClick={(e) => e.stopPropagation()}>
            <ThumbnailCarousel
              thumbnails={thumbnails}
              initialIndex={
                selectedEventIndex !== null ? selectedEventIndex : undefined
              }
              onThumbnailClick={(thumbnail) => {
                const index = events.findIndex(
                  (event) => event.id === thumbnail.id
                );
                if (index !== -1) {
                  openDialog(index);
                }
              }}
            />
            <form method="dialog" className="absolute top-0 right-0 z-10">
              <button className="m-4" onClick={closeDialog}>
                <CircleX className="text-black" size={32} />
              </button>
            </form>
          </div>
        )}
      </dialog>
    </section>
  );
}

export default Events;
