import Link from "next/link";
import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const {sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isEventCreator = event.organizer._id.toString() === userId;

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-2xl hover:-translate-y-1 md:min-h-[438px] border border-gray-100">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="relative flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
            <span className="text-sm font-semibold text-gray-900">View Details</span>
          </div>
        </div>
      </Link>
      
      {isEventCreator && !hidePrice && (
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <Link 
            href={`/events/${event._id}/update`}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-lg hover:bg-primary-600 transition-all group/edit"
          >
            <Image 
              src="/assets/icons/edit.svg" 
              width={18} 
              height={18} 
              alt="edit"
              className="group-hover/edit:brightness-0 group-hover/edit:invert transition-all"
            />
          </Link>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-lg hover:bg-red-600 transition-all">
            <DeleteConfirmation eventId={event._id}/>
          </div>
        </div>
      )}
      
      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2 flex-wrap">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
              event.isFree 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm' 
                : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-sm'
            }`}>
              {event.isFree ? 'FREE' : `$${event.price}`}
            </span>
            <p className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="w-4 h-4 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm font-medium">
            {formatDateTime(event.startDateTime).dateTime}
          </p>
        </div>

        <Link href={`/events/${event._id}`}>
          <p className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors leading-tight">
            {event.title}
          </p>
        </Link>
        
        <div className="flex-1" />
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0">
              {event.organizer.firstName.charAt(0)}{event.organizer.lastName.charAt(0)}
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {event.organizer.firstName} {event.organizer.lastName}
            </p>
          </div>
          
          {hasOrderLink && (
            <Link href={`orders?eventId=${event._id}`} className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 transition-colors group/link">
              <p className="text-xs font-semibold">Order Details</p>
              <Image 
                src="/assets/icons/arrow.svg" 
                alt="arrow" 
                width={10} 
                height={10}
                className="transition-transform group-hover/link:translate-x-1"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;