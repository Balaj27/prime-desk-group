"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import BookingButton from "@/components/ui/BookingButton";
import type page from "@/data/pages.json";
import { trackConversion } from "@/lib/conversions";
import styles from "./ContactHero.module.css";

type Props = { content: typeof page.contact.hero; details: ReactNode };
type Status = "idle" | "sending" | "sent" | "error";

export default function ContactHero({ content: hero, details }: Props) {
  const { form } = hero;
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Links from a service row name that service, so its checkbox starts ticked.
  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service");
    if (!service) return;
    formRef.current?.querySelectorAll<HTMLInputElement>('input[name="needs"]').forEach((input) => {
      if (input.value === service) input.checked = true;
    });
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const element = event.currentTarget;
    const data = new FormData(element);
    const website = String(data.get("website") ?? "");
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          needs: data.getAll("needs"),
          message: data.get("message"),
          website,
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      element.reset();
      setStatus("sent");
      if (!website.trim()) trackConversion("form_submitted");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 className={`h1 hero-rise ${styles.heading}`}>{hero.heading} <span>{hero.accent}</span></h1>
          <p className={`body18 ${styles.intro}`}>{hero.intro}</p>
        </div>

        <div className={styles.content}>
          <form ref={formRef} className={styles.form} onSubmit={handleSubmit} aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading" className={styles.cardHeading}>{form.heading}</h2>
            <div className={styles.fields}>
              <label className={styles.field}>
                <span>{form.name.label} <span aria-hidden="true">*</span></span>
                <input type="text" name="name" autoComplete="name" required maxLength={120} placeholder={form.name.placeholder} />
              </label>
              <label className={styles.field}>
                <span>{form.email.label} <span aria-hidden="true">*</span></span>
                <input type="email" name="email" autoComplete="email" required maxLength={200} placeholder={form.email.placeholder} />
              </label>
              <label className={styles.field}>
                {form.phone.label}
                <input type="tel" name="phone" autoComplete="tel" maxLength={40} placeholder={form.phone.placeholder} />
              </label>
              <label className={styles.field}>
                {form.company.label}
                <input type="text" name="company" autoComplete="organization" maxLength={160} placeholder={form.company.placeholder} />
              </label>
            </div>
            <fieldset className={styles.needs}>
              <legend>{form.needs.label}</legend>
              <div className={styles.options}>
                {form.needs.options.map((option) => (
                  <label key={option} className={styles.option}>
                    <input type="checkbox" name="needs" value={option} />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className={styles.field}>
              {form.message.label}
              <textarea name="message" maxLength={4000} placeholder={form.message.placeholder} />
            </label>
            {/* Hidden from people; bots that fill it are ignored by the API route. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.trap} />
            <button type="submit" className={styles.submit} disabled={status === "sending"}>
              {status === "sending" ? form.sendingLabel : form.submitLabel}
            </button>
            <div role="status">
              {status === "sent" && (
                <div className={styles.confirmation}>
                  <p className={styles.status}>{form.success}</p>
                  <BookingButton />
                </div>
              )}
              {status === "error" && (
                <p className={styles.status} data-status="error">
                  {form.error}
                </p>
              )}
            </div>
          </form>
          <aside className={styles.sidebar} aria-label="Other ways to get in touch">
            <section className={styles.booking} aria-labelledby="contact-booking-heading" data-scroll-group>
              <svg className={styles.calendarIcon} viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M7 3v4M17 3v4M3 10h18" />
              </svg>
              <h2 id="contact-booking-heading" className={styles.cardHeading}>{hero.booking.heading}</h2>
              <p>{hero.booking.description}</p>
              <BookingButton variant="white" block />
            </section>
            {details}
          </aside>
        </div>
      </div>
    </section>
  );
}
