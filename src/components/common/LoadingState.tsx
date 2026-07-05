import { motion } from 'framer-motion'
import { LoaderCircle } from 'lucide-react'

type LoadingStateProps = {
  label?: string
}

export function LoadingState({ label = 'Loading' }: LoadingStateProps) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-8 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
      >
        <LoaderCircle className="h-8 w-8 text-indigo-400" />
      </motion.div>
      <p className="text-sm font-medium text-slate-300">{label}</p>
    </div>
  )
}
