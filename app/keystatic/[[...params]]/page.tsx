import type { Config } from "@keystatic/core";
import keystaticConfig from "@/keystatic.config";
import { Keystatic } from "@keystatic/core/ui";

export default function KeystaticPage() {
  return <Keystatic config={keystaticConfig as Config} />;
}
