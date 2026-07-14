/**
 * Smart booking button that shows next available slot
 */
import NextSlotBadge from '@/components/availability/NextSlotBadge';
import { acuityBookingUrlForCalendar } from '@/lib/acuity';
import { cn } from '@/lib/utils';

interface Props {
  calendarId: number;
  stylistName: string;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  showAvailability?: boolean;
}

const variantClasses = {
  primary: 'btn btn-primary',
  outline: 'btn btn-outline',
  ghost: 'btn btn-ghost',
};

export default function SmartBookButton({
  calendarId,
  stylistName,
  variant = 'primary',
  className = '',
  showAvailability = true,
}: Props) {
  const bookingUrl = acuityBookingUrlForCalendar(calendarId);

  return (
    <div className={cn('smart-book-button flex flex-col items-start gap-2', className)}>
      {showAvailability && <NextSlotBadge calendarId={calendarId} />}
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={variantClasses[variant]}
        data-magnetic
      >
        Book with {stylistName}
      </a>
    </div>
  );
}
