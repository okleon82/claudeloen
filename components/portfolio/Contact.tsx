import { contact } from "@/lib/portfolio/content";

export default function Contact() {
  return (
    <section className="flex flex-col justify-between rounded-2xl border border-black bg-[#0d0d0d] p-6 text-white">
      <div>
        <h3 className="text-2xl font-bold">Thank you.</h3>
        <p className="mt-4 whitespace-pre-line text-sm text-white/80">{contact.quote}</p>
      </div>
      <div className="mt-8">
        <p className="mb-2 text-xs font-medium text-white/60">Contact</p>
        <ul className="flex flex-col gap-1.5 text-sm">
          <li className="flex items-center gap-2">
            <span aria-hidden>✉️</span>
            <a href={`mailto:${contact.email}`} className="hover:underline">
              {contact.email}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden>📞</span>
            <span>{contact.phone}</span>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden>🔗</span>
            <a href={contact.linkHref} className="hover:underline" target="_blank" rel="noreferrer">
              {contact.linkLabel}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
