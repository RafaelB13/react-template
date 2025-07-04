import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const SuccessAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center rounded-xl backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      >
        <Check className="h-24 w-24 text-green-300" />
      </motion.div>
    </motion.div>
  );
};
