"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import type page from "@/data/pages.json";
import { CONTACT_NAME_MAX_LENGTH, getContactError } from "@/lib/contact";
import { trackConversion } from "@/lib/conversions";
import styles from "./ContactHero.module.css";

type Props = { content: typeof page.contact.hero; details: ReactNode };
type Status = "idle" | "sending" | "sent" | "error";

export default function ContactHero({ content: hero, details }: Props) {
  const { inquiry } = hero;
  const [step, setStep] = useState(0);
  const [needs, setNeeds] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [answerError, setAnswerError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(0);

  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service");
    if (service && inquiry.needs.options.includes(service)) setNeeds([service]);
  }, [inquiry.needs.options]);

  useEffect(() => {
    if (previousStep.current !== step || status === "sent") headingRef.current?.focus();
    previousStep.current = step;
  }, [step, status]);

  const goToStep = (nextStep: number) => {
    setAnswerError("");
    setStatus("idle");
    setStep(nextStep);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending" || status === "sent") return;

    if (step === 0 && needs.length === 0) {
      setAnswerError("Choose at least one option to continue.");
      return;
    }
    if (step === 1 && !goal.trim()) {
      setAnswerError("Enter your main goal to continue.");
      return;
    }
    if (step < 2) {
      goToStep(step + 1);
      return;
    }

    const contactName = name.trim();
    if (!contactName) {
      setAnswerError("Enter your name.");
      return;
    }

    const replyEmail = email.trim();
    const replyPhone = phone.trim();
    const contactError = getContactError(replyEmail, replyPhone);
    if (contactError) {
      setAnswerError(contactError);
      return;
    }

    const website = String(new FormData(event.currentTarget).get("website") ?? "");
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ needs, goal, name: contactName, email: replyEmail, phone: replyPhone, website }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
      return;
    }
    if (!website.trim()) trackConversion("form_submitted");
  };

  const question = [inquiry.needs.question, inquiry.goal.question, inquiry.contact.question][step];
  const contactFields = [
    { name: "name", type: "text", autoComplete: "name", required: true, maxLength: CONTACT_NAME_MAX_LENGTH, value: name, setValue: setName, ...inquiry.contact.name },
    { name: "email", type: "email", autoComplete: "email", required: false, maxLength: 200, value: email, setValue: setEmail, ...inquiry.contact.email },
    { name: "phone", type: "tel", autoComplete: "tel", required: false, maxLength: 40, value: phone, setValue: setPhone, ...inquiry.contact.phone },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 className={`h1 hero-rise ${styles.heading}`}>{hero.heading} <span>{hero.accent}</span></h1>
          <p className={`body18 ${styles.intro}`}>{hero.intro}</p>
        </div>

        <div className={styles.content}>
          {status === "sent" ? (
            <section className={`${styles.inquiry} ${styles.confirmation}`} aria-labelledby="contact-confirmation">
              <span className={styles.confirmationIcon} aria-hidden="true">✓</span>
              <h2 id="contact-confirmation" className={styles.question} ref={headingRef} tabIndex={-1}>
                Message sent
              </h2>
              <p>{inquiry.success}</p>
            </section>
          ) : (
            <form className={styles.inquiry} data-step={step} onSubmit={handleSubmit} noValidate={step === 2} aria-labelledby="contact-question">
              <header className={styles.inquiryHeader}>
                <div className={styles.progress}>
                  <p id="contact-step" className={styles.step}>Question {step + 1} of 3</p>
                  <div className={styles.segments} aria-hidden="true">
                    {[0, 1, 2].map((index) => (
                      <span key={index} data-completed={index < step} data-current={index === step} />
                    ))}
                  </div>
                </div>
                <h2
                  id="contact-question"
                  className={styles.question}
                  ref={headingRef}
                  tabIndex={-1}
                  aria-describedby="contact-step"
                >
                  {question}
                </h2>
              </header>
              <div className={styles.response} key={step}>
                {step === 0 && (
                  <fieldset className={styles.needs} aria-labelledby="contact-question" aria-describedby="contact-options-hint">
                    <p id="contact-options-hint" className={styles.hint}>Select all that apply.</p>
                    <div className={styles.options}>
                      {inquiry.needs.options.map((option) => (
                        <label key={option} className={styles.option}>
                          <input
                            type="checkbox"
                            name="needs"
                            value={option}
                            checked={needs.includes(option)}
                            onChange={(event) => {
                              const { checked } = event.currentTarget;
                              setNeeds((selected) => checked ? [...selected, option] : selected.filter((need) => need !== option));
                              setAnswerError("");
                            }}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}
                {step === 1 && (
                  <div className={styles.goalResponse}>
                    <p id="contact-goal-hint" className={styles.hint}>{inquiry.goal.hint}</p>
                    <textarea
                      name="goal"
                      className={styles.answer}
                      aria-labelledby="contact-question"
                      aria-describedby="contact-goal-hint contact-inquiry-error"
                      required
                      maxLength={4000}
                      placeholder={inquiry.goal.placeholder}
                      value={goal}
                      onChange={(event) => {
                        setGoal(event.target.value);
                        setAnswerError("");
                      }}
                    />
                  </div>
                )}
                {step === 2 && (
                  <fieldset className={styles.methods} aria-labelledby="contact-question" aria-describedby="contact-methods-hint contact-inquiry-error">
                    <p id="contact-methods-hint" className={styles.hint}>{inquiry.contact.hint}</p>
                    {contactFields.map(({ name, type, autoComplete, required, label, placeholder, maxLength, value, setValue }) => (
                      <label key={name} className={styles.field}>
                        <span>{label}{required && " *"}</span>
                        <input
                          id={`contact-${name}`}
                          type={type}
                          name={name}
                          autoComplete={autoComplete}
                          required={required}
                          maxLength={maxLength}
                          placeholder={placeholder}
                          value={value}
                          readOnly={status === "sending"}
                          onChange={(event) => {
                            setValue(event.target.value);
                            setAnswerError("");
                            setStatus("idle");
                          }}
                        />
                      </label>
                    ))}
                  </fieldset>
                )}
              </div>
              {/* Bots that fill this field are ignored by the API route. */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.trap} />
              <footer className={styles.inquiryFooter}>
                <p id="contact-inquiry-error" className={styles.error} role="alert">{answerError || (status === "error" && inquiry.error)}</p>
                <div className={styles.actions}>
                  {step > 0 && (
                    <button type="button" className={styles.back} disabled={status === "sending"} onClick={() => goToStep(step - 1)}>
                      <span aria-hidden="true">←</span>
                      Back
                    </button>
                  )}
                  <button type="submit" className={styles.submit} disabled={status === "sending"}>
                    {step < 2 ? "Next" : status === "sending" ? inquiry.sendingLabel : inquiry.submitLabel}
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </footer>
            </form>
          )}
          <aside aria-label="Other ways to get in touch">
            {details}
          </aside>
        </div>
      </div>
    </section>
  );
}
