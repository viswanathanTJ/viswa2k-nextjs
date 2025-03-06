"use server"

export async function submitContactForm(formData: FormData) {
  // In a real application, you would send this data to your backend or API
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simulate a delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // For demo purposes, we're just returning the data
  // In a real app, you would send this to your API or database
  return {
    success: true,
    message: `Thank you ${name}! We've received your message and will get back to you soon.`,
  }
}

