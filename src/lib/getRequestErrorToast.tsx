import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { IAPIResponse } from '+/types/axios';

export const getRequestErrorToast = ({ response }: AxiosError) => {
  if (response?.data) {
    const { errors, notifications, messages } = response.data as {
      errors: Record<string, Array<string>>;
      notifications: IAPIResponse<string>['notifications'];
      messages: Array<string>;
    };

    if (errors) {
      toast.error(
        <ul className="list-inside list-disc">
          {Object.entries(errors).map(([key, [value]]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
      );

      return;
    }

    if (notifications) {
      toast.error(
        <ul className="list-inside list-disc">
          {notifications.map(({ message }) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      );

      return;
    }

    if (messages) {
      toast.error(
        <ul className="list-inside list-disc">
          {messages.map(message => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      );
    }
  }
};
