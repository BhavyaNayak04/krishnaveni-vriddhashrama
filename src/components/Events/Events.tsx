"use client";
import { CircleX } from "lucide-react";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { EventType } from "~/lib/types";
import { formatDate } from "~/lib/utils";
import { useTranslations } from "next-intl";
import ThumbnailCarousel from "../ThumbnailCarousel/ThumbnailCarousel";
import Reveal from "../Animations/reveal";

function Events({ events }: { events: EventType[] }) {
  const t = useTranslations("events");
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
    document.body.classList.add("prevent-scroll");
  };

  const closeDialog = () => {
    dialogRef.current && dialogRef.current.close();
    setSelectedEventIndex(null);
    document.body.classList.remove("prevent-scroll");
  };

  return (
    <section className="content-container rounded p-8">
      <Reveal>
        <h1 className=" heading space-y-2 w-fit">
          {t("heading")}
          <div className="h-1 w-full mt-2 bg-secondary-500 rounded-full"></div>
        </h1>
        <div className="lg:columns-4 md:columns-3 columns-2 space-y-4 body">
          {events.map((event, index) => (
            <div
              key={event.id}
              onClick={() => openDialog(index)}
              className="overflow-hidden rounded-lg shadow transition hover:shadow-lg cursor-pointer"
            >
              <Image
                src={event.image}
                width={250}
                height={250}
                alt={event.title}
                className="rounded w-full object-cover"
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
      </Reveal>
      <dialog
        ref={dialogRef}
        className="w-[80%] h-[100%] p-2 md:p-15 bg-gray-100 rounded-xl  eventdialog overflow-hidden"
        onClick={closeDialog}
      >
        {(selectedEventIndex !== null) && (
          <div
            className="w-full h-full mt-12 md:mt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <ThumbnailCarousel
              thumbnails={thumbnails}
              initialIndex={selectedEventIndex}
            />
            <form method="dialog" className="absolute top-0 right-0 z-10">
              <button className="m-4" onClick={closeDialog}>
                <CircleX className="text-red-700" size={32} />
              </button>
            </form>
          </div>
        )}
      </dialog>
    </section>
  );
}

export default Events;
