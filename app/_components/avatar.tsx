export function Avatar({
  src,
}: Readonly<{ src: string }>) {
  return (
    <div className='avatar top-[20%] md:top-[14%] right-0 fade-in'>
      <img src={src} alt='' />
    </div>
  );
}
