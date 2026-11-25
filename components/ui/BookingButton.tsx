"use client";

import type { ComponentProps } from "react";
import { trackConversion } from "@/lib/conversions";
import Button from "./Button";

type Props = Pick<ComponentProps<typeof Button>, "variant" | "block" | "className">;

export default function BookingButton(props: Props) {
  return (
    <Button
      {...props}
      href="/contact"
      label="Get in touch"
      onClick={() => trackConversion("book_a_call_clicked")}
      onAuxClick={(event) => {
        if (event.button === 1) trackConversion("book_a_call_clicked");
      }}
    />
  );
}
