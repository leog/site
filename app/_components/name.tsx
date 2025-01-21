export function NameTransition() {
  return (
    <h1 className='font-medium pt-12'>
      <span className='sr-only'>
        Leo Giovanetti
      </span>
      <span
        aria-hidden='true'
        className='block overflow-hidden group relative font-semibold'
      >
        <span className='inline-block transition-all text-2xl duration-300 ease-in-out group-hover:-translate-y-full whitespace-nowrap	'>
          {"Hi! I'm Leo Giovanetti"
            .split("")
            .map((letter, index) => (
              <span
                key={`${letter}${index}`}
                className='inline-block'
                style={{
                  transitionDelay: `${
                    index * 25
                  }ms`,
                }}
              >
                {letter === " "
                  ? "\u00A0"
                  : letter}
              </span>
            ))}
          <span className='text-neon'>.</span>
        </span>
        <span className='inline-block text-2xl absolute left-0 top-0 transition-all duration-300 ease-in-out translate-y-full group-hover:translate-y-0'>
          {"Also known as leog"
            .split("")
            .map((letter, index) => (
              <span
                key={`${letter}${index}`}
                className='inline-block'
                style={{
                  transitionDelay: `${
                    index * 25
                  }ms`,
                }}
              >
                {letter === " "
                  ? "\u00A0"
                  : letter}
              </span>
            ))}
          <span className='text-neon'>.</span>
        </span>
      </span>
    </h1>
  );
}
