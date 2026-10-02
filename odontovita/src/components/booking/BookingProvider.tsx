import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { createInitialValues, type BookingTreatment, type BookingValues } from '../../lib/booking'
import { BookingDialog } from './BookingDialog'
import { BookingForm } from './BookingForm'
import { BookingContext } from './context'

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [initialValues, setInitialValues] = useState<BookingValues>(createInitialValues)
  /** Rascunho preservado caso o modal seja fechado antes do envio. */
  const draftRef = useRef<BookingValues>(createInitialValues())

  const openBooking = useCallback((treatment?: BookingTreatment) => {
    const draft = draftRef.current
    setInitialValues({ ...draft, treatment: treatment ?? draft.treatment })
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => setOpen(false), [])
  const contextValue = useMemo(() => ({ openBooking }), [openBooking])

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
      <BookingDialog open={open} onClose={handleClose}>
        {({ close }) => (
          <BookingForm
            initialValues={initialValues}
            onValuesChange={(values) => {
              draftRef.current = values
            }}
            onSuccess={() => {
              draftRef.current = createInitialValues()
            }}
            onDone={close}
            doneLabel="Concluir"
          />
        )}
      </BookingDialog>
    </BookingContext.Provider>
  )
}
