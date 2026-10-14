"use client";

import styles from "./ServicesRunning.module.css";

export default function CodeWindow() {
  const renderCodeSnippet = () => (
    <>
      <div>
        <span className={styles.tokenMuted}>const</span>{" "}
        <span className={styles.tokenWhite}>serviceConfig</span>{" "}
        <span className={styles.tokenMuted}>=</span>{" "}
        <span className={styles.tokenMuted}>{"{"}</span>
      </div>
      <div>
        <span className={styles.tokenIndent} />
        <span className={styles.tokenProperty}>stack:</span>{" "}
        <span className={styles.tokenLime}>"Full Stack"</span>
        <span className={styles.tokenMuted}>,</span>
      </div>
      <div>
        <span className={styles.tokenIndent} />
        <span className={styles.tokenProperty}>frontend:</span>{" "}
        <span className={styles.tokenLime}>"Next.js / React"</span>
        <span className={styles.tokenMuted}>,</span>
      </div>
      <div>
        <span className={styles.tokenIndent} />
        <span className={styles.tokenProperty}>backend:</span>{" "}
        <span className={styles.tokenLime}>"Node.js"</span>
        <span className={styles.tokenMuted}>,</span>
      </div>
      <div>
        <span className={styles.tokenIndent} />
        <span className={styles.tokenProperty}>database:</span>{" "}
        <span className={styles.tokenLime}>"PostgreSQL"</span>
      </div>
      <div>
        <span className={styles.tokenMuted}>{"}"}</span>
      </div>
      <div>&nbsp;</div>
      <div>
        <span className={styles.tokenLime}>async function</span>{" "}
        <span className={styles.tokenWhite}>buildProduct()</span>{" "}
        <span className={styles.tokenMuted}>{"{"}</span>
      </div>
      <div>
        <span className={styles.tokenIndent} />
        <span className={styles.tokenMuted}>const</span>{" "}
        <span className={styles.tokenWhite}>api</span>{" "}
        <span className={styles.tokenMuted}>=</span>{" "}
        <span className={styles.tokenLime}>await</span>{" "}
        <span className={styles.tokenWhite}>createAPI(app.backend)</span>
      </div>
      <div>
        <span className={styles.tokenIndent} />
        <span className={styles.tokenMuted}>const</span>{" "}
        <span className={styles.tokenWhite}>db</span>{" "}
        <span className={styles.tokenMuted}>=</span>{" "}
        <span className={styles.tokenLime}>await</span>{" "}
        <span className={styles.tokenWhite}>connect(app.database)</span>
      </div>
      <div>&nbsp;</div>
      <div>
        <span className={styles.tokenIndent} />
        <span className={styles.tokenLime}>return deploy</span>
        <span className={styles.tokenMuted}>({"{"}</span>
      </div>
      <div>
        <span className={styles.tokenIndent2} />
        <span className={styles.tokenProperty}>ui:</span>{" "}
        <span className={styles.tokenMuted}>app.frontend,</span>
      </div>
      <div>
        <span className={styles.tokenIndent2} />
        <span className={styles.tokenProperty}>api:</span>{" "}
        <span className={styles.tokenMuted}>api,</span>
      </div>
      <div>
        <span className={styles.tokenIndent2} />
        <span className={styles.tokenProperty}>db:</span>{" "}
        <span className={styles.tokenMuted}>db</span>
      </div>
      <div>
        <span className={styles.tokenIndent} />
        <span className={styles.tokenMuted}>{"})"}</span>
      </div>
      <div>
        <span className={styles.tokenMuted}>{"}"}</span>
      </div>
      <div>&nbsp;</div>
      <div>
        <span className={styles.tokenLime}>export async function</span>{" "}
        <span className={styles.tokenWhite}>healthCheck()</span>{" "}
        <span className={styles.tokenMuted}>{"{"}</span>
      </div>
      <div>
        <span className={styles.tokenIndent} />
        <span className={styles.tokenMuted}>const</span>{" "}
        <span className={styles.tokenWhite}>status</span>{" "}
        <span className={styles.tokenMuted}>=</span>{" "}
        <span className={styles.tokenLime}>await</span>{" "}
        <span className={styles.tokenWhite}>pingService()</span>
      </div>
      <div>
        <span className={styles.tokenIndent} />
        <span className={styles.tokenLime}>return</span>{" "}
        <span className={styles.tokenMuted}>status.ok</span>
      </div>
      <div>
        <span className={styles.tokenMuted}>{"}"}</span>
      </div>
      <div>&nbsp;</div>
    </>
  );

  return (
    <div
      className={styles.codeWindow}
      role="region"
      aria-label="Interactive Code Editor Preview"
    >
      {/* Top Window Chrome */}
      <div className={styles.windowHeader}>
        {/* Navigation Arrows */}
        <div className={styles.navArrows}>
          <button
            type="button"
            className={styles.arrowBtn}
            aria-label="Previous file"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <button
            type="button"
            className={styles.arrowBtn}
            aria-label="Next file"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        {/* Right Window Controls */}
        <div className={styles.windowControls}>
          {/* Isometric Package / Cube Icon in neon lime */}
          <span className={styles.cubeIcon} title="Node Package">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </span>

          {/* Minimize button */}
          <button
            type="button"
            className={styles.controlBtn}
            aria-label="Minimize"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          {/* Close button */}
          <button
            type="button"
            className={styles.controlBtn}
            aria-label="Close"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Window Body: Left Sidebar + Code Viewport */}
      <div className={styles.windowBody}>
        {/* Left Activity Bar */}
        <div className={styles.activityBar} aria-hidden="true">
          {/* File explorer icon */}
          <span className={`${styles.activityIcon} ${styles.active}`} title="Explorer">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>
          </span>

          {/* Git branch icon */}
          <span className={styles.activityIcon} title="Source Control">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="6" y1="3" x2="6" y2="15" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
          </span>

          {/* Terminal / Code icon */}
          <span className={styles.activityIcon} title="Output Terminal">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </span>
        </div>

        {/* Scrolling Code Viewport */}
        <div className={styles.codeViewport}>
          <div className={styles.scrollTrack}>
            <div className={styles.codeBlock} aria-hidden="false">
              {renderCodeSnippet()}
            </div>
            <div className={styles.codeBlock} aria-hidden="true">
              {renderCodeSnippet()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
