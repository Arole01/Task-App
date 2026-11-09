function ProductivityProgress() {
  return (
    <div className="min-h-screen bg-[#f7f8fc] p-4 flex items-center justify-center">
      <div className="w-full max-w-[1185px] rounded-[32px] bg-white px-6 py-10 shadow-[0_3px_8px_rgba(0,0,0,0.06)]">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            {/* Progress Icon */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#e9edff] overflow-visible">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="48"
                height="48"
                className="block w-12 h-12 shrink-0"
              >
                {/* Main rising graph line */}
                <polyline
                  points="8,34 19,23 27,29 40,14"
                  style={{
                    fill: "none",
                    stroke: "#3216B5",
                    strokeWidth: 4,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                  }}
                />

                {/* Arrow head */}
                <polyline
                  points="34,14 40,14 40,20"
                  style={{
                    fill: "none",
                    stroke: "#3216B5",
                    strokeWidth: 4,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                  }}
                />

                {/* Small sparkle */}
                <path
                  d="M13 13 L14.5 16 L17 17 L14.5 18 L13 21 L11.5 18 L9 17 L11.5 16 Z"
                  fill="#3216B5"
                />

                {/* Large sparkle */}
                <path
                  d="M28 5 L30 9 L34 11 L30 13 L28 17 L26 13 L22 11 L26 9 Z"
                  fill="#3216B5"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#111827] leading-tight">
                Productivity Progress
              </h1>
              <p className="mt-2 text-lg text-[#66666f]">12 of 24 completed</p>
            </div>
          </div>

          <span className="text-2xl font-bold text-[#3216b5]">50%</span>
        </div>
        {/* Progress Bar */}
        <div className="h-6 w-full overflow-hidden rounded-full bg-[#dce8fc]">
          <div className="h-full w-1/2 rounded-full bg-[#3216B5]" />
        </div>
        {/* Motivational Message */}
        <div className="mt-7 flex items-center gap-4 rounded-[24px] bg-[#eef2ff] px-5 py-6">
          {/* Trophy Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="#087452"
            className="h-10 w-10 shrink-0"
          >
            <path d="M12 5H36V12C36 21 31 27 27 29V34H33V40H15V34H21V29C17 27 12 21 12 12V5Z" />
            <path d="M12 9H5V14C5 21 10 24 16 24L14 18C11 17 10 14 12 9Z" />
            <path d="M36 9H43V14C43 21 38 24 32 24L34 18C37 17 38 14 36 9Z" />
          </svg>

          <p className="text-lg leading-relaxed text-[#111827]">
            <span className="font-semibold">
              You're halfway through today's goals!
            </span>{" "}
            Keep up the momentum.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductivityProgress;
