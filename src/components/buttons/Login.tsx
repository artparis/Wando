import Link from "next/link";
import { Button } from "#components/ui/Button";
import { OAUTH2_URL } from "#lib/Constants";

export const LoginComponent = () => {
  return (
    <Button asChild={true} variant="default">
      <Link aria-label="Login" className="flex items-center gap-2" href={OAUTH2_URL}>
        Login
      </Link>
    </Button>
  );
};
