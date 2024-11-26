"use client"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FormInput } from "@/components/form/form-input"

const FormSchema = z.object({
  email: z.string().email({
    message: "メールアドレスの形式が正しくありません",
  }),
  password: z
    .string()
    .min(8, {
      message: "パスワードは8文字以上で入力してください",
    })
    .regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, {
      message:
        "パスワードは数字・英小文字・英大文字をそれぞれ1文字以上使用してください",
    }),
})

type FormSchemaType = z.infer<typeof FormSchema>

export default function FormPage() {
  const form = useForm<FormSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 gap-4 max-w-sm mx-auto mt-6"
      >
        <FormInput
          control={form.control}
          name="email"
          label="メールアドレス"
          placeholder="メールアドレスを入力してください"
        />
        <FormInput
          control={form.control}
          name="password"
          label="パスワード"
          placeholder="パスワードを入力してください"
        />
        <Button type="submit">送信</Button>
      </form>
    </Form>
  )
}
