export function Avatar({
  src,
}: Readonly<{ src: string }>) {
  return (
    <div className='avatar top-[10%] right-0 fade-in'>
      <img src={src} alt='' />
    </div>
  );
}
