import { ImageResponse } from "next/og";

export const alt = "Roboskills — Teach any robot a new skill";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07080b",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: 300,
            width: 700,
            height: 400,
            background: "#4f7dff",
            opacity: 0.18,
            filter: "blur(120px)",
            borderRadius: 9999,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#111319",
              border: "2px solid #2a2e3b",
            }}
          />
          <div style={{ display: "flex", fontSize: 30, color: "#f5f7fb", fontWeight: 600 }}>
            <span>Robo</span>
            <span style={{ color: "#99a1b3" }}>skills</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: "#f5f7fb",
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            Teach any robot
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: "#4f7dff",
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            a new skill.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#99a1b3" }}>
            Reinforcement learning in the cloud, a deployable policy in minutes.
          </div>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 22, color: "#5b6273" }}>
          <span>MuJoCo</span>
          <span>·</span>
          <span>Stable-Baselines3</span>
          <span>·</span>
          <span>PPO</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
