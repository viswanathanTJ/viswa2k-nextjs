"use client"
import { Button } from "@/components/ui/button"
import { submitContactForm } from "@/app/actions"
import { useFormState, useFormStatus } from "react-dom"

const initialState = {
  success: false,
  message: "",
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Sending..." : "Send Message"}
    </Button>
  )
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState)

  return (
    <div>
      <form action={formAction} className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input id="name" name="name" required className="w-full p-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input id="email" name="email" type="email" required className="w-full p-2 border rounded-md" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject
          </label>
          <input id="subject" name="subject" required className="w-full p-2 border rounded-md" />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea id="message" name="message" rows={4} required className="w-full p-2 border rounded-md"></textarea>
        </div>
        <SubmitButton />

        {state.message && (
          <div className={`p-4 rounded-md ${state.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {state.message}
          </div>
        )}
      </form>
    </div>
  )
}

