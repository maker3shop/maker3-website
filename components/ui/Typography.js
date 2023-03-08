export function Heading1({ children }) {
	return (
		<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-8xl">
			{children}
		</h1>
	);
}

export function Heading2({ children }) {
	return (
		<h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
			{children}
		</h2>
	);
}

export function Heading3({ children }) {
	return (
		<h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
			{children}
		</h3>
	);
}

export function Text({ children }) {
	return (
		<p className="leading-7 [&:not(:first-child)]:mt-3 text-2xl">{children}</p>
	);
}
