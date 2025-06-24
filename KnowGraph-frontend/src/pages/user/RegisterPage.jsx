import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../api/auth";
import Message from "../../components/Message";

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || !form.confirm) {
      setError("请填写所有字段");
      Message.error("请填写所有字段");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("请输入有效的邮箱地址");
      Message.error("请输入有效的邮箱地址");
      return;
    }
    if (form.password.length < 6) {
      setError("密码长度不能少于6位");
      Message.error("密码长度不能少于6位");
      return;
    }
    if (form.password !== form.confirm) {
      setError("两次输入的密码不一致");
      Message.error("两次输入的密码不一致");
      return;
    }
    setLoading(true);
    try {
      const res = await registerApi({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      if (res.code === 200) {
        setError("");
        Message.success("注册成功，请登录！");
        navigate("/login");
      } else {
        setError(res.message || "注册失败");
        Message.error(res.message || "注册失败");
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
        <div className="reddit-title">注册</div>
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
          type="email"
          name="email"
          placeholder="邮箱"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <input
          className="reddit-input"
          type="password"
          name="password"
          placeholder="密码（至少6位）"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <input
          className="reddit-input"
          type="password"
          name="confirm"
          placeholder="确认密码"
          value={form.confirm}
          onChange={handleChange}
          autoComplete="new-password"
        />
        <button
          className="reddit-btn"
          type="submit"
          disabled={
            !(form.username && form.email && form.password && form.confirm) ||
            loading
          }
        >
          {loading ? "注册中..." : "注册"}
        </button>
        <div
          className="reddit-form-bottom"
          style={{ justifyContent: "flex-end" }}
        >
          <span>
            已有账号？
            <Link className="reddit-link" to="/login">
              去登录
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
