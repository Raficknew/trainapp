"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type TrainingSchema, trainingSchema } from "../schema/schema";

export function TrainingForm() {
  const form = useForm<TrainingSchema>({
    resolver: zodResolver(trainingSchema),
    defaultValues: {
      name: "",
      exercises: [
        {
          name: "",
          sets: [
            {
              weight: 0,
              reps: 0,
            },
          ],
        },
      ],
    },
  });

  function onSubmit(data: TrainingSchema) {
    console.log(data);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="sm:px-8 px-4">
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Nazwa treningu"
                className="bg-transparent border-none active:border-none"
                id="name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
