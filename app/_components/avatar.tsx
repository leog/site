export function Avatar({
  src,
}: Readonly<{ src: string }>) {
  return (
    <div className='avatar top-[13%] md:top-[15%] right-0 fade-in'>
      <img src={src} alt='' />
    </div>
  );
}
