import { toast } from "react-toastify";

export function createNotification(type, message, title = "THAIBUDHA") {
  switch (type) {
    case "info":
      toast.info(message, title, 1000);
      break;
    case "success":
      toast.success(message, title);
      break;
    case "warning":
      toast.warning(message, title, 1000);
      break;
    case "error":
      toast.error(message, title, 1000);
      break;
    default:
      break;
  }
}
