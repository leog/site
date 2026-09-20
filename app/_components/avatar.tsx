export function Avatar({ src }: Readonly<{ src: string }>) {
  return (
    <div className="avatar float-right ml-6 mb-4 mr-3 mt-1 fade-in">
      <div className="avatar-img">
        <img src={src} alt="Leo Giovanetti" width={150} height={180} />
      </div>
    </div>
  );
}
