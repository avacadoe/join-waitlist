export type WaitlistFormState = {
  status: "idle" | "success" | "error"
  message: string
}

export const initialWaitlistState: WaitlistFormState = {
  status: "idle",
  message: "",
}
