"use client"
import { Button } from "@/components/ui/button"
import { bookAppointment } from "@/app/gigs/[id]/actions"
import { useFormState, useFormStatus } from "react-dom"

const initialState = {
  success: false,
  message: "",
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Processing..." : "Book Now"}
    </Button>
  )
}
export default function BookingForm() {
  const [state, formAction] = useFormState(
    (prevState: typeof initialState, formData: FormData) => bookAppointment(formData),
    initialState
  )

  return (
    <div>
      <form action={formAction} className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="date" className="text-sm font-medium">
            Select Date
          </label>
          <input type="date" id="date" name="date" required className="w-full p-2 border rounded-md" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="time" className="text-sm font-medium">
            Select Time
          </label>
          <select id="time" name="time" required className="w-full p-2 border rounded-md">
            <option value="">Select a time slot</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Your Name
          </label>
          <input type="text" id="name" name="name" required className="w-full p-2 border rounded-md" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <input type="tel" id="phone" name="phone" required className="w-full p-2 border rounded-md" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input type="email" id="email" name="email" required className="w-full p-2 border rounded-md" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="notes" className="text-sm font-medium">
            Special Requests (Optional)
          </label>
          <textarea id="notes" name="notes" rows={3} className="w-full p-2 border rounded-md"></textarea>
        </div>
        <SubmitButton />

        {state.message && (
          <div className={`p-4 rounded-md ${state.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {state.message}
          </div>
        )}

        <p className="text-xs text-center text-muted-foreground">By booking, you agree to our terms and conditions</p>
      </form>
    </div>
  )
}

