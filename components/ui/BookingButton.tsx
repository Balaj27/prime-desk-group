"use client";

import type { ComponentProps } from "react";
import { trackConversion } from "@/lib/conversions";
import Button from "./Button";

type Props = Pick<ComponentProps<typeof Button>, "variant" | "block" | "className">;

const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();

export default function BookingButton(props: Props) {
  return (
    <Button
      {...props}
      href={bookingUrl || "/contact"}
      label="Book a call"
      target={bookingUrl ? "_blank" : undefined}
      rel={bookingUrl ? "noopener" : undefined}
      onClick={() => trackConversion("book_a_call_clicked")}
      onAuxClick={(event) => {
        if (event.button === 1) trackConversion("book_a_call_clicked");
      }}
    />
  );
}
