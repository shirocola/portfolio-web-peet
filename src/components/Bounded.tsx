import React from "react"
import clsx from "clsx"

type BoundedProps = {
    as?: React.ElementType
    classname?: string
    children: React.ReactNode
}

const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
    ({ as: Comp = "section", classname, children, ...resProps }, ref) => {
        return (
            <Comp
                ref={ref}
                className={clsx("px-4 py-10 md:px-8 md:py-20 mx-auto max-w-7xl", classname)}
                {...resProps}
            >
                <div className="mxauto w-full max-w-7xl">{children}</div>
            </Comp>
        )
    }
)
Bounded.displayName = "Bounded"

export default Bounded