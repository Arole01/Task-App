import { Trash2, X } from "lucide-react";

function DeleteConfirmModal({ task, onCancel, onConfirm }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
              <Trash2 size={23} />
            </div>

            <div>
              <h2
                id="delete-modal-title"
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                Delete Task?
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Are you sure you want to delete this task? This action cannot be
                undone and all tracked logs will be permanently removed.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close confirmation window"
            className="shrink-0 rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <X size={21} />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-indigo-50 px-4 py-3 dark:bg-indigo-950/50">
          <div className="flex min-w-0 items-center gap-3">
            <Trash2
              size={19}
              className="shrink-0 text-indigo-600 dark:text-indigo-400"
            />

            <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
              {task.title}
            </p>
          </div>

          <span className="shrink-0 text-xs font-medium text-gray-500 dark:text-gray-400">
            #{task.taskCode || `TK-${task.id}`}
          </span>
        </div>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <Trash2 size={17} />
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
