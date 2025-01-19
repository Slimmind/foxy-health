import { createLazyFileRoute } from "@tanstack/react-router";
import FormCreator from "../../components/form-creator";

export const Route = createLazyFileRoute("/forms/form-creator")({
  component: FormCreator,
});
