import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { EnquiryContext } from "../contexts/EnquiryContext";

export default function EnquiryFormModal() {
  const { isOpen, closeModal } = useContext(EnquiryContext);
  if (!isOpen) return null;

  const TELEGRAM_BOT_TOKEN = "8114922789:AAGGSrMYFhZglxYL6cuyZrgxHqxRfXcv6W0";
  const TELEGRAM_CHAT_ID = "8296832015";

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const text = `📩 *New Enquiry*:\n\n👤 Name: ${form.name}\n📱 Mobile: ${form.mobile}${
      form.email ? `\n📧 Email: ${form.email}` : ""
    }${form.message ? `\n📝 Message: ${form.message}` : ""}`;

    try {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      });

      if (res.ok) {
        alert("✅ Message sent!");
        setForm({ name: "", mobile: "", email: "", message: "" });
      } else {
        alert("❌ Failed to send. Try again.");
      }
    } catch {
      alert("🚫 Error sending enquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-600 text-2xl"
          onClick={closeModal}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Enquiry Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            className="w-full border p-2 rounded"
          />
          <input
            name="email"
            placeholder="Email (optional)"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="message"
            placeholder="Message (optional)"
            value={form.message}
            onChange={handleChange}
            className="w-full border p-2 rounded h-24"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Sending..." : "Send Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}
