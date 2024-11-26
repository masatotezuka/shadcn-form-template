"use client"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormLabel,
  FormItem,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="メールアドレスを入力してください"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input {...field} placeholder="パスワードを入力してください" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">送信</Button>
      </form>
    </Form>
  )
}
