import Button from '@/components/UI/Button'
import React from 'react'

export interface IMeta {
    current_page: number
    last_page: number
}


interface IPagination {
    className?: string
    meta: IMeta
    page: number
    setPage: Function
}

const Pagination: React.FC<IPagination> = ({ className, meta, page, setPage }) => {


    const handlePrevious = () => {
        if (meta.current_page > 1) {
            setPage((p: number) => p - 1)
        }
    }
    const handleNext = () => {
        if (page < meta.last_page) {
            setPage((p: number) => p + 1)
        }
    }

    return (
        <div className={`w-full flex ${className}`}>
            <div className={`w-full flex justify-between items-center px-4 py-3 `}>
                <Button onClick={handlePrevious} variant="blueOutline" className="py-2 px-4 rounded-lg" disabled={meta?.current_page === 1}>
                    Previous
                </Button>
                <div className="hidden md:block">Page {meta?.current_page || "0"} of {meta?.last_page || "0"}</div>
                <div className="md:hidden">{meta?.current_page || "0"} / {meta?.last_page || "0"}</div>
                <Button onClick={handleNext} variant="blueOutline" className="py-2 px-4 rounded-lg" disabled={meta?.current_page === meta?.last_page}>
                    Next
                </Button>
            </div>
        </div>
    )
}

export default Pagination