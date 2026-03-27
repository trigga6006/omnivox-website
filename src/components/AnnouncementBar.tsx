export function AnnouncementBar() {
  return (
    <div className="flex items-center justify-center gap-2 px-5 py-[22px] text-center" style={{ backgroundColor: "var(--section-green-bg)" }}>
      <p className="font-sans text-base leading-normal" style={{ color: "#ffffeb" }}>
        <span className="font-semibold">Now live on Android</span>
        {" — free & unlimited during launch "}
        <a
          href="https://play.google.com/store/apps/details?id=com.wispr.flow"
          className="inline-flex items-center gap-1 font-semibold hover:underline"
        >
          Download now
          <span aria-hidden="true">&#8250;</span>
        </a>
      </p>
    </div>
  );
}
