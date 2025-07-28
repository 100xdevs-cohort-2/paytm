import React from "react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

const ICONS = {
  success: {
    icon: <CheckCircleIcon className="w-6 h-6 text-white" />,
    bg: "bg-emerald-500",
    text: "text-emerald-500 dark:text-emerald-400",
  },
  info: {
    icon: <InformationCircleIcon className="w-6 h-6 text-white" />,
    bg: "bg-blue-500",
    text: "text-blue-500 dark:text-blue-400",
  },
  warning: {
    icon: <ExclamationTriangleIcon className="w-6 h-6 text-white" />,
    bg: "bg-yellow-400",
    text: "text-yellow-400 dark:text-yellow-300",
  },
  error: {
    icon: <XCircleIcon className="w-6 h-6 text-white" />,
    bg: "bg-red-500",
    text: "text-red-500 dark:text-red-400",
  },
};

function Alert({ type = "info", title, message }) {
  const alertType = ICONS[type] || ICONS.info;

  return (
    <div className="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className={`flex items-center justify-center w-12 ${alertType.bg}`}>
        {alertType.icon}
      </div>
      <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
          <span className={`font-semibold ${alertType.text}`}>{title}</span>
          <p className="text-sm text-gray-600 dark:text-gray-200">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Alert;
