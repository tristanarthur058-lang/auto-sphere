import { PHONE_DISPLAY, EMAIL } from "@/lib/contact";

export default function ContactPage() {
  return (
    <div className="container-page py-12 max-w-2xl">
      <h1 className="font-display font-700 text-3xl text-navy-950 mb-2">Contactez-nous</h1>
      <p className="text-steel-600 mb-8">
        Une question sur une pièce, une commande ou la compatibilité avec votre véhicule ?
        Notre équipe vous répond sous 24h.
      </p>

      <form className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1">Nom</label>
            <input type="text" className="w-full border border-steel-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-signal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1">Email</label>
            <input type="email" className="w-full border border-steel-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-signal-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1">Sujet</label>
          <input type="text" className="w-full border border-steel-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-signal-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-1">Message</label>
          <textarea rows={5} className="w-full border border-steel-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-signal-500" />
        </div>
        <button type="submit" className="btn-primary">Envoyer le message</button>
      </form>

      <div className="mt-10 border-t border-steel-200 pt-6 text-sm text-steel-600 space-y-1">
        <p>Email : {EMAIL}</p>
        <p>Téléphone : {PHONE_DISPLAY}</p>
      </div>
    </div>
  );
}
