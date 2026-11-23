"use client";

import type { ComponentProps } from "react";
import { trackConversion } from "@/lib/conversions";
import Button from "./Button";

type Props = Pick<ComponentProps<typeof Button>, "variant" | "block" | "className">;

const testCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=PrimeDesk%20demo%20%28test%29&details=Demo%20only.%20This%20does%20not%20book%20a%20call%20with%20PrimeDesk.";
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || testCalendarUrl;

export default function BookingButton(props: Props) {
  return (
    <Button
      {...props}
      href={bookingUrl}
      label="Book a call"
      target="_blank"
      rel="noopener"
      onClick={() => trackConversion("book_a_call_clicked")}
      onAuxClick={(event) => {
        if (event.button === 1) trackConversion("book_a_call_clicked");
      }}
    />
  );
}
