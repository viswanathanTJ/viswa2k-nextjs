import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { projectsData } from "@/lib/data";
import { useEffect } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalSrc: string;
  modalPoints: readonly string[];
  modalTitle: string;
  children: React.ReactNode;
}

export default function ProjectModal({
  isOpen,
  onClose,
  modalSrc,
  modalPoints,
  modalTitle,
}: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[999] flex items-start justify-center bg-black/70 px-4 pt-28 pb-4 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-lg bg-white/95 p-6 sm:p-8 shadow-xl ring-1 ring-gray-200 dark:bg-gray-900/95 dark:ring-gray-800 my-8"
      >
        <button
          onClick={onClose}
          className="fixed right-6 top-32 rounded-full p-2 bg-white/95 dark:bg-gray-900/95 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 shadow-lg"
        >
          <IoMdClose size={24} />
        </button>
        <h2 className="mb-6 text-3xl font-bold tracking-tight">{modalTitle}</h2>
        {modalSrc.match(/\.(mp4|webm|ogg)$/i) ? (
          <video
            src={modalSrc}
            controls
            className="mb-4 w-full max-w-[530px] h-auto rounded-lg object-cover mx-auto"
          />
        ) : (
          <img
            src={modalSrc}
            alt={modalTitle}
            className="mb-4 w-full h-auto max-h-[500px] rounded-lg object-contain"
          />
        )}
        {modalPoints && modalPoints.length > 0 && (
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {modalPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-500"></span>
                    {point}
                  </li>
              ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
}
