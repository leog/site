export function Avatar({ src }: Readonly<{ src: string }>) {
  return (
    <div className="avatar md:top-[8%] right-0 top-[6%]">
      <img src={src} alt="" />
    </div>
  );
}
