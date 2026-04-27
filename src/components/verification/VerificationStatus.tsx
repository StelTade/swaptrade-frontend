import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClockCircle } from 'react-icons/ai';

interface VerificationStatusProps {
  status: 'pending' | 'verified' | 'expired' | 'error';
  message: string;
  onResend?: () => void;
}

export default function VerificationStatus({ status, message, onResend }: VerificationStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          icon: AiOutlineCheckCircle,
          bgColor: 'bg-green-50',
          textColor: 'text-green-800',
          iconColor: 'text-green-400',
        };
      case 'error':
        return {
          icon: AiOutlineCloseCircle,
          bgColor: 'bg-red-50',
          textColor: 'text-red-800',
          iconColor: 'text-red-400',
        };
      case 'expired':
        return {
          icon: AiOutlineClockCircle,
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-400',
        };
      default:
        return {
          icon: AiOutlineClockCircle,
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-400',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`rounded-md p-4 ${config.bgColor}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${config.iconColor}`} aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${config.textColor}`}>{message}</p>
          {status === 'expired' && onResend && (
            <div className="mt-2">
              <button
                onClick={onResend}
                className="text-sm font-medium text-[#16a34a] hover:text-[#15803d] underline"
              >
                Resend verification email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}