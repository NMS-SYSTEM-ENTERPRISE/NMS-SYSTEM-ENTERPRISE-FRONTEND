import Screen from '@/screens/login';
import { GuestGuard } from '@/guards/guest-guard';

export default function Page() {
  return (
    <GuestGuard>
      <Screen />
    </GuestGuard>
  );
}
