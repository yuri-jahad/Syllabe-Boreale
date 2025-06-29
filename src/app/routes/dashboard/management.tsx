import { createFileRoute } from "@tanstack/react-router"
// routes/home.tsx ou routes/protected/home.tsx

import Management from "@/features/management/components/editor";

export const Route = createFileRoute("/dashboard/management")({

  component: () => <Management />,
});
