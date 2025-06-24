import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/auth";
import Message from "../../components/Message";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("请输入用户名和密码");
      Message.error("请输入用户名和密码");
      return;
    }
    setLoading(true);
    try {
      const res = await loginApi(form);
      if (res.code === 200 && res.data) {
        localStorage.setItem("tokenName", res.data.tokenName);
        localStorage.setItem("tokenValue", res.data.tokenValue);
        setError("");
        Message.success("登录成功！");
        navigate("/");
      } else {
        setError(res.message || "登录失败");
        Message.error(res.message || "登录失败");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "网络错误");
      Message.error(err?.response?.data?.message || "网络错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Reddit 风格气泡背景 */}
      <div className="reddit-bg">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className={`reddit-bg-bubble reddit-bg-bubble${i + 1}`}
          ></div>
        ))}
      </div>
      <form
        className="reddit-card reddit-form"
        onSubmit={handleSubmit}
        style={{ zIndex: 1 }}
      >
        <div className="reddit-logo">
          <span
            className="reddit-logo-icon"
            role="img"
            aria-label="logo"
            style={{ fontSize: 0 }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="16" fill="#ff4500" />
              <circle cx="16" cy="16" r="13" fill="#fff" />
              <circle cx="16" cy="16" r="9" fill="#ff4500" />
            </svg>
          </span>
          KnowGraph
        </div>
        <div className="reddit-title">登录</div>
        <div className="reddit-tip">
          继续操作即表示你同意我们的
          <a href="#" target="_blank" rel="noopener noreferrer">
            {" "}
            用户协议{" "}
          </a>
          并确认已了解
          <a href="#" target="_blank" rel="noopener noreferrer">
            {" "}
            隐私政策
          </a>
          。
        </div>
        {error && <div className="reddit-error">{error}</div>}
        <input
          className="reddit-input"
          type="text"
          name="username"
          placeholder="用户名"
          value={form.username}
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          className="reddit-input"
          type="password"
          name="password"
          placeholder="密码"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button
          className="reddit-btn"
          type="submit"
          disabled={!form.username || !form.password || loading}
        >
          {loading ? "登录中..." : "登录"}
        </button>
        <div className="reddit-form-bottom">
          <Link className="reddit-link" to="#">
            忘记密码?
          </Link>
          <span>
            第一次使用 KnowGraph?{" "}
            <Link className="reddit-link" to="/register">
              注册
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
